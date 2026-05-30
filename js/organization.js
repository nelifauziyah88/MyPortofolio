const cursor = document.getElementById("cursor");
const cursorRing = document.getElementById("cursorRing");

if (cursor && cursorRing) {
  let mouseX = 0,
    mouseY = 0;
  let ringX = 0,
    ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 7}px, ${mouseY - 7}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("navOverlay");

hamburger.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("open");
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

overlay.addEventListener("click", closeMenu);

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

function openMenu() {
  hamburger.classList.add("open");
  navLinks.classList.add("open");
  overlay.style.display = "block";
  requestAnimationFrame(() => {
    overlay.classList.add("open");
  });
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
  { threshold: 0.12 },
);
revealEls.forEach((el) => revealObserver.observe(el));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".moment-card").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector(".moment-img-wrap img");
    const title = card.querySelector(".moment-title");
    const role = card.querySelector(".moment-role-tag");

    if (img && img.style.display !== "none") {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightboxCaption.textContent =
        (title ? title.textContent.trim() : "") +
        (role ? " — " + role.textContent.trim() : "");
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });
});

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => {
    lightboxImg.src = "";
  }, 300);
}

lightboxOverlay.addEventListener("click", closeLightbox);
lightboxClose.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

const toast = document.getElementById("toast");
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}
window.showToast = showToast;

document.querySelectorAll(".moment-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    const desc = card.querySelector(".moment-desc");
    desc.classList.toggle("expanded");
  });
});
