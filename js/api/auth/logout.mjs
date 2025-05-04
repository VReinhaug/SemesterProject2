export function logoutUser() {
  console.log("🔒 Logging out...");
  localStorage.clear();
  window.location.href = "/login.html";
}
