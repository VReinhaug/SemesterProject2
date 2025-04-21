import { getProfile } from "./api/profile/getProfile.mjs";
import { renderProfile } from "./ui/profile/renderProfile.mjs";
import { getListings } from "./api/profile/getListings.mjs";
import { getBids } from "./api/profile/getBids.mjs";
import { updateAvatar } from "./api/profile/updateAvatar.mjs";
import { load } from "./storage/load.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  const user = load("profile");
  if (!user?.name) {
    window.location.href = "/login.html";
    return;
  }

  try {
    const profile = await getProfile(user.name);
    const listings = await getListings(user.name);
    const bids = await getBids(user.name);

    renderProfile(profile, listings, bids);
  } catch (error) {
    console.error("Error loading profile:", error);
  }

  document.getElementById("edit-avatar-btn").addEventListener("click", () => {
    document
      .getElementById("avatar-input-container")
      .classList.toggle("d-none");
  });

  document
    .getElementById("save-avatar-btn")
    .addEventListener("click", async () => {
      const newUrl = document.getElementById("avatar-url").value.trim();
      const user = load("profile");
      if (!newUrl) return;
      try {
        const updated = await updateAvatar(user.name, newUrl);
        document.getElementById("avatar").src = updated.avatar.url;
        document
          .getElementById("avatar-input-container")
          .classList.add("d-none");
      } catch (error) {
        alert("Error updating avatar: " + error.message);
      }
    });
});
