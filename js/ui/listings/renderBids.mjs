export function renderBids(bids) {
  const bidsList = document.getElementById("bids-list");
  bidsList.innerHTML = "";

  if (bids.length > 0) {
    const sortedBids = bids.sort((a, b) => b.amount - a.amount);

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
}
