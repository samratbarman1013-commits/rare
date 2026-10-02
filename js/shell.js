/* Rare — horizontal-scroll shell.
   Tier 1: brand + search   Tier 2: main pages   Tier 3: categories (scrolls sideways)
   Main pages are horizontal panels (swipe / arrows / keys). Sub-views slide in as sheets. */
(function () {
  var S = window.RARE_SITE, CATS = window.RARE_CATEGORIES, ITEMS = window.RARE_ITEMS;
  var COL = window.RARE_COLLECTION || { platforms: [], youtube: [], wikipedia: { pages: [], images: [] } };
  var PANELS = [["home", "Home"], ["videos", "Videos"], ["notes", "Notes"], ["images", "Images"], ["about", "About Us"], ["otherside", "Other Side"]];

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function timeAgo(h) {
    if (h < 1) return "just now";
    if (h < 24) return h + "h ago";
    var d = Math.round(h / 24); if (d < 30) return d + "d ago";
    var m = Math.round(d / 30); if (m < 12) return m + "mo ago";
    return Math.round(m / 12) + "y ago";
  }
  function isRecent(it) { return it.addedHoursAgo <= 24; }
  function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }
  var CAT_COLOR = { History: "#7a5230", Gaming: "#1f5fbf", News: "#b32424", Music: "#7a1f7a", Movie: "#9a6b00", Planned: "#4a5568" };
  var TYPE_COLOR = { photo: "#0b6e4f", video: "#b32424", note: "#4a5568" };
  var TYPE_LABEL = { photo: "Photo", video: "Video", note: "Note" };
  function wrapT(text, max) {
    var w = String(text).split(/\s+/), out = [], cur = "";
    for (var i = 0; i < w.length; i++) { var t = cur ? cur + " " + w[i] : w[i]; if (t.length > max && cur) { out.push(cur); cur = w[i]; } else cur = t; }
    if (cur) out.push(cur); return out.slice(0, 4);
  }
  function thumb(it) {
    var base = CAT_COLOR[it.category] || "#4a5568", type = TYPE_COLOR[it.type] || "#4a5568";
    var lines = wrapT(it.title, 20);
    var tspan = lines.map(function (l, i) { return '<tspan x="40" dy="' + (i === 0 ? 0 : 34) + '">' + esc(l) + "</tspan>"; }).join("");
    var y0 = 150 - (lines.length - 1) * 17;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400"><defs>' +
      '<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + base + '"/><stop offset="1" stop-color="#14161c"/></linearGradient>' +
      '<pattern id="p" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0V26" fill="none" stroke="#ffffff" stroke-opacity="0.06"/></pattern></defs>' +
      '<rect width="640" height="400" fill="url(#g)"/><rect width="640" height="400" fill="url(#p)"/>' +
      '<rect x="16" y="16" width="608" height="368" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>' +
      '<text x="40" y="70" fill="#ffffff" fill-opacity="0.85" font-family="Helvetica,Arial,sans-serif" font-size="20" letter-spacing="4">' + esc(it.category.toUpperCase()) + "</text>" +
      '<text x="40" y="' + y0 + '" fill="#ffffff" font-family="Georgia,serif" font-size="30">' + tspan + "</text>" +
      '<rect x="40" y="330" width="150" height="34" rx="4" fill="' + type + '"/><text x="115" y="353" fill="#ffffff" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="18" letter-spacing="2">' + esc(TYPE_LABEL[it.type]) + "</text></svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function ytId(u) { var m = String(u).match(/[?&]v=([^&]+)/) || String(u).match(/youtu\.be\/([^?]+)/); return m ? m[1] : ""; }

  function card(it) {
    return '<article class="card"><a class="thumb" href="#item:' + encodeURIComponent(it.id) + '"><span class="badge ' + it.type + '">' + TYPE_LABEL[it.type] + "</span>" +
      '<img loading="lazy" src="' + thumb(it) + '" alt="' + esc(it.title) + '"></a>' +
      '<div class="body"><div class="cat">' + esc(it.category) + "</div>" +
      '<h3><a href="#item:' + encodeURIComponent(it.id) + '">' + esc(it.title) + "</a></h3><p>" + esc(it.summary) + "</p>" +
      '<div class="meta"><span>' + esc(it.source) + "</span><span>" + timeAgo(it.addedHoursAgo) + "</span></div></div></article>";
  }
  function row(items) {
    if (!items.length) return '<p class="lead">Nothing here yet.</p>';
    return '<div class="row-wrap"><button class="row-arrow l" aria-label="Scroll left">\u2039</button>' +
      '<div class="row">' + items.map(card).join("") + "</div>" +
      '<button class="row-arrow r" aria-label="Scroll right">\u203a</button></div>';
  }
  function grid(items) {
    if (!items.length) return '<p class="lead">Nothing here yet. Try another search.</p>';
    return '<div class="grid">' + items.map(card).join("") + "</div>";
  }
  function platformCard(p) {
    var ext = p.external ? ' target="_blank" rel="noopener"' : "";
    var href = p.internal ? "#open:" + p.key : p.href;
    return '<a class="platform" href="' + href + '"' + ext + ' style="--pc:' + (p.color || "#4a5568") + '">' +
      '<span class="p-icon">' + (p.icon || "\u25CF") + "</span>" +
      '<span class="p-body"><b>' + esc(p.name) + (p.external ? '<span class="ext">\u2197</span>' : "") + "</b><small>" + esc(p.desc) + "</small></span></a>";
  }
  function videoCard(v) {
    var id = ytId(v.url), img = id ? "https://img.youtube.com/vi/" + id + "/hqdefault.jpg" : "";
    return '<article class="yt-card"><a class="yt-thumb" href="' + v.url + '" target="_blank" rel="noopener">' +
      (img ? '<img loading="lazy" src="' + img + '" alt="' + esc(v.title) + '">' : "") + '<span class="yt-play">\u25B6</span></a>' +
      '<div class="yt-body"><div class="cat">' + esc(v.year || "Rare") + "</div><h3>" + esc(v.title) + "</h3><p>" + esc(v.desc) + "</p>" +
      '<div class="meta"><span>' + esc(v.channel || "YouTube") + '</span><a href="' + v.url + '" target="_blank" rel="noopener">Watch \u2197</a></div></div></article>';
  }
  function linkCard(x) { return '<a class="link-card" href="' + x.url + '" target="_blank" rel="noopener"><b>' + esc(x.title) + "</b><small>" + esc(x.desc) + '</small><span class="ext">\u2197</span></a>'; }

  /* ---------- three-tier header ---------- */
  function headerHTML(active) {
    var tier2 = PANELS.map(function (p) {
      return '<a href="#' + p[0] + '" data-panel="' + p[0] + '"' + (active === p[0] ? ' class="active"' : "") + ">" + p[1] + "</a>";
    }).join("");
    var tier3 = CATS.map(function (c) {
      return '<a class="chip" href="#cat:' + encodeURIComponent(c.key) + '">' + esc(c.key) + "</a>";
    }).join("");
    return '<div class="wrap">' +
      /* tier 1: web name + search */
      '<div class="tier1"><a class="brand" href="#home"><span class="brand-mark">R</span><span>Rare<small>community archive</small></span></a>' +
      '<form class="search-form" id="search-form" role="search" autocomplete="off">' +
      '<input type="search" id="global-search" placeholder="Search rare photos, videos and notes\u2026" aria-label="Search Rare">' +
      '<button type="submit">Search</button><div class="suggest" id="suggest" role="listbox"></div></form></div>' +
      /* tier 2: main pages */
      '<nav class="tier2" aria-label="Pages"><span class="tier-label">Pages</span>' + tier2 + "</nav>" +
      /* tier 3: categories */
      '<nav class="tier3" aria-label="Categories"><span class="tier-label">Categories</span>' +
      '<button class="strip-nav" id="strip-l" aria-label="Scroll categories left">\u2039</button>' +
      '<div class="cat-strip" id="cat-strip">' + tier3 + "</div>" +
      '<button class="strip-nav" id="strip-r" aria-label="Scroll categories right">\u203a</button></nav></div>';
  }

  /* ---------- panels ---------- */
  function sidebar() {
    return '<aside class="sidebar"><div class="side-box"><h3>What is Rare?</h3><p class="small">A volunteer-run archive of photographs, footage and notes that are hard to find, explained for newcomers.</p></div>' +
      '<div class="side-box"><h3>Contribute</h3><p class="small">Anyone can add to Rare. Send a photo, a video link or notes.</p><p><a class="btn" href="#about" style="padding:8px 16px;font-size:.85rem">Submit a rare find</a></p></div>' +
      '<div class="side-box"><h3>Other Side</h3><ul><li><a href="#open:youtube">YouTube \u2014 10 rare videos</a></li><li><a href="#open:wikipedia">Wikipedia \u2014 pages &amp; images</a></li><li><a href="#otherside">All platforms</a></li></ul></div>' +
      '<div class="side-box"><h3>Contact</h3><ul><li>\u2709 <a href="mailto:' + S.email + '">' + esc(S.email) + '</a></li><li>\uD83D\uDCAC <a href="' + S.whatsappLink + '" target="_blank" rel="noopener">WhatsApp ' + esc(S.whatsapp) + "</a></li></ul></div></aside>";
  }
  function pHome() {
    var recent = ITEMS.filter(isRecent).sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; });
    var latest = ITEMS.slice().sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; }).slice(0, 8);
    function n(f) { return ITEMS.filter(f).length; }
    var cats = CATS.map(function (c) {
      var count = (c.key === "Recent") ? n(isRecent) : n(function (x) { return x.category === c.key; });
      return '<a class="card" style="text-decoration:none" href="#cat:' + encodeURIComponent(c.key) + '"><div class="body"><div class="cat">Category</div><h3>' + c.key + "</h3><p>" + c.blurb + '</p><div class="meta"><span>' + count + " entr" + (count === 1 ? "y" : "ies") + "</span><span>Open &rarr;</span></div></div></a>";
    }).join("");
    return '<div class="wrap"><section class="hero"><div class="kicker">Community archive</div><h1>Rare</h1>' +
      '<p class="lead" style="max-width:70ch">A wiki for the rare and the nearly lost. Photos, videos and notes that deserve to survive. Like Wikipedia, <b>anyone can contribute</b>.</p>' +
      '<div class="hero-actions"><a class="btn" href="#videos">Explore the archive</a><a class="btn ghost" href="#about">Submit a rare find</a><a class="btn ghost" href="#open:search">Search</a></div>' +
      '<p class="scroll-hint" style="margin-top:14px">\u2190 Swipe or scroll sideways to move between pages \u2192</p>' +
      '<div class="stat-row"><div class="stat"><b>' + ITEMS.length + '</b><span>Entries</span></div><div class="stat"><b>' + n(function (x) { return x.type === "photo"; }) + '</b><span>Rare photos</span></div><div class="stat"><b>' + n(function (x) { return x.type === "video"; }) + '</b><span>Rare videos</span></div><div class="stat"><b>' + n(function (x) { return x.type === "note"; }) + '</b><span>Rare notes</span></div><div class="stat"><b>' + CATS.length + '</b><span>Categories</span></div></div></section></div>' +
      '<div class="wrap layout"><main>' +
      '<div class="section-head"><h2>Recent \u2014 last 24 hours</h2><a class="more" href="#cat:Recent">View all recent &rarr;</a></div>' + row(recent) +
      '<div class="section-head"><h2>Latest additions</h2><span class="scroll-hint">scroll \u2192</span></div>' + row(latest) +
      '<div class="section-head"><h2>Browse by category</h2><span class="scroll-hint">scroll \u2192</span></div><div class="row-wrap"><button class="row-arrow l">\u2039</button><div class="row">' + cats + '</div><button class="row-arrow r">\u203a</button></div>' +
      '<h2>Other Side Collection</h2><section class="collection-hero"><img src="assets/otherside.svg" alt="" onerror="this.style.display=\'none\'"><div><h1 style="font-size:1.5rem">Other Side Collection</h1><p class="lead" style="margin:0 0 12px">10 rare YouTube videos, Wikipedia pages and images, and links to Instagram, Facebook and the Internet Archive.</p><a class="btn" href="#otherside">Open the Other Side &rarr;</a></div></section>' +
      "</main>" + sidebar() + "</div>";
  }
  function pType(type, title, kicker, lead) {
    var list = ITEMS.filter(function (it) { return it.type === type; }).sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; });
    return '<div class="wrap layout"><main><div class="panel-head"><div><div class="panel-kicker">' + kicker + '</div><h1 style="border:none;margin:0">' + title + "</h1></div>" +
      '<span class="scroll-hint">scroll sideways \u2192</span></div><p class="lead">' + lead + '</p><p class="small"><b>' + list.length + "</b> entries \u2014 scroll the row to browse.</p>" + row(list) +
      "<h2>All entries</h2>" + grid(list) + "</main>" + sidebar() + "</div>";
  }
  function pAbout() {
    return '<div class="wrap layout"><main><div class="panel-kicker">About</div><h1>About Us</h1>' +
      '<p class="lead">Rare is a community archive of the hard-to-find. It works a little like Wikipedia \u2014 open, explained for newcomers, and <b>anyone can contribute</b>.</p>' +
      "<h2>Our idea</h2><p>Most rare things are not lost all at once. They fade \u2014 a negative in an attic, a demo tape in a drawer, a set of notes in a family file. Rare gives them a home with a short, honest description.</p>" +
      "<h2>How to contribute</h2><p>No application and no account. Send a photo, a video link or notes with a sentence of context. If it is rare and yours to share, it can appear here \u2014 credited however you wish.</p>" +
      '<h2 id="submit">Submit a Rare Find</h2><div class="notice">This form emails your submission to us. Prefer to write directly? Use the Gmail or WhatsApp links in the sidebar.</div>' +
      '<form id="submit-form" class="form-grid" novalidate>' +
      '<div class="field"><label for="f-name">Your name</label><input id="f-name" type="text" placeholder="How should we credit you?" required></div>' +
      '<div class="field"><label for="f-email">Your email</label><input id="f-email" type="email" placeholder="you@example.com" required></div>' +
      '<div class="field"><label for="f-type">What are you submitting?</label><select id="f-type"><option>Rare photo</option><option>Rare video</option><option>Rare note</option></select></div>' +
      '<div class="field"><label for="f-cat">Category</label><select id="f-cat"><option>History</option><option>Gaming</option><option>News</option><option>Music</option><option>Movie</option><option>Planned</option></select></div>' +
      '<div class="field"><label for="f-title">Title of the find</label><input id="f-title" type="text" placeholder="e.g. Lost studio demo, 1974" required></div>' +
      '<div class="field"><label for="f-link">Link or source (optional)</label><input id="f-link" type="text" placeholder="A link, or where it came from"></div>' +
      '<div class="field"><label for="f-notes">Tell us about it</label><textarea id="f-notes" placeholder="What is it? Where did you find it?" required></textarea></div>' +
      '<div class="field" style="display:flex;gap:10px;align-items:flex-start"><input id="f-consent" type="checkbox" style="width:auto;margin-top:4px" required><label for="f-consent" style="font-weight:400;font-size:.86rem">I have the right to share this material, and I am happy for Rare to publish it with credit.</label></div>' +
      '<div><button class="btn" type="submit">Send my submission</button> <a class="btn ghost" href="mailto:' + S.email + '">Or email us directly</a></div>' +
      '<p class="small" id="form-status" role="status"></p></form>' +
      '<h2>Contact</h2><p>Reach the founder any time at <a href="mailto:' + S.email + '">' + esc(S.email) + '</a> or on WhatsApp at <a href="' + S.whatsappLink + '" target="_blank" rel="noopener">' + esc(S.whatsapp) + "</a>.</p></main>" + sidebar() + "</div>";
  }
  function pOtherside() {
    return '<div class="wrap layout"><main><div class="panel-kicker">Beyond the archive</div><h1 style="border:none">Other Side Collection</h1>' +
      '<p class="lead">The rare things that live somewhere else \u2014 our shelf of outside sources. Scroll the row sideways to browse the platforms.</p>' +
      '<div class="row-wrap"><button class="row-arrow l">\u2039</button><div class="row">' + COL.platforms.map(platformCard).join("") + '</div><button class="row-arrow r">\u203a</button></div>' +
      '<h2>Start here</h2><div class="grid">' +
      '<a class="card" style="text-decoration:none" href="#open:youtube"><div class="body"><div class="cat">Other Side &middot; YouTube</div><h3>10 rare videos</h3><p>From the oldest surviving film of 1888 to lost 1984 footage \u2014 real, watchable, rare.</p><div class="meta"><span>By link</span><span>Open &rarr;</span></div></div></a>' +
      '<a class="card" style="text-decoration:none" href="#open:wikipedia"><div class="body"><div class="cat">Other Side &middot; Wikipedia</div><h3>Pages &amp; images</h3><p>Rare pages on lost media and rediscovered films, plus free historical images.</p><div class="meta"><span>Pages + images</span><span>Open &rarr;</span></div></div></a>' +
      '<a class="card" style="text-decoration:none" href="#about"><div class="body"><div class="cat">Contribute</div><h3>Add a source</h3><p>Know a channel, page or account worth adding?</p><div class="meta"><span>Anyone can</span><span>Submit &rarr;</span></div></div></a></div>' +
      "</main>" + sidebar() + "</div>";
  }

  /* ---------- sheets ---------- */
  var sheet;
  function sheetShell(title, body) {
    return '<div class="sheet-bar"><div class="wrap"><button class="sheet-back" id="sheet-back">\u2039 Back</button><b style="font-family:Georgia,serif;font-size:1.05rem">' + esc(title) + "</b></div></div>" +
      '<div class="wrap" style="padding-top:18px;padding-bottom:60px">' + body + "</div>";
  }
  function openSheet(title, body) {
    sheet.innerHTML = sheetShell(title, body);
    sheet.classList.add("open");
    sheet.scrollTop = 0;
    var b = document.getElementById("sheet-back");
    if (b) b.addEventListener("click", closeSheet);
    wireRows(sheet);
  }
  function closeSheet() { sheet.classList.remove("open"); sheet.innerHTML = ""; }

  function openItem(id) {
    var it = byId(id);
    if (!it) return openSheet("Not found", "<p>This entry may have moved.</p>");
    var media = "";
    if (it.type === "photo") media = '<figure class="detail-figure"><img src="' + thumb(it) + '" alt="' + esc(it.title) + '"><figcaption>' + esc(it.title) + " \u00b7 " + esc(it.source) + "</figcaption></figure>";
    else if (it.type === "video") media = '<figure class="detail-figure"><div class="video-frame"><div class="play">\u25B6</div></div><figcaption>Video entry \u00b7 placeholder player.</figcaption></figure>';
    var rel = ITEMS.filter(function (x) { return x.category === it.category && x.id !== it.id; }).slice(0, 6);
    openSheet(it.title,
      '<div class="detail-head"><h1 style="border:none;margin:0">' + esc(it.title) + '</h1><span class="badge ' + it.type + '" style="position:static">' + TYPE_LABEL[it.type] + "</span></div>" +
      '<p class="lead">' + esc(it.summary) + "</p>" + media +
      '<table class="meta-table"><tr><th>Type</th><td>' + TYPE_LABEL[it.type] + "</td></tr><tr><th>Category</th><td>" + esc(it.category) + "</td></tr>" +
      "<tr><th>Origin</th><td>" + esc(it.place || "\u2014") + "</td></tr><tr><th>Source</th><td>" + esc(it.source) + "</td></tr><tr><th>Added</th><td>" + timeAgo(it.addedHoursAgo) + "</td></tr></table>" +
      "<h2>Notes</h2><p>" + esc(it.body) + "</p>" +
      (rel.length ? "<h2>More in " + esc(it.category) + "</h2>" + row(rel) : ""));
  }
  function openCategory(key) {
    var meta = CATS.filter(function (c) { return c.key === key; })[0] || CATS[0];
    var list = (key === "Recent") ? ITEMS.filter(isRecent) : ITEMS.filter(function (it) { return it.category === key; });
    list = list.sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; });
    openSheet(meta.key, '<p class="lead">' + esc(meta.blurb) + '</p><p class="small"><b>' + list.length + "</b> entries \u2014 scroll the row \u2192</p>" + row(list) + "<h2>All entries</h2>" + grid(list));
  }
  function openSearch(q) {
    var res = search(q);
    openSheet("Search the archive",
      '<form class="search-form" id="sheet-search" role="search" style="max-width:720px;margin:0 0 14px"><input type="search" id="sheet-q" value="' + esc(q) + '" placeholder="Search rare photos, videos and notes\u2026"><button type="submit">Search</button></form>' +
      '<p class="tagline">' + (q ? "<b>" + res.length + "</b> result" + (res.length === 1 ? "" : "s") + " for \u201c" + esc(q) + "\u201d" : "Type a word \u2014 try \u201cprototype\u201d, \u201cdemo\u201d, \u201cmap\u201d or \u201clost\u201d.") + "</p>" + (q ? grid(res) : ""));
    var f = document.getElementById("sheet-search");
    if (f) f.addEventListener("submit", function (e) { e.preventDefault(); openSearch(document.getElementById("sheet-q").value.trim()); });
  }
  function openYoutube() {
    openSheet("Other Side \u201a YouTube", '<p class="lead">Ten rare videos, kept by link. Each opens on YouTube in a new tab \u2014 nothing is copied, and all credit stays with the original uploaders.</p>' +
      '<p class="small"><b>' + COL.youtube.length + '</b> rare videos \u2014 scroll the row \u2192</p>' +
      '<div class="row-wrap"><button class="row-arrow l">\u2039</button><div class="row">' + COL.youtube.map(function (v) { return '<div style="flex:0 0 300px">' + videoCard(v) + "</div>"; }).join("") + '</div><button class="row-arrow r">\u203a</button></div>' +
      "<h2>All videos</h2><div class=\"yt-grid\">" + COL.youtube.map(videoCard).join("") + "</div>" +
      '<div class="notice">External YouTube links \u2014 if a video is removed by its owner the link may stop working.</div>');
  }
  function openWikipedia() {
    openSheet("Other Side \u201a Wikipedia", '<p class="lead">Wikipedia is the closest thing to Rare\u2019s own spirit \u2014 free, open and written by everyone.</p>' +
      '<h2>Pages</h2><div class="link-grid">' + COL.wikipedia.pages.map(linkCard).join("") + "</div>" +
      '<h2>Images</h2><div class="link-grid">' + COL.wikipedia.images.map(linkCard).join("") + "</div>");
  }

  /* ---------- search ---------- */
  function score(it, q) {
    var t = (it.title + " " + it.summary + " " + it.body + " " + it.category + " " + it.source + " " + (it.place || "")).toLowerCase();
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean), total = 0;
    for (var i = 0; i < terms.length; i++) {
      if (t.indexOf(terms[i]) === -1) return 0;
      if (it.title.toLowerCase().indexOf(terms[i]) !== -1) total += 5;
      if (it.category.toLowerCase().indexOf(terms[i]) !== -1) total += 3;
      if (it.summary.toLowerCase().indexOf(terms[i]) !== -1) total += 2;
      total += 1;
    }
    return total;
  }
  function search(q) {
    q = (q || "").trim(); if (!q) return [];
    return ITEMS.map(function (it) { return { it: it, s: score(it, q) }; }).filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; }).map(function (r) { return r.it; });
  }

  /* ---------- wiring ---------- */
  var track, panels = [], idx = 0;
  function panelIndex(key) { for (var i = 0; i < PANELS.length; i++) if (PANELS[i][0] === key) return i; return 0; }
  function goTo(key) {
    idx = panelIndex(key);
    track.scrollTo({ left: idx * track.clientWidth, behavior: "smooth" });
    syncNav(idx);
  }
  function syncNav(i) {
    var links = document.querySelectorAll(".tier2 a");
    for (var k = 0; k < links.length; k++) links[k].classList.toggle("active", k === i);
    var dots = document.querySelectorAll(".dots button");
    for (var d = 0; d < dots.length; d++) dots[d].classList.toggle("active", d === i);
  }
  function currentIndex() { return Math.round(track.scrollLeft / Math.max(1, track.clientWidth)); }

  function wireRows(scope) {
    var wraps = (scope || document).querySelectorAll(".row-wrap");
    for (var i = 0; i < wraps.length; i++) {
      (function (w) {
        var r = w.querySelector(".row"), l = w.querySelector(".row-arrow.l"), rr = w.querySelector(".row-arrow.r");
        if (!r) return;
        if (l) l.addEventListener("click", function () { r.scrollBy({ left: -r.clientWidth * 0.85, behavior: "smooth" }); });
        if (rr) rr.addEventListener("click", function () { r.scrollBy({ left: r.clientWidth * 0.85, behavior: "smooth" }); });
      })(wraps[i]);
    }
  }
  function wireHeader() {
    var strip = document.getElementById("cat-strip");
    var sl = document.getElementById("strip-l"), sr = document.getElementById("strip-r");
    if (sl) sl.addEventListener("click", function () { strip.scrollBy({ left: -180, behavior: "smooth" }); });
    if (sr) sr.addEventListener("click", function () { strip.scrollBy({ left: 180, behavior: "smooth" }); });

    var form = document.getElementById("search-form"), input = document.getElementById("global-search"), box = document.getElementById("suggest");
    if (form) form.addEventListener("submit", function (e) { e.preventDefault(); openSearch(input.value.trim()); });
    if (input && box) {
      input.addEventListener("input", function () {
        var q = input.value.trim();
        if (q.length < 2) { box.classList.remove("open"); box.innerHTML = ""; return; }
        var hits = search(q).slice(0, 6);
        if (!hits.length) { box.innerHTML = '<div class="s-empty">No matches for \u201c' + esc(q) + '\u201d</div>'; box.classList.add("open"); return; }
        box.innerHTML = hits.map(function (it) {
          return '<a href="#item:' + encodeURIComponent(it.id) + '"><span class="s-type ' + it.type + '">' + TYPE_LABEL[it.type] + "</span><span>" + esc(it.title) + " <span style='color:#72777d'>\u00b7 " + esc(it.category) + "</span></span></a>";
        }).join("");
        box.classList.add("open");
      });
      document.addEventListener("click", function (e) { if (!form.contains(e.target)) { box.classList.remove("open"); } });
    }
  }
  function wireAboutForm() {
    var form = document.getElementById("submit-form"); if (!form) return;
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value : ""; };
      var body = "Name: " + g("f-name") + "\nEmail: " + g("f-email") + "\nType: " + g("f-type") + "\nCategory: " + g("f-cat") +
        "\nTitle: " + g("f-title") + "\nLink/source: " + g("f-link") + "\n\nNotes:\n" + g("f-notes") + "\n";
      status.textContent = "Opening your email app to send this to " + S.email + "\u2026";
      location.href = "mailto:" + S.email + "?subject=" + encodeURIComponent("Rare submission: " + (g("f-title") || "new find")) + "&body=" + encodeURIComponent(body);
    });
  }

  function route() {
    var h = (location.hash || "").replace(/^#/, "");
    if (h.indexOf("item:") === 0) return openItem(decodeURIComponent(h.slice(5)));
    if (h.indexOf("cat:") === 0) return openCategory(decodeURIComponent(h.slice(4)));
    if (h.indexOf("open:") === 0) {
      var k = h.slice(5);
      if (k === "youtube") return openYoutube();
      if (k === "wikipedia") return openWikipedia();
      if (k === "search") return openSearch("");
      if (k === "otherside") return goTo("otherside");
    }
    if (h) { closeSheet(); return goTo(h); }
    closeSheet();
  }

  function init() {
    var header = document.getElementById("site-header");
    track = document.getElementById("track");
    sheet = document.getElementById("sheet");
    header.innerHTML = headerHTML("home");

    var frag = "";
    frag += '<section class="panel" data-key="home">' + pHome() + "</section>";
    frag += '<section class="panel" data-key="videos">' + pType("video", "Rare Videos", "Videos", "Footage worth preserving \u2014 deleted scenes, lost demos, unreleased prototypes and newsreels.") + "</section>";
    frag += '<section class="panel" data-key="notes">' + pType("note", "Rare Notes", "Notes", "Written things that survived by accident \u2014 notebooks, shot lists, lyric drafts and field reports.") + "</section>";
    frag += '<section class="panel" data-key="images">' + pType("photo", "Rare Photos", "Images", "Photographs that are hard to find and easy to lose \u2014 lantern slides, maps, prototypes and archives.") + "</section>";
    frag += '<section class="panel" data-key="about">' + pAbout() + "</section>";
    frag += '<section class="panel" data-key="otherside">' + pOtherside() + "</section>";
    track.innerHTML = frag;

    /* dots */
    var dots = document.createElement("div");
    dots.className = "dots";
    dots.innerHTML = PANELS.map(function (p, i) { return '<button data-i="' + i + '" aria-label="' + p[1] + '"' + (i === 0 ? ' class="active"' : "") + "></button>"; }).join("");
    document.body.appendChild(dots);
    dots.addEventListener("click", function (e) { if (e.target.dataset.i != null) goTo(PANELS[+e.target.dataset.i][0]); });

    wireHeader();
    wireRows(document);
    wireAboutForm();
    setHeaderHeight();

    var prev = document.getElementById("arrow-prev"), next = document.getElementById("arrow-next");
    if (prev) prev.addEventListener("click", function () { goTo(PANELS[Math.max(0, currentIndex() - 1)][0]); });
    if (next) next.addEventListener("click", function () { goTo(PANELS[Math.min(PANELS.length - 1, currentIndex() + 1)][0]); });

    track.addEventListener("scroll", function () { syncNav(currentIndex()); }, { passive: true });

    /* vertical wheel at a panel edge -> horizontal scroll */
    track.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      var panel = panelsEl()[currentIndex()];
      if (!panel) return;
      var atTop = panel.scrollTop <= 1;
      var atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
      if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) { e.preventDefault(); track.scrollLeft += e.deltaY; }
    }, { passive: false });

    document.addEventListener("keydown", function (e) {
      if (sheet && sheet.classList.contains("open")) { if (e.key === "Escape") closeSheet(); return; }
      var tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      if (e.key === "ArrowRight") goTo(PANELS[Math.min(PANELS.length - 1, currentIndex() + 1)][0]);
      if (e.key === "ArrowLeft") goTo(PANELS[Math.max(0, currentIndex() - 1)][0]);
    });

    window.addEventListener("resize", function () {
      setHeaderHeight();
      track.scrollTo({ left: currentIndex() * track.clientWidth });
    });

    window.addEventListener("hashchange", route);
    route();
    if (!location.hash) syncNav(0);
  }
  function panelsEl() { return track.querySelectorAll(".panel"); }
  function setHeaderHeight() {
    var h = document.getElementById("site-header").offsetHeight;
    document.documentElement.style.setProperty("--hdr", h + "px");
    if (sheet) sheet.style.top = h + "px";
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
