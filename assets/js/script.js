// =========================
// Scroll fluide depuis la navigation
// =========================
document.querySelectorAll('.spot-item').forEach(item => {
  item.addEventListener('click', () => {
    const map = {
      "Drakéide Sf": "drakeide",
      "Calvus": "calvus",
      "Schwarzy Black": "schwarzy",
      "Nelumbo": "nelumbo",
      "Apô": "apo"
    };

    const target = document.getElementById(map[item.dataset.font]);
    if (target) {
      // Calcul avec décalage de sécurité pour le header supérieur fixe
      const headerOffset = window.innerWidth <= 900 ? 80 : 110;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const targetPosition = targetRect - bodyRect - headerOffset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});

// =========================
// MODES COULEUR
// =========================
let mode = "black"; 
const body = document.body;
const sections = document.querySelectorAll('.font-block');
const topHeader = document.querySelector('.top-header');
const navBar = document.querySelector('.left-spot');

function applyMode(color = null) {
  if (mode === "black") {
    body.style.backgroundColor = "#000";
    if (topHeader) topHeader.style.backgroundColor = "#000";
    if (navBar && window.innerWidth <= 900) navBar.style.backgroundColor = "#000";
    document.documentElement.style.setProperty("--bg-color", "#000");
    document.documentElement.style.setProperty("--fg", "#fff");
  }

  if (mode === "white") {
    body.style.backgroundColor = "#fff";
    if (topHeader) topHeader.style.backgroundColor = "#fff";
    if (navBar && window.innerWidth <= 900) navBar.style.backgroundColor = "#fff";
    document.documentElement.style.setProperty("--bg-color", "#fff");
    document.documentElement.style.setProperty("--fg", "#000");
  }

  if (mode === "dynamic-light" || mode === "dynamic-dark") {
    if (color) {
      body.style.backgroundColor = color;
      if (topHeader) topHeader.style.backgroundColor = color;
      if (navBar && window.innerWidth <= 900) navBar.style.backgroundColor = color;
      document.documentElement.style.setProperty("--bg-color", color);
    }

    if (mode === "dynamic-light") {
      document.documentElement.style.setProperty("--fg", "#fff");
    } else {
      document.documentElement.style.setProperty("--fg", "#000");
    }
  }
}

// =========================
// ÉVÉNEMENTS BOUTONS MODE
// =========================
document.getElementById('btn-black').addEventListener('click', () => {
  mode = "black";
  applyMode();
});

document.getElementById('btn-white').addEventListener('click', () => {
  mode = "white";
  applyMode();
});

document.getElementById('btn-dynamic').addEventListener('click', () => {
  mode = "dynamic-light";
  triggerDynamicColor();
});

document.getElementById('btn-rainbow-dark').addEventListener('click', () => {
  mode = "dynamic-dark";
  triggerDynamicColor();
});

// =========================
// Détection de la section active au scroll
// =========================
function triggerDynamicColor() {
  let middle = window.innerHeight / 2;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) {
      applyMode(section.dataset.color);
    }
  });
}

let isScrolling;
window.addEventListener('scroll', () => {
  if (!mode.startsWith("dynamic")) return;
  window.cancelAnimationFrame(isScrolling);
  isScrolling = window.requestAnimationFrame(() => {
    triggerDynamicColor();
  });
});

// Initialisation globale
applyMode();
