import { setAuthListener } from "./ui/listeners/auth.mjs";
import { load } from "./storage/load.mjs";
import { logoutUser } from "./api/auth/logout.mjs";
import { protectPage } from "./api/routes/guard.mjs";
import { showLoginRedirectMessage } from "./ui/messages/loginRedirect.mjs";

if (window.location.pathname.endsWith("login.html")) {
  showLoginRedirectMessage();
  setAuthListener();
}

protectPage();

// Set up login/register form logic
if (window.location.pathname.endsWith("login.html")) {
  setAuthListener();
}

// LOGOUT + NAVBAR HANDLING
document.addEventListener("DOMContentLoaded", () => {
  const logoutLink = document.querySelector(".nav-icon.logout");
  const profileLink = document.querySelector(".nav-icon.profile");
  const addListingLink = document.querySelector(".nav-icon.add-listing");

  const token = load("token");

  if (token) {
    // User is logged in
    if (logoutLink) {
      logoutLink.innerHTML = `
        <i class="fa-solid fa-arrow-right-from-bracket fa-xl"></i>
        <p class="mb-0">Logout</p>
      `;
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        logoutUser();
      });
    }
  } else {
    // User is logged out
    if (logoutLink) {
      logoutLink.innerHTML = `
        <i class="fa-solid fa-arrow-right-to-bracket fa-xl"></i>
        <p class="mb-0">Login</p>
      `;
      logoutLink.setAttribute("href", "/login.html");
    }

    if (profileLink) profileLink.style.display = "none";
    if (addListingLink) addListingLink.style.display = "none";
  }
});
