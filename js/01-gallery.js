import { galleryItems } from "./gallery-items.js";
function makeMarkup() {
  let markup = "";
  for (const item of galleryItems) {
    const { preview = "#", original = "#", description = "#" } = item;
    markup += `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
        <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
        />
        </a>
    </div>`;
  }
  return markup;
}

const modal = {
  gallery: document.querySelector(".gallery"),
  instance: {},

  handleGalleryClick: function (event) {
    event.preventDefault();
    const { target, currentTarget } = event;
    if (currentTarget === target) {
      return;
    }
    const srcImage = target.dataset.source;
    this.createModalImage(srcImage);
    this.showModalImage();
  },

  createModalImage: function (srcImage) {
    this.instance = basicLightbox.create(`<img src="${srcImage}">`, {
      onShow: this.onShowModalImage.bind(this),
      onClose: this.onCloseModalImage.bind(this),
    });
  },

  onShowModalImage: function () {
    document.addEventListener("keydown", this.handleEscapePress);
  },

  onCloseModalImage: function () {
    document.removeEventListener("keydown", this.handleEscapePress);
  },

  handleEscapePress: function (event) {
    if (event.code === "Escape") modal.instance.close();
  },

  renderGalleryMarkup: function (markup) {
    this.gallery.innerHTML = markup;
  },

  showModalImage: function () {
    this.instance.show();
  },
};

modal.renderGalleryMarkup(makeMarkup());
modal.gallery.addEventListener("click", modal.handleGalleryClick.bind(modal));
