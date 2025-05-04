export function showLoginRedirectMessage() {
  const message = localStorage.getItem("authRedirectMessage");
  if (message) {
    const container = document.getElementById("login-message");

    if (container) {
      container.textContent = message;
      container.classList.add("alert");
      localStorage.removeItem("authRedirectMessage");
    }
  }
}
