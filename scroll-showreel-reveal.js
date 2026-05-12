const stage = document.querySelector("[data-reveal-stage]");
const windowEl = document.querySelector("[data-showreel-window]");
const shots = [...document.querySelectorAll(".reel-shot")];

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const ease = (value) => 1 - Math.pow(1 - value, 3);

const updateReveal = () => {
  if (!stage || !windowEl) return;

  const rect = stage.getBoundingClientRect();
  const maxScroll = stage.offsetHeight - window.innerHeight;
  const progress = clamp(-rect.top / maxScroll);
  const eased = ease(progress);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 760;

  const targetWidth = isMobile ? Math.min(width * 0.84, 340) : Math.min(width * 0.46, 680);
  const targetHeight = targetWidth * (isMobile ? 0.62 : 0.58);
  const targetCenterX = isMobile ? width * 0.5 : width * 0.61;
  const targetCenterY = isMobile ? height * 0.32 : height * 0.42;
  const screenWidth = width + (targetWidth - width) * eased;
  const screenHeight = height + (targetHeight - height) * eased;
  const screenX = width * 0.5 + (targetCenterX - width * 0.5) * eased;
  const screenY = height * 0.5 + (targetCenterY - height * 0.5) * eased;
  const radius = 24 * eased;

  document.documentElement.style.setProperty("--progress", progress.toFixed(4));
  document.documentElement.style.setProperty("--screen-width", `${screenWidth.toFixed(2)}px`);
  document.documentElement.style.setProperty("--screen-height", `${screenHeight.toFixed(2)}px`);
  document.documentElement.style.setProperty("--screen-x", `${screenX.toFixed(2)}px`);
  document.documentElement.style.setProperty("--screen-y", `${screenY.toFixed(2)}px`);
  document.documentElement.style.setProperty("--radius", `${radius.toFixed(2)}px`);

  const activeIndex = Math.min(shots.length - 1, Math.floor(progress * shots.length));
  shots.forEach((shot, index) => shot.classList.toggle("is-active", index === activeIndex));
};

updateReveal();
window.addEventListener("scroll", updateReveal, { passive: true });
window.addEventListener("resize", updateReveal);
