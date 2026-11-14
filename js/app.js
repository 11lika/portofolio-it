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
  var parts = D.name.split(" "), last = parts.pop();
  $("#name").innerHTML = esc(parts.join(" ")) + ' <span class="grad">' + esc(last) + "</span>";
  $("#role").textContent = D.role;
  $("#intro").textContent = D.intro;
  $("#badge").textContent = D.badge;
  $("#chips").innerHTML = D.chips.map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("");
  var ICON = {
    github: '<path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    linkedin: '<path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>'
  };
  $("#socials").innerHTML = D.socials.filter(function (s) { return s.href && !/GANTI/.test(s.href) && ICON[s.type]; }).map(function (s) {
    return '<a href="' + esc(s.href) + '" aria-label="' + esc(s.type) + '"><svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' + ICON[s.type] + "</svg></a>";
  }).join("");
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

  // Garis bawah pada menu yang sedang aktif
  var links = document.querySelectorAll(".nav nav a");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute("href") === "#" + en.target.id) a.setAttribute("aria-current", "true");
          else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll("main section[id]").forEach(function (s) { io.observe(s); });
  }
})();
