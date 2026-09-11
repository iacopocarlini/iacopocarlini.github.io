"use strict";

// ===== Translations =====
const i18n = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.interests": "Interests",
    "nav.contact": "Contact",
    "hero.greeting": "Hi, I'm",
    "hero.description": `Software Engineer based in Milan with <span id="years-experience">${new Date().getFullYear() - 2021}</span>+ years of experience building and maintaining complex web applications used daily by thousands of users. I thrive on collaboration and crafting elegant interfaces that people love to use.`,
    "hero.current": 'Currently working as a Frontend Developer at <a href="https://leitha.eu/" target="_blank" rel="noopener noreferrer">Leithà</a>.',
    "hero.cta": "Get in touch",
    "skills.title": "Technologies I work with",
    "skills.subtitle": "My core toolkit for building modern web experiences",
    "interests.title": "Beyond the code",
    "interests.subtitle": "When I'm not building for the web, you'll find me on the court or in the sky",
    "interests.basketball.title": "Basketball",
    "interests.basketball.desc": "I play regularly and love the teamwork dynamic on and off the court.",
    "interests.drone.title": "Drone Photography",
    "interests.drone.desc": "Capturing breathtaking landscapes from a bird's eye perspective.",
    "interests.trekking.title": "Trekking",
    "interests.trekking.desc": "Exploring mountains and trails across Italy and beyond.",
    "interests.droneCta": "View my aerial photography →",
    "footer.title": "Let's connect",
  },
  it: {
    "nav.about": "Chi sono",
    "nav.skills": "Competenze",
    "nav.interests": "Interessi",
    "nav.contact": "Contatti",
    "hero.greeting": "Ciao, sono",
    "hero.description": `Software Engineer con sede a Milano con <span id="years-experience">${new Date().getFullYear() - 2021}</span>+ anni di esperienza nella costruzione e manutenzione di applicazioni web complesse utilizzate quotidianamente da migliaia di utenti. Amo collaborare e creare interfacce eleganti che le persone amano usare.`,
    "hero.current": 'Attualmente lavoro come Frontend Developer presso <a href="https://leitha.eu/" target="_blank" rel="noopener noreferrer">Leithà</a>.',
    "hero.cta": "Contattami",
    "skills.title": "Tecnologie che utilizzo",
    "skills.subtitle": "Il mio toolkit principale per costruire esperienze web moderne",
    "interests.title": "Oltre il codice",
    "interests.subtitle": "Quando non sviluppo per il web, mi trovi in campo o in volo",
    "interests.basketball.title": "Basket",
    "interests.basketball.desc": "Gioco regolarmente e adoro la dinamica di squadra dentro e fuori dal campo.",
    "interests.drone.title": "Fotografia con drone",
    "interests.drone.desc": "Catturare paesaggi mozzafiato da una prospettiva a volo d'uccello.",
    "interests.trekking.title": "Trekking",
    "interests.trekking.desc": "Esplorare montagne e sentieri in tutta Italia e oltre.",
    "interests.droneCta": "Guarda le mie foto aeree →",
    "footer.title": "Contatti",
  },
};

// ===== Language Switch =====
let currentLang = localStorage.getItem("lang") || "en";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  const langLabel = document.querySelector("#lang-toggle .lang-label");
  // Show the OTHER language as label (what you switch TO)
  langLabel.textContent = lang === "en" ? "IT" : "EN";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLanguage(currentLang === "en" ? "it" : "en");
});

// ===== Theme Toggle =====
function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

document.getElementById("theme-toggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Listen for system preference changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    setTheme(e.matches ? "dark" : "light");
  }
});

// ===== Dynamic Year =====
document.getElementById("current-year").textContent = new Date().getFullYear();

// ===== Apply saved language on load =====
setLanguage(currentLang);

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll(
  ".skill-card, .interest-card, .drone-showcase, .contact-link"
);

if (revealElements.length > 0 && "IntersectionObserver" in window) {
  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));
}

// ===== Navbar shadow on scroll =====
const nav = document.querySelector(".nav");
if (nav) {
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.style.boxShadow =
            window.scrollY > 10 ? "0 1px 8px rgba(0, 0, 0, 0.06)" : "none";
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

// ===== Pause orbit animation on hover (better UX) =====
const orbitRings = document.querySelectorAll(".skills-orbit-ring");
orbitRings.forEach((ring) => {
  ring.addEventListener("mouseenter", () => {
    ring.style.animationPlayState = "paused";
  });
  ring.addEventListener("mouseleave", () => {
    ring.style.animationPlayState = "running";
  });
});