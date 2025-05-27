import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/price-section.css";

const PriceSection = ({ price, listing }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    // Зберігаємо дані товару для використання на сторінці замовлення
    localStorage.setItem('currentOrderListing', JSON.stringify(listing));
    navigate('/order', { state: { listing } });
  };

  return (
    <div className="price-section">
      <div className="price-bg"></div>
      <div className="price-content">
        <span className="price-label">Ціна</span>
        <span className="price-value">{price} грн</span>
      </div>
      <div className="buy-btn" onClick={handleBuyClick}>
        <div className="btn-bg">
          <span className="btn-text">Купити</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;