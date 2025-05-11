import { API_AUTH, API_BASE_URL, API_REGISTER } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

// Register function for new users
export async function registerUser(name, email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  }

  throw new Error("Account could not be registered.");
}
