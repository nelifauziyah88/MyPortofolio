const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("navOverlay");

hamburger.addEventListener("click", () => {
  navLinks.classList.contains("open") ? closeMenu() : openMenu();
});

overlay.addEventListener("click", closeMenu);
navLinks
  .querySelectorAll("a")
  .forEach((l) => l.addEventListener("click", closeMenu));

function openMenu() {
  hamburger.classList.add("open");
  navLinks.classList.add("open");
  overlay.style.display = "block";
  requestAnimationFrame(() => overlay.classList.add("open"));
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  hamburger.classList.remove("open");
  navLinks.classList.remove("open");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    overlay.style.display = "none";
  }, 300);
}

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(
          () => entry.target.classList.add("visible"),
          parseInt(delay),
        );
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

revealEls.forEach((el) => revealObserver.observe(el));

document.querySelectorAll(".poster-frame img").forEach((img) => {
  img.addEventListener("error", () => {
    img.style.display = "none";
    const fallback = img.nextElementSibling;
    if (fallback) fallback.style.display = "flex";
  });
});
