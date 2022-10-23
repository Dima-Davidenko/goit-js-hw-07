import { galleryItems } from "./gallery-items.js";
// Change code below this line
function createGaleryMarkup(galleryItems) {
  const markup = galleryItems
    .map(({ preview = "#", original = "#", description = "#" } = {}) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join("");
  return markup;
}

function onGalleryClickHandle(event) {
  event.preventDefault();
  if (!event.target.classList.contains("gallery__image")) {
    return;
  }
  showModalImg(event.target.dataset.source);
}

function showModalImg(imgSource) {
  const bigImageModal = basicLightbox.create(`<img src="${imgSource}">`);
  bigImageModal.show();
  document.addEventListener("keydown", function closeModal(e) {
    if (e.key !== "Escape") {
      return;
    }
    bigImageModal.close();
    document.removeEventListener("keydown", closeModal);
  });
}

const gallery = document.querySelector(".gallery");

const galleryMarkup = createGaleryMarkup(galleryItems);

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", onGalleryClickHandle);
