import { API_AUTH, API_BASE_URL, API_REGISTER } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

// Register function for new users
export async function registerUser(name, email, password) {
  console.log("Calling register API with:", name, email);
  const response = await authFetch(API_BASE_URL + API_AUTH + API_REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  console.log("Register response:", response);

  if (response.ok) {
    const data = await response.json();
    console.log("Register data:", data);
    return data;
  }

  throw new Error("Account could not be registered.");
}
