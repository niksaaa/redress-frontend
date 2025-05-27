import React from "react";
import "../styles/size-selector.css";

const sizeOptions = {
  Одяг: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One size"],
  Взуття: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"],
  Аксесуари: ["One size"],
};

export default function SizeSelector({ category, selectedSize, onSelect }) {
  if (!category) return null;

  const sizes = sizeOptions[category] || [];

  return (
    <div className="size-selector-container">
      <span className="size-selector-label">Оберіть розмір*</span>
      <div className="size-options">
        {sizes.map((size) => (
          <button
            key={size}
            className={`size-option ${selectedSize === size ? "selected" : ""}`}
            onClick={() => onSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
