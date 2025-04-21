import { authFetch } from "../fetch.mjs";
import { API_BASE_URL } from "../constants.mjs";

export async function getBids(name) {
  const res = await authFetch(
    `${API_BASE_URL}/auction/profiles/${name}/bids?_listings=true`,
  );
  const { data } = await res.json();
  return data;
}
