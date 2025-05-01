export function renderProfile(profile, listings, bids) {
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-credits").textContent = profile.credits;
  document.getElementById("avatar").src =
    profile.avatar?.url || "/img/default-avatar.png";

  // Listings
  const listingsContainer = document.getElementById("user-listings");
  const noListingsMsg = document.getElementById("no-listings");
  if (listings.length === 0) {
    noListingsMsg.classList.remove("d-none");
  } else {
    listings.forEach((listing) => {
      const card = document.createElement("div");
      card.classList.add("col-md-4", "mb-3");
      card.innerHTML = `
          <div class="card">
            <img src="${listing.media[0]?.url || "/img/placeholder.jpg"}" class="card-img-top" alt="${listing.title}" />
            <div class="card-body">
              <h5 class="card-title">${listing.title}</h5>
              <p class="card-text">${listing.description || ""}</p>
            </div>
          </div>
        `;
      listingsContainer.appendChild(card);
    });
  }

  // Bids
  const bidsContainer = document.getElementById("user-bids");
  const noBidsMsg = document.getElementById("no-bids");

  if (bids.length === 0) {
    noBidsMsg.classList.remove("d-none");
  } else {
    bids.forEach((bid) => {
      const item = document.createElement("li");
      item.classList.add("list-group-item");
      item.innerHTML = `
        <a href="/listing.html?id=${bid.listing.id}">
          ${bid.listing?.title || "Listing"} – $ ${bid.amount}
        </a>
      `;
      bidsContainer.appendChild(item);
    });
  }
}
