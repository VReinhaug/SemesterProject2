import { API_BASE_URL, API_SINGLE_LISTING } from "./api/constants.mjs";
import { renderBids } from "./ui/listings/renderBids.mjs";
import { submitBid } from "./ui/listings/submitBid.mjs";
import { renderCarousel } from "./ui/listings/renderCarousel.mjs";
import { load } from "./storage/load.mjs";
import { save } from "./storage/save.mjs";
import { getProfile } from "./api/profile/getProfile.mjs";
import { renderOwnerControls } from "./ui/listings/renderOwnerControl.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}${API_SINGLE_LISTING(id)}?_bids=true&_seller=true`,
    );
    const { data } = await res.json();

    console.log(data);

    document.getElementById("listing-title").textContent = data.title;
    const endDate = new Date(data.endsAt).toLocaleString();
    const endTag = document.createElement("p");
    endTag.className = "text-muted";
    endTag.innerHTML = `<strong>Ends:</strong> ${endDate}`;
    document.getElementById("listing-title").after(endTag);

    document.getElementById("listing-description").textContent =
      data.description;

    if (data.media.length > 1) {
      renderCarousel(data.media);
    } else if (data.media.length === 1) {
      const carouselInner = document.getElementById("carousel-images");
      const item = document.createElement("div");
      item.className = "carousel-item active";
      item.innerHTML = `<img src="${data.media[0].url}" class="d-block w-100" alt="${data.media[0].alt}" />`;
      carouselInner.appendChild(item);
    }

    const local = load("profile");
    if (local?.name) {
      const fresh = await getProfile(local.name);
      save("profile", fresh);
    }

    renderBids(data.bids || []);
    submitBid(data);
    renderOwnerControls(data);
  } catch (error) {
    console.error("Error loading listing:", error);
  }
});
