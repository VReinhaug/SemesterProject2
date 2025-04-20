import { load } from "../../storage/load.mjs";

export function protectPage() {
  const token = load("token");
  const currentPath = window.location.pathname;

  // Public pages that don't need auth
  const publicPages = ["/", "/index.html", "/login.html"];

  const isPublic = publicPages.includes(currentPath);

  if (!token && !isPublic) {
    localStorage.setItem(
      "authRedirectMessage",
      "Please log in or register to access the full site.",
    );
    window.location.href = "/login.html";
  }
}
