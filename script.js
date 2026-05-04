const header = document.querySelector("[data-header]");
const progress = document.querySelector("[data-progress]");
const form = document.querySelector("[data-form]");
const note = document.querySelector("[data-form-note]");
const revealItems = document.querySelectorAll(
  ".work-card, .frame-card, .work-flow-list a, .services-grid article, .about-band > *, .process-step, .contact-copy, .contact-form"
);

const updateHeader = () => {
  if (!header) return;

  const currentY = Math.max(window.scrollY, 0);
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progressValue = maxScroll > 0 ? currentY / maxScroll : 0;
  const aboutBand = document.querySelector(".about-band");
  const isOverDarkBand = aboutBand
    ? aboutBand.getBoundingClientRect().top <= 82 && aboutBand.getBoundingClientRect().bottom >= 82
    : false;

  header.classList.toggle("is-scrolled", currentY > 36);
  header.classList.toggle("is-dark", isOverDarkBand);

  if (progress) {
    progress.style.transform = `scaleX(${Math.min(Math.max(progressValue, 0), 1)})`;
  }
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", updateHeader);

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
