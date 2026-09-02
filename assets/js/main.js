/**
 * Naseel Nasi — Portfolio
 * Interaction layer: nav, scroll reveal, skill bars, work filter, hero type effect
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Preloader ---------- */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    if (preloader) {
      setTimeout(() => preloader.classList.add("is-hidden"), 350);
    }
  });

  /* ---------- Mobile nav ---------- */
  const navWrap = document.querySelector(".nav-wrap");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navWrap.classList.toggle("is-open");
    });
  }
  navLinks.forEach((link) => {
    link.addEventListener("click", () => navWrap.classList.remove("is-open"));
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const setActiveLink = () => {
    let current = sections[0]?.id;
    const scrollPos = window.scrollY + 140;
    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) current = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  /* ---------- Back to top ---------- */
  const backToTop = document.querySelector(".back-to-top");
  const toggleBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  /* ---------- Cursor glow ---------- */
  const cursorGlow = document.getElementById("cursorGlow");
  if (cursorGlow && !prefersReducedMotion) {
    window.addEventListener("mousemove", (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- Hero typed effect ---------- */
  const typedEl = document.querySelector(".typed");
  if (typedEl && window.Typed) {
    const items = (typedEl.getAttribute("data-typed-items") || "").split(",").map((s) => s.trim());
    new Typed(".typed", {
      strings: items,
      typeSpeed: 65,
      backSpeed: 35,
      backDelay: 1800,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(".reveal, .skill-bar");
  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (entry.target.classList.contains("skill-bar")) {
              const value = entry.target.getAttribute("data-value") || "0";
              entry.target.style.setProperty("--fill", `${value}%`);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Work filter ---------- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const workCards = document.querySelectorAll(".work-card");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.getAttribute("data-filter");
      workCards.forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-cat") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
