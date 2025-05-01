import { authFetch } from "../fetch.mjs";
import { API_BASE_URL, API_PROFILE } from "../constants.mjs";

export async function getProfile(name) {
  const res = await authFetch(`${API_BASE_URL}/auction/profiles/${name}`);
  const { data } = await res.json();
  return data;
}
