const DEFAULT_LIMIT = 60;
const MAX_LIMIT = 100;
const ID_PATTERN = new RegExp('open[.]spotify[.]com/(?:user/[^"/? ]+/)?playlist/([A-Za-z0-9]{10,64})', 'gi');
const URI_PATTERN = /spotify:playlist:([A-Za-z0-9]{10,64})/gi;

const GENERIC_VARIANTS = [
  "best songs playlist",
  "top hits playlist",
  "popular songs playlist",
  "new songs playlist",
  "trending songs playlist",
  "love songs playlist",
  "latest music playlist",
  "best of playlist",
  "official playlist",
  "2026 playlist",
  "2025 playlist",
  "viral songs playlist",
  "hits mix playlist",
  "best tracks playlist",
  "music playlist",
];

const CATEGORY_VARIANTS = {
  telugu: ["Telugu hits", "Telugu latest songs", "Telugu love songs", "Telugu trending songs", "Tollywood hits", "Telugu melody", "Telugu sad songs", "Telugu folk songs", "Telugu devotional songs", "Telugu songs 2026", "Telugu viral songs", "Telugu new music"],
  tamil: ["Tamil hits", "Tamil latest songs", "Tamil love songs", "Tamil trending songs", "Kollywood hits", "Tamil melody", "Tamil sad songs", "Tamil folk songs", "Tamil devotional songs", "Tamil songs 2026", "Tamil viral songs", "Tamil new music"],
  hindi: ["Hindi hits", "Bollywood hits", "Hindi latest songs", "Hindi love songs", "Bollywood romance", "Hindi sad songs", "Hindi party songs", "Hindi songs 2026", "Hindi viral songs", "Bollywood classics"],
  punjabi: ["Punjabi hits", "Punjabi latest songs", "Punjabi love songs", "Punjabi party songs", "Punjabi bhangra", "Punjabi sad songs", "Punjabi songs 2026", "Punjabi viral songs"],
  malayalam: ["Malayalam hits", "Malayalam latest songs", "Malayalam melody", "Malayalam love songs", "Malayalam songs 2026"],
  kannada: ["Kannada hits", "Kannada latest songs", "Kannada melody", "Kannada love songs", "Kannada songs 2026"],
  pop: ["Pop hits", "Pop rising", "top pop songs", "new pop music", "pop classics", "viral pop songs"],
  charts: ["top 50 global", "viral 50", "new music Friday", "global hits", "trending music"],
  "hip-hop": ["hip hop hits", "rap hits", "new rap music", "viral hip hop", "hip hop 2026"],
  dance: ["dance hits", "party hits", "EDM hits", "house music", "dance party"],
  rock: ["rock classics", "alternative rock", "new rock music", "indie rock", "rock hits"],
  chill: ["chill hits", "lofi beats", "sad songs", "focus music", "relaxing music"],
  indie: ["indie hits", "indie pop", "fresh finds", "alternative indie"],
  devotional: ["devotional songs", "bhajans", "spiritual music", "Indian devotional"],
};

function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function decodeHtml(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&#x2F;/gi, "/")
    .replace(/&#47;/g, "/")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function findPlaylistIds(html) {
  const decoded = decodeHtml(html);
  const candidates = [decoded];
  try {
    candidates.push(decodeURIComponent(decoded.split("+").join("%20")));
  } catch {}
  const found = [];
  const seen = new Set();
  for (const value of candidates) {
    for (const pattern of [ID_PATTERN, URI_PATTERN]) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(value)) !== null) {
        const id = match[1];
        if (!seen.has(id)) {
          seen.add(id);
          found.push(id);
        }
      }
    }
  }
  return found;
}

async function fetchSearchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(6500),
      redirect: "follow",
    });
    if (!response.ok) return { ids: [], status: response.status, engine: new URL(url).hostname };
    const html = await response.text();
    return { ids: findPlaylistIds(html), status: response.status, engine: new URL(url).hostname };
  } catch (error) {
    return { ids: [], status: 0, engine: new URL(url).hostname, error: error?.message || "Search request failed" };
  }
}

function buildQueries(category, offset, batchSize = 3, manualName = false) {
  const key = normalize(category);
  const specific = CATEGORY_VARIANTS[key];
  const words = manualName
    ? [
        category,
        category + " playlist",
        "best " + category + " playlists",
        category + " official playlist",
        category + " 2026 playlist",
        "latest " + category + " playlist",
        category + " hits playlist",
      ]
    : specific && specific.length
      ? specific
      : [
          category + " hits",
          "best " + category + " songs",
          category + " latest songs",
          category + " trending music",
          category + " love songs",
          category + " popular playlists",
          category + " music 2026",
          category + " new songs",
          ...GENERIC_VARIANTS.slice(0, 7).map(term => category + " " + term),
        ];
  const terms = [...new Set(words)];
  const variants = terms.map(term => ({ term, query: "site:open.spotify.com/playlist " + term }));
  const safeOffset = Math.max(0, Number(offset) || 0);
  return Array.from({ length: Math.min(batchSize, variants.length) }, (_, step) => {
    const cursor = safeOffset + step;
    const index = cursor % variants.length;
    const page = Math.floor(cursor / variants.length);
    return { ...variants[index], page, variantCount: variants.length };
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ success: false, error: "Method not allowed" });

  const category = String(req.query.query || req.query.category || req.query.q || "").trim();
  if (!category) return res.status(400).json({ success: false, error: "Missing category, query or q" });
  const offset = Math.max(0, Number.parseInt(req.query.offset || "0", 10) || 0);
  const limit = Math.min(MAX_LIMIT, Math.max(1, Number.parseInt(req.query.limit || String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT));
  const manualName = String(req.query.mode || "").toLowerCase() === "name";
  // Name searches include the user's exact phrase and related playlist queries.
  // Category imports continue rotating through their curated term lists.
  const queries = buildQueries(category, offset, manualName ? 5 : 3, manualName);
  const pages = await Promise.all(queries.flatMap(search => {
    const start = search.page * 10;
    const spotifySearch = "https://open.spotify.com/search/" + encodeURIComponent(search.term) + "/playlists";
    const targets = [
      "https://www.bing.com/search?q=" + encodeURIComponent(search.query) + "&first=" + (start + 1),
      "https://html.duckduckgo.com/html/?q=" + encodeURIComponent(search.query) + "&s=" + start,
      "https://www.google.com/search?q=" + encodeURIComponent(search.query) + "&start=" + start,
      spotifySearch,
    ];
    return targets.map(url => fetchSearchPage(url).then(result => ({ ...result, query: search.query, page: search.page })));
  }));
  const ids = [];
  const seen = new Set();
  for (const pageResult of pages) {
    for (const id of pageResult.ids) {
      if (!seen.has(id)) {
        seen.add(id);
        ids.push(id);
      }
      if (ids.length >= limit) break;
    }
    if (ids.length >= limit) break;
  }
  const results = ids.map((id, index) => ({
    id,
    spotifyId: id,
    title: category + " playlist",
    seedName: category + " playlist " + (offset + index + 1),
    category,
    playlistUrl: "https://open.spotify.com/playlist/" + id,
    source: "spotify-public-search",
    ok: true,
  }));
  const successfulSources = pages.filter(item => item.ids.length > 0).map(item => item.engine);
  return res.status(200).json({
    success: true,
    source: "Spotify public search result discovery",
    category,
    offset,
    query: queries[0]?.query || "",
    queries: queries.map(({ query, term, page }) => ({ query, term, page })),
    variantCount: queries[0]?.variantCount || 0,
    searchedEngines: pages.map(({ engine, status, error, query, page }) => ({ engine, status, error, query, page })),
    successfulSources,
    count: results.length,
    results,
    note: "Playlist IDs are extracted from public search result URLs and must still pass RESONATE's Spotify playlist scraper and track-count verification before import.",
  });
};
