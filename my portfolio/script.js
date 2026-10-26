const projects = {
  serenity: {
    title: "Serenity",
    kicker: "FEATURED ORIGINAL · SOCIAL IMPACT",
    description: "A voice-enabled AI mental wellness companion designed to make everyday self-care feel more approachable. Planned features include mood tracking, an AI companion, meditation, mood-to-art, journaling, analytics, wellness reminders, daily reports, and crisis-support guidance.",
    tech: ["Gemini API", "JavaScript", "Wellness UX", "Voice Interaction"],
    note: "Serenity received 2nd prize in a college project competition. The project uses Gemini API; it does not use OpenAI API."
  },
  urbankart: {
    title: "UrbanKart",
    kicker: "HACKATHON BUILD · LOCAL COMMERCE",
    description: "A smart-city commerce platform concept that helps local sellers showcase products and connect with nearby buyers. The planned experience includes buyer and seller flows, category-based listings, shop locations, product details, and payment integration.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "Maps / Commerce UX"],
    note: "Team hackathon project. Add the live demo and repository links when your build is ready."
  },
  ecoswap: {
    title: "EcoSwap",
    kicker: "WEB CONCEPT · SUSTAINABILITY",
    description: "A sustainable product-exchange concept for giving useful items a second life. Users can imagine exchanging clothes, books, electronics, and other reusable goods instead of throwing them away.",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    note: "A practical front-end concept around reuse and circular consumption."
  },
  sensify: {
    title: "Sensify",
    kicker: "WEB CONCEPT · MUSIC",
    description: "A mood-based music website concept where visitors choose how they feel and discover a fitting soundtrack through curated playlist links and music collections.",
    tech: ["HTML", "CSS", "Bootstrap", "JavaScript", "Spotify / YouTube links"],
    note: "A creative project exploring mood-led discovery and simple interactions."
  },
  portfolio: {
    title: "The Developer Collection",
    kicker: "PERSONAL PORTFOLIO",
    description: "A responsive portfolio inspired by the visual language of streaming platforms, with cinematic project posters, search, category filters, project detail modals, a skills section, education timeline, and contact links.",
    tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    note: "This site is a starting point. Add your real email, project links, and a real profile photo before publishing."
  }
};

const searchToggle = document.getElementById("searchToggle");
const searchPanel = document.getElementById("searchPanel");
const searchInput = document.getElementById("siteSearch");
const closeSearch = document.getElementById("closeSearch");
const projectCards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter")];
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("projectModal");
const toast = document.getElementById("toast");
let activeFilter = "all";
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function filterProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  projectCards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !query || (card.dataset.search + " " + card.innerText).toLowerCase().includes(query);
    const show = matchesFilter && matchesSearch;
    card.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible !== 0;
}

searchToggle.addEventListener("click", () => {
  searchPanel.classList.toggle("open");
  if (searchPanel.classList.contains("open")) searchInput.focus();
});
closeSearch.addEventListener("click", () => {
  searchPanel.classList.remove("open");
  searchInput.value = "";
  filterProjects();
});
searchInput.addEventListener("input", filterProjects);

filterButtons.forEach(button => button.addEventListener("click", () => {
  filterButtons.forEach(item => item.classList.toggle("active", item === button));
  activeFilter = button.dataset.filter;
  filterProjects();
}));

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  document.getElementById("modalKicker").textContent = project.kicker;
  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalDescription").textContent = project.description;
  document.getElementById("modalNote").textContent = project.note;
  const tech = document.getElementById("modalTech");
  tech.replaceChildren(...project.tech.map(item => {
    const tag = document.createElement("span");
    tag.textContent = item;
    return tag;
  }));
  document.getElementById("modalAction").onclick = () => {
    addToList(key);
    modal.hidden = true;
  };
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("modalClose").focus();
}

document.querySelectorAll(".open-project").forEach(button => button.addEventListener("click", () => openProject(button.dataset.project)));
function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", event => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    searchPanel.classList.remove("open");
  }
});

function addToList(key = "portfolio") {
  const project = projects[key];
  let saved = [];
  try { saved = JSON.parse(localStorage.getItem("rohitPortfolioList") || "[]"); } catch (_) {}
  if (!saved.includes(key)) saved.push(key);
  try { localStorage.setItem("rohitPortfolioList", JSON.stringify(saved)); } catch (_) {}
  document.getElementById("saveNote").textContent = `✓ ${project.title} added to your list`;
  showToast(`${project.title} added to My List`);
}
document.getElementById("saveHero").addEventListener("click", () => addToList("portfolio"));
document.getElementById("profileButton").addEventListener("click", () => {
  document.getElementById("about").scrollIntoView({behavior: "smooth"});
  showToast("Your profile, your story.");
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.querySelector(".desktop-nav");
menuToggle.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
  const target = document.querySelector(link.getAttribute("href"));
  if (target) {
    event.preventDefault();
    target.scrollIntoView({behavior: "smooth"});
  }
}));

filterProjects();
