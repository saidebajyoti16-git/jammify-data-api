module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const playlistUrl = typeof req.query.url === "string" ? req.query.url.trim() : "";
  let parsed;
  try {
    parsed = new URL(playlistUrl);
  } catch {
    return res.status(400).json({ error: 'Provide a valid public Spotify playlist URL in the "url" parameter' });
  }

  if (
    parsed.hostname !== "open.spotify.com" ||
    !/^\/playlist\/[A-Za-z0-9]+\/?$/.test(parsed.pathname)
  ) {
    return res.status(400).json({ error: "url must be a Spotify playlist URL, such as https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M" });
  }

  try {
    const endpoint = new URL("https://open.spotify.com/oembed");
    endpoint.searchParams.set("url", parsed.origin + parsed.pathname);

    const upstream = await fetch(endpoint, {
      headers: { Accept: "application/json" }
    });
    const body = await upstream.text();

    let data;
    try {
      data = JSON.parse(body);
    } catch {
      return res.status(502).json({
        error: "Spotify embed metadata endpoint returned non-JSON",
        upstreamStatus: upstream.status,
        details: body.slice(0, 180)
      });
    }

    if (!upstream.ok) {
      return res.status(502).json({
        error: "Spotify embed metadata request failed",
        upstreamStatus: upstream.status,
        details: data.error || data.message || "No details provided"
      });
    }

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json({
      ok: true,
      title: data.title || null,
      thumbnail_url: data.thumbnail_url || null,
      embed_url: data.iframe_url || null,
      playlist_url: parsed.origin + parsed.pathname,
      provider: data.provider_name || "Spotify"
    });
  } catch (error) {
    return res.status(502).json({
      error: "Unable to reach Spotify embed metadata endpoint",
      cause: error?.name || "Error",
      details: error?.message || "Unknown error"
    });
  }
};
