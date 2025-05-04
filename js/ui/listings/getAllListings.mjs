import { API_BASE_URL } from "../../api/constants.mjs";

export async function getAllActiveListings(limit = 100) {
  let page = 1;
  let listings = [];
  let morePages = true;
  console.log("📥 Fetching page", page);

  while (morePages) {
    const url = `${API_BASE_URL}/auction/listings?_active=true&_bids=true&_seller=true&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    const { data, meta } = await res.json();

    listings = listings.concat(data);
    morePages = !meta.isLastPage;
    page++;
    console.log("✅ All listings loaded:", listings.length);
  }

  return listings;
}
