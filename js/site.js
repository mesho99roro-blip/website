document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".primary-nav");
  if (menuButton && menu) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open", !expanded);
    });
    menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menu.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false");
    }));
  }
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    reveals.forEach(item => observer.observe(item));
  } else reveals.forEach(item => item.classList.add("is-visible"));
  const topLink = document.querySelector(".back-to-top");
  if (topLink) window.addEventListener("scroll", () => topLink.classList.toggle("visible", window.scrollY > 500), { passive: true });
  document.querySelectorAll("form[novalidate]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const fields = [...form.querySelectorAll("[required]")];
    const invalid = fields.filter(field => !field.value.trim() || !field.validity.valid);
    fields.forEach(field => field.setAttribute("aria-invalid", String(invalid.includes(field))));
    const status = form.querySelector(".form-status");
    if (invalid.length) { status.textContent = "Please complete the highlighted fields."; invalid[0].focus(); return; }
    status.textContent = form.classList.contains("contact-form")
      ? "Thank you - your message is ready to send."
      : "Your sign-in details are ready to submit.";
    form.reset();
  }));
});
