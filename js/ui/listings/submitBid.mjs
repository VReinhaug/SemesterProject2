import { API_BASE_URL, API_BID_ON_LISTING } from "../../api/constants.mjs";
import { authFetch } from "../../api/fetch.mjs";
import { load } from "../../storage/load.mjs";
import { save } from "../../storage/save.mjs";
import { renderBids } from "./renderBids.mjs";
import { getProfile } from "../../api/profile/getProfile.mjs";

export function submitBid(data) {
  const makeBidBtn = document.getElementById("make-bid-btn");
  const bidFormContainer = document.getElementById("bid-form-container");
  const bidInput = document.getElementById("bid-amount");

  const errorMsg = document.createElement("div");
  errorMsg.className = "alert mt-2 d-none";
  bidFormContainer.appendChild(errorMsg);

  let bidInputVisible = false;

  makeBidBtn.addEventListener("click", async () => {
    errorMsg.classList.add("d-none");
    errorMsg.textContent = "";

    if (!bidInputVisible) {
      bidFormContainer.classList.remove("d-none");
      makeBidBtn.textContent = "Make it mine";
      bidInputVisible = true;
      return;
    }

    const bidAmount = parseFloat(bidInput.value);
    const user = load("profile");

    if (!user || !user.name) {
      errorMsg.textContent = "You must be logged in to place a bid.";
      errorMsg.classList.remove("d-none");
      return;
    }

    const currentCredits = user.credits ?? 0;
    const existingBids = data.bids || [];
    const highestBid = existingBids.length
      ? Math.max(...existingBids.map((b) => b.amount))
      : 0;

    if (isNaN(bidAmount) || bidAmount <= highestBid) {
      errorMsg.textContent = `Bid must be higher than current top bid, currently at $${highestBid}.`;
      errorMsg.classList.remove("d-none");
      return;
    }

    if (bidAmount > currentCredits) {
      errorMsg.textContent = `You only have $${currentCredits} available.`;
      errorMsg.classList.remove("d-none");
      return;
    }

    try {
      const res = await authFetch(
        `${API_BASE_URL}${API_BID_ON_LISTING(data.id)}`,
        {
          method: "POST",
          body: JSON.stringify({ amount: bidAmount }),
        },
      );

      if (!res.ok) throw new Error("Bid failed");

      const newBid = {
        amount: bidAmount,
        bidder: { name: user.name },
        created: new Date().toISOString(),
      };

      user.credits -= bidAmount;
      save("profile", user);

      data.bids.push(newBid);
      renderBids(data.bids);

      bidInput.value = "";
      bidFormContainer.classList.add("d-none");
      makeBidBtn.textContent = "Make bid";
      bidInputVisible = false;
    } catch (error) {
      errorMsg.textContent = "Could not place bid: " + error.message;
      errorMsg.classList.remove("d-none");
    }

    const updatedProfile = await getProfile(user.name);
    save("profile", updatedProfile);

    const creditsEl = document.getElementById("profile-credits");
    if (creditsEl) {
      creditsEl.textContent = updatedProfile.credits;
    }
  });
}
