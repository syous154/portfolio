const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = [...navLinks].map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

function setActiveNav(id) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + id);
  });
}

function updateActiveNav() {
  const offset = 150;
  const current = sections.reduce((match, section) => {
    return section.getBoundingClientRect().top <= offset ? section : match;
  }, null);
  if (current) {
    setActiveNav(current.id);
  } else {
    navLinks.forEach((link) => link.classList.remove("active"));
  }
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(" ");
      const shouldShow = filter === "all" || categories.includes(filter);
      card.hidden = !shouldShow;
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const source = card.dataset.source;
    if (source) {
      window.open(source, "_blank", "noopener,noreferrer");
    }
  });

  card.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && card.dataset.source) {
      event.preventDefault();
      window.open(card.dataset.source, "_blank", "noopener,noreferrer");
    }
  });
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("href").slice(1);
    setActiveNav(targetId);
  });
});

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);
updateActiveNav();