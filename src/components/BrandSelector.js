import React, { useState } from "react";
import "../styles/brand-selector.css";

const brands = ["Без бренду", "Zara", "Puma", "Adidas", "Nike", "Reebok"];

export default function BrandSelector({ selectedBrand, onSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (brand) => {
    onSelect(brand);
    setIsDropdownOpen(false);
  };

  return (
    <div className="selection-field-container">
      <div
        className="selection-field"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <div className="name">{selectedBrand || "Оберіть бренд"}</div>
        <div className="arrow" />
      </div>
      {isDropdownOpen && (
        <div className="brand-dropdown">
          {brands.map((brand) => (
            <div
              key={brand}
              className="brand-option"
              onClick={() => handleSelect(brand)}
            >
              {brand}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
