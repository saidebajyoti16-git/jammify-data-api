module.exports = async function handler(req, res) {
  // Basic CORS support so a browser-based Jammify frontend can call this API.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const type = typeof req.query.type === "string" ? req.query.type : "track";
  const allowedTypes = new Set(["track", "artist", "album", "playlist"]);

  if (!q) return res.status(400).json({ error: 'Missing required query parameter "q"' });
  if (!allowedTypes.has(type)) {
    return res.status(400).json({ error: "type must be track, artist, album, or playlist" });
  }
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return res.status(500).json({ error: "Server credentials are not configured" });
  }

  try {
    const credentials = Buffer.from(
      process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET
    ).toString("base64");

    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + credentials,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "grant_type=client_credentials"
    });

    if (!tokenResponse.ok) {
      console.error("Token request failed with status", tokenResponse.status);
      return res.status(502).json({ error: "Upstream authentication failed" });
    }

    const tokenData = await tokenResponse.json();
    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.set("q", q.slice(0, 200));
    url.searchParams.set("type", type);
    url.searchParams.set("limit", "10");

    const apiResponse = await fetch(url, {
      headers: { Authorization: "Bearer " + tokenData.access_token }
    });
    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("Catalogue search failed with status", apiResponse.status);
      return res.status(apiResponse.status === 429 ? 429 : 502).json({
        error: apiResponse.status === 429 ? "Upstream rate limit reached; try again later" : "Catalogue search failed"
      });
    }

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch (error) {
    console.error("API request failed:", error.message);
    return res.status(502).json({ error: "Unable to reach the upstream service" });
  }
};
