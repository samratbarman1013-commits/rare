/* Rare — content data model.
   Anyone contributing adds an entry here (or sends it in via the Submit form).
   type:    "photo" | "video" | "note"
   category: one of the six real categories (Recent is derived automatically)
   addedHoursAgo: hours since it was published — drives the "Recent (24h)" view
*/
window.RARE_SITE = {
  brand: "Rare",
  tagline: "A community archive of rare photos, videos and notes.",
  email: "samratbarman1013@gmail.com",
  whatsapp: "+91 9933025348",
  whatsappLink: "https://wa.me/919933025348",
  // Formspree endpoint — replace YOUR_FORM_ID after creating a free form at formspree.io
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
  {
    id: "first-photograph",
    title: "The First Surviving Photograph (1826)",
    type: "photo", category: "History", addedHoursAgo: 720,
    place: "France", source: "Community archive",
    summary: "Nicéphore Niépce's heliograph — the earliest known photograph that survives to this day.",
    body: "Taken from an upstairs window, this view of a courtyard is the oldest surviving photograph made with a camera. The exposure is believed to have lasted around eight hours, which is why the light falls on both sides of the buildings. A quiet, hazy plate that marks the birth of photography itself."
  },
  {
    id: "lost-city-map",
    title: "Rare Map of a Vanished City",
    type: "photo", category: "History", addedHoursAgo: 340,
    place: "Unknown", source: "Private collection",
    summary: "A hand-inked street plan of a settlement that no longer appears on modern maps.",
    body: "Drawn by an unnamed surveyor, the map shows streets, wells and a market square that vanished after a flood. Historians compare it with satellite imagery to trace where the old roads once ran beneath farmland."
  },
  {
    id: "assembly-notes-1947",
    title: "Handwritten Notes from a 1947 Assembly",
    type: "note", category: "History", addedHoursAgo: 500,
    place: "South Asia", source: "Family donation",
    summary: "Pencil notes taken in the gallery of a founding assembly, never before published.",
    body: "The pages capture short, hurried lines — names, votes, and the odd margin doodle. They offer a small human window onto a very large historical moment, and are reproduced here for study rather than as an official record."
  },
  {
    id: "moon-raw-footage",
    title: "Raw Reel: The Lunar Landing Tapes",
    type: "video", category: "History", addedHoursAgo: 96,
    place: "Space", source: "Archive reel",
    summary: "A restored scan of mission footage, complete with tracking artefacts and leader frames.",
    body: "This reel preserves the raw look of the original broadcast — scan lines, dropouts and all. The imperfections are part of the story: they are the fingerprints of a signal that crossed 380,000 km to reach a television set."
  },

  /* ---------------- Gaming ---------------- */
  {
    id: "unreleased-prototype",
    title: "Unreleased Prototype Level",
    type: "video", category: "Gaming", addedHoursAgo: 48,
    place: "Studio archive", source: "Ex-dev leak (donated)",
    summary: "A level cut before release, captured from a development cartridge.",
    body: "The layout is rougher than the shipped game, with placeholder textures and a boss that never made it to the final build. Developers sometimes kept these discs as souvenirs; this one was shared by a former tester."
  },
  {
    id: "beta-screenshots",
    title: "Beta Build Screenshot Archive",
    type: "photo", category: "Gaming", addedHoursAgo: 30,
    place: "Online", source: "Community upload",
    summary: "A set of early screenshots showing a HUD and map that changed dramatically.",
    body: "Compare the health bar here with the retail version and you can trace a whole design conversation. Early UI often reveals what the team was still arguing about weeks before launch."
  },
  {
    id: "cancelled-rpg-notes",
    title: "Design Notes of a Cancelled RPG",
    type: "note", category: "Gaming", addedHoursAgo: 210,
    place: "Unknown", source: "Notebook scan",
    summary: "A designer's notebook for a role-playing game that was shelved mid-production.",
    body: "Quests, faction names and a magic system fill these pages. Several ideas were later recycled into other titles, which is why these notes read like a road map of roads not taken."
  },

  /* ---------------- News ---------------- */
  {
    id: "curious-find-week",
    title: "A Curious Find Reported This Week",
    type: "note", category: "News", addedHoursAgo: 5,
    place: "Regional", source: "Reader tip",
    summary: "A small, strange discovery that slipped under the mainstream radar this week.",
    body: "Rare collects the odd and the overlooked. This entry is a short field report, kept deliberately factual: what was found, where, and why archivists think it matters."
  },
  {
    id: "archive-donation",
    title: "Rare Archive Donated to a Museum",
    type: "photo", category: "News", addedHoursAgo: 60,
    place: "Museum", source: "Press note",
    summary: "A private collection of negatives has been handed to a public archive.",
    body: "Donations like this are how rare material survives. The museum plans to digitise the negatives and release low-resolution previews for study, keeping the originals safely stored."
  },

  /* ---------------- Music ---------------- */
  {
    id: "lost-demo-1974",
    title: "Lost Studio Demo, 1974",
    type: "video", category: "Music", addedHoursAgo: 12,
    place: "Studio", source: "Reel-to-reel transfer",
    summary: "A single studio take that never reached an official release.",
    body: "Transferred from a quarter-inch tape, the recording carries the hiss and wobble of its era. It is presented here for listening and research; rights remain with the original holders."
  },
  {
    id: "handwritten-lyrics",
    title: "Handwritten Lyrics Sheet",
    type: "photo", category: "Music", addedHoursAgo: 150,
    place: "Private", source: "Estate scan",
    summary: "Draft lyrics with crossings-out that never made the final cut.",
    body: "The deletions are the interesting part — they show a line being found and then abandoned. Sometimes a whole verse is struck through in favour of one better word."
  },
  {
    id: "bootleg-notes",
    title: "Concert Bootleg Notes",
    type: "note", category: "Music", addedHoursAgo: 400,
    place: "Live", source: "Fan journal",
    summary: "A fan's written account of a legendary live show, page by page.",
    body: "Before phones, the only souvenir of a concert was memory and a notebook. This journal records setlists, stage banter and the odd backstage detail in careful handwriting."
  },

  /* ---------------- Movie ---------------- */
  {
    id: "deleted-scene",
    title: "Deleted Scene from a Classic",
    type: "video", category: "Movie", addedHoursAgo: 20,
    place: "Studio vault", source: "Workprint",
    summary: "A scene removed in the edit, recovered from a rough workprint.",
    body: "Workprints are precious because they preserve what the final cut threw away. This sequence explains a gap that viewers have argued about for decades."
  },
  {
    id: "concept-poster",
    title: "Original Concept Poster",
    type: "photo", category: "Movie", addedHoursAgo: 88,
    place: "Design studio", source: "Artist portfolio",
    summary: "An early poster concept that was replaced before the marketing campaign.",
    body: "The composition is bolder and stranger than the released one-panel. Concept art like this shows the version of a film that existed in everyone's head before the posters went to print."
  },
  {
    id: "shot-list",
    title: "Director's Handwritten Shot List",
    type: "note", category: "Movie", addedHoursAgo: 260,
    place: "Set", source: "Crew donation",
    summary: "A day-by-day shot list in the director's own hand.",
    body: "Numbers, lens notes and small arrows crowd the margins. It is the practical machinery behind a famous sequence — less glamorous, more revealing."
  },

  /* ---------------- Planned for further ---------------- */
  {
    id: "planned-games-archive",
    title: "Rare Video Games Archive",
    type: "note", category: "Planned", addedHoursAgo: 200,
    place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a searchable catalogue of prototypes, manuals and box art.",
    body: "We are gathering donated scans and safe, legal captures. If you hold a prototype, a manual or a piece of box art, get in touch — nothing is published without permission."
  },
  {
    id: "planned-radio",
    title: "Vintage Radio Broadcasts",
    type: "note", category: "Planned", addedHoursAgo: 220,
    place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: restored audio from early radio, with transcripts.",
    body: "Radio is fragile — discs crack, tapes shed. The plan is to publish restored excerpts alongside transcripts so the sound survives even where the recording does not."
  },
  {
    id: "planned-maps",
    title: "Lost Maps Project",
    type: "note", category: "Planned", addedHoursAgo: 240,
    place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a growing collection of vanished streets and old survey maps.",
    body: "Contributors send in scans of old maps; we georeference what we can and publish them for anyone tracing a family street or an old boundary."
  },

  /* ---------------- More recent finds ---------------- */
  {
    id: "glass-slide",
    title: "A Glass Slide Found in an Attic",
    type: "photo", category: "History", addedHoursAgo: 2,
    place: "Attic", source: "Reader upload",
    summary: "A hand-tinted lantern slide, rediscovered in a box of family papers.",
    body: "Lantern slides were projected for audiences before cinema. This one is tinted by hand, and the colours — though faded — hint at how vivid the original show must have been."
  },
  {
    id: "speedrun-tape",
    title: "A Forgotten Speedrun VHS",
    type: "video", category: "Gaming", addedHoursAgo: 8,
    place: "Basement", source: "Tape transfer",
    summary: "A home-recorded tape of a record attempt from the 1990s.",
    body: "Recorded off a television with a camcorder, the tape is grainy and the audio warbles. It is still a genuine record of play long before streaming made every run visible."
  },
  {
    id: "field-recording",
    title: "Field Recording of a Vanished Sound",
    type: "note", category: "Music", addedHoursAgo: 18,
    place: "Street", source: "Contributor",
    summary: "A short note about a street sound that no longer exists anywhere.",
    body: "Some things are rare because they are gone. This entry pairs a written description with a time and place, so the sound can at least be remembered accurately."
  },
  {
    id: "prototype-cart",
    title: "Prototype Cartridge Photographed",
    type: "photo", category: "Gaming", addedHoursAgo: 42,
    place: "Collection", source: "Owner photo",
    summary: "A never-released cartridge, photographed before it goes for preservation.",
    body: "Labels on prototypes were often handwritten, and this one is no exception. The owner is arranging a safe dump so the data outlives the plastic."
  },
  {
    id: "newsreel-scan",
    title: "Newsreel Scan, Reel 3",
    type: "video", category: "News", addedHoursAgo: 130,
    place: "Archive", source: "Film scan",
    summary: "A surviving newsreel reel, scanned frame by frame.",
    body: "Newsreels were the cinema's newspaper. This reel covers a week of ordinary events, and its ordinariness is exactly what makes it valuable now."
  },
  {
    id: "screening-notes",
    title: "Notes from a Private Screening",
    type: "note", category: "Movie", addedHoursAgo: 300,
    place: "Screening room", source: "Guest notes",
    summary: "A viewer's notes jotted during a test screening.",
    body: "Test-screening notes shaped final cuts. These pages record laughter, silences and a question about an ending that was later changed."
  },
  {
    id: "demo-sheet-music",
    title: "Demo Sheet Music, Unsigned",
    type: "photo", category: "Music", addedHoursAgo: 90,
    place: "Unknown", source: "Paper archive",
    summary: "Loose manuscript pages with no composer's name attached.",
    body: "Attribution puzzles are common in paper archives. The melody is intact; the author is not. Sometimes the community solves these — sometimes the mystery is the point."
  },
  {
    id: "planned-documents",
    title: "Family Document Rescue",
    type: "note", category: "Planned", addedHoursAgo: 260,
    place: "Rare (planned)", source: "Roadmap",
    summary: "Planned: a guide and workspace for scanning fragile family documents safely.",
    body: "Old paper tears easily. This planned section will walk contributors through safe handling and simple scanning, so more documents survive the trip from the cupboard to the archive."
  }
];
