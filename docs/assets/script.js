const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const toTop = document.querySelector("#toTop");
const themeToggle = document.querySelector("#themeToggle");
const langToggle = document.querySelector("#langToggle");
const messageForm = document.querySelector("#messageForm");
const experienceTimeline = document.querySelector(".experience-timeline");
const contactEmail = "nguyenthanhtrung22092004@gmail.com";
const revealTargets = document.querySelectorAll(
  ".hero-copy, .bac-ho-stage, .section-heading, .content-block, .skill-card, .project-card, .education-card, .contact-info-card, .social-block, .message-form",
);

const setActiveLink = () => {
  let current = "home";

  sections.forEach((section) => {
    const top = section.offsetTop - 160;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });

  toTop.classList.toggle("show", window.scrollY > 520);
};

const applyLanguage = (lang) => {
  document.documentElement.lang = lang === "vi" ? "vi" : "en";

  document.querySelectorAll("[data-vi][data-en]").forEach((element) => {
    element.textContent = lang === "vi" ? element.dataset.vi : element.dataset.en;
  });

  document.querySelectorAll("[data-aria-vi][data-aria-en]").forEach((element) => {
    element.setAttribute(
      "aria-label",
      lang === "vi" ? element.dataset.ariaVi : element.dataset.ariaEn,
    );
  });

  document.querySelectorAll("[data-alt-vi][data-alt-en]").forEach((element) => {
    element.setAttribute("alt", lang === "vi" ? element.dataset.altVi : element.dataset.altEn);
  });

  document.querySelectorAll("[data-placeholder-vi][data-placeholder-en]").forEach((element) => {
    const value = lang === "vi" ? element.dataset.placeholderVi : element.dataset.placeholderEn;
    element.setAttribute("placeholder", value);
    element.setAttribute("aria-label", value);
  });

  document.querySelectorAll('meta[name="description"][data-vi][data-en]').forEach((element) => {
    element.setAttribute("content", lang === "vi" ? element.dataset.vi : element.dataset.en);
  });

  langToggle.textContent = lang === "vi" ? "EN" : "VI";
  langToggle.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
  localStorage.setItem("portfolio-language", lang);
};

window.addEventListener("scroll", setActiveLink);
setActiveLink();

toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☾" : "☀";
});

langToggle.addEventListener("click", () => {
  const currentLang = document.documentElement.lang === "vi" ? "vi" : "en";
  applyLanguage(currentLang === "vi" ? "en" : "vi");
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(messageForm);
  const name = formData.get("name")?.toString().trim() || "No name";
  const senderEmail = formData.get("email")?.toString().trim() || "No email";
  const subject = formData.get("subject")?.toString().trim() || "Portfolio contact";
  const message = formData.get("message")?.toString().trim() || "No message";
  const body = [
    `Name: ${name}`,
    `Email: ${senderEmail}`,
    "",
    "Message:",
    message,
  ].join("\n");

  window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

if ("IntersectionObserver" in window) {
  if (experienceTimeline) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("timeline-fired");
            timelineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.34 },
    );

    timelineObserver.observe(experienceTimeline);
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -40px 0px" },
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 80}ms`);
    revealObserver.observe(element);
  });
} else {
  if (experienceTimeline) {
    experienceTimeline.classList.add("timeline-fired");
  }

  revealTargets.forEach((element) => {
    element.classList.add("is-visible");
  });
}

applyLanguage(localStorage.getItem("portfolio-language") || "en");

