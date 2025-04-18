import { save } from "../../storage/save.mjs";
import { API_AUTH, API_BASE_URL, API_LOGIN } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

// Login function for existing users
export async function login(email, password) {
  console.log("Calling login API with:", email);
  const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log("Login response:", response);

  if (response.ok) {
    const data = await response.json();
    console.log("Login data:", data);

    const { accessToken, ...profile } = data.data;
    save("token", accessToken);
    save("profile", profile);
    return profile;
  }

  throw new Error("Was not able to log in the account.");
}
