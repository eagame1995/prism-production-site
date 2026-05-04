const header = document.querySelector("[data-header]");
const progress = document.querySelector("[data-progress]");
const frameCards = document.querySelectorAll(".frame-card");
const themedSections = document.querySelectorAll("[data-theme='dark']");
const cascade = document.querySelector("[data-cascade]");

let lastY = window.scrollY;

const updateHeader = () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = max > 0 ? y / max : 0;

  header.classList.toggle("is-compact", y > 120);
  header.classList.toggle("is-hidden", y > lastY && y > 520);
  progress.style.transform = `scaleX(${progressValue})`;

  const headerProbe = 80;
  const isDark = [...themedSections].some((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= headerProbe && rect.bottom >= headerProbe;
  });
  header.classList.toggle("is-dark", isDark);

  lastY = Math.max(y, 0);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  },
  { threshold: 0.32 }
);

frameCards.forEach((card) => observer.observe(card));

if (cascade) {
  const words = cascade.textContent.trim().split(/\s+/);
  cascade.textContent = "";
  words.forEach((word) => {
    const span = document.createElement("span");
    span.textContent = `${word} `;
    cascade.appendChild(span);
  });

  const spans = cascade.querySelectorAll("span");
  const lightWords = () => {
    const rect = cascade.getBoundingClientRect();
    const windowMid = window.innerHeight * 0.72;
    const progressValue = Math.min(1, Math.max(0, (windowMid - rect.top) / rect.height));
    const count = Math.floor(progressValue * spans.length);
    spans.forEach((span, index) => span.classList.toggle("is-lit", index <= count));
  };

  window.addEventListener("scroll", lightWords, { passive: true });
  lightWords();
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();
