// Spotify playlist IDs use the 22-character Base62 format.
const SPOTIFY_ID_RE = /^[A-Za-z0-9]{22}$/;

function sendError(res, status, error, extra = {}) {
  return res.status(status).json({ success: false, error, ...extra });
}
 
// Prefer Spotify's supported Web API when server-side client credentials are configured.
// Keep credentials in Vercel environment variables; never expose them to the browser.
async function fetchSpotifyApiPlaylist(playlistId) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) return { configured: false };

  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(clientId + ":" + clientSecret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(9000)
  });
  const tokenBody = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok || !tokenBody.access_token) {
    return { configured: true, error: "Could not obtain a Spotify Web API access token", status: tokenResponse.status, detail: tokenBody.error_description || tokenBody.error || "" };
  }

  const headers = { Authorization: "Bearer " + tokenBody.access_token, Accept: "application/json" };
  const playlistResponse = await fetch("https://api.spotify.com/v1/playlists/" + encodeURIComponent(playlistId), {
    headers, signal: AbortSignal.timeout(9000)
  });
  const playlistBody = await playlistResponse.json().catch(() => ({}));
  if (!playlistResponse.ok) {
    return { configured: true, error: playlistBody.error?.message || "Spotify playlist API request failed", status: playlistResponse.status };
  }

  const tracks = [];
  let next = "https://api.spotify.com/v1/playlists/" + encodeURIComponent(playlistId) + "/tracks?limit=100";
  // Bound response size/time for Vercel serverless execution; enough for normal playlists.
  for (let page = 0; next && page < 5; page++) {
    const pageResponse = await fetch(next, { headers, signal: AbortSignal.timeout(9000) });
    const pageBody = await pageResponse.json().catch(() => ({}));
    if (!pageResponse.ok) {
      return { configured: true, error: pageBody.error?.message || "Spotify playlist tracks request failed", status: pageResponse.status };
    }
    for (const item of pageBody.items || []) {
      const track = item?.track;
      if (!track || track.is_local || !track.id) continue;
      const normalized = normalizeTrack({
        id: track.id,
        name: track.name,
        artists: (track.artists || []).map(artist => artist.name),
        duration_ms: track.duration_ms
      });
      if (normalized) tracks.push(normalized);
    }
    next = pageBody.next || null;
  }

  return {
    configured: true,
    playlist: {
      id: playlistId,
      name: playlistBody.name || "Spotify Playlist",
      description: playlistBody.description || "",
      owner: playlistBody.owner?.display_name || "",
      url: playlistBody.external_urls?.spotify || "https://open.spotify.com/playlist/" + playlistId,
      images: (playlistBody.images || []).map(image => ({ url: proxyArtwork(image.url) || image.url }))
    },
    tracks,
    total: tracks.length,
    source: "spotify-web-api",
    upstreamTotal: playlistBody.tracks?.total ?? tracks.length
  };
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function proxyArtwork(value) {
  if (typeof value !== "string" || !value) return "";
  try {
    const image = new URL(value);
    const approvedHosts = new Set([
      "i.scdn.co",
      "image-cdn-fa.spotifycdn.com",
      "image-cdn-ak.spotifycdn.com"
    ]);
    if (image.protocol !== "https:" || !approvedHosts.has(image.hostname)) return value;
    return "https://jammify-data-api.vercel.app/api/image?url=" + encodeURIComponent(value);
  } catch {
    return "";
  }
}

async function fetchText(url, accept = "text/html,application/xhtml+xml") {
  const response = await fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0.0.0 Safari/537.36",
      "Accept-Language": "en-US,en;q=0.9"
    },
    signal: AbortSignal.timeout(9000)
  });
  const body = await response.text();
  if (!response.ok) {
    const error = new Error(`Upstream returned HTTP ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return body;
}

function getSpotifyId(track) {
  const direct = track?.id || track?.trackId || track?.uid;
  if (typeof direct === "string" && /^[A-Za-z0-9]{10,64}$/.test(direct)) return direct;
  const value = [track?.uri, track?.href, track?.url, track?.link].find(v => typeof v === "string") || "";
  const match = value.match(/spotify:track:([A-Za-z0-9]{10,64})|open\.spotify\.com\/track\/([A-Za-z0-9]{10,64})/);
  return match ? (match[1] || match[2]) : null;
}

function durationMs(track) {
  const candidates = [
    track?.duration_ms,
    track?.duration?.totalMilliseconds,
    track?.duration?.milliseconds,
    track?.duration?.ms,
    track?.duration
  ];
  for (const value of candidates) {
    const n = typeof value === "number" ? value : Number(value);
    if (Number.isFinite(n) && n > 0) return Math.round(n);
  }
  return 0;
}

function normalizeTrack(track) {
  if (!track || typeof track !== "object") return null;
  const name = decodeHtml(track.name || track.title || track.trackName || "");
  const id = getSpotifyId(track);
  if (!name || !id) return null;

  let artists = track.artists || track.artistNames || track.artist || track.subtitle || "";
  if (!Array.isArray(artists)) {
    if (typeof artists === "object" && artists) artists = [artists.name || artists.title || ""];
    else artists = String(artists).split(/\s*[·•,&]\s*/).filter(Boolean);
  }
  artists = artists.map(artist => decodeHtml(typeof artist === "string" ? artist : artist?.name || artist?.title || ""))
    .filter(Boolean);

  return {
    id,
    name,
    artists: artists.length ? artists : ["Unknown Artist"],
    duration: { ms: durationMs(track) },
    duration_ms: durationMs(track),
    spotify_url: `https://open.spotify.com/track/${id}`
  };
}

function collectTrackArrays(root) {
  const found = [];
  const seen = new Set();
  function walk(value, depth = 0) {
    if (!value || typeof value !== "object" || depth > 24 || seen.has(value)) return;
    seen.add(value);
    if (Array.isArray(value)) {
      const normalized = value.map(normalizeTrack).filter(Boolean);
      if (normalized.length) found.push(normalized);
      for (const item of value) walk(item, depth + 1);
      return;
    }
    for (const child of Object.values(value)) walk(child, depth + 1);
  }
  walk(root);
  return found.sort((a, b) => b.length - a.length);
}

function extractEmbeddedJson(html) {
  const roots = [];
  const scriptPattern = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptPattern.exec(html))) {
    const raw = match[1]?.trim();
    if (!raw || raw.length < 2 || raw[0] !== "{" && raw[0] !== "[") continue;
    try { roots.push(JSON.parse(raw)); } catch { /* not a JSON script */ }
  }
  // Some Spotify responses embed JSON as escaped text inside the page.
  for (const marker of ["__NEXT_DATA__", "Spotify", "trackList"]) {
    const index = html.indexOf(marker);
    if (index >= 0) {
      const start = html.lastIndexOf("{", index);
      if (start >= 0) {
        let depth = 0, quoted = false, escaped = false;
        for (let i = start; i < html.length && i < start + 2000000; i++) {
          const c = html[i];
          if (quoted) {
            if (escaped) escaped = false;
            else if (c === "\\") escaped = true;
            else if (c === '"') quoted = false;
            continue;
          }
          if (c === '"') quoted = true;
          else if (c === "{") depth++;
          else if (c === "}" && --depth === 0) {
            try { roots.push(JSON.parse(html.slice(start, i + 1))); } catch { /* partial/non-JSON object */ }
            break;
          }
        }
      }
    }
  }
  return roots;
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, s-maxage=900, stale-while-revalidate=3600");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return sendError(res, 405, "Method not allowed");
  }

  const playlistId = String(req.query?.id || "").trim();
  if (!SPOTIFY_ID_RE.test(playlistId)) {
    return sendError(res, 400, "Invalid Spotify playlist ID. Use the 22-character ID from the Spotify playlist URL after /playlist/, not a MongoDB document ID.");
  }

  const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
  const embedUrl = `https://open.spotify.com/embed/playlist/${playlistId}`;

  try {
    // First use the supported Spotify Web API when credentials are configured.
    // This works for playlist IDs absent from the local catalogue.
    const apiResult = await fetchSpotifyApiPlaylist(playlistId);
    if (apiResult.configured && !apiResult.error && apiResult.tracks?.length) {
      return res.status(200).json({
        success: true,
        source: apiResult.source,
        playlist: apiResult.playlist,
        tracks: apiResult.tracks,
        total: apiResult.total,
        upstreamTotal: apiResult.upstreamTotal
      });
    }
    if (apiResult.configured && apiResult.error && [401, 403].includes(apiResult.status)) {
      // Continue to public-page scraping; retain API diagnostic if scraping also fails.
    }

    // The ID is intentionally not looked up in the local catalogue. Try both
    // Spotify's embed page and its regular public playlist page for fresh IDs.
    const [oembedResult, embedResult, publicPageResult] = await Promise.allSettled([
      fetchText(`https://open.spotify.com/oembed?url=${encodeURIComponent(playlistUrl)}`, "application/json"),
      fetchText(embedUrl, "text/html,application/xhtml+xml"),
      fetchText(playlistUrl, "text/html,application/xhtml+xml")
    ]);

    let oembed = null;
    if (oembedResult.status === "fulfilled") {
      try { oembed = JSON.parse(oembedResult.value); } catch { /* fallback to HTML metadata */ }
    }

    const htmlCandidates = [];
    if (embedResult.status === "fulfilled") htmlCandidates.push(embedResult.value);
    if (publicPageResult.status === "fulfilled") htmlCandidates.push(publicPageResult.value);
    if (!htmlCandidates.length) {
      const reason = embedResult.reason || publicPageResult.reason;
      return sendError(res, 502, "Spotify's public playlist and embed pages could not be fetched", {
        playlistId,
        upstreamStatus: reason?.status || null,
        detail: reason?.message || "Upstream request failed",
        hint: "The playlist may be private, deleted, unavailable in this market, or temporarily blocked by Spotify."
      });
    }

    const roots = htmlCandidates.flatMap(extractEmbeddedJson);
    const html = htmlCandidates.find(candidate => /og:title|og:image|spotify:track:|trackList|__NEXT_DATA__/i.test(candidate)) || htmlCandidates[0];
    let tracks = [];
    for (const root of roots) {
      const arrays = collectTrackArrays(root);
      if (arrays[0]?.length > tracks.length) tracks = arrays[0];
    }

    // Search JSON-like fragments containing the Spotify track URI when the page
    // doesn't provide a parseable script payload.
    if (!tracks.length) {
      const uriMatches = htmlCandidates.flatMap(candidate =>
        [...candidate.matchAll(/spotify:track:([A-Za-z0-9]{22})/g)].map(m => m[1])
      );
      const uniqueIds = [...new Set(uriMatches)];
      if (uniqueIds.length) {
        return sendError(res, 502, "Spotify returned track identifiers but not enough public track metadata to import safely", {
          playlistId,
          discoveredTrackIds: uniqueIds.length,
          hint: "Spotify may have changed its public embed response. This endpoint does not fabricate track names."
        });
      }
    }

    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaTitleMatch = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i);
    const metaImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i);
    const title = decodeHtml(oembed?.title || metaTitleMatch?.[1] || titleMatch?.[1] || "Spotify Playlist");
    const originalImageUrl = oembed?.thumbnail_url || (metaImageMatch?.[1] ? decodeHtml(metaImageMatch[1]) : "");
    const imageUrl = proxyArtwork(originalImageUrl);

    if (!tracks.length) {
      return sendError(res, 502, "Spotify's public page did not expose a readable track list for this playlist", {
        playlistId,
        title,
        spotifyApi: apiResult.configured ? { status: apiResult.status || null, error: apiResult.error || null } : "not_configured",
        hint: apiResult.configured
          ? "Spotify Web API was attempted but did not return tracks. Check Vercel SPOTIFY_CLIENT_ID/SPOTIFY_CLIENT_SECRET and the playlist's access permissions."
          : "Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in Vercel to enable the supported Spotify Web API fallback. Public-page scraping alone cannot reliably expose tracks."
      });
    }

    const dedupedTracks = [...new Map(tracks.map(track => [track.id, track])).values()];
    return res.status(200).json({
      success: true,
      source: "spotify-public-embed",
      playlist: {
        id: playlistId,
        name: title,
        description: "",
        owner: "",
        url: playlistUrl,
        images: imageUrl ? [{ url: imageUrl }] : []
      },
      tracks: dedupedTracks,
      total: dedupedTracks.length
    });
  } catch (error) {
    return sendError(res, 502, "Failed to fetch the public Spotify playlist", {
      playlistId,
      detail: error?.message || "Unknown upstream error"
    });
  }
};
