import { API_BASE_URL, API_SINGLE_LISTING } from "./api/constants.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const res = await fetch(
      `${API_BASE_URL}${API_SINGLE_LISTING(id)}?_bids=true`,
    );
    const { data } = await res.json();

    document.getElementById("listing-title").textContent = data.title;
    const endDate = new Date(data.endsAt).toLocaleString();
    const endTag = document.createElement("p");
    endTag.className = "text-muted";
    endTag.innerHTML = `<strong>Ends:</strong> ${endDate}`;
    document.getElementById("listing-title").after(endTag);

    document.getElementById("listing-description").textContent =
      data.description;

    // Carousel
    const carouselInner = document.getElementById("carousel-images");
    data.media.forEach((media, index) => {
      const item = document.createElement("div");
      item.className = `carousel-item ${index === 0 ? "active" : ""}`;
      item.innerHTML = `<img src="${media.url}" class="d-block w-100" alt="${media.alt}" />`;
      carouselInner.appendChild(item);
      console.log(media);
    });

    // Bids
    const bidsList = document.getElementById("bids-list");
    bidsList.innerHTML = "";

    if (data.bids?.length > 0) {
      const sortedBids = data.bids.sort((a, b) => b.amount - a.amount);

      sortedBids.forEach((bid, index) => {
        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";

        const time = new Date(bid.created).toLocaleString();
        const isTop = index === 0;

        li.innerHTML = `
          <div>
            <strong>${bid.bidder.name}</strong> • <small class="text-muted">${time}</small>
          </div>
          <div>
            <span class="${isTop ? "fw-bold number winner" : "number"}">$ ${bid.amount}</span>
          </div>
        `;

        bidsList.appendChild(li);
      });
    } else {
      bidsList.innerHTML = `<li class="list-group-item text-muted">No bids yet</li>`;
    }
  } catch (error) {
    console.error("Error loading listing:", error);
  }
});
