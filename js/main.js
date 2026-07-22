/* ─────────────────────────────────────────────
   Mountech – Premium Scroll Animations v2
   Bi-directional (play on scroll down & up)
   ───────────────────────────────────────────── */

const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
const year = document.getElementById("year");

if (year) year.textContent = String(new Date().getFullYear());

/* ── Sticky header ── */
const syncHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 20);
};
syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

/* ── Mobile menu ── */
if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!header || !menuToggle) return;
    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

/* ── Reduced motion check ── */
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ══════════════════════════════════════════════
   GSAP SCROLL ANIMATIONS
   ══════════════════════════════════════════════ */

if (window.gsap && window.ScrollTrigger && !reducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // Bi-directional: play entering ↓, reverse leaving ↑
  const TOGGLE = "play none none reverse";

  /* ────────────────────────────────
     HERO – cinematic entrance
     ──────────────────────────────── */
  const heroTl = gsap.timeline({ delay: 0.15 });
  const hKicker = document.querySelector(".hero-kicker");
  const hTitle = document.querySelector("#home h1");
  const hDesc = document.querySelector("#home p");
  const hBtns = gsap.utils.toArray("#home .mt-9 a");

  if (hKicker) {
    heroTl.fromTo(hKicker,
      { opacity: 0, x: -40, filter: "blur(6px)" },
      { opacity: 1, x: 0, filter: "blur(0px)", duration: 0.8, ease: "power4.out" }
    );
  }
  if (hTitle) {
    heroTl.fromTo(hTitle,
      { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power4.out" },
      "-=0.5"
    );
  }
  if (hDesc) {
    heroTl.fromTo(hDesc,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );
  }
  if (hBtns.length) {
    heroTl.fromTo(hBtns,
      { opacity: 0, y: 24, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)", stagger: 0.15 },
      "-=0.3"
    );
  }

  /* Hero parallax */
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    gsap.to(heroBg, {
      backgroundPositionY: "35%",
      ease: "none",
      scrollTrigger: { trigger: heroBg, scrub: 0.5, start: "top top", end: "bottom top" },
    });
  }

  /* ────────────────────────────────
     ABOUT – card + paragraph cascade
     ──────────────────────────────── */
  const aboutCard = document.querySelector("#about article");
  if (aboutCard) {
    gsap.fromTo(aboutCard,
      { opacity: 0, y: 80, scale: 0.92, borderColor: "transparent" },
      {
        opacity: 1, y: 0, scale: 1, borderColor: "#e5e7eb",
        duration: 1, ease: "power4.out",
        scrollTrigger: { trigger: aboutCard, start: "top 85%", end: "top 20%", toggleActions: TOGGLE },
      }
    );

    const paras = aboutCard.querySelectorAll("p");
    gsap.fromTo(paras,
      { opacity: 0, y: 25, filter: "blur(3px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.6, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: aboutCard, start: "top 78%", end: "top 15%", toggleActions: TOGGLE },
      }
    );
  }

  /* ────────────────────────────────
     SERVICE CARDS – waterfall stagger
     ──────────────────────────────── */
  const svcCards = gsap.utils.toArray(".service-card");
  svcCards.forEach((card, i) => {
    const direction = i % 2 === 0 ? -1 : 1;

    gsap.fromTo(card,
      { opacity: 0, y: 70, x: direction * 30, rotateY: direction * 4 },
      {
        opacity: 1, y: 0, x: 0, rotateY: 0,
        duration: 0.85, ease: "power4.out",
        scrollTrigger: { trigger: card, start: "top 90%", end: "top 10%", toggleActions: TOGGLE },
      }
    );

    const icon = card.querySelector(".service-icon");
    if (icon) {
      gsap.fromTo(icon,
        { scale: 0, rotation: -90 },
        {
          scale: 1, rotation: 0,
          duration: 0.6, ease: "back.out(3)",
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }

    const tags = card.querySelectorAll(".tag-row span");
    if (tags.length) {
      gsap.fromTo(tags,
        { opacity: 0, scale: 0.5, y: 10 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.4, ease: "back.out(2)", stagger: 0.06,
          scrollTrigger: { trigger: card, start: "top 82%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }
  });

  /* ────────────────────────────────
     WHY CHOOSE US – fan out
     ──────────────────────────────── */
  const whyCards = gsap.utils.toArray(".why-card");
  whyCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 60, scale: 0.88, rotateX: 6 },
      {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 0.75, ease: "power4.out",
        delay: (i % 3) * 0.08,
        scrollTrigger: { trigger: card, start: "top 90%", end: "top 10%", toggleActions: TOGGLE },
      }
    );

    const icon = card.querySelector(".why-icon");
    if (icon) {
      gsap.fromTo(icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1, rotation: 0,
          duration: 0.7, ease: "back.out(2.5)",
          scrollTrigger: { trigger: card, start: "top 88%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }
  });

  /* ────────────────────────────────
     PORTFOLIO – 3D card reveal
     ──────────────────────────────── */
  const projCards = gsap.utils.toArray(".project-card");
  projCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 80, scale: 0.9, rotateX: 8 },
      {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 0.9, ease: "power4.out",
        delay: i * 0.1,
        scrollTrigger: { trigger: card, start: "top 88%", end: "top 10%", toggleActions: TOGGLE },
      }
    );

    const overlay = card.querySelector(".project-overlay");
    if (overlay) {
      gsap.fromTo(overlay,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.65, ease: "power3.out",
          delay: i * 0.1 + 0.25,
          scrollTrigger: { trigger: card, start: "top 82%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }
  });

  /* ────────────────────────────────
     TECHNOLOGY – pop grid
     ──────────────────────────────── */
  const techCards = gsap.utils.toArray(".technology-card");
  techCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.7, ease: "power4.out",
        delay: (i % 3) * 0.1,
        scrollTrigger: { trigger: card, start: "top 90%", end: "top 10%", toggleActions: TOGGLE },
      }
    );

    const tags = card.querySelectorAll(".tech-tags span");
    if (tags.length) {
      gsap.fromTo(tags,
        { opacity: 0, x: -15, scale: 0.7 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.4, ease: "back.out(2)", stagger: 0.07,
          scrollTrigger: { trigger: card, start: "top 85%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }
  });

  /* ────────────────────────────────
     WORKFLOW TIMELINE – sequential draw
     ──────────────────────────────── */
  const tlLine = document.querySelector(".timeline-line");
  if (tlLine) {
    gsap.fromTo(tlLine,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1, duration: 1.4, ease: "power2.inOut",
        scrollTrigger: { trigger: tlLine, start: "top 88%", end: "top 20%", toggleActions: TOGGLE },
      }
    );
  }

  const tlCards = gsap.utils.toArray(".timeline-card");
  tlCards.forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 50, scale: 0.85 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.55, ease: "power4.out",
        delay: i * 0.06,
        scrollTrigger: { trigger: card, start: "top 92%", end: "top 10%", toggleActions: TOGGLE },
      }
    );

    const badge = card.querySelector("span");
    if (badge) {
      gsap.fromTo(badge,
        { scale: 0, rotation: -270 },
        {
          scale: 1, rotation: 0,
          duration: 0.7, ease: "back.out(2.5)",
          delay: i * 0.06 + 0.1,
          scrollTrigger: { trigger: card, start: "top 92%", end: "top 10%", toggleActions: TOGGLE },
        }
      );
    }
  });

  /* ────────────────────────────────
     COMMITMENT – scale reveal
     ──────────────────────────────── */
  const commitCard = document.querySelector("#commitment .contact-info-card");
  if (commitCard) {
    gsap.fromTo(commitCard,
      { opacity: 0, y: 60, scale: 0.93 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.9, ease: "power4.out",
        scrollTrigger: { trigger: commitCard, start: "top 85%", end: "top 15%", toggleActions: TOGGLE },
      }
    );
  }

  /* ────────────────────────────────
     SECTION KICKERS & TITLES
     ──────────────────────────────── */
  gsap.utils.toArray(".section-kicker").forEach((el) => {
    if (el.classList.contains("hero-kicker")) return;
    gsap.fromTo(el,
      { opacity: 0, x: -35, filter: "blur(5px)" },
      {
        opacity: 1, x: 0, filter: "blur(0px)",
        duration: 0.75, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 15%", toggleActions: TOGGLE },
      }
    );
  });

  gsap.utils.toArray(".section-title").forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 35, clipPath: "inset(0 0 40% 0)" },
      {
        opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)",
        duration: 0.85, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 90%", end: "top 15%", toggleActions: TOGGLE },
      }
    );
  });

  /* ────────────────────────────────
     FOOTER – staggered columns
     ──────────────────────────────── */
  const footer = document.querySelector("footer");
  if (footer) {
    const fCols = footer.querySelectorAll(".grid > div");
    gsap.fromTo(fCols,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.65, ease: "power3.out", stagger: 0.1,
        scrollTrigger: { trigger: footer, start: "top 92%", end: "top 30%", toggleActions: TOGGLE },
      }
    );
  }

  /* ────────────────────────────────
     GENERIC REVEAL – fallback
     ──────────────────────────────── */
  [
    { sel: ".reveal-up", from: { opacity: 0, y: 50 } },
    { sel: ".reveal-left", from: { opacity: 0, x: -50 } },
    { sel: ".reveal-right", from: { opacity: 0, x: 50 } },
  ].forEach(({ sel, from }) => {
    gsap.utils.toArray(sel).forEach((el) => {
      if (gsap.getProperty(el, "opacity") === 1) return;
      gsap.fromTo(el, from, {
        opacity: 1, x: 0, y: 0,
        duration: 0.85, ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 10%", toggleActions: TOGGLE },
      });
    });
  });

  /* ────────────────────────────────
     SUBTLE PARALLAX on sections
     ──────────────────────────────── */
  gsap.utils.toArray("section").forEach((sec) => {
    const inner = sec.querySelector(":scope > .mx-auto, :scope > div > .mx-auto");
    if (!inner || sec.id === "home") return;
    gsap.fromTo(inner,
      { y: 25 },
      {
        y: -25, ease: "none",
        scrollTrigger: { trigger: sec, scrub: 0.4, start: "top bottom", end: "bottom top" },
      }
    );
  });

} else {
  /* Fallback: make everything visible */
  document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
    el.style.opacity = "1";
  });
}
