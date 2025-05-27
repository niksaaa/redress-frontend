// components/DeliveryOptions.js
import React, { useState } from "react";
import "../styles/delivery-options.css";

const deliveryOptions = [
  { id: "seller", label: "Самовивіз від продавця" },
  { id: "ukrposhta", label: "Самовивіз з Укр пошти" },
  { id: "nova-poshta-machine", label: "Самовивіз з поштомата Нової пошти" },
  { id: "nova-poshta", label: "Самовивіз з Нової пошти" },
];

const DeliveryOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (id) => {
    setSelectedOption(id);
  };

  return (
    <div className="delievery-container">
      <h2 className="delivery-title">Доставка</h2>
      <div className="delivery-options">
        {deliveryOptions.map((option) => (
          <div key={option.id} className="delivery-option">
            <label>
              <input
                type="radio"
                name="delivery"
                checked={selectedOption === option.id}
                onChange={() => handleRadioChange(option.id)}
              />
              {option.label}
            </label>
            {selectedOption === option.id && selectedOption !== "seller" && (
              <input
                type="text"
                placeholder="Введіть номер відділення"
                className="delivery-input"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryOptions;
