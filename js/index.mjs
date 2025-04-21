import { API_BASE_URL, API_ACTIVE_LISTINGS } from "./api/constants.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("listing-teasers");

  try {
    const res = await fetch(`${API_BASE_URL}${API_ACTIVE_LISTINGS}&_bids=true`);
    const { data } = await res.json();

    data.forEach((listing) => {
      const col = document.createElement("div");
      col.className = "col-6 col-md-4 mb-4";

      const topBid = listing.bids?.length
        ? Math.max(...listing.bids.map((b) => b.amount))
        : 0;

      col.innerHTML = `
        <a href="/listing.html?id=${listing.id}" class="text-decoration-none text-dark">
          <div class="card h-100 position-relative">
            <div class="position-relative">
              <img src="${listing.media?.[0]?.url || "/img/placeholder.jpg"}" class="card-img-top" alt="${listing.media?.[0]?.alt || "Listing image"}" />
              <span class="badge bg-dark text-white position-absolute top-0 end-0 m-2">
                ${new Date(listing.endsAt).toLocaleDateString()}
              </span>
            </div>
            <div class="card-body d-flex justify-content-between">
              <h5 class="card-title mb-0">${listing.title}</h5>
              <p class="mb-0"><strong>$${topBid}</strong></p>
            </div>
          </div>
        </a>
      `;
      container.appendChild(col);
    });
  } catch (error) {
    console.error("Failed to fetch listings:", error);
  }
});
