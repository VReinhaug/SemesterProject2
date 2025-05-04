import { API_BASE_URL, LISTINGS_PER_PAGE } from "../../api/constants.mjs";

export async function getListingsPage(page = 1) {
  const url = `${API_BASE_URL}/auction/listings?_active=true&_bids=true&_seller=true&page=${page}&limit=${LISTINGS_PER_PAGE}`;
  const res = await fetch(url);
  console.log(url);
  const { data, meta } = await res.json();
  return { data, meta };
}
