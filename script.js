const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-form]");
const note = document.querySelector("[data-form-note]");

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

form.addEventListener("submit", (event) => {
  event.preventDefault();
  note.textContent = "Заявка подготовлена. На следующем шаге подключим отправку в Telegram, почту или CRM.";
  form.reset();
});
