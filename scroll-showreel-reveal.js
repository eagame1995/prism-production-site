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

  const targetWidth = isMobile ? Math.min(width * 0.84, 340) : Math.min(width * 0.34, 520);
  const targetHeight = targetWidth * 0.62;
  const scale = (targetWidth / width) * eased + (1 - eased);
  const targetX = isMobile ? 0 : width * 0.21;
  const targetY = isMobile ? height * 0.16 : height * 0.04;
  const moveX = targetX * eased;
  const moveY = targetY * eased;
  const radius = 24 * eased;

  document.documentElement.style.setProperty("--progress", progress.toFixed(4));
  document.documentElement.style.setProperty("--scale", scale.toFixed(4));
  document.documentElement.style.setProperty("--move-x", `${moveX.toFixed(2)}px`);
  document.documentElement.style.setProperty("--move-y", `${moveY.toFixed(2)}px`);
  document.documentElement.style.setProperty("--radius", `${radius.toFixed(2)}px`);
  windowEl.style.aspectRatio = `${Math.round(targetWidth)} / ${Math.round(targetHeight)}`;

  const activeIndex = Math.min(shots.length - 1, Math.floor(progress * shots.length));
  shots.forEach((shot, index) => shot.classList.toggle("is-active", index === activeIndex));
};

updateReveal();
window.addEventListener("scroll", updateReveal, { passive: true });
window.addEventListener("resize", updateReveal);
