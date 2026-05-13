const header = document.querySelector("[data-header]");
const progress = document.querySelector("[data-progress]");
const intro = document.querySelector("[data-intro]");
const form = document.querySelector("[data-form]");
const note = document.querySelector("[data-form-note]");
const showreelStage = document.querySelector("[data-showreel-stage]");
const showreelWindow = document.querySelector("[data-showreel-window]");
const showreelShots = [...document.querySelectorAll(".showreel-shot")];
const revealItems = document.querySelectorAll(
  ".work-card, .frame-card, .work-flow-list a, .services-grid article, .about-band > *, .process-step, .contact-copy, .contact-form"
);

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);
const easeOut = (value) => 1 - Math.pow(1 - value, 3);

const updateHeader = () => {
  if (!header) return;

  const currentY = Math.max(window.scrollY, 0);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? currentY / maxScroll : 0;
  const darkSections = document.querySelectorAll(".showreel-section, .about-band");
  const isOverDarkBand = [...darkSections].some((section) => {
    const rect = section.getBoundingClientRect();
    return rect.top <= 82 && rect.bottom >= 82;
  });

  header.classList.toggle("is-scrolled", currentY > 36);
  header.classList.toggle("is-dark", isOverDarkBand);

  if (progress) {
    progress.style.transform = `scaleX(${Math.min(Math.max(progressValue, 0), 1)})`;
  }
};

const updateShowreel = () => {
  if (!showreelStage || !showreelWindow) return;

  const rect = showreelStage.getBoundingClientRect();
  const maxScroll = showreelStage.offsetHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? clamp(-rect.top / maxScroll) : 1;
  const eased = easeOut(progressValue);
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

  document.documentElement.style.setProperty("--showreel-progress", progressValue.toFixed(4));
  document.documentElement.style.setProperty("--showreel-screen-width", `${screenWidth.toFixed(2)}px`);
  document.documentElement.style.setProperty("--showreel-screen-height", `${screenHeight.toFixed(2)}px`);
  document.documentElement.style.setProperty("--showreel-screen-x", `${screenX.toFixed(2)}px`);
  document.documentElement.style.setProperty("--showreel-screen-y", `${screenY.toFixed(2)}px`);
  document.documentElement.style.setProperty("--showreel-radius", `${radius.toFixed(2)}px`);

  const activeIndex = Math.min(showreelShots.length - 1, Math.floor(progressValue * showreelShots.length));
  showreelShots.forEach((shot, index) => shot.classList.toggle("is-active", index === activeIndex));
};

updateHeader();
updateShowreel();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("scroll", updateShowreel, { passive: true });
window.addEventListener("resize", () => {
  updateHeader();
  updateShowreel();
});

if (intro) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let introDone = false;

  const finishIntro = () => {
    if (introDone) return;
    introDone = true;
    intro.classList.add("is-done");
    window.setTimeout(() => intro.remove(), 420);
  };

  if (reduceMotion) {
    finishIntro();
  } else {
    window.setTimeout(finishIntro, 3550);
    intro.addEventListener("click", finishIntro);
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" || event.key === "Enter" || event.key === " ") {
        finishIntro();
      }
    });
  }
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.14 }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.textContent = "Заявка подготовлена. На следующем шаге подключим отправку в Telegram, почту или CRM.";
    form.reset();
  });
}
