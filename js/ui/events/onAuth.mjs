import { login } from "../../api/auth/login.mjs";
import { registerUser } from "../../api/auth/register.mjs";

export async function onAuth(event) {
  event.preventDefault();

  const name = event.target.name?.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const allowedDomains = ["@noroff.no", "@stud.noroff.no"];
  if (!allowedDomains.some((domain) => email.endsWith(domain))) {
    alert("Only @noroff.no and @stud.noroff.no email addresses are allowed.");
    return;
  }

  try {
    const mode = event.submitter?.dataset.auth || "login";
    if (mode === "login") {
      await login(email, password);
    } else {
      await registerUser(name, email, password);
      await login(email, password);
    }

    window.location.href = "/index.html";
  } catch (error) {
    alert(error.message || "Something went wrong during login/register.");
  }
}
