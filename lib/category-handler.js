const PLAYLISTS = require("../api/playlists-batch").PLAYLISTS;
const CACHE = "public, s-maxage=3600, stale-while-revalidate=86400";
const MAX_CONCURRENCY = 10;

module.exports = function createCategoryHandler(categoryName) {
  return async function categoryHandler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Cache-Control", CACHE);
    if (req.method === "OPTIONS") return res.status(204).end();
    if (req.method !== "GET") return res.status(405).json({ success: false, error: "Method not allowed" });

    const requested = String(categoryName || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const matching = PLAYLISTS.filter(item => String(item.category || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") === requested);
    const seen = new Set();
    const items = matching.filter(item => item.id && !seen.has(item.id) && seen.add(item.id));
    if (!items.length) {
      const available = [...new Set(PLAYLISTS.map(item => item.category).filter(Boolean))].sort();
      return res.status(404).json({ success: false, category: categoryName, error: "No playlist IDs configured for this category", availableCategories: available });
    }

    const results = new Array(items.length);
    let nextIndex = 0;
    async function worker() {
      while (true) {
        const index = nextIndex++;
        if (index >= items.length) return;
        const item = items[index];
        const playlistUrl = "https://open.spotify.com/playlist/" + encodeURIComponent(item.id);
        try {
          const endpoint = new URL("https://open.spotify.com/oembed");
          endpoint.searchParams.set("url", playlistUrl);
          const response = await fetch(endpoint, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(2500) });
          const raw = await response.text();
          let data;
          try { data = JSON.parse(raw); }
          catch { results[index] = { id: item.id, category: item.category, seedName: item.name, playlistUrl, ok: false, status: response.status, error: "Spotify returned non-JSON response" }; continue; }
          if (!response.ok) {
            results[index] = { id: item.id, category: item.category, seedName: item.name, playlistUrl, ok: false, status: response.status, error: data.error || data.message || "Spotify oEmbed request failed" };
            continue;
          }
          results[index] = {
            id: item.id, category: item.category, title: data.title || item.name, seedName: item.name,
            thumbnailUrl: data.thumbnail_url ? ((req.headers["x-forwarded-proto"] || "https") + "://" + (req.headers["x-forwarded-host"] || req.headers.host) + "/api/image?url=" + encodeURIComponent(data.thumbnail_url)) : null,
            originalThumbnailUrl: data.thumbnail_url || null,
            embedUrl: data.iframe_url || "https://open.spotify.com/embed/playlist/" + item.id,
            playlistUrl, provider: data.provider_name || "Spotify", author: data.author_name || null,
            html: data.html || null, ok: true, source: "spotify-oembed"
          };
        } catch (error) {
          results[index] = { id: item.id, category: item.category, seedName: item.name, playlistUrl, ok: false, error: error?.message || "Request failed" };
        }
      }
    }
    await Promise.all(Array.from({ length: Math.min(MAX_CONCURRENCY, items.length) }, () => worker()));
    const successful = results.filter(item => item?.ok);
    const failed = results.filter(item => !item || !item.ok);
    return res.status(200).json({
      success: successful.length > 0, source: "Spotify public oEmbed", category: categoryName,
      requested: items.length, successful: successful.length, failed: failed.length,
      fetchedAt: new Date().toISOString(),
      cache: "Vercel CDN caches responses for 1 hour; stale responses may be served for 24 hours",
      note: "Public oEmbed provides title, artwork and embed metadata. Track lists, descriptions, owners and song counts are not fabricated; those require an authorized Spotify Web API response.",
      results
    });
  };
};
