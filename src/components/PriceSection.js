import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/price-section.css";

const PriceSection = ({ price, listing }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleBuyClick = () => {
    const userBalance = parseFloat(localStorage.getItem('userBalance')) || 0;
    
    if (userBalance < price) {
      const shortage = price - userBalance;
      setModalMessage(`На Вашому рахунку, нажаль, недостатньо
              коштів. Вам не вистачає ${shortage} грн.\n \n Перейдіть до особистого кабінету, щоб поповнити рахунок.`);
      setShowModal(true);
      return;
    }

    // If we get here, the user has enough funds
    localStorage.setItem('currentOrderListing', JSON.stringify(listing));
    navigate('/order', { state: { listing } });
  };

  return (
    <div className="price-section">
      <div className="price-content">
        <span className="price-label">Ціна</span>
        <span className="price-value">{price} грн</span>
      </div>
      <div className="buy-btn" onClick={handleBuyClick}>
        <span className="btn-text">Купити</span>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={() => setShowModal(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSection;