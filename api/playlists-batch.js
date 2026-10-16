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
  { name: "Desi Hits", id: "37i9dQZF1DX2yvmlOdMYzV", category: "Indian Pop" },

  // More pop, chart hits and new music
  { name: "Pop Hits", id: "37i9dQZF1DX5gQonLbZD9s", category: "Pop" },
  { name: "Pop Remix", id: "37i9dQZF1DXcZDD7cfEKhW", category: "Pop" },
  { name: "Hot Hits UK", id: "37i9dQZF1DXaW8fzPh9b08", category: "Pop" },

  // Decades, classics and sing-alongs
  { name: "All Out 80s", id: "37i9dQZF1DX4o1oenSJRJd", category: "Throwbacks" },
  { name: "All Out 70s", id: "37i9dQZF1DWTJ7xPn4vNaz", category: "Throwbacks" },
  { name: "All Out 60s", id: "37i9dQZF1DXaKIA8E7WcJj", category: "Throwbacks" },
  { name: "Timeless Love Songs", id: "37i9dQZF1DX50QitC6Oqtn", category: "Love Songs" },

  // More moods and daily listening
  { name: "Life Sucks", id: "37i9dQZF1DX3YSRoSdA634", category: "Mood" },
  { name: "Confidence Boost", id: "37i9dQZF1DX4fpCwaHOned", category: "Mood" },
  { name: "Happy Folk", id: "37i9dQZF1DXdxcBWuJkbcy", category: "Mood" },
  { name: "Feel-Good Indie Rock", id: "37i9dQZF1DX2sUQwD7tbmL", category: "Indie" },
  { name: "Chillout Lounge", id: "37i9dQZF1DWTvNyxOwkztu", category: "Chill" },
  { name: "Lazy Sunday", id: "37i9dQZF1DX889U0CL85jj", category: "Chill" },
  { name: "Sunday Morning", id: "37i9dQZF1DX6VdMW310YC7", category: "Chill" },

  // More hip-hop, rap and R&B
  { name: "I Love My '90s Hip-Hop", id: "37i9dQZF1DX186v583rmzp", category: "Hip-Hop" },
  { name: "Pollen", id: "37i9dQZF1DWWBHeathukWb", category: "Hip-Hop" },
  { name: "Alternative Hip-Hop", id: "37i9dQZF1DX9oh43oAzkyx", category: "Hip-Hop" },

  // More rock, metal, punk and alternative
  { name: "Classic Punk", id: "37i9dQZF1DXa9wYJr1oMFq", category: "Punk" },
  { name: "Metal Essentials", id: "37i9dQZF1DWWOaP4H0w5b0", category: "Metal" },
  { name: "Hard Rock", id: "37i9dQZF1DX1tyCD9QhIWF", category: "Rock" },

  // Electronic, house, techno and EDM
  { name: "Electronic Rising", id: "37i9dQZF1DX8tZsk68len7", category: "Electronic" },
  { name: "Deep House Relax", id: "37i9dQZF1DX2TRYkJECvfC", category: "House" },
  { name: "EDM Gaming", id: "37i9dQZF1DX4eRPd9frC1m", category: "EDM" },
  { name: "Night Rider", id: "37i9dQZF1DX6GwdWRQMQpq", category: "Electronic" },

  // Focus, sleep, meditation and ambient
  { name: "Ambient Relaxation", id: "37i9dQZF1DX3Ogo9pFvBkY", category: "Ambient" },
  { name: "Nature Sounds", id: "37i9dQZF1DX4PP3DA4J0N8", category: "Ambient" },
  { name: "White Noise", id: "37i9dQZF1DWUZ5bk6qqDSy", category: "Sleep" },

  // More jazz, blues, classical and acoustic
  { name: "Blues Classics", id: "37i9dQZF1DXbkKnGZHv1kf", category: "Blues" },

  // Workout, running and high-energy music
  { name: "Running Hits", id: "37i9dQZF1DWSJHnPb1f0X3", category: "Workout" },

  // Country, folk, singer-songwriter and Americana
  { name: "New Boots", id: "37i9dQZF1DX8S0uQvJ4gaa", category: "Country" },

  // Global, K-pop, J-pop and soundtracks
  { name: "J-Pop Hits", id: "37i9dQZF1DXdRLa2gxBNsq", category: "J-Pop" },
  { name: "Disney Hits", id: "37i9dQZF1DX0b1hHYQtJjp", category: "Soundtracks" },
  { name: "Movie Soundtracks", id: "37i9dQZF1DX2SK4ytI2KAZ", category: "Soundtracks" },
  { name: "Video Game Soundtracks", id: "37i9dQZF1DXdfOjy3aUGV4", category: "Soundtracks" },

  // More Indian music and regional discovery
  { name: "Tamil Hits", id: "37i9dQZF1DX4TnpT6vw5rE", category: "Tamil" },
  { name: "Telugu Hits", id: "37i9dQZF1DX6XE7HRLM75P", category: "Telugu" },
  { name: "Malayalam Hits", id: "37i9dQZF1DX7ZUug1ANKRP", category: "Malayalam" },

  // More Latin, African, reggae and world music
  { name: "African Heat", id: "37i9dQZF1DWVA1Gq4XHa6U", category: "Afrobeats" },
  { name: "Dancehall Official", id: "37i9dQZF1DXbSbnqxMTGx9", category: "Reggae" },
  { name: "Arabic Hits", id: "37i9dQZF1DX7gIoKXt0gmx", category: "World" },

  // Expanded discovery catalogue — grouped by genre and listening mood
  { name: "Bollywood Araby", id: "37i9dQZF1DX7cLxqtNO3zl", category: "Hindi" },
  { name: "Punjabi Pop", id: "37i9dQZF1DX5baCFRgbF3x", category: "Punjabi" },
  { name: "Punjabi Hits", id: "37i9dQZF1DX8CopunbDxgW", category: "Punjabi" },
  { name: "Bollywood Dance Music", id: "37i9dQZF1DX1i3vMfx5f9B", category: "Hindi" },
  { name: "Hindi Indie", id: "37i9dQZF1DX8xfQRRX1PDm", category: "Indian Indie" },
  { name: "Top 50 - Canada", id: "37i9dQZEVXbKj23U1GF4IR", category: "Charts" },
  { name: "Top 50 - UK", id: "37i9dQZEVXbLnOLQzK4d5R", category: "Charts" },
  { name: "Top 50 - Australia", id: "37i9dQZEVXbJPdE3gV6h6", category: "Charts" },
  { name: "Top 50 - Japan", id: "37i9dQZEVXbKCF6dqvpFcO", category: "Charts" },
  { name: "Top 50 - Brazil", id: "37i9dQZEVXbMXbN3EUUhlg", category: "Charts" },
  { name: "Top 50 - Germany", id: "37i9dQZEVXbJiZcmkrIHGU", category: "Charts" },
  { name: "Top 50 - France", id: "37i9dQZEVXbIPWwFssbupI", category: "Charts" },
  { name: "Top 50 - Spain", id: "37i9dQZEVXbNFJfN1Vw8d9", category: "Charts" },
  { name: "Top 50 - Mexico", id: "37i9dQZEVXbO3qyFxbkOE1", category: "Charts" },
  { name: "Top 50 - South Korea", id: "37i9dQZEVXbJZGli0rRP3r", category: "Charts" },
  { name: "Viral 50 - India", id: "37i9dQZEVXbK4fwx2r07XW", category: "Charts" },
  { name: "Viral 50 - UK", id: "37i9dQZEVXbL3J0k32lWnN", category: "Charts" },
  { name: "Viral 50 - Brazil", id: "37i9dQZEVXbKuaTI1Z1Afx", category: "Charts" },
  { name: "Viral 50 - Japan", id: "37i9dQZEVXbKqiTGXxwO0M", category: "Charts" },
  { name: "Pop Right Now", id: "37i9dQZF1DXa2PvUpywmrr", category: "Pop" },
  { name: "Teen Beats", id: "37i9dQZF1DX5hR0J49CmXC", category: "Pop" },
  { name: "Pop Up", id: "37i9dQZF1DX2L0iB23Enbq", category: "Pop" },
  { name: "Feelgood Pop", id: "37i9dQZF1DWYBO1MoTDhZI", category: "Pop" },
  { name: "Indie Pop & Chill", id: "37i9dQZF1DX2Nc3B70tvx0", category: "Indie" },
  { name: "Lorem", id: "37i9dQZF1DXdwmD5Q7Gxah", category: "Indie" },
  { name: "All New Rock", id: "37i9dQZF1DX3oM43CtKnRZ", category: "Rock" },
  { name: "Latin Pop", id: "37i9dQZF1DX1HUbZS4LEyL", category: "Latin" },
  { name: "K-Pop Rising", id: "37i9dQZF1DX4FcAKI5Nhzq", category: "K-Pop" },
  { name: "Jazz in the Background", id: "37i9dQZF1DWV7EzJMK2FUI", category: "Jazz" },
  { name: "State of Jazz", id: "37i9dQZF1DX7YCknf2jT6s", category: "Jazz" },
  { name: "Sad Songs", id: "37i9dQZF1DX7qK8ma5wgG1", category: "Mood" },

  // Additional user-requested Spotify playlist entries
  { name: "Top 50 - UK", id: "37i9dQZEVXbLnFsZApQnu", category: "Charts" },
  { name: "Top 50 - Canada", id: "37i9dQZEVXbKicjhOMoCJo", category: "Charts" },
  { name: "Top 50 - Australia", id: "37i9dQZEVXbJPcfkRzMrJB", category: "Charts" },
  { name: "Top 50 - Germany", id: "37i9dQZEVXbJiZivgRGUri", category: "Charts" },
  { name: "Top 50 - Japan", id: "37i9dQZEVXbKXQ4mDTEBXl", category: "Charts" },
  { name: "Top 50 - France", id: "37i9dQZEVXbIPWwFvVTMPI", category: "Charts" },
  { name: "Top 50 - Brazil", id: "37i9dQZEVXbMxPoCKJiSmv", category: "Charts" },
  { name: "Top 50 - Mexico", id: "37i9dQZEVXbO3qyFXkO1SQ", category: "Charts" },
  { name: "Top 50 - Spain", id: "37i9dQZEVXbNFJfN1Vq8d9", category: "Charts" },
  { name: "Top 50 - Italy", id: "37i9dQZEVXbIQnjwuBSPSc", category: "Charts" },
  { name: "Viral 50 - India", id: "37i9dQZEVXbLZ52XmnySJg", category: "Charts" },
  { name: "Teen Party", id: "37i9dQZF1DXa2PvUpywmrr", category: "Pop" },
  { name: "Superbloom", id: "37i9dQZF1DX6VDO8a6cQME", category: "Pop" },
  { name: "Future Hits", id: "37i9dQZF1DX1rVvEGq3abS", category: "Pop" },
  { name: "Pop Right Now", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Pop" },
  { name: "Bubblegum Pop", id: "37i9dQZF1DWV1Miwoj9w2G", category: "Pop" },
  { name: "Acoustic Pop", id: "37i9dQZF1DWWWnc8qT2gR2", category: "Pop" },
  { name: "Electro Pop", id: "37i9dQZF1DXbKGrOEgPzZ8", category: "Pop" },
  { name: "Pop Punk Powerhouses", id: "37i9dQZF1DXasneILLlM7X", category: "Pop" },
  { name: "Heartache", id: "37i9dQZF1DX1qHzZWzB2K3", category: "Mood" },
  { name: "Alone Again", id: "37i9dQZF1DXa1beGIYfL1x", category: "Mood" },
  { name: "Melancholia", id: "37i9dQZF1DWZqd5JICZI0u", category: "Mood" },
  { name: "Sad Indie", id: "37i9dQZF1DWZKXCkwZHh3u", category: "Mood" },
  { name: "Feelin' Good", id: "37i9dQZF1DX9XIFQuFvzM4", category: "Mood" },
  { name: "Dinner with Friends", id: "37i9dQZF1DX4OGAdqCBQy7", category: "Chill" },
  { name: "Coffee & Chill", id: "37i9dQZF1DX4wtaSt0KuOC", category: "Chill" },
  { name: "Late Night Vibes", id: "37i9dQZF1DXa2PvUpywmrr", category: "Chill" },
  { name: "Acoustic Morning", id: "37i9dQZF1DX4E3UdUs7fUx", category: "Acoustic" },
  { name: "Signed XOXO", id: "37i9dQZF1DX4jP4lkgIPgO", category: "R&B" },
  { name: "R&B UK", id: "37i9dQZF1DX0XUfTFmNBRM", category: "R&B" },
  { name: "Lovers Rock", id: "37i9dQZF1DXaWnHwdPtPlm", category: "Reggae" },
  { name: "Southern Playlistic", id: "37i9dQZF1DX5Ejj0EkURtP", category: "Hip-Hop" },
  { name: "Feelin' Myself", id: "37i9dQZF1DX6VDO8a6cQME", category: "Hip-Hop" },
  { name: "Mellow Bars", id: "37i9dQZF1DX3rxVfibe1L0", category: "Hip-Hop" },
  { name: "Hip-Hop Central", id: "37i9dQZF1DWY6tYEFs22tT", category: "Hip-Hop" },
  { name: "Get Turnt", id: "37i9dQZF1DWY4xHQp97COP", category: "Hip-Hop" },
  { name: "Gold School", id: "37i9dQZF1DWVA1Gq4XHa6U", category: "Hip-Hop" },
  { name: "West Coast Classics", id: "37i9dQZF1DWUFmyho2wkZl", category: "Hip-Hop" },
  { name: "R&B Right Now", id: "37i9dQZF1DWYmmr74INQCG", category: "R&B" },
  { name: "Soul Coffee", id: "37i9dQZF1DWXz3j4u8q0A6", category: "R&B" },
  { name: "Goth Rock", id: "37i9dQZF1DX2u70L5x9h75", category: "Rock" },
  { name: "Post-Grunge", id: "37i9dQZF1DX7Z36X8X4g4f", category: "Rock" },
  { name: "Garage Rock Revival", id: "37i9dQZF1DX1YnU6zXG4l1", category: "Rock" },
  { name: "Heavy Metal", id: "37i9dQZF1DX9qNsXf5giYW", category: "Metal" },
  { name: "Nu-Metal Generation", id: "37i9dQZF1DXcf6B6QPhFDv", category: "Rock" },
  { name: "90s Rock Renaissance", id: "37i9dQZF1DX8FwnYE6PRvL", category: "Rock" },
  { name: "Indie All Stars", id: "37i9dQZF1DWYmUcgAQZMCK", category: "Indie" },
  { name: "Modern Rock", id: "37i9dQZF1DWSqmBTGDYngZ", category: "Rock" },
  { name: "Punk Unplugged", id: "37i9dQZF1DX3LDIBRoaCDQ", category: "Punk" },
  { name: "Classical Reading", id: "37i9dQZF1DWWEJlAGA9gs0", category: "Classical" },
  { name: "Study Session", id: "37i9dQZF1DX8Uebhn9wzrS", category: "Focus" },
  { name: "Reading Chillout", id: "37i9dQZF1DWT7XSlvwvZX1", category: "Focus" },
  { name: "Rain Sounds", id: "37i9dQZF1DX8ymr6UES7vc", category: "Sleep" },
  { name: "Ocean Escapes", id: "37i9dQZF1DX4aYNO8X5RpR", category: "Sleep" },
  { name: "Binaural Beats", id: "37i9dQZF1DX7EF8wVxNOlN", category: "Focus" },
  { name: "Brain Food", id: "37i9dQZF1DWXLeA8Omikj7", category: "Focus" },
  { name: "Coffee Table Jazz", id: "37i9dQZF1DX4wtaSt0KuOC", category: "Jazz" },
  { name: "Workout Electro", id: "37i9dQZF1DWUVpAXiKJk8P", category: "Workout" },
  { name: "Trance Mission", id: "37i9dQZF1DX0hvPLiuumDs", category: "Electronic" },
  { name: "Bass Arcade", id: "37i9dQZF1DX4dyzvuaRJ0n", category: "Electronic" },
  { name: "Dance Pop", id: "37i9dQZF1DWZQaaqNMbbXa", category: "Dance" },
  { name: "Cardio", id: "37i9dQZF1DWSqN6A9I5N32", category: "Workout" },
  { name: "Hype", id: "37i9dQZF1DX4eRPd9frC1m", category: "Workout" },
  { name: "Bluegrass Covers", id: "37i9dQZF1DX03g0gEHYB4G", category: "Country" },
  { name: "Chilled Folk", id: "37i9dQZF1DX7Z36X8X4g4f", category: "Folk" },
  { name: "Americana", id: "37i9dQZF1DX1lVhptIYRda", category: "Country" },
  { name: "Roots Rising", id: "37i9dQZF1DWYV7OOaGhoH0", category: "Folk" },
  { name: "Texas Music Now", id: "37i9dQZF1DWX1rZ8x44z4J", category: "Country" },
  { name: "Country Kind of Love", id: "37i9dQZF1DX8S0uQvJ4gaa", category: "Country" },
  { name: "Wild Country", id: "37i9dQZF1DX6ziVCJnEm59", category: "Country" },
  { name: "K-Pop Fresh", id: "37i9dQZF1DX3oVMIW8k5o9", category: "K-Pop" },
  { name: "Anime Now", id: "37i9dQZF1DX8K7CEr5oE41", category: "Anime" },
  { name: "C-Pop Today", id: "37i9dQZF1DWWjGdmeTyeJ6", category: "C-Pop" },
  { name: "K-Pop Rising", id: "37i9dQZF1DX4RDXswvP6Mj", category: "K-Pop" },
  { name: "J-Rock Now", id: "37i9dQZF1DX7M4N8mEwK5j", category: "J-Pop" },
  { name: "Anime Chill", id: "37i9dQZF1DWUvQoIOFMFUT", category: "Anime" },
  { name: "Punjabi Viral Hits", id: "37i9dQZF1DX4o1oenSJRJd", category: "Punjabi" },
  { name: "Marathi Hitlist", id: "37i9dQZF1DX4wtaSt0KuOC", category: "Marathi" },
  { name: "Kannada Hits", id: "37i9dQZF1DXdbXrPNAFw7B", category: "Kannada" },
  { name: "Bengali Hits", id: "37i9dQZF1DWWOaP4H0w5b0", category: "Bengali" },
  { name: "Bhojpuri Hits", id: "37i9dQZF1DWY6tYEFs22tT", category: "Bhojpuri" },
  { name: "Gujarati Hits", id: "37i9dQZF1DX1qHzZWzB2K3", category: "Gujarati" },
  { name: "Bollywood Mush", id: "37i9dQZF1DX5cO1uP1xC1g", category: "Hindi" },
  { name: "Bollywood Retro", id: "37i9dQZF1DX10zKzsJ2jva", category: "Hindi" },
  { name: "Kollywood Classics", id: "37i9dQZF1DWV1Miwoj9w2G", category: "Tamil" },
  { name: "All Out 50s", id: "37i9dQZF1DWSV3Tk4GO2fq", category: "Throwbacks" },
  { name: "Classic Soul", id: "37i9dQZF1DXa9wYJr1oMFq", category: "Throwbacks" },
  { name: "Disco Ball", id: "37i9dQZF1DX2SK4ytI2KAZ", category: "Throwbacks" },
  { name: "Golden Age of Rock", id: "37i9dQZF1DWXRqgorJj26U", category: "Throwbacks" },
  { name: "70s Road Trip", id: "37i9dQZF1DWX1rZ8x44z4J", category: "Throwbacks" },
  { name: "80s Hard Rock", id: "37i9dQZF1DX1tyCD9QhIWF", category: "Rock" },
  { name: "90s Acoustic", id: "37i9dQZF1DWWWnc8qT2gR2", category: "Throwbacks" },
  { name: "Nu-Blue", id: "37i9dQZF1DX1YnU6zXG4l1", category: "Blues" },
  { name: "Epic Gaming", id: "37i9dQZF1DWTyiBJ6yEqeu", category: "Gaming" },
  { name: "Afro Pop", id: "37i9dQZF1DWYkaDif7ZOSi", category: "Afrobeats" },
  { name: "Reggae Classics", id: "37i9dQZF1DXbSbnqxMTGx9", category: "Reggae" },
  { name: "Soca Gold", id: "37i9dQZF1DXbSbnqxMTGx9", category: "World" },
  { name: "Flamenco Nuevo", id: "37i9dQZF1DX10zKzsJ2jva", category: "World" },
  { name: "Celtic Folk", id: "37i9dQZF1DXaUDcU6KDCj4", category: "World" },
  { name: "ASMR Sleep", id: "37i9dQZF1DWZqd5JICZI0u", category: "Sleep" },


  // Expanded Indian languages and regional listening (public Spotify playlists)
  { name: "Tamil Party Time", id: "37i9dQZF1DX0nA91dV2ts4", category: "Tamil" },
  { name: "Latest Tamil", id: "37i9dQZF1DWVo4cdnikh7Z", category: "Tamil" },
  { name: "Trending Now Malayalam", id: "37i9dQZF1DWTYKFynxp6Fs", category: "Malayalam" },
  { name: "Kannada Romance", id: "37i9dQZF1DX2MvScOHAAiE", category: "Kannada" },
  { name: "Latest Kannada", id: "37i9dQZF1DWZqTcNLmb3sH", category: "Kannada" },
  { name: "Latest Marathi Hits", id: "37i9dQZF1DWZBIyOatufxH", category: "Marathi" },
  { name: "Hindi Songs", id: "6oE7P6Q0vYsX2xIPMTDfqP", category: "Hindi" },
  { name: "Gujarati Hits", id: "0ahtofkR9qHdctnA56ash7", category: "Gujarati" },
  { name: "Bhojpuri Trending Songs", id: "6mRu9KRG1Y2LpXszuIjQ7s", category: "Bhojpuri" },
  { name: "The Sound of Dogri Pop", id: "6x6aopCKJ8xO5h7xzJbiDm", category: "Dogri" },
  { name: "The Sound of Haryanvi Ragni", id: "5fr1qPUgDNqwwwOwUKegyP", category: "Haryanvi" },
  { name: "Hindi Hip-Hop Love Songs", id: "6CxAB47esWccuMWS09j4Lt", category: "Hindi Hip-Hop" },
  { name: "Best Sufi Hits Forever", id: "1jFomOoskG76itsOtGgzbB", category: "Sufi" },
  { name: "North Indian Songs", id: "1f28fappEoEVlJyi6SiPq9", category: "North Indian" },
  { name: "South Indian Item Songs", id: "6dUrhh3W6WosOsOIuPBzu1", category: "South Indian" },
  { name: "Latest Tamil Songs 2026", id: "1vZxz6UScNNl97iwwlHxys", category: "Tamil" },
  { name: "Trending Tamil Songs", id: "04wyLWYsskgWjn9827AQj3", category: "Tamil" },
  { name: "Kannada Movie Hits", id: "7H31ger4pLbHIL2Z4PNxQW", category: "Kannada" },
  { name: "Hindi Romantic Hits", id: "4JVk61MtUyKIOsohhhsDGs", category: "Hindi Romance" },
  { name: "New Hindi Releases", id: "7ic89UJhz04rYuhNXjEzvK", category: "Hindi New Releases" },
  { name: "Hindi Heartbreak & Love", id: "41dDxS8ZaI31Rnuj1jvRta", category: "Hindi Romance" },
  { name: "Indian Sufi and Urdu Hits", id: "1jFomOoskG76itsOtGgzbB", category: "Sufi" },

];

function proxyArtwork(value) {
  if (typeof value !== "string" || !value) return null;
  try {
    const parsed = new URL(value);
    const approvedHosts = new Set(["i.scdn.co", "image-cdn-fa.spotifycdn.com", "image-cdn-ak.spotifycdn.com"]);
    if (parsed.protocol !== "https:" || !approvedHosts.has(parsed.hostname)) return null;
    return "https://jammify-data-api.vercel.app/api/image?url=" + encodeURIComponent(value);
  } catch {
    return null;
  }
}


async function fetchPublicPageMetadata(playlistUrl) {
  try {
    const response = await fetch(playlistUrl, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
        "User-Agent": "Mozilla/5.0 (compatible; RESONATEPlaylistMetadata/1.0)"
      },
      signal: AbortSignal.timeout(5000)
    });
    if (!response.ok) return null;
    const html = await response.text();
    const meta = (key) => {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\
module.exports = async function handler");
      const patterns = [
        new RegExp('<meta[^>]+property=["\\']' + escaped + '["\\'][^>]+content=["\\']([^"\\']+)["\\']', "i"),
        new RegExp('<meta[^>]+content=["\\']([^"\\']+)["\\'][^>]+property=["\\']' + escaped + '["\\']', "i"),
        new RegExp('<meta[^>]+name=["\\']' + escaped + '["\\'][^>]+content=["\\']([^"\\']+)["\\']', "i"),
      ];
      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match?.[1]) return match[1].replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
      }
      return "";
    };
    return {
      title: meta("og:title") || meta("twitter:title"),
      image: meta("og:image") || meta("twitter:image")
    };
  } catch {
    return null;
  }
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  // Keep the fan-out bounded so a large catalogue does not overwhelm the
  // serverless function or Spotify's public oEmbed endpoint.
  // De-duplicate IDs before requests. Spotify's public title is authoritative;
  // the hardcoded name is only a fallback if Spotify doesn't return one.
  const catalogue = [...new Map(PLAYLISTS.map(item => [item.id, item])).values()];
  const results = new Array(catalogue.length);
  let nextIndex = 0;
  const workerCount = Math.min(12, catalogue.length);

  async function worker() {
    while (true) {
      const index = nextIndex++;
      if (index >= catalogue.length) return;
      const playlist = catalogue[index];
      const playlistUrl = "https://open.spotify.com/playlist/" + playlist.id;
      try {
        const endpoint = new URL("https://open.spotify.com/oembed");
        endpoint.searchParams.set("url", playlistUrl);
        const response = await fetch(endpoint, {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(4500)
        });
        const body = await response.text();
        let data;
        try {
          data = JSON.parse(body);
        } catch {
          results[index] = { ...playlist, ok: false, status: response.status, error: "Non-JSON response" };
          continue;
        }
        if (!response.ok) {
          const page = await fetchPublicPageMetadata(playlistUrl);
          const pageImage = proxyArtwork(page?.image || "");
          if (pageImage) {
            results[index] = {
              ...playlist,
              ok: true,
              title: page?.title || playlist.name,
              thumbnail_url: pageImage,
              original_thumbnail_url: page?.image || null,
              embed_url: "https://open.spotify.com/embed/playlist/" + playlist.id,
              playlist_url: playlistUrl,
              source: "spotify-public-page-metadata"
            };
          } else {
            results[index] = {
              ...playlist,
              ok: false,
              status: response.status,
              error: data.error || data.message || "No public playlist artwork found"
            };
          }
          continue;
        }
        let originalThumbnail = data.thumbnail_url || "";
        let playlistTitle = data.title || playlist.name;
        let artwork = proxyArtwork(originalThumbnail);
        if (!artwork) {
          const page = await fetchPublicPageMetadata(playlistUrl);
          if (page?.title) playlistTitle = page.title;
          if (page?.image) {
            originalThumbnail = page.image;
            artwork = proxyArtwork(page.image);
          }
        }
        results[index] = {
          ...playlist,
          ok: true,
          title: playlistTitle,
          thumbnail_url: artwork || null,
          original_thumbnail_url: originalThumbnail || null,
          embed_url: data.iframe_url || "https://open.spotify.com/embed/playlist/" + playlist.id,
          playlist_url: playlistUrl,
          source: artwork && originalThumbnail !== data.thumbnail_url ? "spotify-public-page-metadata" : "spotify-public-oembed"
        };
      } catch (error) {
        results[index] = { ...playlist, ok: false, error: error?.message || "Request failed" };
      }
    }
  }

  await Promise.all(Array.from({ length: workerCount }, () => worker()));

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  return res.status(200).json({
    ok: results.some((item) => item && item.ok),
    total: results.length,
    catalogued: PLAYLISTS.length,
    successful: results.filter((item) => item && item.ok).length,
    failed: results.filter((item) => !item || !item.ok).length,
    results
  });
};

// Expose the catalogue for the category-specific API handlers.
module.exports.PLAYLISTS = PLAYLISTS;
