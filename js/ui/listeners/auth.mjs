import { onAuth } from "../events/onAuth.mjs";

export function setAuthListener() {
  const form = document.forms.auth;
  const title = document.getElementById("authTitle");
  const nameField = document.getElementById("nameField");
  const toggleLink = document.getElementById("toggleAuthMode");
  const submitButton = form.querySelector("button[type='submit']");

  let isLogin = true;

  toggleLink.addEventListener("click", (event) => {
    event.preventDefault();
    isLogin = !isLogin;

    if (isLogin) {
      title.textContent = "Login";
      nameField.style.display = "none";
      submitButton.textContent = "Log in";
      submitButton.dataset.auth = "login";
      toggleLink.textContent = "Don't have an account? Register here";
    } else {
      title.textContent = "Register";
      nameField.style.display = "block";
      submitButton.textContent = "Register";
      submitButton.dataset.auth = "register";
      toggleLink.textContent = "Already have an account? Log in here";
    }
  });

  form.addEventListener("submit", onAuth);
}
