import { login } from "../../api/auth/login.mjs";
import { registerUser } from "../../api/auth/register.mjs";

export async function onAuth(event) {
  event.preventDefault();
  console.log("Auth form submitted");

  const name = event.target.name?.value.trim();
  const email = event.target.email.value.trim();
  const password = event.target.password.value.trim();

  const allowedDomains = ["@noroff.no", "@stud.noroff.no"];
  if (!allowedDomains.some((domain) => email.endsWith(domain))) {
    alert("Only @noroff.no and @stud.noroff.no email addresses are allowed.");
    return;
  }

  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Auth mode:", event.submitter.dataset.auth);

  try {
    if (event.submitter.dataset.auth === "login") {
      console.log("Attempting to log in...");
      await login(email, password);
      console.log("Login successful!");
    } else {
      console.log("Attempting to register...");
      await registerUser(name, email, password);
      console.log("Registration successful!");
      console.log("Logging in after registration...");
      await login(email, password);
      console.log("Auto-login after register successful!");
    }

    window.location.href = "/index.html";
  } catch (error) {
    console.error("Error during auth:", error.message);
    alert(error.message);
  }
}
