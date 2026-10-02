/* Rare — content data model.
   Anyone contributing adds an entry here (or sends it in via the Submit form).
   type:    "photo" | "video" | "note"
   category: one of the six real categories (Recent is derived automatically)
   addedHoursAgo: hours since it was published — drives the "Recent (24h)" view
   starred:  editor's pick (used by the "Starred" filter)
   popularity: a view-style score (used by the "Popularity" filter)
   searches: how often it is looked up (used by the "Most searched" filter)
*/
window.RARE_SITE = {
  brand: "Rare",
  tagline: "A community archive of rare photos, videos and notes.",
  email: "samratbarman1013@gmail.com",
  whatsapp: "+91 9933025348",
  whatsappLink: "https://wa.me/919933025348",
  formspree: "https://formspree.io/f/YOUR_FORM_ID"
};

window.RARE_CATEGORIES = [
  { key: "History",  blurb: "Rare historical photographs, documents and moments rescued from the archive." },
  { key: "Gaming",   blurb: "Prototypes, cut content, beta builds and lost levels from gaming history." },
  { key: "Recent",   blurb: "Everything added to Rare in the last 24 hours — fresh finds, newest first." },
  { key: "News",     blurb: "Curious, overlooked and remarkable news finds worth keeping." },
  { key: "Music",    blurb: "Lost demos, unheard recordings, handwritten lyrics and rare pressings." },
  { key: "Movie",    blurb: "Deleted scenes, concept art, original posters and behind-the-camera rarities." },
  { key: "Planned",  blurb: "What the community is planning to collect, restore and publish next." }
];

window.RARE_ITEMS = [
  /* ---------------- History ---------------- */
  { id: "first-photograph", title: "The First Surviving Photograph (1826)", type: "photo", category: "History",
    addedHoursAgo: 720, starred: true, popularity: 4200, searches: 610, place: "France", source: "Community archive",
    summary: "Nicéphore Niépce's heliograph — the earliest known photograph that survives to this day.",
    body: "Taken from an upstairs window, this view of a courtyard is the oldest surviving photograph made with a camera. The exposure is believed to have lasted around eight hours, which is why the light falls on both sides of the buildings." },
  { id: "lost-city-map", title: "Rare Map of a Vanished City", type: "photo", category: "History",
    addedHoursAgo: 340, starred: false, popularity: 1800, searches: 240, place: "Unknown", source: "Private collection",
    summary: "A hand-inked street plan of a settlement that no longer appears on modern maps.",
    body: "Drawn by an unnamed surveyor, the map shows streets, wells and a market square that vanished after a flood. Historians compare it with satellite imagery to trace where the old roads once ran." },
  { id: "assembly-notes-1947", title: "Handwritten Notes from a 1947 Assembly", type: "note", category: "History",
    addedHoursAgo: 500, starred: false, popularity: 950, searches: 180, place: "South Asia", source: "Family donation",
    summary: "Pencil notes taken in the gallery of a founding assembly, never before published.",
    body: "The pages capture short, hurried lines — names, votes, and the odd margin doodle. They offer a small human window onto a very large historical moment." },
  { id: "moon-raw-footage", title: "Raw Reel: The Lunar Landing Tapes", type: "video", category: "History",
    addedHoursAgo: 96, starred: true, popularity: 6800, searches: 890, place: "Space", source: "Archive reel",
    summary: "A restored scan of mission footage, complete with tracking artefacts and leader frames.",
    body: "This reel preserves the raw look of the original broadcast — scan lines, dropouts and all. The imperfections are part of the story." },

  /* ---------------- Gaming ---------------- */
  { id: "unreleased-prototype", title: "Unreleased Prototype Level", type: "video", category: "Gaming",
    addedHoursAgo: 48, starred: true, popularity: 5400, searches: 720, place: "Studio archive", source: "Ex-dev leak (donated)",
    summary: "A level cut before release, captured from a development cartridge.",
    body: "The layout is rougher than the shipped game, with placeholder textures and a boss that never made it to the final build." },
  { id: "beta-screenshots", title: "Beta Build Screenshot Archive", type: "photo", category: "Gaming",
    addedHoursAgo: 30, starred: false, popularity: 2600, searches: 410, place: "Online", source: "Community upload",
    summary: "A set of early screenshots showing a HUD and map that changed dramatically.",
    body: "Compare the health bar here with the retail version and you can trace a whole design conversation." },
  { id: "cancelled-rpg-notes", title: "Design Notes of a Cancelled RPG", type: "note", category: "Gaming",
    addedHoursAgo: 210, starred: false, popularity: 1500, searches: 300, place: "Unknown", source: "Notebook scan",
    summary: "A designer's notebook for a role-playing game that was shelved mid-production.",
    body: "Quests, faction names and a magic system fill these pages. Several ideas were later recycled into other titles." },

  /* ---------------- News ---------------- */
  { id: "curious-find-week", title: "A Curious Find Reported This Week", type: "note", category: "News",
    addedHoursAgo: 5, starred: false, popularity: 700, searches: 120, place: "Regional", source: "Reader tip",
    summary: "A small, strange discovery that slipped under the mainstream radar this week.",
    body: "Rare collects the odd and the overlooked. This entry is a short field report, kept deliberately factual." },
  { id: "archive-donation", title: "Rare Archive Donated to a Museum", type: "photo", category: "News",
    addedHoursAgo: 60, starred: false, popularity: 1100, searches: 160, place: "Museum", source: "Press note",
    summary: "A private collection of negatives has been handed to a public archive.",
    body: "Donations like this are how rare material survives. The museum plans to digitise the negatives and release previews." },

  /* ---------------- Music ---------------- */
  { id: "lost-demo-1974", title: "Lost Studio Demo, 1974", type: "video", category: "Music",
    addedHoursAgo: 12, starred: true, popularity: 7300, searches: 950, place: "Studio", source: "Reel-to-reel transfer",
    summary: "A single studio take that never reached an official release.",
    body: "Transferred from a quarter-inch tape, the recording carries the hiss and wobble of its era." },
  { id: "handwritten-lyrics", title: "Handwritten Lyrics Sheet", type: "photo", category: "Music",
    addedHoursAgo: 150, starred: false, popularity: 3100, searches: 480, place: "Private", source: "Estate scan",
    summary: "Draft lyrics with crossings-out that never made the final cut.",
    body: "The deletions are the interesting part — they show a line being found and then abandoned." },
  { id: "bootleg-notes", title: "Concert Bootleg Notes", type: "note", category: "Music",
    addedHoursAgo: 400, starred: false, popularity: 1300, searches: 210, place: "Live", source: "Fan journal",
    summary: "A fan's written account of a legendary live show, page by page.",
    body: "Before phones, the only souvenir of a concert was memory and a notebook." },

  /* ---------------- Movie ---------------- */
  { id: "deleted-scene", title: "Deleted Scene from a Classic", type: "video", category: "Movie",
    addedHoursAgo: 20, starred: true, popularity: 6100, searches: 800, place: "Studio vault", source: "Workprint",
    summary: "A scene removed in the edit, recovered from a rough workprint.",
    body: "Workprints are precious because they preserve what the final cut threw away." },
  { id: "concept-poster", title: "Original Concept Poster", type: "photo", category: "Movie",
    addedHoursAgo: 88, starred: false, popularity: 2400, searches: 350, place: "Design studio", source: "Artist portfolio",
    summary: "An early poster concept that was replaced before the marketing campaign.",
    body: "The composition is bolder and stranger than the released one-panel." },
  { id: "shot-list", title: "Director's Handwritten Shot List", type: "note", category: "Movie",
    addedHoursAgo: 260, starred: false, popularity: 1600, searches: 260, place: "Set", source: "Crew donation",
    summary: "A day-by-day shot list in the director's own hand.",
    body: "Numbers, lens notes and small arrows crowd the margins. It is the practical machinery behind a famous sequence." },

  /* ---------------- Planned for further ---------------- */
  { id: "planned-games-archive", title: "Rare Video Games Archive", type: "note", category: "Planned",
    addedHoursAgo: 200, starred: false, popularity: 900, searches: 140, place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a searchable catalogue of prototypes, manuals and box art.",
    body: "We are gathering donated scans and safe, legal captures. Nothing is published without permission." },
  { id: "planned-radio", title: "Vintage Radio Broadcasts", type: "note", category: "Planned",
    addedHoursAgo: 220, starred: false, popularity: 800, searches: 130, place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: restored audio from early radio, with transcripts.",
    body: "Radio is fragile — discs crack, tapes shed. The plan is to publish restored excerpts alongside transcripts." },
  { id: "planned-maps", title: "Lost Maps Project", type: "note", category: "Planned",
    addedHoursAgo: 240, starred: false, popularity: 850, searches: 150, place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a growing collection of vanished streets and old survey maps.",
    body: "Contributors send in scans of old maps; we georeference what we can and publish them." },

  /* ---------------- More recent finds ---------------- */
  { id: "glass-slide", title: "A Glass Slide Found in an Attic", type: "photo", category: "History",
    addedHoursAgo: 2, starred: true, popularity: 3600, searches: 520, place: "Attic", source: "Reader upload",
    summary: "A hand-tinted lantern slide, rediscovered in a box of family papers.",
    body: "Lantern slides were projected for audiences before cinema. This one is tinted by hand." },
  { id: "speedrun-tape", title: "A Forgotten Speedrun VHS", type: "video", category: "Gaming",
    addedHoursAgo: 8, starred: false, popularity: 2900, searches: 430, place: "Basement", source: "Tape transfer",
    summary: "A home-recorded tape of a record attempt from the 1990s.",
    body: "Recorded off a television with a camcorder, the tape is grainy and the audio warbles." },
  { id: "field-recording", title: "Field Recording of a Vanished Sound", type: "note", category: "Music",
    addedHoursAgo: 18, starred: false, popularity: 1200, searches: 190, place: "Street", source: "Contributor",
    summary: "A short note about a street sound that no longer exists anywhere.",
    body: "Some things are rare because they are gone. This entry pairs a written description with a time and place." },
  { id: "prototype-cart", title: "Prototype Cartridge Photographed", type: "photo", category: "Gaming",
    addedHoursAgo: 42, starred: false, popularity: 2100, searches: 330, place: "Collection", source: "Owner photo",
    summary: "A never-released cartridge, photographed before it goes for preservation.",
    body: "Labels on prototypes were often handwritten, and this one is no exception." },
  { id: "newsreel-scan", title: "Newsreel Scan, Reel 3", type: "video", category: "News",
    addedHoursAgo: 130, starred: false, popularity: 1700, searches: 250, place: "Archive", source: "Film scan",
    summary: "A surviving newsreel reel, scanned frame by frame.",
    body: "Newsreels were the cinema's newspaper. This reel covers a week of ordinary events." },
  { id: "screening-notes", title: "Notes from a Private Screening", type: "note", category: "Movie",
    addedHoursAgo: 300, starred: false, popularity: 1400, searches: 200, place: "Screening room", source: "Guest notes",
    summary: "A viewer's notes jotted during a test screening.",
    body: "Test-screening notes shaped final cuts. These pages record laughter, silences and a question about an ending." },
  { id: "demo-sheet-music", title: "Demo Sheet Music, Unsigned", type: "photo", category: "Music",
    addedHoursAgo: 90, starred: false, popularity: 2000, searches: 310, place: "Unknown", source: "Paper archive",
    summary: "Loose manuscript pages with no composer's name attached.",
    body: "Attribution puzzles are common in paper archives. The melody is intact; the author is not." },
  { id: "planned-documents", title: "Family Document Rescue", type: "note", category: "Planned",
    addedHoursAgo: 260, starred: false, popularity: 780, searches: 110, place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a guide and workspace for scanning fragile family documents safely.",
    body: "Old paper tears easily. This planned section will walk contributors through safe handling and simple scanning." }
];
