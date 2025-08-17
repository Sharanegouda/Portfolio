// Smooth in-page navigation (no hash-jumps)
document.querySelectorAll(".main-nav a").forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });
});

// Intersection Observer for section reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".bar").forEach((bar) => {
          const width = bar.getAttribute("data-width") || "0";
          bar.style.width = "0%";
          requestAnimationFrame(() => (bar.style.width = width + "%"));
        });
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".section").forEach((sec) => observer.observe(sec));

// Subtle button “press” effect on keyboard enter/space
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") btn.click();
  });
});
