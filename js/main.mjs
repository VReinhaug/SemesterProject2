import { setAuthListener } from "./ui/listeners/auth.mjs";
import { protectPage } from "./api/routes/guard.mjs";
import { showLoginRedirectMessage } from "./ui/messages/loginRedirect.mjs";
import { load } from "./storage/load.mjs";

// Protect pages
protectPage();

// Show message if redirected to login
if (window.location.pathname.endsWith("login.html")) {
  console.log("📍 We're on the login page");
  showLoginRedirectMessage();
  setAuthListener();
}

// Navbar logic
const logoutLink = document.querySelector(".nav-icon.logout");
const profileLink = document.querySelector(".nav-icon.profile");
const addListingLink = document.querySelector(".nav-icon.add-listing");

const token = load("token");

if (token) {
  // Logged in
  if (logoutLink) {
    logoutLink.innerHTML = `
      <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
      <p class="mb-0">Logout</p>
    `;
    logoutLink.addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "/login.html";
    });
  }
} else {
  // Logged out
  if (logoutLink) {
    logoutLink.innerHTML = `
      <i class="fa-solid fa-arrow-right-to-bracket fa-xl"></i>
      <p class="mb-0">Login</p>
    `;
    logoutLink.href = "/login.html";
  }

  // Hide links that shouldn't be visible
  if (profileLink) profileLink.style.display = "none";
  if (addListingLink) addListingLink.style.display = "none";
}
