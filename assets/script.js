// --------------------------------
// ELEMENT
// --------------------------------
const copyBtn = document.getElementById("copyBtn");
const themeBtn = document.getElementById("themeBtn");
const emailBtn = document.getElementById("emailBtn");
const emailSub = document.getElementById("emailSub");
const clickSound = document.getElementById("clickSound");


// --------------------------------
// PLAY SOUND
// --------------------------------
function playClick() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}


// --------------------------------
// RIPPLE EFFECT
// --------------------------------
function addRipple(e, el) {
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const ripple = document.createElement("span");

  ripple.classList.add("ripple");
  ripple.style.left = e.clientX - rect.left + "px";
  ripple.style.top = e.clientY - rect.top + "px";

  el.appendChild(ripple);

  setTimeout(() => ripple.remove(), 500);
}


// --------------------------------
// COPY URL
// --------------------------------
if (copyBtn) {
  copyBtn.addEventListener("click", async (e) => {
    playClick();
    addRipple(e, copyBtn);

    try {
      await navigator.clipboard.writeText(window.location.href);
      copyBtn.textContent = "Tersalin!";
      setTimeout(() => (copyBtn.textContent = "Salin URL"), 1400);
    } catch (err) {
      alert("Gagal menyalin.");
    }
  });
}


// --------------------------------
// EMAIL COPY
// --------------------------------
if (emailBtn) {
  emailBtn.addEventListener("click", async (e) => {
    playClick();
    addRipple(e, emailBtn);

    const email = "email@example.com";

    try {
      await navigator.clipboard.writeText(email);
      emailSub.textContent = email + " • tersalin";
      setTimeout(() => (emailSub.textContent = "klik untuk salin"), 2000);
    } catch (err) {
      alert("Tidak bisa menyalin email.");
    }
  });
}


// --------------------------------
// THEME TOGGLE (tetap sama fungsinya)
// --------------------------------
if (themeBtn) {
  themeBtn.addEventListener("click", (e) => {
    playClick();
    addRipple(e, themeBtn);

    document.body.classList.add("theme-transition");

    const root = document.documentElement;
    const dark = root.style.getPropertyValue("--bg") === "#0f1724";

    if (dark) {
      root.style.setProperty("--bg", "#f7fbff");
      root.style.setProperty("--card", "#ffffff");
      root.style.setProperty("--text", "#081126");
    } else {
      root.style.setProperty("--bg", "#0f1724");
      root.style.setProperty("--card", "#0b1220");
      root.style.setProperty("--text", "#e6eef8");
    }

    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 500);

    themeBtn.textContent = "Tema ✓";
    setTimeout(() => (themeBtn.textContent = "Tema"), 900);
  });
}


// --------------------------------
// APPLY URL PARAMS
// --------------------------------
(function applyParams() {
  const q = new URLSearchParams(location.search);

  if (q.has("name")) document.getElementById("name").textContent = q.get("name");
  if (q.has("bio")) document.getElementById("bio").textContent = q.get("bio");
  if (q.has("avatar")) document.querySelector("#avatar img").src = q.get("avatar");

  if (q.has("github"))
    document.querySelector('a[href*="github.com"]').href = q.get("github");

  if (q.has("tiktok"))
    document.querySelector('a[href*="tiktok.com"]').href = q.get("tiktok");

  if (q.has("instagram"))
    document.querySelector('a[href*="instagram.com"]').href = q.get("instagram");

  if (q.has("portfolio"))
    document.getElementById("portfolioBtn").href = q.get("portfolio");
})();


// --------------------------------
// SIMPLE FLOATING PARTICLES
// --------------------------------
const particlesContainer = document.getElementById("particles");

function generateParticles() {
  if (!particlesContainer) return;

  for (let i = 0; i < 25; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");

    const size = Math.random() * 4 + 2;

    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * 100 + "vw";
    p.style.bottom = "-20px";
    p.style.animationDuration = 5 + Math.random() * 5 + "s";

    particlesContainer.appendChild(p);

    setTimeout(() => p.remove(), 10000);
  }
}

setInterval(generateParticles, 800);
generateParticles();


// --------------------------------
// MULTI FX LAYER (lebih ringan, soft)
// --------------------------------
function createSoftFX() {
  const fx = document.getElementById("fx-layer");
  if (!fx) return;

  // FIRE
  for (let i = 0; i < 15; i++) {
    const f = document.createElement("div");
    f.className = "fire";
    f.style.left = Math.random() * 100 + "vw";
    f.style.animationDuration = 3 + Math.random() * 3 + "s";
    fx.appendChild(f);
  }

  // MATRIX
  const chars = ["0", "1"];
  for (let i = 0; i < 25; i++) {
    const m = document.createElement("div");
    m.className = "matrix";
    m.innerText = chars[Math.floor(Math.random() * chars.length)];
    m.style.left = Math.random() * 100 + "vw";
    m.style.animationDuration = 3 + Math.random() * 3 + "s";
    fx.appendChild(m);
  }

  // SPARKS
  for (let i = 0; i < 20; i++) {
    const s = document.createElement("div");
    s.className = "spark";
    s.style.left = Math.random() * 100 + "vw";
    s.style.animationDuration = 2 + Math.random() * 4 + "s";
    fx.appendChild(s);
  }

  // GLITTER
  for (let i = 0; i < 25; i++) {
    const g = document.createElement("div");
    g.className = "glitter";
    g.style.left = Math.random() * 100 + "vw";
    g.style.top = Math.random() * 100 + "vh";
    g.style.animationDuration = 1 + Math.random() * 2 + "s";
    fx.appendChild(g);
  }

  // CONFETTI
  const confettiColors = ["#ff4d6d", "#4dd0ff", "#ffe24d", "#9d4dff", "#4dff8d"];
  for (let i = 0; i < 15; i++) {
    const c = document.createElement("div");
    c.className = "confetti";
    c.style.setProperty(
      "--confetti-color",
      confettiColors[Math.floor(Math.random() * confettiColors.length)]
    );
    c.style.left = Math.random() * 100 + "vw";
    c.style.animationDuration = 4 + Math.random() * 4 + "s";
    fx.appendChild(c);
  }
}

window.addEventListener("load", createSoftFX);


// --------------------------------
// EXTRA FLOATING PARTICLES
// --------------------------------
function spawnBaseParticles() {
  const container = document.getElementById("particles");
  if (!container) return;

  const types = ["star", "snow", "neon"];

  for (let i = 0; i < 30; i++) {
    const p = document.createElement("div");
    p.className = "particle " + types[Math.floor(Math.random() * types.length)];

    p.style.left = Math.random() * 100 + "vw";
    p.style.top = "100vh";
    p.style.animationDuration = 3 + Math.random() * 4 + "s";

    container.appendChild(p);
  }
}

window.addEventListener("load", spawnBaseParticles);
