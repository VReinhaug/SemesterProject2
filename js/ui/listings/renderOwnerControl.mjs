import { load } from "../../storage/load.mjs";
import { authFetch } from "../../api/fetch.mjs";
import { API_BASE_URL, API_SINGLE_LISTING } from "../../api/constants.mjs";

export function renderOwnerControls(listing) {
  const currentUser = load("profile");
  if (!currentUser?.name || currentUser.name !== listing?.seller?.name) return;

  const controls = document.createElement("div");
  controls.classList.add("mt-3");
  controls.innerHTML = `
    <p id="edit-listing-btn" class="text-primary mb-2" style="cursor:pointer">
      <i class="fa-solid fa-pen"></i> Edit
    </p>
    <p id="delete-listing-btn" class="text-danger" style="cursor:pointer">
      <i class="fa-solid fa-trash-can"></i> Delete
    </p>
  `;

  const target = document.getElementById("listing-description");
  target?.after(controls);

  document.getElementById("edit-listing-btn")?.addEventListener("click", () => {
    window.location.href = `/new-listing.html?id=${listing.id}`;
  });

  document
    .getElementById("delete-listing-btn")
    ?.addEventListener("click", async () => {
      const confirmDelete = confirm(
        `Are you sure you want to delete "${listing.title}"?`,
      );
      if (!confirmDelete) return;

      try {
        const res = await authFetch(
          `${API_BASE_URL}${API_SINGLE_LISTING(listing.id)}`,
          {
            method: "DELETE",
          },
        );

        if (res.ok) {
          window.location.href = "/profile.html";
        } else {
          alert("Failed to delete listing.");
        }
      } catch (error) {
        alert("Error: " + error.message);
      }
    });
}
