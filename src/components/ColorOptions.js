import React, { useState } from "react";
import "../styles/color-options.css";

const colors = [
  "Чорний",
  "Білий",
  "Сірий",
  "Бежевий",
  "Коричневий",
  "Синій",
  "Блакитний",
  "Рожевий",
  "Червоний",
  "Бордовий",
  "Зелений",
  "Жовтий",
  "Помаранчевий",
  "Фіолетовий",
  "Хакі",
  "Інший",
];

export default function ColorOptions() {
  const [selectedColors, setSelectedColors] = useState([]);

  const toggleColor = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      if (selectedColors.length < 2) {
        setSelectedColors([...selectedColors, color]);
      }
    }
  };

  return (
    <div className="color-grid">
      {colors.map((color, index) => {
        const isSelected = selectedColors.includes(color);
        return (
          <div
            className="color-item"
            key={index}
            onClick={() => toggleColor(color)}
          >
            <div className={`color-box ${isSelected ? "selected" : ""}`}>
              {isSelected && <span className="checkmark">✔</span>}
            </div>
            <span className="color-label">{color}</span>
          </div>
        );
      })}
    </div>
  );
}
