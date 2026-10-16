const PLAYLISTS = [
  { name: "Today’s Top Hits", id: "37i9dQZF1DXcBWIGoYBM5M", category: "Pop" },
  { name: "RapCaviar", id: "37i9dQZF1DX0XUsuxWHRQd", category: "Hip-Hop" },
  { name: "Chill Hits", id: "37i9dQZF1DX4WYpdgoIcn6", category: "Chill" },
  { name: "Peaceful Piano", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Focus" },
  { name: "mint", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Dance" },
  { name: "Rock Classics", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
  { name: "All Out 2000s", id: "37i9dQZF1DX4UtSsGT1Sbe", category: "Throwbacks" },
  { name: "Mood Booster", id: "37i9dQZF1DX3rxVfibe1L0", category: "Mood" },
  { name: "Viva Latino", id: "37i9dQZF1DX10zKzsJ2jva", category: "Latin" },
  { name: "Beast Mode", id: "37i9dQZF1DX76Wlfdnj7AP", category: "Workout" }
];

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const results = await Promise.all(PLAYLISTS.map(async (playlist) => {
    try {
      const playlistUrl = "https://open.spotify.com/playlist/" + playlist.id;
      const endpoint = new URL("https://open.spotify.com/oembed");
      endpoint.searchParams.set("url", playlistUrl);
      const response = await fetch(endpoint, { headers: { Accept: "application/json" } });
      const body = await response.text();
      let data;
      try { data = JSON.parse(body); } catch {
        return { ...playlist, ok: false, status: response.status, error: "Non-JSON response" };
      }
      if (!response.ok) {
        return { ...playlist, ok: false, status: response.status, error: data.error || data.message || "Request failed" };
      }
      return {
        ...playlist,
        ok: true,
        title: data.title || playlist.name,
        thumbnail_url: data.thumbnail_url || null,
        embed_url: data.iframe_url || null,
        playlist_url: playlistUrl
      };
    } catch (error) {
      return { ...playlist, ok: false, error: error?.message || "Request failed" };
    }
  }));

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  return res.status(200).json({
    ok: results.some((item) => item.ok),
    total: results.length,
    successful: results.filter((item) => item.ok).length,
    failed: results.filter((item) => !item.ok).length,
    results
  });
};
