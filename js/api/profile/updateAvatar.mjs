import { authFetch } from "../fetch.mjs";
import { API_BASE_URL, API_SINGLE_PROFILE } from "../constants.mjs";

export async function updateAvatar(name, url) {
  const res = await authFetch(`${API_BASE_URL}${API_SINGLE_PROFILE}`, {
    method: "PUT",
    body: JSON.stringify({
      avatar: { url: url, alt: "User avatar" },
    }),
  });

  if (!res.ok) throw new Error("Failed to update avatar");

  const { data } = await res.json();
  return data;
}
