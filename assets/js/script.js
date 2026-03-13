// =========================
// Scroll fluide depuis les Aa
// =========================
document.querySelectorAll('.spot-item').forEach(item => {
  item.addEventListener('click', () => {

    const map = {
      "Drakéide Sf": "drakeide",
      "Calvus": "calvus",
      "Schwarzy Black": "schwarzy",
      "Nelumbo": "nelumbo"
    };

    const target = document.getElementById(map[item.dataset.font]);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
});


// =========================
// MODES COULEUR
// =========================
let mode = "black"; // mode par défaut
const body = document.body;
const contact = document.querySelector('.contact-strip');
const sections = document.querySelectorAll('.font-block');

function applyMode(color = null) {

  // MODE NOIR
  if (mode === "black") {
    body.style.backgroundColor = "#000";
    contact.style.backgroundColor = "#000";
    body.style.color = "#fff";
    document.documentElement.style.setProperty("--fg", "#fff");
  }

  // MODE BLANC
  if (mode === "white") {
    body.style.backgroundColor = "#fff";
    contact.style.backgroundColor = "#fff";
    body.style.color = "#000";
    document.documentElement.style.setProperty("--fg", "#000");
  }

  // MODE DYNAMIQUE
  if (mode === "dynamic-light" || mode === "dynamic-dark") {

    if (color) {
      body.style.backgroundColor = color;
      contact.style.backgroundColor = color;
    }

    if (mode === "dynamic-light") {
      body.style.color = "#fff";
      document.documentElement.style.setProperty("--fg", "#fff");
    } else {
      body.style.color = "#000";
      document.documentElement.style.setProperty("--fg", "#000");
    }
  }
}


// =========================
// BOUTONS
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

  // applique immédiatement la couleur du bloc visible
  triggerDynamicColor();
});

document.getElementById('btn-rainbow-dark').addEventListener('click', () => {
  mode = "dynamic-dark";

  triggerDynamicColor();
});


// =========================
// Détection section visible
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

window.addEventListener('scroll', () => {
  if (!mode.startsWith("dynamic")) return;
  triggerDynamicColor();
});


// =========================
// Initialisation au chargement
// =========================
applyMode();
