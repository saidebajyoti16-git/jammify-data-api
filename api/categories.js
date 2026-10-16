const PLAYLISTS = require("./playlists-batch").PLAYLISTS;
module.exports = function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Method not allowed" });
  const categories = {};
  for (const item of PLAYLISTS) {
    if (!item.category) continue;
    if (!categories[item.category]) categories[item.category] = { name: item.category, slug: item.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), configured: 0 };
    categories[item.category].configured++;
  }
  const results = Object.values(categories).map(category => ({ ...category, url: "/api/" + category.slug })).sort((a,b) => a.name.localeCompare(b.name));
  return res.status(200).json({ success: true, count: results.length, source: "Spotify playlist ID catalogue", note: "Configured counts are source entries before duplicate Spotify IDs are removed.", categories: results });
};
