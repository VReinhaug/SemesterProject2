import { getListingsPage } from "./ui/listings/getPagesForListings.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("listing-teasers");
  const pagination = document.getElementById("pagination");

  const params = new URLSearchParams(window.location.search);
  let currentPage = parseInt(params.get("page")) || 1;

  async function loadPage(page) {
    container.innerHTML = "";
    pagination.innerHTML = "";

    const { data, meta } = await getListingsPage(page);
    console.log(`📦 Page ${page} loaded with ${data.length} listings`);

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
              <p class="mb-0 number"><strong>$${topBid}</strong></p>
            </div>
          </div>
        </a>
      `;
      container.appendChild(col);
    });

    if (!meta.isFirstPage) {
      const prev = document.createElement("button");
      prev.textContent = "Previous";
      prev.className = "btn btn-outline-primary me-2";
      prev.onclick = () => {
        const newPage = meta.previousPage;
        window.history.pushState({}, "", `?page=${newPage}`);
        loadPage(newPage);
      };
      pagination.appendChild(prev);
    }

    if (!meta.isLastPage) {
      const next = document.createElement("button");
      next.textContent = "Next";
      next.className = "btn btn-outline-primary";
      next.onclick = () => {
        const newPage = meta.nextPage;
        window.history.pushState({}, "", `?page=${newPage}`);
        loadPage(newPage);
      };
      pagination.appendChild(next);
    }
  }

  loadPage(currentPage);
});
