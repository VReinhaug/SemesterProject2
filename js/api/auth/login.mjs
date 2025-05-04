import { save } from "../../storage/save.mjs";
import { API_AUTH, API_BASE_URL, API_LOGIN } from "../constants.mjs";
import { authFetch } from "../fetch.mjs";

export async function login(email, password) {
  console.log(
    "📡 Sending login request to:",
    API_BASE_URL + API_AUTH + API_LOGIN,
  );
  console.log("Payload:", { email, password });

  const response = await authFetch(API_BASE_URL + API_AUTH + API_LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  console.log("🟢 Login response object:", response);

  const json = await response.json();
  console.log("🔍 Raw login response JSON:", json);

  if (response.ok) {
    const { accessToken, ...profile } = json.data;

    console.log("✅ Login successful. Token:", accessToken);
    console.log("👤 Profile:", profile);

    save("token", accessToken);
    save("profile", profile);
    return profile;
  }

  throw new Error(
    json.errors?.[0]?.message || "Was not able to log in the account.",
  );
}
