const PLAYLISTS = [
  // Global charts
  { name: "Today’s Top Hits", id: "37i9dQZF1DXcBWIGoYBM5M", category: "Pop" },
  { name: "Top 50 - Global", id: "37i9dQZEVXbMDoHDwVN2tF", category: "Charts" },
  { name: "Top 50 - USA", id: "37i9dQZEVXbLRQDuF5jeBp", category: "Charts" },
  { name: "Viral 50 - Global", id: "37i9dQZEVXbLiRSasKsNU9", category: "Charts" },
  { name: "New Music Friday", id: "37i9dQZF1DX4JAvHpjipBk", category: "New Releases" },

  // Pop, moods and dance
  { name: "Chill Hits", id: "37i9dQZF1DX4WYpdgoIcn6", category: "Chill" },
  { name: "Mood Booster", id: "37i9dQZF1DX3rxVfibe1L0", category: "Mood" },
  { name: "mint", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Dance" },
  { name: "Dance Party", id: "37i9dQZF1DXaXB8fQg7xif", category: "Dance" },
  { name: "Happy Hits", id: "37i9dQZF1DXdPec7aLTmlC", category: "Mood" },

  // Hip-hop, R&B and Latin
  { name: "RapCaviar", id: "37i9dQZF1DX0XUsuxWHRQd", category: "Hip-Hop" },
  { name: "Most Necessary", id: "37i9dQZF1DX2A29LI7xHn1", category: "Hip-Hop" },
  { name: "Are & Be", id: "37i9dQZF1DX4SBhb3fqCJd", category: "R&B" },
  { name: "Viva Latino", id: "37i9dQZF1DX10zKzsJ2jva", category: "Latin" },

  // Rock, throwbacks and instrumental
  { name: "Rock Classics", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
  { name: "All Out 2000s", id: "37i9dQZF1DX4UtSsGT1Sbe", category: "Throwbacks" },
  { name: "Peaceful Piano", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Focus" },
  { name: "Deep Focus", id: "37i9dQZF1DWZeKCadgRdKQ", category: "Focus" },
  { name: "lofi beats", id: "37i9dQZF1DWWQRwui0ExPn", category: "Lo-fi" },
  { name: "Beast Mode", id: "37i9dQZF1DX76Wlfdnj7AP", category: "Workout" },

  // Indian and regional
  { name: "Hot Hits Hindi", id: "37i9dQZF1DX0XUfTFmNBRM", category: "Hindi" },
  { name: "Punjabi 101", id: "37i9dQZF1DWZNJXX2UeBij", category: "Punjabi" },
  { name: "Indie India", id: "37i9dQZF1DXd8cOUrf8y9A", category: "Indian Indie" }
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
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(8000)
      });
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
