const API = "https://elitejiosaavn-api.vercel.app/api";
const CACHE = "public, s-maxage=900, stale-while-revalidate=3600";

const GENRES = {
  pop: ["pop hits", "latest pop songs", "pop playlists", "international pop"],
  rock: ["rock classics", "alternative rock", "indie rock", "hard rock"],
  hiphop: ["hip hop hits", "rap hits", "old school hip hop", "Indian hip hop"],
  rnb: ["R&B hits", "soul music", "slow jams"],
  electronic: ["EDM hits", "electronic dance music", "house music", "techno"],
  dance: ["dance party", "party dance hits", "club hits"],
  chill: ["chill hits", "relaxing music", "chillout", "ambient music"],
  lofi: ["lofi beats", "lofi study", "chill beats"],
  focus: ["focus music", "deep focus", "instrumental study music"],
  classical: ["classical music", "Indian classical", "piano classics"],
  jazz: ["jazz classics", "smooth jazz", "jazz instrumental"],
  acoustic: ["acoustic hits", "acoustic covers", "unplugged"],
  country: ["country hits", "classic country", "country roads"],
  latin: ["Latin hits", "reggaeton", "Latin pop"],
  kpop: ["K-pop hits", "K-pop playlist", "Korean pop"],
  anime: ["anime songs", "anime openings", "Japanese anime music"],
  hindi: ["Hindi hits", "latest Hindi songs", "Hindi love songs", "Hindi party songs", "90s Hindi songs"],
  bollywood: ["Bollywood hits", "Bollywood party", "Bollywood romance", "Bollywood classics", "new Bollywood songs"],
  punjabi: ["Punjabi hits", "Punjabi party", "Punjabi romance", "Punjabi hip hop"],
  telugu: ["Telugu hits", "latest Telugu songs", "Telugu melodies", "Telugu mass songs"],
  tamil: ["Tamil hits", "latest Tamil songs", "Tamil melodies", "Tamil kuthu"],
  kannada: ["Kannada hits", "latest Kannada songs", "Kannada melodies"],
  malayalam: ["Malayalam hits", "latest Malayalam songs", "Malayalam melodies"],
  bengali: ["Bengali hits", "latest Bengali songs", "Bengali modern songs"],
  odia: ["Odia hits", "Odia songs", "latest Odia songs", "Odia devotional songs"],
  marathi: ["Marathi hits", "latest Marathi songs", "Marathi party songs"],
  devotional: ["devotional songs", "bhajans", "Sai bhajans", "Krishna bhajans", "Shiva devotional songs"],
  romantic: ["romantic hits", "love songs", "sad love songs", "romantic melodies"],
  party: ["party hits", "dance party", "wedding party songs"],
  workout: ["workout hits", "gym music", "running music"],
  sad: ["sad songs", "heartbreak songs", "sad melodies"],
  throwbacks: ["90s hits", "2000s hits", "old songs classics", "retro hits"]
};

function getImage(value) {
  if (!value) return "";
  if (typeof value === "string") return /^https?:\/\//i.test(value) ? value : "";
  if (Array.isArray(value)) {
    for (const entry of [...value].reverse()) {
      const result = getImage(entry);
      if (result) return result;
    }
    return "";
  }
  return getImage(value.url || value.link || value.src || value.image || value.images);
}

async function search(query, page, limit) {
  const url = API + "/search/playlists?" + new URLSearchParams({
    query, page: String(page), limit: String(limit)
  });
  const response = await fetch(url, { headers: { Accept: "application/json" }, signal: AbortSignal.timeout(9000) });
  if (!response.ok) throw new Error("Playlist search failed: " + response.status);
  const json = await response.json();
  const results = json?.data?.results || json?.results || [];
  return Array.isArray(results) ? results : [];
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
  if (!queries) return res.status(400).json({ success: false, error: "Unknown genre", availableGenres: Object.keys(GENRES) });

  const page = Math.max(0, Math.min(100, Number.parseInt(req.query?.page || "0", 10) || 0));
  const limit = Math.max(1, Math.min(50, Number.parseInt(req.query?.limit || "24", 10) || 24));
  const responses = await Promise.allSettled(queries.map(query => search(query, page, limit)));
  const results = [];
  const seen = new Set();
  let failedQueries = 0;

  responses.forEach((response, index) => {
    if (response.status !== "fulfilled") {
      failedQueries++;
      return;
    }
    for (const item of response.value) {
      const id = String(item?.id || item?.listid || item?.token || item?.url || "");
      const title = String(item?.title || item?.name || item?.listname || "").trim();
      if (!id || !title || seen.has(id.toLowerCase())) continue;
      seen.add(id.toLowerCase());
      results.push({
        id,
        title,
        name: title,
        description: item?.subtitle || item?.description || ("Explore " + genre + " on RESONATE"),
        image: getImage(item?.image || item?.images || item?.artwork),
        url: item?.url || item?.perma_url || item?.permaUrl || null,
        songCount: Number(item?.songCount || item?.song_count || item?.list_count || 0) || null,
        language: item?.language || null,
        genre,
        source: "jiosaavn",
        searchQuery: queries[index],
        type: "playlist"
      });
    }
  });

  return res.status(results.length ? 200 : 502).json({
    success: results.length > 0,
    genre,
    page,
    limit,
    queryCount: queries.length,
    failedQueries,
    totalReturned: results.length,
    hasMore: results.length >= limit,
    results
  });
};
