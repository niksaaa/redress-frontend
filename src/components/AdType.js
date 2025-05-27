import React, { useState } from "react";
import "../styles/ad-type.css";

export default function AdType({ onTypeChange }) {
  const [selectedType, setSelectedType] = useState(null);

  const options = [
    {
      id: "regular",
      label: "Звичайне",
      iconClass: "type-selection-2",
      containerClass: "icon-selection",
    },
    {
      id: "auction",
      label: "Аукціонне",
      iconClass: "type-selection-3",
      containerClass: "icon-selection-1",
    },
  ];

  const handleTypeSelect = (id) => {
    setSelectedType(id);
    if (onTypeChange) {
      onTypeChange(id); // тепер без помилки
    }
  };

  return (
    <div className="type-selection">
      {options.map(({ id, label, iconClass, containerClass }) => {
        const isSelected = selectedType === id;
        return (
          <div
            key={id}
            className={containerClass}
            onClick={() => handleTypeSelect(id)}
            style={{ cursor: "pointer" }}
          >
            <div className={`${iconClass} ${isSelected ? "selected" : ""}`}>
              {isSelected && <span className="checkmark">✔</span>}
            </div>
            <span className={id === "regular" ? "text-1" : "text-2"}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
