module.exports = async function handler(req, res) {
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

  let stage = "token_request";
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

    const tokenText = await tokenResponse.text();
    let tokenData;
    try {
      tokenData = JSON.parse(tokenText);
    } catch {
      console.error("Token endpoint returned non-JSON", tokenResponse.status, tokenText.slice(0, 200));
      return res.status(502).json({
        error: "Token endpoint returned a non-JSON response",
        stage: "token_response",
        upstreamStatus: tokenResponse.status,
        details: tokenText.slice(0, 200)
      });
    }

    if (!tokenResponse.ok) {
      console.error("Token request rejected", tokenResponse.status, tokenData);
      return res.status(502).json({
        error: "Upstream authentication failed",
        stage: "token_authentication",
        upstreamStatus: tokenResponse.status,
        details: tokenData.error_description || tokenData.error || "No details provided"
      });
    }

    if (!tokenData.access_token) {
      return res.status(502).json({
        error: "Token response did not include an access token",
        stage: "token_response",
        upstreamStatus: tokenResponse.status
      });
    }

    stage = "catalogue_request";
    const url = new URL("https://api.spotify.com/v1/search");
    url.searchParams.set("q", q.slice(0, 200));
    url.searchParams.set("type", type);
    url.searchParams.set("limit", "10");

    const apiResponse = await fetch(url, {
      headers: { Authorization: "Bearer " + tokenData.access_token }
    });
    const apiText = await apiResponse.text();
    let data;
    try {
      data = JSON.parse(apiText);
    } catch {
      console.error("Catalogue endpoint returned non-JSON", apiResponse.status, apiText.slice(0, 200));
      return res.status(502).json({
        error: "Catalogue endpoint returned a non-JSON response",
        stage: "catalogue_response",
        upstreamStatus: apiResponse.status,
        details: apiText.slice(0, 200)
      });
    }

    if (!apiResponse.ok) {
      console.error("Catalogue search rejected", apiResponse.status, data);
      return res.status(apiResponse.status === 429 ? 429 : 502).json({
        error: apiResponse.status === 429 ? "Upstream rate limit reached; try again later" : "Catalogue search failed",
        stage: "catalogue_search",
        upstreamStatus: apiResponse.status,
        details: data.error?.message || data.error || "No details provided"
      });
    }

    res.setHeader("Cache-Control", "s-maxage=30, stale-while-revalidate=60");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Upstream request failed at", stage, error?.name, error?.message);
    return res.status(502).json({
      error: "Unable to reach the upstream service",
      stage,
      cause: error?.name || "Error",
      details: error?.message || "Unknown error"
    });
  }
};
