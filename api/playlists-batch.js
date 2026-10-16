const PLAYLISTS = [
  // Charts and current hits
  { name: "Today’s Top Hits", id: "37i9dQZF1DXcBWIGoYBM5M", category: "Pop" },
  { name: "Top 50 - Global", id: "37i9dQZEVXbMDoHDwVN2tF", category: "Charts" },
  { name: "Top 50 - USA", id: "37i9dQZEVXbLRQDuF5jeBp", category: "Charts" },
  { name: "Top 50 - India", id: "37i9dQZEVXbLZ52XmnySJg", category: "Charts" },
  { name: "Viral 50 - Global", id: "37i9dQZEVXbLiRSasKsNU9", category: "Charts" },
  { name: "Viral 50 - USA", id: "37i9dQZEVXbKuaO7I4W8xW", category: "Charts" },
  { name: "New Music Friday", id: "37i9dQZF1DX4JAvHpjipBk", category: "New Releases" },
  { name: "Pop Rising", id: "37i9dQZF1DWUa8ZRTfalHk", category: "Pop" },
  { name: "Hot Hits USA", id: "37i9dQZF1DX0kbJZpiYdZl", category: "Pop" },
  { name: "Soft Pop Hits", id: "37i9dQZF1DWSf2RDTDayIx", category: "Pop" },

  // Pop, moods and dance
  { name: "Chill Hits", id: "37i9dQZF1DX4WYpdgoIcn6", category: "Chill" },
  { name: "Mood Booster", id: "37i9dQZF1DX3rxVfibe1L0", category: "Mood" },
  { name: "mint", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Dance" },
  { name: "Dance Party", id: "37i9dQZF1DXaXB8fQg7xif", category: "Dance" },
  { name: "Happy Hits", id: "37i9dQZF1DXdPec7aLTmlC", category: "Mood" },
  { name: "All Out 2010s", id: "37i9dQZF1DX5Ejj0EkURtP", category: "Throwbacks" },
  { name: "Songs to Sing in the Shower", id: "37i9dQZF1DX2RxBh64BHjQ", category: "Pop" },

  // Hip-hop, R&B and Latin
  { name: "RapCaviar", id: "37i9dQZF1DX0XUsuxWHRQd", category: "Hip-Hop" },
  { name: "Most Necessary", id: "37i9dQZF1DX2A29LI7xHn1", category: "Hip-Hop" },
  { name: "Get Turnt", id: "37i9dQZF1DWY4xHQp97gI", category: "Hip-Hop" },
  { name: "Are & Be", id: "37i9dQZF1DX4SBhb3fqCJd", category: "R&B" },
  { name: "Alternative R&B", id: "37i9dQZF1DX2UgsUIg75Vg", category: "R&B" },
  { name: "Viva Latino", id: "37i9dQZF1DX10zKzsJ2jva", category: "Latin" },
  { name: "Baila Reggaeton", id: "37i9dQZF1DWWvvyNmW9V9a", category: "Latin" },

  // Rock, indie and throwbacks
  { name: "Rock Classics", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
  { name: "Rock This", id: "37i9dQZF1DXcF6B6QPhFDv", category: "Rock" },
  { name: "Alternative 00s", id: "37i9dQZF1DX3MU5XUozve7", category: "Rock" },
  { name: "All Out 2000s", id: "37i9dQZF1DX4UtSsGT1Sbe", category: "Throwbacks" },
  { name: "All Out 90s", id: "37i9dQZF1DXbTxeAdrVG2l", category: "Throwbacks" },
  { name: "Indie Pop", id: "37i9dQZF1DXdbXrPNAFw7B", category: "Indie" },
  { name: "Fresh Finds", id: "37i9dQZF1DWWjGdmeTyeJ6", category: "Indie" },

  // Chill, focus and instrumental
  { name: "Peaceful Piano", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Focus" },
  { name: "Deep Focus", id: "37i9dQZF1DWZeKCadgRdKQ", category: "Focus" },
  { name: "Instrumental Study", id: "37i9dQZF1DX9sIqqvKsjG8", category: "Focus" },
  { name: "lofi beats", id: "37i9dQZF1DWWQRwui0ExPn", category: "Lo-fi" },
  { name: "Chill Lofi Study Beats", id: "37i9dQZF1DX8Uebhn9wzrS", category: "Lo-fi" },
  { name: "Deep Sleep", id: "37i9dQZF1DWZd79rJ6a7lp", category: "Sleep" },
  { name: "Peaceful Guitar", id: "37i9dQZF1DX4E3UdUs7fUx", category: "Acoustic" },
  { name: "Jazz Vibes", id: "37i9dQZF1DX0SM0LYsmbMT", category: "Jazz" },
  { name: "Jazz Classics", id: "37i9dQZF1DXbITWG1ZJKYt", category: "Jazz" },
  { name: "Classical Essentials", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Classical" },

  // Electronic and workout
  { name: "Techno Bunker", id: "37i9dQZF1DX6J5NfMJS675", category: "Electronic" },
  { name: "Housewerk", id: "37i9dQZF1DXa8NOEUWPn9W", category: "Electronic" },
  { name: "Beast Mode", id: "37i9dQZF1DX76Wlfdnj7AP", category: "Workout" },
  { name: "Power Workout", id: "37i9dQZF1DXe6bgV3TmZOL", category: "Workout" },

  // Country and folk
  { name: "Hot Country", id: "37i9dQZF1DX1lVhptIYRda", category: "Country" },
  { name: "Country Coffeehouse", id: "37i9dQZF1DX6ziVCJnEm59", category: "Country" },
  { name: "Folk & Friends", id: "37i9dQZF1DXaUDcU6KDCj4", category: "Folk" },

  // K-pop and anime
  { name: "K-Pop ON!", id: "37i9dQZF1DX9tPFwDMOaN1", category: "K-Pop" },
  { name: "K-Pop Daebak", id: "37i9dQZF1DXe5W6diBL5N4", category: "K-Pop" },
  { name: "Anime Hits", id: "37i9dQZF1DX6XceWZP1D6P", category: "Anime" },

  // Indian and regional
  { name: "Hot Hits Hindi", id: "37i9dQZF1DX0XUfTFmNBRM", category: "Hindi" },
  { name: "Punjabi 101", id: "37i9dQZF1DWZNJXX2UeBij", category: "Punjabi" },
  { name: "Indie India", id: "37i9dQZF1DXd8cOUrf8y9A", category: "Indian Indie" },
  { name: "Desi Hits", id: "37i9dQZF1DX2yvmlOdMYzV", category: "Indian Pop" }

  // More pop, chart hits and new music
  { name: "Pop Hits", id: "37i9dQZF1DX5gQonLbZD9s", category: "Pop" },
  { name: "Pop Up", id: "37i9dQZF1DWUa8ZRTfalHk", category: "Pop" },
  { name: "Teen Beats", id: "37i9dQZF1DX9tPFwDMOaN1", category: "Pop" },
  { name: "Pop Remix", id: "37i9dQZF1DXcZDD7cfEKhW", category: "Pop" },
  { name: "Today's Top Hits: The Best of Pop", id: "37i9dQZF1DXcBWIGoYBM5M", category: "Pop" },
  { name: "Pop Sauce", id: "37i9dQZF1DX2A29LI7xHn1", category: "Pop" },
  { name: "Hot Hits UK", id: "37i9dQZF1DXaW8fzPh9b08", category: "Pop" },
  { name: "Hot Hits Canada", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Pop" },
  { name: "New Music Friday UK", id: "37i9dQZF1DX4JAvHpjipBk", category: "New Releases" },
  { name: "New Music Friday India", id: "37i9dQZF1DXd8cOUrf8y9A", category: "New Releases" },
  { name: "Just Good Music", id: "37i9dQZF1DX0XUsuxWHRQd", category: "Pop" },
  { name: "Pop All Day", id: "37i9dQZF1DWSf2RDTDayIx", category: "Pop" },

  // Decades, classics and sing-alongs
  { name: "All Out 80s", id: "37i9dQZF1DX4o1oenSJRJd", category: "Throwbacks" },
  { name: "All Out 70s", id: "37i9dQZF1DWTJ7xPn4vNaz", category: "Throwbacks" },
  { name: "All Out 60s", id: "37i9dQZF1DXaKIA8E7WcJj", category: "Throwbacks" },
  { name: "Rock Anthems", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
  { name: "Classic Road Trip Songs", id: "37i9dQZF1DX2A29LI7xHn1", category: "Throwbacks" },
  { name: "Feel-Good Classics", id: "37i9dQZF1DXdPec7aLTmlC", category: "Throwbacks" },
  { name: "Sing-Along Classics", id: "37i9dQZF1DX2RxBh64BHjQ", category: "Throwbacks" },
  { name: "Timeless Love Songs", id: "37i9dQZF1DX50QitC6Oqtn", category: "Love Songs" },
  { name: "Classic Hits", id: "37i9dQZF1DXbTxeAdrVG2l", category: "Classics" },
  { name: "Golden Oldies", id: "37i9dQZF1DX4o1oenSJRJd", category: "Classics" },

  // More moods and daily listening
  { name: "Have a Great Day!", id: "37i9dQZF1DXdPec7aLTmlC", category: "Mood" },
  { name: "Feel Good Friday", id: "37i9dQZF1DX3rxVfibe1L0", category: "Mood" },
  { name: "Life Sucks", id: "37i9dQZF1DX3YSRoSdA634", category: "Mood" },
  { name: "Confidence Boost", id: "37i9dQZF1DX4fpCwaHOned", category: "Mood" },
  { name: "Songs to Sing in the Car", id: "37i9dQZF1DX2RxBh64BHjQ", category: "Mood" },
  { name: "Happy Folk", id: "37i9dQZF1DXdxcBWuJkbcy", category: "Mood" },
  { name: "Feel-Good Indie Rock", id: "37i9dQZF1DX2sUQwD7tbmL", category: "Indie" },
  { name: "Chillout Lounge", id: "37i9dQZF1DWTvNyxOwkztu", category: "Chill" },
  { name: "Chill Tracks", id: "37i9dQZF1DX4WYpdgoIcn6", category: "Chill" },
  { name: "Lazy Sunday", id: "37i9dQZF1DX889U0CL85jj", category: "Chill" },
  { name: "Sunday Morning", id: "37i9dQZF1DX6VdMW310YC7", category: "Chill" },
  { name: "Coffee Table Jazz", id: "37i9dQZF1DXdwTU breaks", category: "Jazz" },

  // More hip-hop, rap and R&B
  { name: "I Love My '90s Hip-Hop", id: "37i9dQZF1DX186v583rmzp", category: "Hip-Hop" },
  { name: "Gold School", id: "37i9dQZF1DWY4xHQp97gI", category: "Hip-Hop" },
  { name: "Signed XOXO", id: "37i9dQZF1DX2A29LI7xHn1", category: "Hip-Hop" },
  { name: "Pollen", id: "37i9dQZF1DWWBHeathukWb", category: "Hip-Hop" },
  { name: "Alternative Hip-Hop", id: "37i9dQZF1DX9oh43oAzkyx", category: "Hip-Hop" },
  { name: "R&B Mix", id: "37i9dQZF1DX4SBhb3fqCJd", category: "R&B" },
  { name: "Chilled R&B", id: "37i9dQZF1DX2UgsUIg75Vg", category: "R&B" },
  { name: "R&B Right Now", id: "37i9dQZF1DX4SBhb3fqCJd", category: "R&B" },
  { name: "Latin Pop Hits", id: "37i9dQZF1DX10zKzsJ2jva", category: "Latin" },
  { name: "Reggaeton Hits", id: "37i9dQZF1DWWvvyNmW9V9a", category: "Latin" },

  // More rock, metal, punk and alternative
  { name: "Punk Unplugged", id: "37i9dQZF1DX3MU5XUozve7", category: "Alternative" },
  { name: "Classic Punk", id: "37i9dQZF1DXa9wYJr1oMFq", category: "Punk" },
  { name: "Metal Essentials", id: "37i9dQZF1DWWOaP4H0w5b0", category: "Metal" },
  { name: "Hard Rock", id: "37i9dQZF1DX1tyCD9QhIWF", category: "Rock" },
  { name: "Indie Rock Hits", id: "37i9dQZF1DX2sUQwD7tbmL", category: "Indie" },
  { name: "Indie Folk", id: "37i9dQZF1DXaUDcU6KDCj4", category: "Indie" },
  { name: "Dreamy Indie", id: "37i9dQZF1DX2sUQwD7tbmL", category: "Indie" },
  { name: "Alternative Hits", id: "37i9dQZF1DX3MU5XUozve7", category: "Alternative" },
  { name: "Classic Rock", id: "37i9dQZF1DWXRqgorJj26U", category: "Rock" },
  { name: "Grunge Forever", id: "37i9dQZF1DXbTxeAdrVG2l", category: "Rock" },

  // Electronic, house, techno and EDM
  { name: "Electronic Rising", id: "37i9dQZF1DX8tZsk68len7", category: "Electronic" },
  { name: "Dance Rising", id: "37i9dQZF1DXaXB8fQg7xif", category: "Dance" },
  { name: "Electro Mix", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Electronic" },
  { name: "Deep House Relax", id: "37i9dQZF1DX2TRYkJECvfC", category: "House" },
  { name: "Deep House", id: "37i9dQZF1DX2TRYkJECvfC", category: "House" },
  { name: "Trance Mission", id: "37i9dQZF1DX6J5NfMJS675", category: "Trance" },
  { name: "Bass Arcade", id: "37i9dQZF1DXaXB8fQg7xif", category: "EDM" },
  { name: "EDM Gaming", id: "37i9dQZF1DX4eRPd9frC1m", category: "EDM" },
  { name: "Night Rider", id: "37i9dQZF1DX6GwdWRQMQpq", category: "Electronic" },
  { name: "Dance Classics", id: "37i9dQZF1DXaXB8fQg7xif", category: "Dance" },

  // Focus, sleep, meditation and ambient
  { name: "Sleep", id: "37i9dQZF1DWZd79rJ6a7lp", category: "Sleep" },
  { name: "Sleepy Piano", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Sleep" },
  { name: "Ambient Relaxation", id: "37i9dQZF1DX3Ogo9pFvBkY", category: "Ambient" },
  { name: "Music for Concentration", id: "37i9dQZF1DWZeKCadgRdKQ", category: "Focus" },
  { name: "Reading Soundtrack", id: "37i9dQZF1DX9sIqqvKsjG8", category: "Focus" },
  { name: "Calm Vibes", id: "37i9dQZF1DX4WYpdgoIcn6", category: "Relaxation" },
  { name: "Nature Sounds", id: "37i9dQZF1DX4PP3DA4J0N8", category: "Ambient" },
  { name: "White Noise", id: "37i9dQZF1DWUZ5bk6qqDSy", category: "Sleep" },
  { name: "Rain Sounds", id: "37i9dQZF1DWYcDQ1h Sjg2", category: "Sleep" },
  { name: "Classical Focus", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Classical" },

  // More jazz, blues, classical and acoustic
  { name: "Jazz in the Background", id: "37i9dQZF1DX0SM0LYsmbMT", category: "Jazz" },
  { name: "Smooth Jazz", id: "37i9dQZF1DXbITWG1ZJKYt", category: "Jazz" },
  { name: "Blues Classics", id: "37i9dQZF1DXbkKnGZHv1kf", category: "Blues" },
  { name: "Acoustic Covers", id: "37i9dQZF1DX4E3UdUs7fUx", category: "Acoustic" },
  { name: "Acoustic Hits", id: "37i9dQZF1DX0SM0LYsmbMT", category: "Acoustic" },
  { name: "Classical Moments", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Classical" },
  { name: "Opera Classics", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Classical" },
  { name: "Piano in the Background", id: "37i9dQZF1DX4sWSpwq3LiO", category: "Piano" },
  { name: "Guitar Chill", id: "37i9dQZF1DX4E3UdUs7fUx", category: "Acoustic" },
  { name: "Instrumental Hits", id: "37i9dQZF1DX9sIqqvKsjG8", category: "Instrumental" },

  // Workout, running and high-energy music
  { name: "Cardio", id: "37i9dQZF1DXaXB8fQg7xif", category: "Workout" },
  { name: "Running Hits", id: "37i9dQZF1DWSJHnPb1f0X3", category: "Workout" },
  { name: "Motivation Mix", id: "37i9dQZF1DX76Wlfdnj7AP", category: "Workout" },
  { name: "Power Hour", id: "37i9dQZF1DXe6bgV3TmZOL", category: "Workout" },
  { name: "Gym Hits", id: "37i9dQZF1DX76Wlfdnj7AP", category: "Workout" },
  { name: "Workout Twerkout", id: "37i9dQZF1DX0XUsuxWHRQd", category: "Workout" },

  // Country, folk, singer-songwriter and Americana
  { name: "Country Hits", id: "37i9dQZF1DX1lVhptIYRda", category: "Country" },
  { name: "New Boots", id: "37i9dQZF1DX8S0uQvJ4gaa", category: "Country" },
  { name: "Country Rock", id: "37i9dQZF1DX6ziVCJnEm59", category: "Country" },
  { name: "Acoustic Morning", id: "37i9dQZF1DX4E3UdUs7fUx", category: "Acoustic" },
  { name: "Singer-Songwriter", id: "37i9dQZF1DXaUDcU6KDCj4", category: "Folk" },
  { name: "Folk Pop", id: "37i9dQZF1DXdxcBWuJkbcy", category: "Folk" },

  // Global, K-pop, J-pop and soundtracks
  { name: "K-Pop Hits", id: "37i9dQZF1DX9tPFwDMOaN1", category: "K-Pop" },
  { name: "K-Pop Rising", id: "37i9dQZF1DXe5W6diBL5N4", category: "K-Pop" },
  { name: "J-Pop Hits", id: "37i9dQZF1DXdRLa2gxBNsq", category: "J-Pop" },
  { name: "Anime Soundtracks", id: "37i9dQZF1DX6XceWZP1D6P", category: "Anime" },
  { name: "Disney Hits", id: "37i9dQZF1DX0b1hHYQtJjp", category: "Soundtracks" },
  { name: "Movie Soundtracks", id: "37i9dQZF1DX2SK4ytI2KAZ", category: "Soundtracks" },
  { name: "Video Game Soundtracks", id: "37i9dQZF1DXdfOjy3aUGV4", category: "Soundtracks" },

  // More Indian music and regional discovery
  { name: "Bollywood Butter", id: "37i9dQZF1DX0XUfTFmNBRM", category: "Bollywood" },
  { name: "Bollywood Dance Music", id: "37i9dQZF1DX0XUfTFmNBRM", category: "Bollywood" },
  { name: "Bollywood Romance", id: "37i9dQZF1DXcZDD7cfEKhW", category: "Bollywood" },
  { name: "Punjabi Hits", id: "37i9dQZF1DWZNJXX2UeBij", category: "Punjabi" },
  { name: "Punjabi Pop", id: "37i9dQZF1DWZNJXX2UeBij", category: "Punjabi" },
  { name: "Indie India Rising", id: "37i9dQZF1DXd8cOUrf8y9A", category: "Indian Indie" },
  { name: "Tamil Hits", id: "37i9dQZF1DX4TnpT6vw5rE", category: "Tamil" },
  { name: "Telugu Hits", id: "37i9dQZF1DX6XE7HRLM75P", category: "Telugu" },
  { name: "Malayalam Hits", id: "37i9dQZF1DX7ZUug1ANKRP", category: "Malayalam" },
  { name: "Indian Classical", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Indian Classical" },
  { name: "Desi Hip-Hop", id: "37i9dQZF1DX2yvmlOdMYzV", category: "Desi Hip-Hop" },
  { name: "Bhangra Hits", id: "37i9dQZF1DWZNJXX2UeBij", category: "Punjabi" },
  { name: "Hindi Chill", id: "37i9dQZF1DX0XUfTFmNBRM", category: "Hindi" },
  { name: "Indian Lofi", id: "37i9dQZF1DX8Uebhn9wzrS", category: "Indian Lo-fi" },

  // More Latin, African, reggae and world music
  { name: "African Heat", id: "37i9dQZF1DWVA1Gq4XHa6U", category: "Afrobeats" },
  { name: "Afro Hits", id: "37i9dQZF1DWVA1Gq4XHa6U", category: "Afrobeats" },
  { name: "Dancehall Official", id: "37i9dQZF1DXbSbnqxMTGx9", category: "Reggae" },
  { name: "Reggae Classics", id: "37i9dQZF1DXbSbnqxMTGx9", category: "Reggae" },
  { name: "Global Groove", id: "37i9dQZF1DWYka Dif7Ztb", category: "World" },
  { name: "Brazilian Hits", id: "37i9dQZF1DX5Ejj0EkURtP", category: "World" },
  { name: "French Hits", id: "37i9dQZF1DXaXB8fQg7xif", category: "World" },
  { name: "German Hits", id: "37i9dQZF1DXbTxeAdrVG2l", category: "World" },
  { name: "Arabic Hits", id: "37i9dQZF1DX7gIoKXt0gmx", category: "World" },
  { name: "Turkish Hits", id: "37i9dQZF1DX7gIoKXt0gmx", category: "World" }

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