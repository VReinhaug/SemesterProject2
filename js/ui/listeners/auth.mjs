import { onAuth } from "../events/onAuth.mjs";

export function setAuthListener() {
  // Get references to relevant elements
  const form = document.forms.auth;
  const title = document.getElementById("authTitle");
  const nameField = document.getElementById("nameField");
  const toggleLink = document.getElementById("toggleAuthMode");
  const submitButton = form.querySelector("button[type='submit']");

  // Set initial mode to "login"
  let isLogin = true;

  // Toggle between login and register modes
  toggleLink.addEventListener("click", (event) => {
    event.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      // Update UI for Login Mode
      title.textContent = "Login";
      nameField.style.display = "none";
      submitButton.textContent = "Log in";
      submitButton.dataset.auth = "login";
      toggleLink.textContent = "Don't have an account? Register here";
    } else {
      // Update UI for Register Mode
      title.textContent = "Register";
      nameField.style.display = "block";
      submitButton.textContent = "Register";
      submitButton.dataset.auth = "register";
      toggleLink.textContent = "Already have an account? Log in here";
    }
  });

  // Attach the submit event listener to the form
  form.addEventListener("submit", onAuth);
}

// Initialize the event listener when this module is loaded
setAuthListener();
