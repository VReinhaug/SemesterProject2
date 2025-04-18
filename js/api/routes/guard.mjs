import { load } from "../../storage/load.mjs";

export function protectPage() {
  const token = load("token");

  const publicPages = ["/index.html", "/login.html"];
  const currentPath = window.location.pathname;

  if (!token && !publicPages.includes(currentPath)) {
    localStorage.setItem(
      "authRedirectMessage",
      "Please log in or register user to access the full page",
    );
    window.location.href = "/login.html";
  }
}
