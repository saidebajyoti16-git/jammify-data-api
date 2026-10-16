const SPOTIFY_API = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const CACHE = "public, s-maxage=900, stale-while-revalidate=3600";

const GENRES = {
  pop: ["pop hits", "international pop", "latest pop"],
  rock: ["rock classics", "alternative rock", "indie rock"],
  hiphop: ["hip hop hits", "rap hits", "old school hip hop"],
  rnb: ["r&b hits", "soul music", "slow jams"],
  electronic: ["EDM hits", "electronic dance", "house techno"],
  dance: ["dance party", "club hits", "dance hits"],
  chill: ["chill hits", "chillout", "ambient"],
  lofi: ["lofi beats", "lofi study", "chill beats"],
  focus: ["deep focus", "focus music", "instrumental study"],
  classical: ["classical music", "piano classics", "orchestral"],
  jazz: ["jazz classics", "smooth jazz", "jazz instrumental"],
  acoustic: ["acoustic hits", "acoustic covers", "unplugged"],
  country: ["country hits", "classic country", "country roads"],
  latin: ["Latin hits", "reggaeton", "Latin pop"],
  kpop: ["K-pop hits", "K-pop playlist", "Korean pop"],
  anime: ["anime songs", "anime openings", "Japanese anime music"],
  hindi: ["Hindi hits", "latest Hindi songs", "Hindi love songs", "90s Hindi songs"],
  bollywood: ["Bollywood hits", "Bollywood party", "Bollywood romance", "Bollywood classics"],
  punjabi: ["Punjabi hits", "Punjabi party", "Punjabi romance"],
  telugu: ["Telugu hits", "latest Telugu songs", "Telugu melodies"],
  tamil: ["Tamil hits", "latest Tamil songs", "Tamil melodies"],
  kannada: ["Kannada hits", "latest Kannada songs", "Kannada melodies"],
  malayalam: ["Malayalam hits", "latest Malayalam songs", "Malayalam melodies"],
  bengali: ["Bengali hits", "latest Bengali songs", "Bengali modern songs"],
  odia: ["Odia hits", "Odia songs", "latest Odia songs"],
  marathi: ["Marathi hits", "latest Marathi songs", "Marathi party songs"],
  devotional: ["devotional songs", "bhajans", "Krishna bhajans", "Shiva devotional"],
  romantic: ["romantic hits", "love songs", "romantic melodies"],
  party: ["party hits", "dance party", "wedding party songs"],
  workout: ["workout hits", "gym music", "running music"],
  sad: ["sad songs", "heartbreak songs", "sad melodies"],
  throwbacks: ["90s hits", "2000s hits", "retro hits"]
};

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    const error = new Error("Spotify credentials are not configured");
    error.statusCode = 503;
    throw error;
  }
  const credentials = Buffer.from(clientId + ":" + clientSecret).toString("base64");
  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: "Basic " + credentials,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials",
    signal: AbortSignal.timeout(9000)
  });
  if (!response.ok) {
    const error = new Error("Spotify token request failed (" + response.status + ")");
    error.statusCode = response.status === 429 ? 429 : 502;
    throw error;
  }
  const data = await response.json();
  return data.access_token;
}

async function searchPlaylists(token, query, offset, limit) {
  const params = new URLSearchParams({
    q: query,
    type: "playlist",
    market: "IN",
    limit: String(limit),
    offset: String(offset)
  });
  const response = await fetch(SPOTIFY_API + "/search?" + params, {
    headers: { Authorization: "Bearer " + token, Accept: "application/json" },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) {
    const error = new Error("Spotify playlist search failed (" + response.status + ")");
    error.statusCode = response.status;
    throw error;
  }
  const json = await response.json();
  return json?.playlists?.items || [];
}

function normalize(item, genre, searchQuery) {
  if (!item || !item.id || !item.name) return null;
  const image = Array.isArray(item.images)
    ? item.images.find((entry) => entry && entry.url)?.url || ""
    : "";
  return {
    id: item.id,
    title: item.name,
    name: item.name,
    description: item.description || "",
    image,
    cover: image,
    url: item.external_urls?.spotify || "https://open.spotify.com/playlist/" + item.id,
    spotifyUrl: item.external_urls?.spotify || "https://open.spotify.com/playlist/" + item.id,
    owner: item.owner?.display_name || "",
    songCount: Number(item.tracks?.total) || null,
    genre,
    source: "spotify",
    searchQuery,
    type: "playlist"
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", CACHE);
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Method not allowed" });

  const genre = String(req.query?.genre || "pop").toLowerCase().replace(/[^a-z0-9-]/g, "");
  const queries = GENRES[genre];
  if (!queries) return res.status(400).json({
    success: false,
    error: "Unknown genre",
    availableGenres: Object.keys(GENRES)
  });

  const page = Math.max(0, Math.min(19, Number.parseInt(req.query?.page || "0", 10) || 0));
  const limit = Math.max(1, Math.min(50, Number.parseInt(req.query?.limit || "30", 10) || 30));
  const offset = page * limit;

  try {
    const token = await getAccessToken();
    const responses = await Promise.allSettled(
      queries.map((query) => searchPlaylists(token, query, offset, limit))
    );
    const results = [];
    const seen = new Set();
    let failedQueries = 0;

    responses.forEach((response, index) => {
      if (response.status !== "fulfilled") {
        failedQueries++;
        return;
      }
      for (const item of response.value) {
        const normalized = normalize(item, genre, queries[index]);
        if (!normalized || seen.has(normalized.id)) continue;
        seen.add(normalized.id);
        results.push(normalized);
      }
    });

    return res.status(results.length ? 200 : (failedQueries === queries.length ? 502 : 200)).json({
      success: true,
      source: "spotify",
      genre,
      page,
      limit,
      offset,
      queryCount: queries.length,
      failedQueries,
      totalReturned: results.length,
      hasMore: page < 19 && results.some((item) => item.songCount !== null),
      results
    });
  } catch (error) {
    const status = error.statusCode || 502;
    return res.status(status).json({
      success: false,
      source: "spotify",
      error: error.message || "Spotify playlist discovery failed",
      setupRequired: status === 503 ? ["SPOTIFY_CLIENT_ID", "SPOTIFY_CLIENT_SECRET"] : undefined
    });
  }
};
