import React, { useState } from "react";
import "../styles/product-gallery.css";

// import img1 from "../images/product-page/v342_74.png";
// import img2 from "../images/product-page/v342_74.png";
// import img3 from "../images/product-page/v342_74.png";

// const images = [img1, img2, img3];

const ProductGallery = ({ images = [] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigate = (direction) => {
    const total = images.length;
    let newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + total) % total
        : (currentImageIndex + 1) % total;
    setCurrentImageIndex(newIndex);
  };

  if (images.length === 0) {
    return <div className="no-images">Немає зображень</div>;
  }

  return (
    <div className="product-gallery">
      {/* Мініатюри зліва */}
      <div className="thumbnails">
        {images.map((img, index) => (
          <div
          key={img.id}
          className="thumbnail"
          style={{ backgroundImage: `url(${img.url})` }}
          onClick={() => openModal(index)}
          ></div>
        ))}
      </div>

      {/* Головне фото */}
      <div
        className="main-image"
        style={{ backgroundImage: `url(${images[currentImageIndex].url})` }}
        onClick={() => openModal(currentImageIndex)}
      ></div>

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <button
              className="nav-button prev"
              onClick={() => navigate("prev")}
            >
              ‹
            </button>
            <div
              className="modal-image"
              style={{
                backgroundImage: `url(${images[currentImageIndex].url})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <button
              className="nav-button next"
              onClick={() => navigate("next")}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
