const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") document.body.classList.add("dark");
updateThemeButton();

function updateThemeButton() {
  const dark = document.body.classList.contains("dark");
  themeToggle.textContent = dark ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("portfolio-theme", document.body.classList.contains("dark") ? "dark" : "light");
  updateThemeButton();
});

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

document.querySelectorAll("#navLinks a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const projects = {
  booking: {
    title: "Flight Booking Application",
    description: "End-to-end QA of a flight booking journey from search to booking confirmation, including external payment flow.",
    focus: ["Search and results", "Passenger and baggage forms", "Insurance and payment", "Regression and compatibility testing", "API and network checks"]
  },
  wayfinding: {
    title: "Airport Wayfinding",
    description: "Testing interactive airport mapping experiences across kiosk and web products, with a focus on navigation and map behavior.",
    focus: ["POIs and retail information", "3D map and level picker", "Route guidance", "Kiosk and responsive behavior", "Accessibility scenarios"]
  },
  accessibility: {
    title: "Accessibility Testing",
    description: "Accessibility-focused testing of web interfaces against WCAG-oriented requirements and common assistive technology scenarios.",
    focus: ["Keyboard navigation and focus", "Screen reader checks", "Semantic HTML and ARIA", "Color and non-text contrast", "Responsive text and reflow"]
  },
  cloud: {
    title: "Cloud & API Platform",
    description: "Functional and API testing of platform workflows, integrations and data-driven scenarios.",
    focus: ["REST API requests", "Response and data validation", "Negative scenarios", "Regression testing", "Defect investigation"]
  }
};

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalList = document.getElementById("modalList");
const modalClose = document.getElementById("modalClose");
let lastFocused = null;

function openModal(key) {
  const project = projects[key];
  if (!project) return;
  lastFocused = document.activeElement;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalList.innerHTML = project.focus.map(item => `<li>${item}</li>`).join("");
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocused) lastFocused.focus();
}

document.querySelectorAll(".project-details").forEach(button => {
  button.addEventListener("click", () => openModal(button.dataset.project));
});
modalClose.addEventListener("click", closeModal);
document.querySelector("[data-close-modal]").addEventListener("click", closeModal);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

function setError(id, message) {
  document.getElementById(id).textContent = message;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  setError("nameError", "");
  setError("emailError", "");
  setError("messageError", "");
  document.getElementById("formSuccess").textContent = "";

  let valid = true;
  if (!nameInput.value.trim()) { setError("nameError", "Name is required."); valid = false; }
  if (!emailInput.value.trim()) {
    setError("emailError", "Email is required."); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
    setError("emailError", "Please enter a valid email."); valid = false;
  }
  if (!messageInput.value.trim()) { setError("messageError", "Message is required."); valid = false; }

  if (valid) {
    document.getElementById("formSuccess").textContent = "Message sent successfully! (Demo)";
    form.reset();
  }
});
