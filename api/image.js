const ALLOWED_HOSTS = new Set([
  "i.scdn.co",
  "image-cdn-fa.spotifycdn.com",
  "image-cdn-ak.spotifycdn.com"
]);

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET, OPTIONS");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const raw = typeof req.query.url === "string" ? req.query.url : "";
  let target;
  try { target = new URL(raw); } catch {
    return res.status(400).json({ success: false, error: "Provide a valid Spotify artwork URL in the url parameter" });
  }
  if (target.protocol !== "https:" || !ALLOWED_HOSTS.has(target.hostname)) {
    return res.status(400).json({ success: false, error: "Only approved Spotify artwork hosts can be proxied" });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: { Accept: "image/avif,image/webp,image/png,image/jpeg,*/*" },
      signal: AbortSignal.timeout(8000)
    });
    if (!upstream.ok) {
      return res.status(502).json({ success: false, error: "Spotify artwork host returned an error", upstreamStatus: upstream.status });
    }
    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    if (!contentType.startsWith("image/")) {
      return res.status(502).json({ success: false, error: "Artwork URL did not return an image" });
    }
    const bytes = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", String(bytes.length));
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(bytes);
  } catch (error) {
    return res.status(502).json({ success: false, error: "Could not retrieve Spotify artwork", detail: error?.message || "Upstream request failed" });
  }
};
