import { authFetch } from "../fetch.mjs";
import { API_BASE_URL, API_PROFILE_BIDS } from "../constants.mjs";

export async function getBids(name) {
  const res = await authFetch(`${API_BASE_URL}${API_PROFILE_BIDS(name)}`);
  const { data } = await res.json();
  return data;
}
