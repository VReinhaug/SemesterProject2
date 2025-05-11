import { authFetch } from "../fetch.mjs";
import { API_BASE_URL, API_PROFILE } from "../constants.mjs";

export async function getListings(name) {
  const res = await authFetch(`${API_BASE_URL}${API_PROFILE}${name}/listings`);
  const { data } = await res.json();
  return data;
}
