const cards = document.querySelectorAll(".reveal-card");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.24 }
);

cards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 90}ms`;
  observer.observe(card);
});
