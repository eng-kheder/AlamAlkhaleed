/* علم الخليج للسياحة والسفر — منطق الموقع (بدون مكتبات خارجية) */
(function () {
  "use strict";

  var S = window.SITE;
  var IMG = "assets/img/";
  var page = document.body.getAttribute("data-page") || "";
  var navId = document.body.getAttribute("data-nav") || page;

  /* ------------------------------------------------------------ helpers */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function fill(sel, html) { var el = $(sel); if (el) el.innerHTML = html; return el; }

  function wa(text, number) {
    return "https://wa.me/" + (number || S.whatsapp) + (text ? "?text=" + encodeURIComponent(text) : "");
  }
  function tel(intl) { return "tel:+" + intl; }

  var ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>',
    map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.1 5.55a2 2 0 0 0 1.8 0l3.65-1.83A1 1 0 0 1 21 4.62v12.76a1 1 0 0 1-.55.9l-4.56 2.27a2 2 0 0 1-1.78 0l-4.22-2.1a2 2 0 0 0-1.78 0l-3.66 1.83A1 1 0 0 1 3 19.38V6.62a1 1 0 0 1 .55-.9l4.56-2.27a2 2 0 0 1 1.78 0z"/><path d="M15 5.76v15M9 3.24v15"/></svg>',
    bus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3"/><circle cx="7" cy="18" r="2"/><path d="M9 18h5"/><circle cx="16" cy="18" r="2"/></svg>',
    plane: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    passport: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M8 17h8"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>'
  };
  function icon(name) { return ICONS[name] || ""; }

  var ORDINALS = ["اليوم الأول", "اليوم الثاني", "اليوم الثالث", "اليوم الرابع", "اليوم الخامس", "اليوم السادس", "اليوم السابع", "اليوم الثامن", "اليوم التاسع", "اليوم العاشر"];

  function hotelImages(h) {
    var list = [];
    for (var i = 1; i <= (h.photos || 0); i++) list.push("hotels/" + h.id + "/" + (i < 10 ? "0" + i : i) + ".jpg");
    return list;
  }
  function stars(n) {
    if (!n) return "";
    var s = "";
    for (var i = 0; i < n; i++) s += icon("star");
    return '<span class="stars" aria-label="' + n + ' نجوم">' + s + "</span>";
  }
  function latin(text) { return '<bdi dir="ltr">' + esc(text) + "</bdi>"; }

  /* ------------------------------------------------------------ media */
  function emptyMedia(label, ratio) {
    return '<div class="media media--empty ' + (ratio || "") + '"><img class="media__mark" src="' + IMG + 'logo.png" alt=""><span>' + label + "</span></div>";
  }
  function media(src, alt, ratio, label) {
    if (!src) return emptyMedia(label || esc(alt), ratio);
    return '<div class="media ' + (ratio || "") + '"><img src="' + IMG + esc(src) + '" alt="' + esc(alt) +
      '" loading="lazy" decoding="async" data-fallback="' + esc(alt) + '"></div>';
  }
  // صورة مفقودة => التصميم البديل بدلاً من أيقونة الصورة المكسورة
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (!img || img.tagName !== "IMG" || !img.hasAttribute("data-fallback")) return;
    var box = img.closest(".media, .gallery__main");
    if (box) {
      box.classList.add("media", "media--empty");
      box.innerHTML = '<img class="media__mark" src="' + IMG + 'logo.png" alt=""><span>' + esc(img.getAttribute("data-fallback")) + "</span>";
    } else {
      img.remove();
    }
  }, true);

  /* ------------------------------------------------------------ cards */
  function card(o) {
    return '<a class="card' + (o.cls ? " " + o.cls : "") + '" href="' + o.href + '"' + (o.cat ? ' data-cat="' + o.cat + '"' : "") + ">" +
      '<div class="card__media">' + media(o.image, o.alt || o.plainTitle || "", o.ratio, o.title) +
      (o.badge ? '<span class="card__badge">' + o.badge + "</span>" : "") + "</div>" +
      '<div class="card__body">' +
      (o.kicker ? '<span class="card__kicker">' + o.kicker + "</span>" : "") +
      '<h3 class="card__title">' + o.title + "</h3>" +
      (o.text ? '<p class="card__text">' + esc(o.text) + "</p>" : "") +
      '<span class="card__more">' + (o.more || "عرض التفاصيل") + icon("arrow") + "</span>" +
      "</div></a>";
  }

  function serviceCard(s) {
    return card({ href: "#service-" + s.id, image: s.image, title: esc(s.title), plainTitle: s.title, text: s.summary,
      kicker: '<span class="kicker-icon">' + icon(s.icon) + "</span>" });
  }
  function carCard(c) {
    return card({ href: "#car-" + c.id, image: c.images[0], title: latin(c.name), plainTitle: c.name, ratio: "ratio-portrait",
      cls: "card--car", more: "التفاصيل والحجز" });
  }
  function hotelCard(h) {
    return card({ href: "#hotel-" + h.id, image: hotelImages(h)[0], title: esc(h.name), plainTitle: h.name, cat: h.city || "other",
      kicker: (h.location || h.city) ? icon("pin") + esc(h.location || h.city) : "",
      badge: h.stars ? h.stars + " نجوم" : "", more: "الصور والاستفسار" });
  }
  function visaCard(v) {
    return card({ href: "#visa-" + v.id, image: v.image, title: esc(v.title), plainTitle: v.title, ratio: "ratio-square", more: "استفسر الآن" });
  }
  function tripCard(t) {
    var cat = findCat(t.category);
    return card({ href: "#trip-" + t.id, image: t.image, title: esc(t.name), plainTitle: t.name, text: t.summary, cat: t.category,
      kicker: cat ? esc(cat.name) : "", badge: t.duration ? icon("clock") + esc(t.duration) : "", more: "برنامج الرحلة" });
  }
  function tripCategoryCard(c) {
    return card({ href: "#tripcat-" + c.id, image: c.image, title: esc(categoryTitle(c)), plainTitle: categoryTitle(c), cat: c.id, cls: "card--inquiry",
      text: categoryText(c), kicker: esc(c.name), more: "استفسر عن البرامج" });
  }
  function placeCard(p) {
    return card({ href: "#place-" + p.id, image: p.image, title: esc(p.name), plainTitle: p.name, text: p.text, kicker: p.subtitle ? esc(p.subtitle) : "", more: "اقرأ المزيد" });
  }
  function govCard(g) {
    return card({ href: "syria.html#" + g.id, image: g.image, title: esc(g.name), plainTitle: g.name, text: g.intro, more: "استكشف المحافظة" });
  }

  function findCat(id) { return S.tripCategories.filter(function (c) { return c.id === id; })[0]; }
  function groupName(id) { var g = S.tripGroups.filter(function (x) { return x.id === id; })[0]; return g ? esc(g.name) : ""; }
  function categoryTitle(c) {
    if (c.group === "syria" && c.id !== "multi") return "رحلات " + c.name;
    if (c.group === "honeymoon") return "رحلات شهر العسل";
    if (c.group === "abroad") return "رحلات " + c.name;
    return c.name;
  }
  function categoryText(c) {
    return "تواصلوا معنا للاستفسار عن برامج " + categoryTitle(c) + " المتاحة وتفاصيلها.";
  }

  /* ------------------------------------------------------------ modal */
  var dialog = document.createElement("dialog");
  dialog.className = "modal";
  dialog.setAttribute("aria-labelledby", "modal-title");
  dialog.innerHTML = '<button class="modal__close" type="button" aria-label="إغلاق">' + icon("close") + '</button><div class="modal__scroll"></div>';
  document.body.appendChild(dialog);
  var modalContent = $(".modal__scroll", dialog);

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.closest(".modal__close")) dialog.close();
    var thumb = e.target.closest("[data-thumb]");
    if (thumb) {
      var main = $(".gallery__main img", dialog);
      if (main) {
        main.src = thumb.getAttribute("data-thumb");
        var bg = $(".gallery__bg", dialog);
        if (bg) bg.style.backgroundImage = "url('" + thumb.getAttribute("data-thumb") + "')";
      }
      $all("[data-thumb]", dialog).forEach(function (b) { b.setAttribute("aria-current", b === thumb ? "true" : "false"); });
    }
  });
  dialog.addEventListener("close", function () {
    if (REG[currentHash()]) history.replaceState(null, "", location.pathname + location.search);
  });

  function openModal(html, variant) {
    modalContent.innerHTML = html;
    dialog.className = "modal" + (variant ? " modal--" + variant : "");
    modalContent.scrollTop = 0;
    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }

  function gallery(images, alt) {
    if (!images || !images.length) return '<div class="gallery">' + emptyMedia(esc(alt), "gallery__main") + "</div>";
    var html = '<div class="gallery"><div class="gallery__main"><span class="gallery__bg" style="background-image:url(\'' + IMG + esc(images[0]) + '\')"></span><img src="' + IMG + esc(images[0]) + '" alt="' + esc(alt) + '" data-fallback="' + esc(alt) + '"></div>';
    if (images.length > 1) {
      html += '<div class="gallery__thumbs" aria-label="صور إضافية">';
      images.forEach(function (src, i) {
        html += '<button type="button" data-thumb="' + IMG + esc(src) + '" aria-current="' + (i === 0) + '" aria-label="صورة ' + (i + 1) + '"><img src="' + IMG + esc(src) + '" alt="" loading="lazy"></button>';
      });
      html += "</div>";
    }
    return html + "</div>";
  }

  function phonesHtml(msg) {
    return '<ul class="phones">' + S.phones.map(function (p) {
      return '<li class="phone"><a href="' + tel(p.intl) + '" class="phone__call">' + icon("phone") + '<bdi dir="ltr">' + esc(p.local) + "</bdi></a>" +
        '<a href="' + wa(msg, p.intl) + '" target="_blank" rel="noopener" class="phone__wa" aria-label="واتساب ' + esc(p.local) + '">' + icon("whatsapp") + "</a></li>";
    }).join("") + "</ul>";
  }

  function contactBox(opts) {
    var html = '<div class="contact-box"><div class="actions">';
    if (opts.book) html += '<a class="btn btn--primary" href="' + wa(opts.book) + '" target="_blank" rel="noopener">احجز الآن</a>';
    html += '<a class="btn btn--wa" href="' + wa(opts.ask) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "تواصل عبر واتساب</a>";
    if (opts.link) html += '<a class="btn btn--outline" href="' + opts.link.href + '">' + esc(opts.link.label) + icon("arrow") + "</a>";
    html += '</div><p class="contact-box__label">أو اتصلوا بنا مباشرة:</p>' + phonesHtml(opts.ask) + "</div>";
    return html;
  }

  function paragraphs(list) {
    return (list || []).map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function bullets(list) {
    if (!list || !list.length) return "";
    return '<ul class="ticks">' + list.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("") + "</ul>";
  }

  /* modal builders */
  function serviceModal(s) {
    var head = '<span class="modal__kicker"><span class="kicker-icon">' + icon(s.icon) + "</span>خدماتنا</span>";
    return gallery(s.image ? [s.image] : [], s.title) +
      '<div class="modal__body">' + head + '<h2 id="modal-title">' + esc(s.title) + "</h2>" +
      '<div class="prose">' + paragraphs(s.details) + "</div>" + bullets(s.points) +
      contactBox({ ask: "مرحباً، أرغب بالاستفسار عن خدمة: " + s.title, link: s.link }) + "</div>";
  }

  function carModal(c) {
    var desc = c.description
      ? '<div class="prose"><p>' + esc(c.description) + "</p></div>"
      : '<div class="prose"><p>للاستفسار عن توفر السيارة وشروط ومدة التأجير، تواصلوا معنا عبر واتساب أو الاتصال المباشر.</p></div>';
    return gallery(c.images, c.name) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("car") + 'تأجير السيارات</span><h2 id="modal-title">' + latin(c.name) + "</h2>" + desc +
      contactBox({ book: "مرحباً، أرغب بحجز سيارة: " + c.name, ask: "مرحباً، أرغب بالاستفسار عن تأجير سيارة: " + c.name }) + "</div>";
  }

  function hotelModal(h) {
    var meta = [];
    if (h.city || h.location) meta.push(icon("pin") + esc(h.location || h.city));
    if (h.stars) meta.push(stars(h.stars) + h.stars + " نجوم");
    return gallery(hotelImages(h), h.name) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("bed") + 'حجوزات الفنادق والإقامات</span><h2 id="modal-title">' + esc(h.name) + "</h2>" +
      (meta.length ? '<p class="meta">' + meta.map(function (m) { return "<span>" + m + "</span>"; }).join("") + "</p>" : "") +
      '<div class="prose">' + (h.note ? "<p>" + esc(h.note) + "</p>" : "") + "<p>للاستفسار عن الحجز في " + esc(h.name) + " والغرف المتاحة، تواصلوا معنا.</p></div>" +
      contactBox({ ask: "مرحباً، أرغب بالاستفسار عن حجز في " + h.name + (h.city ? " - " + h.city : "") }) + "</div>";
  }

  function visaModal(v) {
    return gallery([v.image], v.title) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("passport") + 'التأشيرات وموافقات الدخول</span><h2 id="modal-title">' + esc(v.title) + "</h2>" +
      bullets(v.points) + '<div class="prose"><p>للاستفسار عن الأوراق المطلوبة ومدة المعاملة، تواصلوا معنا.</p></div>' +
      contactBox({ ask: "مرحباً، أرغب بالاستفسار عن: " + v.title }) + "</div>";
  }

  function tripModal(t) {
    var cat = findCat(t.category);
    var title = t.fullName || t.name;
    var meta = [];
    if (t.duration) meta.push(icon("clock") + "المدة: " + esc(t.duration));
    if (cat) meta.push(icon("pin") + esc(cat.name));
    var info = "";
    if (t.departure) info += '<div class="info-row"><strong>الانطلاق</strong><span>' + esc(t.departure) + "</span></div>";
    if (t.route) info += '<div class="info-row"><strong>مسار الرحلة</strong><span>' + esc(t.route) + "</span></div>";
    if (t.hotel) {
      info += '<div class="info-row"><strong>الإقامة</strong><span>' + esc(t.hotel.name) +
        (t.hotel.id && hotelById(t.hotel.id) ? ' <a class="link" href="hotels.html#hotel-' + t.hotel.id + '">صور الفندق</a>' : "") + "</span></div>";
    }
    var days = '<div class="days">' + t.days.map(function (d, i) {
      return '<section class="day"><header class="day__head"><span class="day__num">' + (ORDINALS[i] || "اليوم " + (i + 1)) + '</span><h3 class="day__title">' + esc(d.title) + "</h3></header>" +
        '<ul class="timeline">' + d.items.map(function (it) {
          return "<li" + (it[0] ? "" : ' class="no-time"') + ">" + (it[0] ? '<time dir="ltr">' + esc(it[0]) + "</time>" : "") + "<span>" + esc(it[1]) + "</span></li>";
        }).join("") + "</ul></section>";
    }).join("") + "</div>";
    return gallery(t.image ? [t.image] : [], t.name) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("map") + 'الرحلات السياحية</span><h2 id="modal-title">' + esc(title) + "</h2>" +
      (meta.length ? '<p class="meta">' + meta.map(function (m) { return "<span>" + m + "</span>"; }).join("") + "</p>" : "") +
      (info ? '<div class="info">' + info + "</div>" : "") +
      '<h3 class="subhead">برنامج الرحلة</h3>' + days +
      (t.flexible ? '<p class="note">' + icon("info") + "<span>" + esc(S.flexibleNote) + "</span></p>" : "") +
      contactBox({ book: "مرحباً، أرغب بحجز " + title + (t.duration ? " (" + t.duration + ")" : ""), ask: "مرحباً، أرغب بالاستفسار عن " + title }) + "</div>";
  }

  function tripCategoryModal(c) {
    var t = categoryTitle(c);
    return gallery(c.image ? [c.image] : [], t) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("map") + groupName(c.group) + '</span><h2 id="modal-title">' + esc(t) + "</h2>" +
      '<div class="prose"><p>' + esc(categoryText(c)) + "</p></div>" +
      contactBox({ book: "مرحباً، أرغب بحجز " + t, ask: "مرحباً، أرغب بالاستفسار عن " + t }) + "</div>";
  }

  function placeModal(p, g) {
    return gallery(p.image ? [p.image] : [], p.name) +
      '<div class="modal__body"><span class="modal__kicker">' + icon("pin") + esc(g.name) + '</span><h2 id="modal-title">' + esc(p.name) + "</h2>" +
      (p.subtitle ? '<p class="subtitle">' + esc(p.subtitle) + "</p>" : "") +
      '<div class="prose"><p>' + esc(p.text) + "</p></div>" +
      contactBox({ ask: "مرحباً، أرغب بالاستفسار عن رحلة إلى " + p.name, link: { href: "trips.html", label: "الرحلات السياحية" } }) + "</div>";
  }

  function hotelById(id) { return S.hotels.filter(function (h) { return h.id === id; })[0]; }

  /* registry: hash -> modal */
  var REG = {};
  S.services.forEach(function (s) { REG["service-" + s.id] = function () { openModal(serviceModal(s)); }; });
  S.cars.forEach(function (c) { REG["car-" + c.id] = function () { openModal(carModal(c), "split"); }; });
  S.hotels.forEach(function (h) { REG["hotel-" + h.id] = function () { openModal(hotelModal(h)); }; });
  S.visas.forEach(function (v) { REG["visa-" + v.id] = function () { openModal(visaModal(v), "split"); }; });
  S.trips.forEach(function (t) { REG["trip-" + t.id] = function () { openModal(tripModal(t)); }; });
  S.tripCategories.forEach(function (c) { REG["tripcat-" + c.id] = function () { openModal(tripCategoryModal(c)); }; });
  S.governorates.forEach(function (g) {
    g.places.forEach(function (p) { REG["place-" + p.id] = function () { openModal(placeModal(p, g)); }; });
  });

  function currentHash() {
    try { return decodeURIComponent(location.hash.slice(1)); } catch (e) { return location.hash.slice(1); }
  }
  function route() {
    var fn = REG[currentHash()];
    if (fn) fn();
    else if (dialog.open) dialog.close();
  }
  window.addEventListener("hashchange", route);

  /* ------------------------------------------------------------ header & footer */
  var NAV = [
    { id: "home", href: "index.html", label: "الرئيسية" },
    { id: "about", href: "about.html", label: "من نحن" },
    { id: "services", href: "services.html", label: "خدماتنا" },
    { id: "cars", href: "cars.html", label: "تأجير السيارات" },
    { id: "trips", href: "trips.html", label: "الرحلات السياحية" },
    { id: "syria", href: "syria.html", label: "معلومات سياحية في سوريا" },
    { id: "contact", href: "contact.html", label: "تواصل معنا" }
  ];

  function renderHeader() {
    var el = $("#site-header");
    if (!el) return;
    el.outerHTML =
      '<header class="site-header"><div class="container site-header__inner">' +
      '<a class="brand" href="index.html" aria-label="' + esc(S.name) + ' - الرئيسية"><img src="' + IMG + 'logo.png" alt="' + esc(S.name) + '" width="130" height="64"></a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="main-nav" aria-label="القائمة">' + icon("menu") + "</button>" +
      '<nav class="nav" id="main-nav" aria-label="القائمة الرئيسية"><ul>' +
      NAV.map(function (n) {
        return '<li><a href="' + n.href + '"' + (n.id === navId ? ' aria-current="page"' : "") + ">" + n.label + "</a></li>";
      }).join("") +
      '</ul><a class="btn btn--wa btn--sm nav__cta" href="' + wa() + '" target="_blank" rel="noopener">' + icon("whatsapp") + "واتساب</a></nav>" +
      "</div></header>";

    var toggle = $(".nav-toggle"), nav = $("#main-nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.innerHTML = icon(open ? "close" : "menu");
    });
  }

  function renderFooter() {
    var el = $("#site-footer");
    if (!el) return;
    var social = S.social && S.social.length
      ? '<div class="footer__col"><h3>تابعونا</h3><ul class="footer__links">' + S.social.map(function (s) {
          return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + "</a></li>";
        }).join("") + "</ul></div>"
      : "";
    el.outerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer__grid">' +
      '<div class="footer__col footer__about"><a class="footer__logo" href="index.html"><img src="' + IMG + 'logo.png" alt="' + esc(S.name) + '" width="130" height="64"></a>' +
      "<p><strong>" + esc(S.name) + "</strong></p>" +
      '<p class="footer__license">' + icon("shield") + "<span>" + esc(S.license) + "</span></p></div>" +
      '<div class="footer__col"><h3>روابط سريعة</h3><ul class="footer__links">' +
      NAV.concat([{ href: "hotels.html", label: "الفنادق والمنتجعات" }, { href: "visas.html", label: "التأشيرات" }]).map(function (n) {
        return '<li><a href="' + n.href + '">' + n.label + "</a></li>";
      }).join("") + "</ul></div>" +
      '<div class="footer__col"><h3>اتصلوا بنا</h3><ul class="footer__phones">' + S.phones.map(function (p) {
        return '<li><a href="' + tel(p.intl) + '">' + icon("phone") + '<bdi dir="ltr">' + esc(p.local) + "</bdi></a>" +
          '<a class="footer__wa" href="' + wa("", p.intl) + '" target="_blank" rel="noopener" aria-label="واتساب ' + esc(p.local) + '">' + icon("whatsapp") + "</a></li>";
      }).join("") + "</ul>" +
      (S.address ? '<p class="footer__address">' + icon("pin") + "<span>" + esc(S.address) + "</span></p>" : "") + "</div>" +
      social +
      "</div>" +
      '<div class="footer__bottom"><span>© ' + new Date().getFullYear() + " " + esc(S.name) + ". جميع الحقوق محفوظة.</span></div>" +
      "</div></footer>" +
      '<a class="wa-float" href="' + wa() + '" target="_blank" rel="noopener" aria-label="تواصل عبر واتساب">' + icon("whatsapp") + "</a>";
  }

  /* ------------------------------------------------------------ filters */
  function setupFilter(chipsSel, itemsSel, groupSel) {
    var chips = $(chipsSel);
    if (!chips) return;
    chips.addEventListener("click", function (e) {
      var chip = e.target.closest("[data-filter]");
      if (!chip) return;
      var f = chip.getAttribute("data-filter");
      $all("[data-filter]", chips).forEach(function (c) { c.setAttribute("aria-pressed", c === chip ? "true" : "false"); });
      $all(itemsSel).forEach(function (item) {
        item.hidden = !(f === "all" || item.getAttribute("data-cat") === f);
      });
      if (groupSel) {
        $all(groupSel).forEach(function (g) {
          g.hidden = !$all(itemsSel, g).some(function (i) { return !i.hidden; });
        });
      }
    });
  }
  function chip(value, label, pressed) {
    return '<button type="button" class="chip" data-filter="' + esc(value) + '" aria-pressed="' + (pressed ? "true" : "false") + '">' + label + "</button>";
  }

  /* ------------------------------------------------------------ pages */
  var PAGES = {
    home: function () {
      fill("#home-services", S.services.map(serviceCard).join(""));
      fill("#home-cars", S.cars.filter(function (c) { return c.featured; }).map(carCard).join(""));
      fill("#home-trips", S.trips.map(tripCard).join(""));
      fill("#home-regions", S.governorates.map(govCard).join(""));
    },

    about: function () {
      fill("#about-text", paragraphs(S.about));
      fill("#about-services", S.services.map(function (s) {
        return '<li><a href="services.html#service-' + s.id + '"><span class="kicker-icon">' + icon(s.icon) + "</span>" + esc(s.title) + "</a></li>";
      }).join(""));
    },

    services: function () {
      fill("#services-grid", S.services.map(serviceCard).join(""));
    },

    cars: function () {
      fill("#cars-grid", S.cars.map(carCard).join(""));
    },

    hotels: function () {
      var cities = S.hotelCities.filter(function (c) { return S.hotels.some(function (h) { return h.city === c; }); });
      fill("#hotel-filters", chip("all", "الكل", true) + cities.map(function (c) { return chip(c, esc(c)); }).join(""));
      fill("#hotels-grid", S.hotels.map(hotelCard).join(""));
      setupFilter("#hotel-filters", "#hotels-grid .card");
    },

    visas: function () {
      fill("#visas-grid", S.visas.map(visaCard).join(""));
    },

    trips: function () {
      fill("#trip-filters", chip("all", "الكل", true) + S.tripCategories.map(function (c) { return chip(c.id, esc(c.name)); }).join(""));
      fill("#trip-groups", S.tripGroups.map(function (g) {
        var cats = S.tripCategories.filter(function (c) { return c.group === g.id; });
        if (!cats.length) return "";
        var cards = cats.map(function (c) {
          var trips = S.trips.filter(function (t) { return t.category === c.id; });
          return trips.length ? trips.map(tripCard).join("") : tripCategoryCard(c);
        }).join("");
        return '<section class="trip-group" aria-labelledby="g-' + g.id + '"><div class="section-head"><div><h2 id="g-' + g.id + '">' + esc(g.name) + "</h2><p>" + esc(g.description) + '</p></div></div><div class="grid">' + cards + "</div></section>";
      }).join(""));
      setupFilter("#trip-filters", "#trip-groups .card", "#trip-groups .trip-group");
    },

    syria: function () {
      fill("#gov-nav", S.governorates.map(function (g) { return '<a class="chip" href="#' + g.id + '">' + esc(g.name) + "</a>"; }).join(""));
      fill("#governorates", S.governorates.map(function (g, i) {
        var places = g.places.map(placeCard).join("");
        if (g.tripLink) {
          var t = S.trips.filter(function (x) { return x.id === g.tripLink; })[0];
          if (t) places += tripCard(t);
        }
        return '<section class="gov' + (i % 2 ? " section--soft" : "") + '" id="' + g.id + '"><div class="container">' +
          '<div class="gov__head' + (g.image ? "" : " gov__head--text") + '">' +
          (g.image ? '<div class="gov__img"><img src="' + IMG + esc(g.image) + '" alt="' + esc(g.name) + '" loading="lazy" data-fallback="' + esc(g.name) + '"></div>' : "") +
          '<div><span class="eyebrow">معلومات سياحية</span><h2>' + esc(g.name) + "</h2><p>" + esc(g.intro) + "</p></div></div>" +
          (places ? '<div class="grid">' + places + "</div>" : "") +
          "</div></section>";
      }).join(""));
    },

    contact: function () {
      fill("#contact-phones", S.phones.map(function (p, i) {
        return '<div class="phone-card"><span class="phone-card__label">رقم ' + (i + 1) + '</span><a class="phone-card__num" href="' + tel(p.intl) + '"><bdi dir="ltr">' + esc(p.local) + "</bdi></a>" +
          '<div class="actions"><a class="btn btn--primary btn--sm" href="' + tel(p.intl) + '">' + icon("phone") + "اتصال</a>" +
          '<a class="btn btn--wa btn--sm" href="' + wa("", p.intl) + '" target="_blank" rel="noopener">' + icon("whatsapp") + "واتساب</a></div></div>";
      }).join(""));
      if (S.address) fill("#contact-address", icon("pin") + "<div><strong>العنوان</strong><p>" + esc(S.address) + "</p></div>");
      else { var a = $("#contact-address"); if (a) a.remove(); }
      if (S.social && S.social.length) {
        fill("#contact-social", "<strong>تابعونا</strong><ul>" + S.social.map(function (s) {
          return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.name) + "</a></li>";
        }).join("") + "</ul>");
      } else { var so = $("#contact-social"); if (so) so.remove(); }

      var sel = $("#cf-service");
      if (sel) sel.innerHTML += S.services.map(function (s) { return "<option>" + esc(s.title) + "</option>"; }).join("");
      var form = $("#contact-form");
      if (form) form.addEventListener("submit", function (e) {
        e.preventDefault();
        var d = new FormData(form);
        var lines = ["مرحباً، أنا " + (d.get("name") || "").trim()];
        if (d.get("service")) lines.push("الخدمة: " + d.get("service"));
        if ((d.get("phone") || "").trim()) lines.push("رقمي: " + d.get("phone").trim());
        if ((d.get("message") || "").trim()) lines.push(d.get("message").trim());
        window.open(wa(lines.join("\n"), d.get("to") || S.whatsapp), "_blank", "noopener");
      });
      var to = $("#cf-to");
      if (to) to.innerHTML = S.phones.map(function (p) { return '<option value="' + p.intl + '">' + esc(p.local) + "</option>"; }).join("");
    }
  };

  /* ------------------------------------------------------------ boot */
  renderHeader();
  renderFooter();
  $all("[data-icon]").forEach(function (el) { el.outerHTML = icon(el.getAttribute("data-icon")); });
  if (PAGES[page]) PAGES[page]();
  route();
})();
