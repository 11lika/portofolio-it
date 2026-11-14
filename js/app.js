(function () {
  var D = window.DATA, $ = function (s) { return document.querySelector(s); };
  var esc = function (t) {
    return String(t == null ? "" : t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  // Gambar dengan cadangan: kalau file tidak ada, tampil kotak berisi teks.
  var pic = function (src, alt, cls) {
    if (!src) return '<div class="ph">' + esc(alt) + "</div>";
    return '<img class="' + cls + '" src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" ' +
      "onerror=\"this.outerHTML='<div class=&quot;ph&quot;>' + this.alt + '</div>'\">";
  };

  document.title = D.name + " | Portofolio";
  $("#brand").textContent = D.name;
  $("#name").textContent = D.name;
  $("#role").textContent = D.role;
  $("#intro").textContent = D.intro;
  $("#cta").textContent = D.cta;
  $("#foot").textContent = "© " + new Date().getFullYear() + " " + D.name;

  var initials = D.name.split(" ").slice(0, 2).map(function (w) { return w[0]; }).join("");
  $("#photo").innerHTML = esc(initials) +
    (D.photo ? '<img src="' + esc(D.photo) + '" alt="Foto ' + esc(D.name) + '" onerror="this.remove()">' : "");

  $("#about").innerHTML = D.about.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");

  $("#p-proyek").innerHTML = D.projects.map(function (p, i) {
    return '<article class="card">' + pic(p.img, p.title, "thumb") +
      '<div class="cb"><h3>' + esc(p.title) + "</h3><p>" + esc(p.summary) + "</p>" +
      '<p class="tags">' + p.stack.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</p>" +
      '<button class="btn" data-proj="' + i + '">Lihat detail</button></div></article>';
  }).join("");

  $("#p-sertifikat").innerHTML = D.certificates.length
    ? D.certificates.map(function (c, i) {
        return '<button data-cert="' + i + '" aria-label="Buka ' + esc(c.title) + '">' +
          pic(c.img, c.title, "thumb") + '<div class="cap">' + esc(c.title) + "</div></button>";
      }).join("")
    : '<p class="muted">Belum ada sertifikat.</p>';

  $("#p-skill").innerHTML = D.skills.map(function (g) {
    return "<section><h3>" + esc(g.group) + '</h3><p class="tags">' +
      g.items.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</p></section>";
  }).join("");

  $("#contacts").innerHTML = D.contacts.map(function (c) {
    return "<li>" + esc(c.label) + ': <a href="' + esc(c.href) + '">' + esc(c.text) + "</a></li>";
  }).join("");

  // Tab
  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (t) {
    t.addEventListener("click", function () {
      tabs.forEach(function (x) {
        var on = x === t;
        x.setAttribute("aria-selected", on);
        $("#" + x.getAttribute("aria-controls")).hidden = !on;
      });
    });
  });

  // Dialog detail proyek dan sertifikat
  var dlg = $("#dlg");
  var show = function (html) {
    dlg.innerHTML = '<div class="dc">' + html + '<button class="btn" id="x">Tutup</button></div>';
    dlg.showModal();
    $("#x").addEventListener("click", function () { dlg.close(); });
  };
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-proj],[data-cert]");
    if (!b) return;
    if (b.dataset.proj !== undefined) {
      var p = D.projects[b.dataset.proj];
      var links = (p.link ? '<a class="btn pri" href="' + esc(p.link) + '">Buka situs</a>' : "") +
        (p.github ? ' <a class="btn" href="' + esc(p.github) + '">Kode di GitHub</a>' : "");
      show(pic(p.img, p.title, "big") + "<h3>" + esc(p.title) + "</h3><p>" + esc(p.description) + "</p>" +
        "<ul>" + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<p class="tags">' + p.stack.map(function (s) { return "<span>" + esc(s) + "</span>"; }).join("") + "</p>" +
        (links ? '<div class="row">' + links + "</div>" : ""));
    } else {
      var c = D.certificates[b.dataset.cert];
      show(pic(c.img, c.title, "big") + "<h3>" + esc(c.title) + "</h3>");
    }
  });
})();
