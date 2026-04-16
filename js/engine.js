/* ═══════════════════════════════════════════════════════════════
   engine.js — Preloader, Cursor, Scroll, Sound, Animations
═══════════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════════
   SCRAMBLE TEXT
═══════════════════════════════════════════════════════════════ */
(function () {
  var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function randomChar() {
    return CHARS[Math.floor(Math.random() * CHARS.length)];
  }

  function initSlot(el) {
    if (el.getAttribute('data-slot-ready')) return;
    if (el.children.length > 0) return;
    var original = el.textContent;
    if (!original.trim()) return;

    el.setAttribute('data-slot-ready', '1');
    el.setAttribute('data-original', original);

    el.innerHTML = original.split('').map(function (char) {
      return '<span class="sl">' + (char === ' ' ? '&nbsp;' : char) + '</span>';
    }).join('');

    el.addEventListener('mouseenter', function () {
      var spans = el.querySelectorAll('.sl');
      spans.forEach(function (span, i) {
        var orig  = original[i] === ' ' ? '\u00A0' : original[i];
        var delay = i * 35;
        var cycles = 5 + i;
        var count  = 0;
        setTimeout(function () {
          var ticker = setInterval(function () {
            if (count < cycles) {
              span.textContent = randomChar();
              count++;
            } else {
              span.textContent = orig;
              clearInterval(ticker);
            }
          }, 40);
        }, delay);
      });
    });
  }

  window.initScramble = function () {
    document.querySelectorAll('span.scramble').forEach(initSlot);
  };
})();


/* ═══════════════════════════════════════════════════════════════
   PRELOADER (home page only)
═══════════════════════════════════════════════════════════════ */
var Preloader = (function () {

  function init() {
    var preloader = document.getElementById('preloader');
    if (!preloader) return; // not on this page

    var counter   = document.getElementById('pre-counter');
    var barFill   = document.getElementById('pre-bar-fill');
    var subText   = document.getElementById('pre-subtitle-text');
    var brightEl  = document.getElementById('pre-logo-bright');
    var nav       = document.getElementById('nav');

    var current = 0, startTime = null;
    var duration = SITE.preloader.duration;
    var wipeTriggered = false, wipeProgress = 0, wipeActive = false;
    var wavePhase = 0;

    function animateWave() {
      if (!wipeActive && wipeProgress <= 0) {
        requestAnimationFrame(animateWave);
        return;
      }
      wavePhase += 0.06;
      var topInset = (1 - wipeProgress) * 100;
      var steps = 20;
      var points = [];
      points.push('0% 100%');
      points.push('100% 100%');
      for (var i = steps; i >= 0; i--) {
        var x = (i / steps) * 100;
        var wave = Math.sin((i / steps) * Math.PI * 2.5 + wavePhase) * 4;
        var y = Math.max(0, Math.min(100, topInset + wave));
        points.push(x + '% ' + y + '%');
      }
      brightEl.style.clipPath = 'polygon(' + points.join(', ') + ')';
      requestAnimationFrame(animateWave);
    }
    requestAnimationFrame(animateWave);

    function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }

    function tick(now) {
      if (!startTime) startTime = now;
      var elapsed  = now - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var eased    = easeOutExpo(progress);

      current = Math.floor(eased * 100);
      var display = current < 10 ? '00' + current : current < 100 ? '0' + current : '' + current;
      counter.textContent = display;
      barFill.style.width = current + '%';

      if (current >= 15 && !wipeTriggered) {
        wipeTriggered = true;
        wipeActive = true;
        subText.classList.add('wipe');
      }
      if (wipeActive) {
        wipeProgress = Math.min((current - 15) / 85, 1);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        counter.textContent = '100';
        barFill.style.width = '100%';
        setTimeout(function () {
          preloader.classList.add('done');
          document.body.classList.remove('loading');
          if (nav) nav.classList.add('show');
          triggerHero();
          setTimeout(function () { preloader.style.display = 'none'; }, 1200);
        }, 500);
      }
    }

    function triggerHero() {
      var eyebrow = document.getElementById('hero-eyebrow');
      if (eyebrow) eyebrow.classList.add('animate');
      document.querySelectorAll('.hero-name .letter').forEach(function (letter) {
        letter.style.animationDelay = letter.style.getPropertyValue('--d') || '0.3s';
        letter.classList.add('animate');
      });
      var bottom = document.getElementById('hero-bottom');
      if (bottom) bottom.classList.add('animate');
    }

    setTimeout(function () { requestAnimationFrame(tick); }, 200);
  }

  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   SOUND ENGINE
═══════════════════════════════════════════════════════════════ */
var SoundEngine = (function () {
  var soundEnabled = false;
  var ctx = null, lastTick = 0;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function playTick(vol) {
    if (!soundEnabled || !ctx) return;
    var c = ctx, now = c.currentTime;
    if (now - lastTick < 0.04) return;
    lastTick = now;
    var len = Math.ceil(c.sampleRate * 0.012);
    var buf = c.createBuffer(1, len, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource(); src.buffer = buf;
    var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2200;
    var env = c.createGain();
    env.gain.setValueAtTime(vol || 0.14, now);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.012);
    src.connect(hp); hp.connect(env); env.connect(c.destination);
    src.start(now); src.stop(now + 0.015);
  }

  function playClick() {
    if (!soundEnabled || !ctx) return;
    var c = ctx, now = c.currentTime;
    var len = Math.ceil(c.sampleRate * 0.02);
    var buf = c.createBuffer(1, len, c.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var src = c.createBufferSource(); src.buffer = buf;
    var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800;
    var env = c.createGain();
    env.gain.setValueAtTime(0.18, now);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    src.connect(hp); hp.connect(env); env.connect(c.destination);
    src.start(now); src.stop(now + 0.025);
  }

  function fadeAudio(audio, targetVol, dur) {
    var startVol = audio.volume, t0 = performance.now();
    (function step() {
      var p = Math.min((performance.now() - t0) / (dur * 1000), 1);
      audio.volume = startVol + (targetVol - startVol) * p;
      if (p < 1) requestAnimationFrame(step);
    })();
  }

  function updateButtonUI() {
    var btn = document.getElementById('sound-btn');
    if (!btn) return;
    if (soundEnabled) {
      btn.classList.add('is-on');
      btn.querySelector('.sound-off-icon').style.display = 'none';
      btn.querySelector('.sound-on-icon').style.display  = 'flex';
    } else {
      btn.classList.remove('is-on');
      btn.querySelector('.sound-off-icon').style.display = 'flex';
      btn.querySelector('.sound-on-icon').style.display  = 'none';
    }
  }

  function toggle() {
    var audio = document.getElementById('bg-audio');
    soundEnabled = !soundEnabled;
    localStorage.setItem('sound-enabled', soundEnabled ? '1' : '0');

    if (soundEnabled) {
      getCtx();
      if (audio) {
        audio.play().catch(function () {});
        fadeAudio(audio, 0.1, 2.5);
      }
    } else {
      if (audio) {
        fadeAudio(audio, 0, 1.0);
        setTimeout(function () { if (!soundEnabled) audio.pause(); }, 1100);
      }
    }
    updateButtonUI();
  }

  function restore() {
    var saved = localStorage.getItem('sound-enabled');
    if (saved === '1') {
      soundEnabled = true;
      getCtx();
      var audio = document.getElementById('bg-audio');
      if (audio) {
        audio.volume = 0;
        // Need user gesture to play — attempt it
        var playAttempt = function () {
          audio.play().then(function () {
            fadeAudio(audio, 0.1, 2.5);
          }).catch(function () {
            // Browsers block autoplay — wait for first interaction
            document.addEventListener('click', function handler() {
              audio.play().then(function () { fadeAudio(audio, 0.1, 2.5); }).catch(function () {});
              document.removeEventListener('click', handler);
            });
          });
        };
        playAttempt();
      }
      updateButtonUI();
    }
  }

  function wireHoverSounds() {
    document.querySelectorAll('a,button:not(#sound-btn),.project-card,.contact-option,.exp-item,.menu-link,.pub-item')
      .forEach(function (el) { el.addEventListener('mouseenter', function () { playTick(0.14); }); });
    document.querySelectorAll('a,button')
      .forEach(function (el) { el.addEventListener('click', function () { playClick(); }); });
  }

  return {
    toggle:          toggle,
    restore:         restore,
    wireHoverSounds: wireHoverSounds
  };
})();


/* ═══════════════════════════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════════════════════════ */
var Cursor = (function () {
  var dot, ring;
  var mx = 0, my = 0, rx = 0, ry = 0;
  var scaleX = 1, scaleY = 1, angle = 0;

  function init() {
    dot  = document.getElementById('cursor-dot');
    ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });

    (function loop() {
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';

      var prevRx = rx, prevRy = ry;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      var vx = rx - prevRx;
      var vy = ry - prevRy;
      var speed = Math.sqrt(vx * vx + vy * vy);

      var targetStretch = Math.min(speed * 0.35, 0.13);
      var targetScaleX  = 1 + targetStretch;
      var targetScaleY  = 1 - targetStretch * 0.45;
      var targetAngle   = speed > 0.1 ? Math.atan2(vy, vx) * (180 / Math.PI) : angle;

      var ease = 0.12;
      scaleX += (targetScaleX - scaleX) * ease;
      scaleY += (targetScaleY - scaleY) * ease;

      var da = targetAngle - angle;
      if (da > 180) da -= 360;
      if (da < -180) da += 360;
      angle += da * 0.12;

      ring.style.left      = rx + 'px';
      ring.style.top       = ry + 'px';
      ring.style.transform = 'translate(-50%, -50%) rotate(' + angle + 'deg) scale(' + scaleX + ', ' + scaleY + ')';

      requestAnimationFrame(loop);
    })();
  }

  function wireHovers() {
    document.querySelectorAll('a,button,.project-card,.contact-option,.pub-clickable').forEach(function (el) {
      el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
    });
  }

  return { init: init, wireHovers: wireHovers };
})();


/* ═══════════════════════════════════════════════════════════════
   SCROLL PROGRESS
═══════════════════════════════════════════════════════════════ */
var ScrollProgress = (function () {
  function init() {
    var bar = document.getElementById('progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }
  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   STACKING SCROLL ENGINE
═══════════════════════════════════════════════════════════════ */
var StackEngine = (function () {
  var NAV_H = 58 + 8;
  var DELAY_PX = 250;
  var data = [];

  function measure() {
    data = [];
    var vpH = window.innerHeight;
    document.querySelectorAll('.slot').forEach(function (slot) {
      var inner = slot.querySelector('.panel-inner');
      if (!inner) return;
      inner.style.transform = 'translateY(0px)';
      var contentH = inner.offsetHeight;
      var viewH = vpH - NAV_H;
      var overflow = Math.max(0, contentH - viewH);
      slot.style.height = (overflow + DELAY_PX + 2 * vpH) + 'px';
      data.push({ slot: slot, inner: inner, overflow: overflow });
    });
  }

  function update() {
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      if (d.overflow <= 0) continue;
      var scrolledIn = NAV_H - d.slot.getBoundingClientRect().top;
      var clamped = scrolledIn < 0 ? 0 : scrolledIn > d.overflow ? d.overflow : scrolledIn;
      d.inner.style.transform = 'translateY(' + (-clamped) + 'px)';
    }
  }

  function init() {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { measure(); update(); });
    });
    window.addEventListener('scroll', update, { passive: true });
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () { measure(); update(); }, 150);
    });
  }

  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   REVEAL ON SCROLL
═══════════════════════════════════════════════════════════════ */
var RevealEngine = (function () {
  function init() {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('on'); }, i * 60);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }
  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   LAZY IMAGE LOADING
═══════════════════════════════════════════════════════════════ */
var LazyLoader = (function () {
  function init() {
    var imgs = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var img = entry.target;
          if (img.complete) {
            img.classList.add('loaded');
          } else {
            img.addEventListener('load',  function () { img.classList.add('loaded'); });
            img.addEventListener('error', function () { img.classList.add('loaded'); });
          }
          obs.unobserve(img);
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 });
      imgs.forEach(function (img) { obs.observe(img); });
    } else {
      imgs.forEach(function (img) { img.classList.add('loaded'); });
    }
  }
  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   PUBLICATION IMAGE FOLLOWER
═══════════════════════════════════════════════════════════════ */
var PubFollower = (function () {
  function init() {
    var follower        = document.getElementById('pub-follower');
    var followerImg     = document.getElementById('pub-follower-img');
    var followerJournal = document.getElementById('pub-follower-journal');
    var followerYear    = document.getElementById('pub-follower-year');
    if (!follower || !followerImg) return;

    var mouseX = 0, mouseY = 0;
    var posX = 0, posY = 0;
    var tiltX = 0, tiltTarget = 0;
    var active = false;
    var rafId = null;

    function loop() {
      posX += (mouseX - posX) * 0.1;
      posY += (mouseY - posY) * 0.1;
      tiltX += (tiltTarget - tiltX) * 0.08;

      follower.style.left = posX + 'px';
      follower.style.top  = posY + 'px';
      follower.style.setProperty('--tilt', tiltX + 'deg');

      rafId = requestAnimationFrame(loop);
    }

    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      var dx = e.movementX || 0;
      tiltTarget = Math.max(-8, Math.min(8, dx * 0.6));
    });

    document.querySelectorAll('.pub-item[data-preview]').forEach(function (card) {
      var img     = card.getAttribute('data-preview');
      var journal = card.getAttribute('data-journal');
      var year    = card.getAttribute('data-year');

      card.addEventListener('mouseenter', function () {
        if (!img) return;
        followerImg.src             = img;
        followerJournal.textContent = journal || '';
        followerYear.textContent    = year    || '';
        active = true;
        follower.classList.add('visible');
        if (!rafId) loop();
      });

      card.addEventListener('mouseleave', function () {
        active = false;
        follower.classList.remove('visible');
      });
    });
  }

  return { init: init };
})();


/* ═══════════════════════════════════════════════════════════════
   BOOT SEQUENCE
═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  var isHome = document.body.hasAttribute('data-home');

  // 1. Build shared components
  Components.buildNav('nav-container');

  // 2. Render page sections (home only)
  if (isHome) {
    Renderers.renderPage();
  }

  // 3. Set document title
  document.title = SITE.global.siteTitle;

  // 4. Init cursor + scroll progress (safe to run immediately)
  Cursor.init();
  ScrollProgress.init();

  if (isHome) {
    Preloader.init();

    // KEY FIX: Wait for all images to load OR a timeout,
    // then measure the stacking layout.
    // Images affect slot height — if they haven't loaded,
    // measurements are wrong.

    var imgs = document.querySelectorAll('#main-content img');
    var loaded = 0;
    var total = imgs.length;
    var stackReady = false;

    function initStackWhenReady() {
      if (stackReady) return;
      stackReady = true;
      // Triple rAF to ensure browser has painted everything
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            StackEngine.init();
          });
        });
      });
    }

    if (total === 0) {
      initStackWhenReady();
    } else {
      imgs.forEach(function (img) {
        if (img.complete) {
          loaded++;
          if (loaded >= total) initStackWhenReady();
        } else {
          img.addEventListener('load', function () {
            loaded++;
            if (loaded >= total) initStackWhenReady();
          });
          img.addEventListener('error', function () {
            loaded++;
            if (loaded >= total) initStackWhenReady();
          });
        }
      });
      // Safety timeout — don't wait forever for slow images
      setTimeout(initStackWhenReady, 3000);
    }

  } else {
    // Non-home pages — show nav immediately
    var nav = document.getElementById('nav');
    if (nav) nav.classList.add('show');
  }

  // 5. Post-render inits
  RevealEngine.init();
  LazyLoader.init();
  PubFollower.init();
  initScramble();

  // 6. Sound
  SoundEngine.restore();
  SoundEngine.wireHoverSounds();

  // 7. Cursor hovers
  Cursor.wireHovers();
});