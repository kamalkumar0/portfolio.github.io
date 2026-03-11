

// ── CUSTOM CURSOR ──
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});
(function animateTrail() {
  trailX += (mouseX - trailX) * 0.1;
  trailY += (mouseY - trailY) * 0.1;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
})();
document.querySelectorAll('a, button, .project-card, .skill-category, .timeline-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursorTrail.style.transform = 'translate(-50%,-50%) scale(2)'; cursorTrail.style.borderColor = 'rgba(96,165,250,0.7)'; });
  el.addEventListener('mouseleave', () => { cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)'; cursorTrail.style.borderColor = 'rgba(96,165,250,0.35)'; });
});


// ── HERO GRID CANVAS ──
const heroCanvas = document.getElementById('gridCanvas');
const hCtx       = heroCanvas.getContext('2d');
let animFrame = 0;

function resizeHeroCanvas() {
  heroCanvas.width  = heroCanvas.offsetWidth;
  heroCanvas.height = heroCanvas.offsetHeight;
}
resizeHeroCanvas();
window.addEventListener('resize', resizeHeroCanvas);

const gridSize = 58;
const heroParticles = Array.from({ length: 30 }, () => ({
  x: Math.random(), y: Math.random(),
  vx: (Math.random() - 0.5) * 0.0003,
  vy: (Math.random() - 0.5) * 0.0003,
  r: Math.random() * 1.5 + 0.4,
  a: Math.random() * 0.5 + 0.1
}));

function drawHeroGrid() {
  const W = heroCanvas.width, H = heroCanvas.height;
  hCtx.clearRect(0, 0, W, H);
  animFrame++;

  // Dot grid
  for (let x = gridSize / 2; x < W; x += gridSize) {
    for (let y = gridSize / 2; y < H; y += gridSize) {
      const pulse = Math.sin((x + y + animFrame * 0.45) * 0.018) * 0.5 + 0.5;
      hCtx.beginPath();
      hCtx.arc(x, y, 1.4, 0, Math.PI * 2);
      hCtx.fillStyle = `rgba(37,99,235,${0.12 + pulse * 0.22})`;
      hCtx.fill();
    }
  }

  // Scan line
  const scanY = ((animFrame * 0.7) % (H + 80)) - 40;
  const sg = hCtx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
  sg.addColorStop(0, 'rgba(37,99,235,0)');
  sg.addColorStop(0.5, 'rgba(37,99,235,0.05)');
  sg.addColorStop(1, 'rgba(37,99,235,0)');
  hCtx.fillStyle = sg;
  hCtx.fillRect(0, scanY - 40, W, 80);

  // Floating particles
  heroParticles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > 1) p.vx *= -1;
    if (p.y < 0 || p.y > 1) p.vy *= -1;
    hCtx.beginPath();
    hCtx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
    hCtx.fillStyle = `rgba(37,99,235,${p.a * 0.5})`;
    hCtx.fill();
  });

  // Connection lines between nearby particles
  for (let i = 0; i < heroParticles.length; i++) {
    for (let j = i + 1; j < heroParticles.length; j++) {
      const dx = (heroParticles[i].x - heroParticles[j].x) * W;
      const dy = (heroParticles[i].y - heroParticles[j].y) * H;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) {
        hCtx.beginPath();
        hCtx.moveTo(heroParticles[i].x * W, heroParticles[i].y * H);
        hCtx.lineTo(heroParticles[j].x * W, heroParticles[j].y * H);
        hCtx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - d / 130)})`;
        hCtx.lineWidth = 0.5;
        hCtx.stroke();
      }
    }
  }

  requestAnimationFrame(drawHeroGrid);
}
drawHeroGrid();


// ── PROFILE SPARKS CANVAS ──
const sparksCanvas = document.getElementById('sparksCanvas');
const sCtx         = sparksCanvas.getContext('2d');

// Determine centre & orbit radius from the canvas size
function getProfileCentre() {
  const S = sparksCanvas.width;
  return { cx: S / 2, cy: S / 2, orbitR: S * 0.29 };
}

// Spark particles that fly off the orbit ring
const NUM_SPARKS = 28;
const sparks = Array.from({ length: NUM_SPARKS }, (_, i) => ({
  angle: (i / NUM_SPARKS) * Math.PI * 2,
  speed: 0.012 + Math.random() * 0.014,  // orbit speed
  size:  Math.random() * 2.2 + 0.8,
  alpha: Math.random() * 0.7 + 0.2,
  tail:  Math.random() * 6 + 2,
  phase: Math.random() * Math.PI * 2,    // flicker phase
}));

// Burst emitters — occasional bright bursts around the ring
const NUM_BURSTS = 6;
const bursts = Array.from({ length: NUM_BURSTS }, (_, i) => ({
  angle:    (i / NUM_BURSTS) * Math.PI * 2,
  speed:    0.008 + Math.random() * 0.006,
  lifeMax:  50 + Math.random() * 40,
  life:     Math.random() * 90,
  r:        Math.random() * 3 + 1.5,
}));

let sparkFrame = 0;

function drawSparks() {
  const { cx, cy, orbitR } = getProfileCentre();
  sCtx.clearRect(0, 0, sparksCanvas.width, sparksCanvas.height);
  sparkFrame++;

  // Orbit sparks
  sparks.forEach(sp => {
    sp.angle += sp.speed;

    const ox = cx + Math.cos(sp.angle) * orbitR;
    const oy = cy + Math.sin(sp.angle) * orbitR;

    // Tail line
    const tx = cx + Math.cos(sp.angle - 0.12) * orbitR;
    const ty = cy + Math.sin(sp.angle - 0.12) * orbitR;

    const flicker = 0.6 + 0.4 * Math.sin(sparkFrame * 0.08 + sp.phase);
    const a = sp.alpha * flicker;

    // Colour cycles: blue → cyan → white
    const t = (Math.sin(sparkFrame * 0.04 + sp.phase) + 1) / 2;
    const r = Math.round(59  + t * (255 - 59));
    const g = Math.round(130 + t * (255 - 130));
    const b = 246;

    sCtx.beginPath();
    sCtx.moveTo(tx, ty);
    sCtx.lineTo(ox, oy);
    sCtx.strokeStyle = `rgba(${r},${g},${b},${a * 0.7})`;
    sCtx.lineWidth = sp.size * 0.6;
    sCtx.stroke();

    // Dot at head
    sCtx.beginPath();
    sCtx.arc(ox, oy, sp.size, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(${r},${g},${b},${a})`;
    sCtx.fill();
  });

  // Burst particles
  bursts.forEach(b => {
    b.angle += b.speed;
    b.life += 1;
    if (b.life > b.lifeMax) {
      b.life = 0;
      b.lifeMax = 50 + Math.random() * 40;
      b.angle = Math.random() * Math.PI * 2;
    }
    const progress = b.life / b.lifeMax;
    const outward  = orbitR + progress * 18;
    const bx = cx + Math.cos(b.angle) * outward;
    const by = cy + Math.sin(b.angle) * outward;
    const ba = (1 - progress) * 0.9;

    sCtx.beginPath();
    sCtx.arc(bx, by, b.r * (1 - progress * 0.6), 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(96,165,250,${ba})`;
    sCtx.fill();
  });

  requestAnimationFrame(drawSparks);
}
drawSparks();

// Resize sparks canvas if the wrapper resizes
window.addEventListener('resize', () => {
  const wrapper = document.getElementById('profileWrapper');
  if (!wrapper) return;
  const s = wrapper.offsetWidth;
  sparksCanvas.width  = s;
  sparksCanvas.height = s;
});


// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  const spans = hamburger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


// ── SCROLL REVEAL ──
const fadeTargets = document.querySelectorAll(
  '.about-text, .about-visual, .timeline-item, .project-card, .skill-category, .contact-inner'
);
fadeTargets.forEach(el => el.classList.add('fade-in'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = Array.from(entry.target.parentElement.children);
    const idx = siblings.indexOf(entry.target);
    setTimeout(() => entry.target.classList.add('visible'), idx * 90);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1 });
fadeTargets.forEach(el => revealObserver.observe(el));


// ── COUNTER ANIMATION ──
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  let cur = 0;
  const step = Math.max(1, Math.ceil(target / 35));
  const iv = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur;
    if (cur >= target) clearInterval(iv);
  }, 35);
}
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.querySelectorAll('[data-target]').forEach(animateCounter);
    statObserver.unobserve(e.target);
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.about-stats');
if (statsEl) statObserver.observe(statsEl);


// ── ACTIVE NAV LINK HIGHLIGHT ──
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
    });
  });
}, { rootMargin: '-40% 0px -40% 0px' });
sections.forEach(s => sectionObserver.observe(s));


// ── 3-D TILT ON PROJECT CARDS ──
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const x  = e.clientX - r.left  - r.width  / 2;
    const y  = e.clientY - r.top   - r.height / 2;
    const rx = -(y / r.height) * 7;
    const ry =  (x / r.width)  * 7;
    card.style.transform    = `translateY(-4px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.transition   = 'none';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = '';
  });
});


// ── SMOOTH ANCHOR SCROLL (extra safety for iOS) ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
