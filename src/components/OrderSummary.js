import React from "react";
import PropTypes from "prop-types";
import "../styles/order-summary.css";

const OrderSummary = (
  { productPrice, deliveryPrice, totalPrice, onPayClick, isProcessing }
) => {
  return (
    <div className="summary-card">
      <span className="summary-title">Разом</span>

      <div className="summary-section">
        <div className="summary-row">
          <span className="summary-label">Товар на суму:</span>
          <span className="summary-value">{productPrice}</span>
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-row">
          <span className="summary-label">Вартість доставки:</span>
          <span className="summary-value">{deliveryPrice}</span>
        </div>
      </div>

      <div className="total-section">
        <div className="summary-row">
          <span className="total-label">До сплати:</span>
          <span className="total-value">{totalPrice}</span>
        </div>
      </div>

      <button 
        onClick={onPayClick} 
        disabled={isProcessing}
        className={`pay-button ${isProcessing ? 'processing' : ''}`}
      >
        {isProcessing ? 'Обробка...' : 'Сплатити'}
      </button>
    </div>
  );
};

OrderSummary.propTypes = {
  productPrice: PropTypes.string,
  deliveryPrice: PropTypes.string,
  totalPrice: PropTypes.string,
  onPayClick: PropTypes.func.isRequired,
};

export default OrderSummary;
