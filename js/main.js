const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const mobileLinks = document.querySelectorAll(".mobile-nav-link");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

const syncHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 20);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (menuToggle && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!header || !menuToggle) {
      return;
    }

    header.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  const revealGroups = [
    { selector: ".reveal-up", x: 0, y: 32 },
    { selector: ".reveal-left", x: -36, y: 0 },
    { selector: ".reveal-right", x: 36, y: 0 },
  ];

  revealGroups.forEach((group) => {
    gsap.utils.toArray(group.selector).forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, x: group.x, y: group.y },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
          },
        }
      );
    });
  });

  const counters = document.querySelectorAll(".stat-number[data-target]");

  counters.forEach((counter) => {
    const endValue = Number(counter.getAttribute("data-target"));

    ScrollTrigger.create({
      trigger: counter,
      start: "top 88%",
      once: true,
      onEnter: () => {
        const state = { value: 0 };

        gsap.to(state, {
          value: endValue,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = `${Math.round(state.value)}+`;
          },
        });
      },
    });
  });

  const heroImage = document.querySelector(".hero-image");

  if (heroImage) {
    gsap.to(heroImage, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: "#home",
        scrub: 0.8,
        start: "top top",
        end: "bottom top",
      },
    });
  }
}
