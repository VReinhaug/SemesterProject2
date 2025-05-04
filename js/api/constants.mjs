export const API_KEY = "ed67a0ee-ab7d-4b99-b3bd-a4c19be5d495";

export const API_BASE_URL = "https://v2.api.noroff.dev";
export const API_AUTH = "/auth";
export const API_REGISTER = "/register";
export const API_LOGIN = "/login";

export const API_PROFILE = "/auction/profiles";
export const API_SINGLE_PROFILE = (name) => `/auction/profiles/${name}`;
export const API_PROFILE_BIDS = (name) =>
  `/auction/profiles/${name}/bids?_listings=true`;

export const API_LISTINGS = "/auction/listings";
export const API_ACTIVE_LISTINGS =
  "/auction/listings?_active=true&_bids=true&_seller=true";
export const API_SINGLE_LISTING = (id) => `/auction/listings/${id}`;
export const API_BID_ON_LISTING = (id) => `/auction/listings/${id}/bids`;
export const LISTINGS_PER_PAGE = 24;
