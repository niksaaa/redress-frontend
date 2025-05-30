import React, { useState } from "react";
import "../styles/bidding-info.css";

const BiddingInfo = () => {
  const [startingPrice, setStartingPrice] = useState(690);
  const [currentBid, setCurrentBid] = useState(690);
  const [showModal, setShowModal] = useState(false);
  const minBidIncrement = 10;

  const handleBidChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCurrentBid(value);
    }
  };

  const incrementBid = () => {
    setCurrentBid(currentBid + minBidIncrement);
  };

  const decrementBid = () => {
    if (currentBid - minBidIncrement >= startingPrice) {
      setCurrentBid(currentBid - minBidIncrement);
    }
  };

  const handleMakeBid = () => {
    if (currentBid > 800) {
      setShowModal(true);
    } else if (currentBid > startingPrice) {
      setStartingPrice(currentBid);
    }
  };

  return (
    <div className="bidding-info">
      <div className="info-row">
        <span className="info-label">Дата закінчення</span>
        <span className="info-value">12</span>
      </div>
      
      <div className="info-row">
        <span className="info-label">Початкова ціна</span>
        <span className="info-value">{startingPrice} грн</span>
      </div>
      
      <div className="bid-controls">
        <div className="bid-action">
          <span className="bid-label">Зробити ставку</span>
          <div className="bid-input-group">
            <button className="bid-btn minus" onClick={decrementBid}>-</button>
            <input 
              type="text" 
              className="bid-input" 
              value={currentBid} 
              onChange={handleBidChange} 
            />
            <button className="bid-btn plus" onClick={incrementBid}>+</button>
          </div>
        </div>
        
        <div className="min-bid">
          <span className="bid-label">Мінімальна ставка</span>
          <span className="bid-value">{minBidIncrement} грн</span>
        </div>
      </div>
      
      <button className="place-bid-btn" onClick={handleMakeBid}>
        Зробити ставку
      </button>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Для участі у аукціоні на Вашому рахунку, нажаль, недостатньо
              коштів
            </p>
            <p>Перейдіть до особистого кабінету, щоб поповнити</p>
            <button onClick={() => setShowModal(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingInfo;
