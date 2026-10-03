/* Rare — shared site engine: nav, thumbnails, cards, search. */
(function () {
  var S = window.RARE_SITE;
  var CATS = window.RARE_CATEGORIES;
  var ITEMS = window.RARE_ITEMS;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function timeAgo(h) {
    if (h < 1) return "just now";
    if (h < 24) return h + "h ago";
    var d = Math.round(h / 24);
    if (d < 30) return d + "d ago";
    var m = Math.round(d / 30);
    if (m < 12) return m + "mo ago";
    return Math.round(m / 12) + "y ago";
  }
  function isRecent(it) { return it.addedHoursAgo <= 24; }
  function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }

  var CAT_COLOR = {
    History: "#7a5230", Gaming: "#1f5fbf", News: "#b32424",
    Music: "#7a1f7a", Movie: "#9a6b00", Planned: "#4a5568"
  };
  var TYPE_COLOR = { photo: "#0b6e4f", video: "#b32424", note: "#4a5568" };
  var TYPE_LABEL = { photo: "Photo", video: "Video", note: "Note" };

  /* ---------- generated SVG thumbnail (self-contained, no external assets) ---------- */
  function wrap(text, max) {
    var words = String(text).split(/\s+/), lines = [], cur = "";
    for (var i = 0; i < words.length; i++) {
      var t = cur ? cur + " " + words[i] : words[i];
      if (t.length > max && cur) { lines.push(cur); cur = words[i]; }
      else cur = t;
    }
    if (cur) lines.push(cur);
    return lines.slice(0, 4);
  }
  function thumb(it) {
    var base = CAT_COLOR[it.category] || "#4a5568";
    var type = TYPE_COLOR[it.type] || "#4a5568";
    var lines = wrap(it.title, 20);
    var tspan = lines.map(function (l, i) {
      return '<tspan x="40" dy="' + (i === 0 ? 0 : 34) + '">' + esc(l) + "</tspan>";
    }).join("");
    var y0 = 150 - (lines.length - 1) * 17;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + base + '"/><stop offset="1" stop-color="#14161c"/></linearGradient>' +
      '<pattern id="p" width="26" height="26" patternUnits="userSpaceOnUse">' +
      '<path d="M26 0H0V26" fill="none" stroke="#ffffff" stroke-opacity="0.06"/></pattern></defs>' +
      '<rect width="640" height="400" fill="url(#g)"/>' +
      '<rect width="640" height="400" fill="url(#p)"/>' +
      '<rect x="16" y="16" width="608" height="368" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="2"/>' +
      '<text x="40" y="70" fill="#ffffff" fill-opacity="0.85" font-family="Helvetica,Arial,sans-serif" font-size="20" letter-spacing="4">' +
      esc(it.category.toUpperCase()) + "</text>" +
      '<text x="40" y="' + y0 + '" fill="#ffffff" font-family="Georgia,serif" font-size="30">' + tspan + "</text>" +
      '<rect x="40" y="330" width="150" height="34" rx="4" fill="' + type + '"/>' +
      '<text x="115" y="353" fill="#ffffff" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="18" letter-spacing="2">' +
      esc(TYPE_LABEL[it.type]) + "</text>" +
      "</svg>";
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* ---------- shared chrome ---------- */
  function headerHTML(active) {
    var nav = [
      ["videos.html", "Videos", "videos"],
      ["notes.html", "Notes", "notes"],
      ["images.html", "Images", "images"]
    ].map(function (n) {
      return '<a href="' + n[0] + '"' + (active === n[2] ? ' class="active"' : "") + ">" + n[1] + "</a>";
    }).join("");
    var menu = CATS.map(function (c) {
      return '<a href="category.html?cat=' + encodeURIComponent(c.key) + '">' + esc(c.key) + "</a>";
    }).join("");
    return '' +
      '<div class="wrap">' +
      '<div class="tier1">' +
      '<a class="brand" href="index.html" title="Home"><span class="brand-mark">R</span>' +
      '<span>Rare<small>community archive</small></span></a>' +
      '<div class="tier1-right">' +
      '<a class="about-link' + (active === "about" ? " active" : "") + '" href="about.html">About</a>' +
      '<a class="icon-btn" href="search.html" aria-label="Search" title="Search">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20.5 20.5l-4-4"/></svg></a></div></div>' +
      '<div class="tier2-bar"><nav class="tier2" aria-label="Sections">' + nav + "</nav>" +
      '<div class="cat-menu-wrap"><button type="button" class="cat-menu-btn" id="cat-menu-btn" aria-haspopup="true" aria-expanded="false">Category <span class="caret">\u25BE</span></button>' +
      '<div class="cat-menu" id="cat-menu">' + menu +
      '<div class="cat-menu-sep"></div><a href="otherside.html">Other Side Collection</a></div></div></div>' +
      "</div>";
  }
  function footerHTML() {
    return '<div class="wrap"><div class="footer-cols">' +
      "<div><h4>Rare</h4>" +
      '<p class="small">' + esc(S.tagline) + " Like a wiki for the rare and the nearly lost \u2014 anyone can contribute. " +
      "Found something rare? Send it in and it can be published here.</p>" +
      '<p style="margin-top:12px"><a class="mail" href="mailto:' + S.email + '">\u2709 ' + esc(S.email) + "</a> " +
      '<a class="wa" href="' + S.whatsappLink + '" target="_blank" rel="noopener">\uD83D\uDCAC WhatsApp ' + esc(S.whatsapp) + "</a></p></div>" +
      "<div><h4>Browse</h4><ul>" +
      '<li><a href="images.html">Rare Photos</a></li>' +
      '<li><a href="videos.html">Rare Videos</a></li>' +
      '<li><a href="notes.html">Rare Notes</a></li>' +
      '<li><a href="otherside.html">Other Side Collection</a></li>' +
      '<li><a href="search.html">Search the archive</a></li></ul></div>' +
      "<div><h4>Categories</h4><ul>" +
      CATS.map(function (c) { return '<li><a href="category.html?cat=' + encodeURIComponent(c.key) + '">' + esc(c.key) + "</a></li>"; }).join("") +
      "</ul></div></div>" +
      '<div class="footer-bottom"><span>Rare is a community project. Content is shared for study and remembrance; rights stay with their original owners.</span>' +
      '<span><a href="about.html">About Us</a> \u00b7 <a href="about.html#submit">Contribute</a></span></div></div>';
  }

  /* ---------- cards ---------- */
  function card(it) {
    var link = "item.html?id=" + encodeURIComponent(it.id);
    return '<article class="card">' +
      '<a class="thumb" href="' + link + '"><span class="badge ' + it.type + '">' + TYPE_LABEL[it.type] + "</span>" +
      '<img loading="lazy" src="' + thumb(it) + '" alt="' + esc(it.title) + '"></a>' +
      '<div class="body"><div class="cat">' + esc(it.category) + "</div>" +
      '<h3><a href="' + link + '">' + esc(it.title) + "</a></h3>" +
      "<p>" + esc(it.summary) + "</p>" +
      '<div class="meta"><span>' + esc(it.source) + "</span><span>" + timeAgo(it.addedHoursAgo) + "</span></div>" +
      "</div></article>";
  }
  function grid(items) {
    if (!items.length) return '<p class="lead">Nothing here yet. Try another search or <a href="index.html">browse everything</a>.</p>';
    return '<div class="grid">' + items.map(card).join("") + "</div>";
  }

  /* ---------- Other Side Collection ---------- */
  function ytId(url) {
    var m = String(url).match(/[?&]v=([^&]+)/) || String(url).match(/youtu\.be\/([^?]+)/);
    return m ? m[1] : "";
  }
  function platformCard(p) {
    var ext = p.external ? ' target="_blank" rel="noopener"' : "";
    var tag = p.external ? '<span class="ext">\u2197</span>' : "";
    return '<a class="platform" href="' + p.href + '"' + ext + ' style="--pc:' + (p.color || "#4a5568") + '">' +
      '<span class="p-icon">' + (p.icon || "\u25CF") + "</span>" +
      '<span class="p-body"><b>' + esc(p.name) + tag + "</b><small>" + esc(p.desc) + "</small></span></a>";
  }
  function videoCard(v) {
    var id = ytId(v.url);
    var img = id ? "https://img.youtube.com/vi/" + id + "/hqdefault.jpg" : "";
    return '<article class="yt-card">' +
      '<a class="yt-thumb" href="' + v.url + '" target="_blank" rel="noopener">' +
      (img ? '<img loading="lazy" src="' + img + '" alt="' + esc(v.title) + '">' : "") +
      '<span class="yt-play">\u25B6</span></a>' +
      '<div class="yt-body"><div class="cat">' + esc(v.year || "Rare") + "</div>" +
      "<h3>" + esc(v.title) + "</h3><p>" + esc(v.desc) + "</p>" +
      '<div class="meta"><span>' + esc(v.channel || "YouTube") + '</span>' +
      '<a href="' + v.url + '" target="_blank" rel="noopener">Watch \u2197</a></div></div></article>';
  }
  function linkCard(x) {
    return '<a class="link-card" href="' + x.url + '" target="_blank" rel="noopener">' +
      "<b>" + esc(x.title) + "</b><small>" + esc(x.desc) + '</small><span class="ext">\u2197</span></a>';
  }

  /* ---------- search engine ---------- */
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
    q = (q || "").trim();
    if (!q) return [];
    return ITEMS.map(function (it) { return { it: it, s: score(it, q) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .map(function (r) { return r.it; });
  }
  function wireSuggest() {
    var input = document.getElementById("global-search");
    var box = document.getElementById("suggest");
    var form = document.getElementById("search-form");
    if (!input || !box) return;
    function close() { box.classList.remove("open"); box.innerHTML = ""; }
    input.addEventListener("input", function () {
      var q = input.value.trim();
      if (q.length < 2) return close();
      var hits = search(q).slice(0, 6);
      if (!hits.length) { box.innerHTML = '<div class="s-empty">No matches for \u201c' + esc(q) + '\u201d</div>'; box.classList.add("open"); return; }
      box.innerHTML = hits.map(function (it) {
        return '<a href="item.html?id=' + encodeURIComponent(it.id) + '">' +
          '<span class="s-type ' + it.type + '">' + TYPE_LABEL[it.type] + "</span>" +
          "<span>" + esc(it.title) + " <span style='color:#72777d'>\u00b7 " + esc(it.category) + "</span></span></a>";
      }).join("");
      box.classList.add("open");
    });
    form.addEventListener("submit", close);
    document.addEventListener("click", function (e) { if (!form.contains(e.target)) close(); });
    input.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- page controllers ---------- */
  function mount() {
    var page = document.body.dataset.page || "home";
    var h = document.getElementById("site-header");
    var f = document.getElementById("site-footer");
    if (h) h.innerHTML = headerHTML(page);
    if (f) f.innerHTML = footerHTML();
    wireSuggest();
    var cmb = document.getElementById("cat-menu-btn"), cm = document.getElementById("cat-menu");
    if (cmb && cm) {
      cmb.addEventListener("click", function (e) { e.stopPropagation(); cm.classList.toggle("open"); });
      document.addEventListener("click", function (e) { if (e.target !== cmb && !cm.contains(e.target)) cm.classList.remove("open"); });
    }

    var params = new URLSearchParams(location.search);

    if (page === "home") {
      var el = document.getElementById("home-latest");
      if (el) el.innerHTML = grid(ITEMS.slice().sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; }).slice(0, 6));
      var rc = document.getElementById("home-recent");
      if (rc) {
        var recent = ITEMS.filter(isRecent).sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; });
        rc.innerHTML = grid(recent.length ? recent : ITEMS.slice().sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; }).slice(0, 3));
      }
    }

    function typePage(type) {
      var el = document.getElementById("type-grid");
      if (el) el.innerHTML = grid(ITEMS.filter(function (it) { return it.type === type; })
        .sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; }));
      var c = document.getElementById("type-count");
      if (c) c.textContent = ITEMS.filter(function (it) { return it.type === type; }).length;
    }
    if (page === "images") typePage("photo");
    if (page === "videos") typePage("video");
    if (page === "notes") typePage("note");

    if (page === "category") {
      var key = params.get("cat") || "History";
      var meta = CATS.filter(function (c) { return c.key === key; })[0] || CATS[0];
      document.title = meta.key + " \u2014 Rare";
      var hh = document.getElementById("cat-title"); if (hh) hh.textContent = meta.key;
      var bb = document.getElementById("cat-blurb"); if (bb) bb.textContent = meta.blurb;
      document.querySelectorAll(".cat-strip .chip").forEach(function (ch) {
        if (decodeURIComponent(ch.getAttribute("href").split("cat=")[1]) === key) ch.classList.add("active");
      });
      var list = (key === "Recent")
        ? ITEMS.filter(isRecent)
        : ITEMS.filter(function (it) { return it.category === key; });
      list = list.sort(function (a, b) { return a.addedHoursAgo - b.addedHoursAgo; });
      var g = document.getElementById("cat-grid"); if (g) g.innerHTML = grid(list);
      var cnt = document.getElementById("cat-count"); if (cnt) cnt.textContent = list.length;
    }

    if (page === "search") {
      var q = params.get("q") || "";
      var qi = document.getElementById("search-input"); if (qi) qi.value = q;
      var res = search(q);
      var out = document.getElementById("search-results");
      var sum = document.getElementById("search-summary");
      if (sum) sum.innerHTML = q
        ? "<b>" + res.length + "</b> result" + (res.length === 1 ? "" : "s") + " for \u201c" + esc(q) + "\u201d"
        : "Type a word above \u2014 try \u201cprototype\u201d, \u201cdemo\u201d, \u201cmap\u201d or \u201clost\u201d.";
      if (out) out.innerHTML = q ? grid(res) : "";
    }

    if (page === "otherside") {
      var cg = document.getElementById("collection-grid");
      if (cg) cg.innerHTML = ((window.RARE_COLLECTION || {}).platforms || []).map(platformCard).join("");
    }
    if (page === "youtube") {
      var yg = document.getElementById("yt-grid");
      if (yg) yg.innerHTML = ((window.RARE_COLLECTION || {}).youtube || []).map(videoCard).join("");
      var yc = document.getElementById("yt-count");
      if (yc) yc.textContent = ((window.RARE_COLLECTION || {}).youtube || []).length;
    }
    if (page === "wikipedia") {
      var W = (window.RARE_COLLECTION || {}).wikipedia || { pages: [], images: [] };
      var wp = document.getElementById("wiki-pages");
      if (wp) wp.innerHTML = (W.pages || []).map(linkCard).join("");
      var wi = document.getElementById("wiki-images");
      if (wi) wi.innerHTML = (W.images || []).map(linkCard).join("");
    }

    if (page === "item") {
      var it = byId(params.get("id"));
      var host = document.getElementById("item-host");
      if (!host) return;
      if (!it) { host.innerHTML = "<h1>Not found</h1><p>This entry may have moved. <a href='index.html'>Back to home</a>.</p>"; return; }
      document.title = it.title + " \u2014 Rare";
      var media = "";
      if (it.type === "photo") {
        media = '<figure class="detail-figure"><img src="' + thumb(it) + '" alt="' + esc(it.title) + '">' +
          "<figcaption>" + esc(it.title) + " \u00b7 " + esc(it.source) + "</figcaption></figure>";
      } else if (it.type === "video") {
        media = '<figure class="detail-figure"><div class="video-frame"><div class="play">\u25B6</div></div>' +
          "<figcaption>Video entry \u00b7 placeholder player. The community can attach a hosted video or embed link when rights allow.</figcaption></figure>";
      }
      var related = ITEMS.filter(function (x) { return x.category === it.category && x.id !== it.id; }).slice(0, 3);
      host.innerHTML =
        '<p class="small"><a href="index.html">Home</a> \u203a <a href="category.html?cat=' + encodeURIComponent(it.category) + '">' + esc(it.category) + "</a> \u203a " + esc(it.title) + "</p>" +
        '<div class="detail-head"><h1 style="border:none;margin:0">' + esc(it.title) + '</h1><span class="badge ' + it.type + '" style="position:static">' + TYPE_LABEL[it.type] + "</span></div>" +
        '<p class="lead">' + esc(it.summary) + "</p>" + media +
        '<table class="meta-table"><tr><th>Type</th><td>' + TYPE_LABEL[it.type] + "</td></tr>" +
        "<tr><th>Category</th><td>" + esc(it.category) + "</td></tr>" +
        "<tr><th>Origin</th><td>" + esc(it.place || "\u2014") + "</td></tr>" +
        "<tr><th>Source</th><td>" + esc(it.source) + "</td></tr>" +
        "<tr><th>Added</th><td>" + timeAgo(it.addedHoursAgo) + " (" + (isRecent(it) ? "recent" : "archived") + ")</td></tr></table>" +
        "<h2>Notes</h2><p>" + esc(it.body) + "</p>" +
        '<p class="small">Spotted something wrong, or hold a better copy? <a href="about.html#submit">Contribute a correction</a> or email ' +
        '<a href="mailto:' + S.email + '">' + esc(S.email) + "</a>.</p>" +
        (related.length ? '<h2>More in ' + esc(it.category) + "</h2>" + grid(related) : "");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
