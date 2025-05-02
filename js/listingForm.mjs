import {
  API_BASE_URL,
  API_LISTINGS,
  API_SINGLE_LISTING,
} from "./api/constants.mjs";
import { authFetch } from "./api/fetch.mjs";

const form = document.getElementById("listing-form");
const titleField = document.getElementById("title");
const mediaField = document.getElementById("media");
const descField = document.getElementById("description");
const endsAtField = document.getElementById("endsAt");
const submitBtn = document.getElementById("submit-button");

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

async function prefillForm(id) {
  try {
    const res = await fetch(`${API_BASE_URL}${API_SINGLE_LISTING(id)}`);
    const { data } = await res.json();

    titleField.value = data.title;
    descField.value = data.description;
    endsAtField.value = new Date(data.endsAt).toISOString().slice(0, 16);
    if (data.media.length) {
      mediaField.value = data.media[0].url;
    }

    submitBtn.textContent = "Update";

    // Add delete button if editing
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-outline-danger ms-3";
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";
    deleteBtn.addEventListener("click", () =>
      confirmDelete(data.id, data.title),
    );
    submitBtn.after(deleteBtn);
  } catch (error) {
    console.error("Error pre-filling form:", error);
  }
}

async function confirmDelete(id, title) {
  const confirmDelete = confirm(`Are you sure you want to delete '${title}'?`);
  if (!confirmDelete) return;

  try {
    const res = await authFetch(`${API_BASE_URL}${API_SINGLE_LISTING(id)}`, {
      method: "DELETE",
    });

    if (res.ok) {
      window.location.href = "/profile.html";
    } else {
      alert("Could not delete listing.");
    }
  } catch (error) {
    alert("Error deleting listing: " + error.message);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    title: titleField.value.trim(),
    description: descField.value.trim(),
    endsAt: new Date(endsAtField.value).toISOString(),
  };

  if (mediaField.value.trim()) {
    payload.media = [
      {
        url: mediaField.value.trim(),
        alt: titleField.value.trim(),
      },
    ];
  }

  try {
    const url = listingId
      ? `${API_BASE_URL}${API_SINGLE_LISTING(listingId)}`
      : `${API_BASE_URL}${API_LISTINGS}`;

    const res = await authFetch(url, {
      method: listingId ? "PUT" : "POST",
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save listing");

    const { data } = await res.json();
    window.location.href = `/listing.html?id=${data.id}`;
  } catch (error) {
    alert("Error saving listing: " + error.message);
  }
});

if (listingId) {
  prefillForm(listingId);
}
