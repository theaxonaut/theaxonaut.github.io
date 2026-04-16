/* ═══════════════════════════════════════════════════════════════
   components.js — Shared components across all pages
   Nav, Footer, Mobile Menu, Social Links
═══════════════════════════════════════════════════════════════ */

var Components = (function () {

  /* ── HELPERS ── */

  function currentPageFile() {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file;
  }

  function getVisibleNavItems() {
    var visible = [];
    for (var i = 0; i < SITE.nav.length; i++) {
      var item = SITE.nav[i];
      // if this nav item maps to a section, check visibility
      var vis = SITE.sections.visibility[item.id];
      if (vis === false) continue; // explicitly hidden
      visible.push(item);
    }
    return visible;
  }

  function buildHref(item, page) {
    if (item.page === page) {
      // same page → anchor link
      return '#' + item.id;
    } else {
      // different page → full link with anchor
      return item.page + '#' + item.id;
    }
  }

  function padNum(n) {
    return n < 10 ? '0' + n : '' + n;
  }


  /* ── SOCIAL LINKS ── */

  function buildSocialHTML(className) {
    var cls = className || 'contact-socials';
    var html = '<div class="' + cls + '">';
    SITE.global.social.forEach(function (s) {
      html += '<a href="' + s.url + '" target="_blank">' + s.label + '</a>';
    });
    html += '</div>';
    return html;
  }


  /* ── NAV ── */

  function buildNav(containerId) {
    var container = document.getElementById(containerId || 'nav-container');
    if (!container) return;

    var page  = currentPageFile();
    var items = getVisibleNavItems();

    var html = '<nav id="nav">';
    html += '<a href="index.html#home" class="nav-logo">' + SITE.global.siteName + '</a>';

    // Desktop links
    html += '<div class="nav-right">';
    items.forEach(function (item, i) {
      var href = buildHref(item, page);
      html += '<a href="' + href + '" class="nav-link">';
      html += '<sup>' + padNum(i + 1) + '</sup>';
      html += item.label;
      html += '</a>';
    });

    // Sound button
    html += '<button id="sound-btn" class="nav-sound" aria-label="Toggle sound" onclick="SoundEngine.toggle()">';
    html += '<span class="sound-icon sound-off-icon">';
    html += '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5H4.5L7.5 2.5V11.5L4.5 9H2V5Z" stroke="currentColor" stroke-width="1" fill="none"/><line x1="10" y1="4" x2="12.5" y2="6.5" stroke="currentColor" stroke-width="1"/><line x1="12.5" y1="4" x2="10" y2="6.5" stroke="currentColor" stroke-width="1"/></svg>';
    html += '</span>';
    html += '<span class="sound-icon sound-on-icon" style="display:none;">';
    html += '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5H4.5L7.5 2.5V11.5L4.5 9H2V5Z" stroke="currentColor" stroke-width="1" fill="none"/><path d="M9.5 4.5C10.5 5.2 11 6.05 11 7C11 7.95 10.5 8.8 9.5 9.5" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M10.5 3C12 4.1 13 5.5 13 7C13 8.5 12 9.9 10.5 11" stroke="currentColor" stroke-width="1" fill="none" stroke-linecap="round"/></svg>';
    html += '</span>';
    html += '<span class="sound-label">Sound</span>';
    html += '</button>';
    html += '</div>';

    // Hamburger
    html += '<button id="hamburger" aria-label="Menu" onclick="Components.toggleMenu()">';
    html += '<span></span><span></span><span></span>';
    html += '</button>';
    html += '</nav>';

    // Mobile menu overlay
    html += '<div id="menu-overlay">';
    items.forEach(function (item, i) {
      var href = buildHref(item, page);
      html += '<a href="' + href + '" class="menu-link" onclick="Components.toggleMenu()">';
      html += '<span class="menu-link-num">' + padNum(i + 1) + '</span>';
      html += item.label;
      html += '</a>';
    });
    html += '<div class="menu-social">';
    SITE.global.social.forEach(function (s) {
      html += '<a href="' + s.url + '" target="_blank">' + s.label + '</a>';
    });
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
  }


  /* ── FOOTER ── */

  function buildFooter(containerId) {
    var container = document.getElementById(containerId || 'footer-container');
    if (!container) return;

    var html = '<div class="panel-footer">';
    html += '<span class="footer-copy">' + SITE.global.footerCopy + '</span>';
    html += '<div class="footer-links">';
    html += '<a href="index.html#home">Back to top ↑</a>';
    SITE.global.social.forEach(function (s) {
      html += '<a href="' + s.url + '" target="_blank">' + s.label + '</a>';
    });
    html += '</div>';
    html += '</div>';

    container.innerHTML = html;
  }


  /* ── MENU TOGGLE ── */

  function toggleMenu() {
    document.body.classList.toggle('menu-open');
  }


  /* ── EMAIL DECODE ── */

  function decodeEmail() {
    var encoded = SITE.global.email.p1 + SITE.global.email.p2;
    var rot13 = encoded.replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode(
        (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
      );
    });
    return rot13.split('').reverse().join('');
  }


  /* ── SOCIAL HTML BUILDER ── */

  function socialHTML() {
    return buildSocialHTML('contact-socials');
  }


  /* ── PUBLIC API ── */

  return {
    buildNav:     buildNav,
    buildFooter:  buildFooter,
    toggleMenu:   toggleMenu,
    decodeEmail:  decodeEmail,
    socialHTML:    socialHTML,
    getVisibleNavItems: getVisibleNavItems,
    padNum:       padNum
  };

})();