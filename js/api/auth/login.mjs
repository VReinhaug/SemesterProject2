import { save } from "../../storage/save.mjs";
import { API_AUTH, API_BASE_URL, API_LOGIN } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function login(email, password) {
  const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (response.ok) {
    const { accessToken, ...profile } = json.data;

    save("token", accessToken);
    save("profile", profile);
    return profile;
  }

  throw new Error(
    json.errors?.[0]?.message || "Was not able to log in the account.",
  );
}
