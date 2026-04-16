/* ═══════════════════════════════════════════════════════════════
   renderers.js — Builds each section from SITE data
═══════════════════════════════════════════════════════════════ */

var Renderers = (function () {

  /* ── HELPERS ── */

  function sectionNum(sectionId) {
    var visible = SITE.sections.order.filter(function (id) {
      return id !== 'hero' && SITE.sections.visibility[id] !== false;
    });
    var idx = visible.indexOf(sectionId);
    return idx >= 0 ? Components.padNum(idx + 1) : '';
  }

  function sectionZIndex(sectionId) {
    var idx = SITE.sections.order.indexOf(sectionId);
    return (idx + 1) * 100;
  }


  /* ── HERO ── */

  function renderHero(container) {
    var h = SITE.hero;
    var letters = h.name.split('').map(function (char, i) {
      var delay = (0.3 + i * 0.06).toFixed(2);
      return '<span class="letter" style="--d:' + delay + 's">' + char + '</span>';
    }).join('');

    container.innerHTML =
      '<div class="slot" id="home" style="z-index:' + sectionZIndex('hero') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="hero-inner">' +
              '<div class="hero-grid-lines"></div>' +
              '<div class="hero-eyebrow" id="hero-eyebrow">' + h.eyebrow + '</div>' +
              '<div class="hero-name" aria-label="' + h.name + '">' + letters + '</div>' +
              '<div class="hero-bottom" id="hero-bottom">' +
                '<p class="hero-desc">' + h.description + '</p>' +
                '<div class="hero-scroll">' +
                  '<span class="hero-scroll-line"></span>' + h.scrollText +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ── ABOUT ── */

  function renderAbout(container) {
    var a = SITE.about;
    var num = sectionNum('about');

    var bioHTML = a.bio.map(function (p) { return p; }).join('<br><br>');

    var statsHTML = a.stats.map(function (s) {
      return '<div class="stat"><div class="stat-n">' + s.value + '</div><div class="stat-l">' + s.label + '</div></div>';
    }).join('');

    var langHTML = a.languages.map(function (l) {
      return '<span class="lang-tag">' + l.name + ' — ' + l.level + '</span>';
    }).join('');

    container.innerHTML =
      '<div class="slot" id="about" style="z-index:' + sectionZIndex('about') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="section-pad">' +
              '<div class="section-header reveal">' +
                '<h2 class="section-title">About</h2>' +
                '<span class="section-num">' + num + '</span>' +
              '</div>' +
              '<div class="about-body">' +
                '<div class="reveal" style="transition-delay:.1s">' +
                  '<p class="about-text">' + bioHTML + '</p>' +
                  '<div class="lang-row" style="margin-top:2.5rem;">' + langHTML + '</div>' +
                '</div>' +
                '<div class="about-stats reveal" style="transition-delay:.2s">' +
                  statsHTML +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ── PROJECTS / WORK ── */

  function renderProjectVisual(p) {
    var html = '';

    if (p.visualType === 'full') {
      html += '<div class="project-visual vis-full">';
      if (p.image) {
        html += '<img src="' + p.image + '" alt="' + (p.imageAlt || '') + '" class="vis-full-img" loading="lazy">';
      }
      html += '<div class="project-overlay"><div class="project-overlay-inner">';
      html += '<p class="project-overlay-text">' + p.description + '</p>';
      if (p.link) {
        html += '<a class="project-arrow" href="' + p.link + '" target="_blank">' + p.linkLabel + '</a>';
      } else {
        html += '<span class="project-arrow">' + p.linkLabel + '</span>';
      }
      html += '</div></div>';
      html += '</div>';

    } else if (p.visualType === 'half') {
      html += '<div class="project-visual vis-half">';
      if (p.image) {
        html += '<img src="' + p.image + '" alt="' + (p.imageAlt || '') + '" class="vis-half-img" loading="lazy">';
      }
      html += '<div class="project-overlay" style="z-index:6;"><div class="project-overlay-inner">';
      html += '<p class="project-overlay-text">' + p.description + '</p>';
      if (p.link) {
        html += '<a class="project-arrow" href="' + p.link + '" target="_blank">' + p.linkLabel + '</a>';
      } else {
        html += '<span class="project-arrow">' + p.linkLabel + '</span>';
      }
      html += '</div></div>';
      html += '</div>';

    } else if (p.visualType === 'placeholder') {
      html += '<div class="project-visual vis-placeholder">';
      html += '<div class="project-overlay"><div class="project-overlay-inner">';
      html += '<p class="project-overlay-text">' + p.description + '</p>';
      if (p.link) {
        html += '<a class="project-arrow" href="' + p.link + '" target="_blank">' + p.linkLabel + '</a>';
      } else {
        html += '<span class="project-arrow">' + p.linkLabel + '</span>';
      }
      html += '</div></div>';
      html += '</div>';
    }

    return html;
  }

  function renderWork(container) {
    var num = sectionNum('work');
    var projects = SITE.projects;

    var cardsHTML = projects.map(function (p, i) {
      var wideClass = p.visualType === 'full' ? ' wide' : '';
      var delay = (0.1 + i * 0.05).toFixed(2);

      var html = '<div class="project-card' + wideClass + ' reveal" style="transition-delay:' + delay + 's">';
      html += renderProjectVisual(p);
      html += '<div class="project-meta">';
      html += '<div class="project-name">' + p.title + '</div>';
      html += '<div class="project-right">';
      html += '<span class="project-cat">' + p.category + '</span>';
      html += '<span class="project-year">' + p.year + '</span>';
      html += '</div></div></div>';
      return html;
    }).join('');

    container.innerHTML =
      '<div class="slot" id="work" style="z-index:' + sectionZIndex('work') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="section-pad">' +
              '<div class="section-header reveal">' +
                '<h2 class="section-title">Selected Work</h2>' +
                '<span class="section-num">' + num + '</span>' +
              '</div>' +
              '<div class="projects-grid">' + cardsHTML + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ── PUBLICATIONS ── */

  function renderPublications(container) {
    var num  = sectionNum('publications');
    var pubs = SITE.publications;
    var hasItems = pubs.length > 0;

    var listHTML = '';

    if (hasItems) {
      listHTML = pubs.map(function (pub, i) {
        var delay = (0.05 + i * 0.05).toFixed(2);
        var clickUrl = pub.doi || pub.link || null;
        var dataAttrs = '';
        if (pub.previewImage) {
          dataAttrs += ' data-preview="' + pub.previewImage + '"';
        }
        dataAttrs += ' data-journal="' + (pub.journal || '') + '"';
        dataAttrs += ' data-year="' + (pub.year || '') + '"';
        if (clickUrl) {
          dataAttrs += ' data-href="' + clickUrl + '"';
        }

        var authorsStr = '';
        if (pub.authors && pub.authors.length) {
          authorsStr = pub.authors.join(', ');
        }

        var journalLine = pub.journal || '';
        if (pub.volume) journalLine += ' · ' + pub.volume;
        if (pub.pages)  journalLine += ' · ' + pub.pages;

        var statusBadge = '';
        if (pub.status === 'preprint')  statusBadge = '<span class="pub-badge">Preprint</span>';
        if (pub.status === 'in-review') statusBadge = '<span class="pub-badge">In Review</span>';

        var html = '<div class="pub-item reveal' + (clickUrl ? ' pub-clickable' : '') + '" style="transition-delay:' + delay + 's"' + dataAttrs + '>';
        html += '<span class="pub-n">' + Components.padNum(i + 1) + '</span>';
        html += '<div class="pub-body">';
        html += '<div class="pub-title">' + pub.title + '</div>';
        if (authorsStr) html += '<div class="pub-authors">' + authorsStr + '</div>';
        if (journalLine) html += '<div class="pub-journal">' + journalLine + '</div>';
        if (pub.abstract) html += '<p class="pub-abstract">' + pub.abstract + '</p>';
        html += '</div>';
        html += '<div class="pub-right">';
        if (pub.badge) html += '<span class="pub-badge">' + pub.badge + '</span>';
        if (statusBadge) html += statusBadge;
        if (clickUrl) html += '<a href="' + clickUrl + '" class="pub-link" target="_blank">DOI ↗</a>';
        html += '<span class="pub-year">' + (pub.year || '') + '</span>';
        html += '</div>';
        html += '</div>';
        return html;
      }).join('');
    } else {
      listHTML =
        '<div class="pub-empty reveal" style="transition-delay:.05s">' +
          '<span class="pub-empty-label">— Coming Soon —</span>' +
          '<p class="pub-empty-note">No publications yet. Research is ongoing — check back soon.</p>' +
        '</div>';
    }

    var noteHTML = '';
    if (!hasItems) {
      noteHTML =
        '<div class="pub-note-row reveal" style="transition-delay:.15s">' +
          '<span class="pub-note-label">Note —</span>' +
          '<p class="pub-note-text">' + SITE.publicationsNote + '</p>' +
        '</div>';
    }

    container.innerHTML =
      '<div class="slot" id="publications" style="z-index:' + sectionZIndex('publications') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="section-pad">' +
              '<div class="section-header reveal">' +
                '<h2 class="section-title">Publications</h2>' +
                '<span class="section-num">' + num + '</span>' +
              '</div>' +
              '<div class="pub-list">' + listHTML + '</div>' +
              noteHTML +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pub-follower" id="pub-follower">' +
          '<div class="pub-follower-img-wrap">' +
            '<img class="pub-follower-img" id="pub-follower-img" src="" alt="">' +
            '<div class="pub-follower-label">' +
              '<span class="pub-follower-journal" id="pub-follower-journal"></span>' +
              '<span class="pub-follower-year" id="pub-follower-year"></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ── EXPERIENCE + SKILLS ── */

  function renderExperience(container) {
    var num  = sectionNum('experience');
    var exps = SITE.experiences;
    var sk   = SITE.skills;

    // Experience list
    var expHTML = exps.map(function (exp, i) {
      var delay = (0.05 + i * 0.05).toFixed(2);
      return '<div class="exp-item reveal" style="transition-delay:' + delay + 's">' +
        '<span class="exp-n">' + Components.padNum(i + 1) + '</span>' +
        '<div class="exp-body">' +
          '<div class="exp-title">' + exp.title + '</div>' +
          '<div class="exp-org">' + exp.org + '</div>' +
          '<p class="exp-desc">' + exp.description + '</p>' +
        '</div>' +
        '<span class="exp-badge">' + exp.badge + '</span>' +
      '</div>';
    }).join('');

    // Marquee — duplicate for seamless loop
    var marqueeItems = sk.marquee.map(function (item) {
      return '<span class="marquee-item">' + item + '</span>';
    }).join('');
    var marqueeHTML = marqueeItems + marqueeItems;

    // Skills grid
    var skillsHTML = sk.categories.map(function (cat, i) {
      var delay = (i * 0.1).toFixed(1);
      var tagsHTML = cat.tags.map(function (t) {
        return '<span class="skill-tag">' + t + '</span>';
      }).join('');
      return '<div class="skill-group reveal" style="transition-delay:' + delay + 's">' +
        '<div class="skill-group-label">' + cat.label + '</div>' +
        '<div class="skill-tags">' + tagsHTML + '</div>' +
      '</div>';
    }).join('');

    container.innerHTML =
      '<div class="slot" id="experience" style="z-index:' + sectionZIndex('experience') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="section-pad">' +
              '<div class="section-header reveal">' +
                '<h2 class="section-title">Experience</h2>' +
                '<span class="section-num">' + num + '</span>' +
              '</div>' +
              '<div class="exp-list">' + expHTML + '</div>' +
            '</div>' +
            '<div class="marquee-wrap" aria-hidden="true">' +
              '<div class="marquee-track">' + marqueeHTML + '</div>' +
            '</div>' +
            '<div class="skills-grid">' + skillsHTML + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
  }


  /* ── CONTACT ── */

  function renderContact(container) {
    var num = sectionNum('contact');
    var c   = SITE.contact;

    var enquiriesHTML = c.enquiries.map(function (eq) {
      return '<a href="#" class="contact-option" data-subject="' + eq.emailSubject + '">' +
        '<span class="contact-option-label">' + eq.label + '</span>' +
        '<div class="contact-option-title">' + eq.title + '</div>' +
        '<p class="contact-option-sub">' + eq.subtitle + '</p>' +
      '</a>';
    }).join('');

    container.innerHTML =
      '<div class="slot" id="contact" style="z-index:' + sectionZIndex('contact') + ';">' +
        '<div class="panel-clip">' +
          '<div class="panel-inner">' +
            '<div class="contact-inner">' +
              '<div class="section-header reveal">' +
                '<h2 class="section-title">Contact</h2>' +
                '<span class="section-num">' + num + '</span>' +
              '</div>' +
              '<h3 class="contact-hero reveal" style="transition-delay:.1s">' + c.heading + '</h3>' +
              '<div class="contact-options reveal" style="transition-delay:.2s">' +
                enquiriesHTML +
              '</div>' +
              '<div class="contact-bottom reveal" style="transition-delay:.3s">' +
                '<div class="contact-info">' +
                  '<a href="#" class="contact-email" id="email-link"><span class="scramble">↘ rashid-web[at]protonmail[dot]com</span></a>' +
                  '<span class="contact-loc">' + SITE.global.location + '</span>' +
                '</div>' +
                Components.socialHTML() +
              '</div>' +
            '</div>' +
            '<div id="footer-container"></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    // Build footer inside contact slot
    Components.buildFooter('footer-container');
  }


  /* ── MASTER RENDERER ── */

  function renderPage() {
    var main = document.getElementById('main-content');
    if (!main) return;

    var order   = SITE.sections.order;
    var visible = SITE.sections.visibility;

    // Render each visible section directly into main
    // NO wrapper divs — slots must be direct siblings for CSS stacking
    order.forEach(function (id) {
      if (visible[id] === false) return;

      // Create a temporary container to build HTML
      var temp = document.createElement('div');

      switch (id) {
        case 'hero':         renderHero(temp);         break;
        case 'about':        renderAbout(temp);        break;
        case 'work':         renderWork(temp);         break;
        case 'publications': renderPublications(temp); break;
        case 'experience':   renderExperience(temp);   break;
        case 'contact':      renderContact(temp);      break;
      }

      // Move the .slot element directly into main (no wrapper)
      while (temp.firstChild) {
        main.appendChild(temp.firstChild);
      }
    });

    // Wire up email click handlers
    wireEmailHandlers();
  }


  /* ── EMAIL HANDLERS ── */

  function wireEmailHandlers() {
    var email = Components.decodeEmail();

    var emailLink = document.getElementById('email-link');
    if (emailLink) {
      emailLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:' + email;
      });
    }

    document.querySelectorAll('.contact-option').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        var subject = el.getAttribute('data-subject') || '';
        window.location.href = 'mailto:' + email + (subject ? '?subject=' + subject : '');
      });
    });

    // Clickable publications
    document.querySelectorAll('.pub-clickable').forEach(function (el) {
      el.addEventListener('click', function (e) {
        // Don't intercept if they clicked the DOI link directly
        if (e.target.closest('.pub-link')) return;
        var href = el.getAttribute('data-href');
        if (href) window.open(href, '_blank');
      });
      el.style.cursor = 'pointer';
    });
  }


  /* ── PUBLIC API ── */

  return {
    renderPage: renderPage
  };

})();