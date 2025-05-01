export function renderCarousel(media) {
  const carouselInner = document.getElementById("carousel-images");

  media.forEach((item, index) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = `carousel-item ${index === 0 ? "active" : ""}`;
    carouselItem.innerHTML = `
        <img src="${item.url}" class="d-block w-100" alt="${item.alt || "Listing image"}" />
      `;
    carouselInner.appendChild(carouselItem);
  });

  // Show carousel controls if more than one image
  if (media.length > 1) {
    document.querySelector(".carousel-control-prev").classList.remove("d-none");
    document.querySelector(".carousel-control-next").classList.remove("d-none");
  } else {
    document.querySelector(".carousel-control-prev").classList.add("d-none");
    document.querySelector(".carousel-control-next").classList.add("d-none");
  }
}
