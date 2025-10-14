// Scroll fluide Aa
document.querySelectorAll('.spot-item').forEach(item => {
  item.addEventListener('click', () => {
    const fontName = item.dataset.font;
    let targetId = "";
    if (fontName === "Drakéide Sf") targetId = "drakeide";
    if (fontName === "Calvus") targetId = "calvus";
    if (fontName === "Schwarzy Black") targetId = "schwarzy";
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// Modes couleurs
let mode = "black"; // ouverture par défaut en mode noir
const body = document.body;
const contact = document.querySelector('.contact-strip');
const sections = document.querySelectorAll('.font-block');

function applyMode(color = null) {
  if (mode === "black") {
    body.style.backgroundColor = "#000";
    contact.style.backgroundColor = "#000";
    body.style.color = "#fff";
    document.documentElement.style.setProperty("--fg", "#fff");
  }
  if (mode === "white") {
    body.style.backgroundColor = "#fff";
    contact.style.backgroundColor = "#fff";
    body.style.color = "#000";
    document.documentElement.style.setProperty("--fg", "#000");
  }
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
  let midSection = document.querySelector('.font-block');
  if (midSection) applyMode(midSection.dataset.color);
});
document.getElementById('btn-rainbow-dark').addEventListener('click', () => {
  mode = "dynamic-dark";
  let midSection = document.querySelector('.font-block');
  if (midSection) applyMode(midSection.dataset.color);
});

// Scroll → couleurs dynamiques
window.addEventListener('scroll', () => {
  if (!mode.startsWith("dynamic")) return;
  let middle = window.innerHeight / 2;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom >= middle) {
      let color = section.dataset.color;
      if (color) {
        applyMode(color);
      }
    }
  });
});

// Premier bloc centré au chargement
window.addEventListener('load', () => {
  document.getElementById('drakeide').scrollIntoView({ behavior: 'auto', block: 'center' });
});

