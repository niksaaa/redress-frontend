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
    <div className="bidding-info-container">
      <div className="v549_740">
        <span className="v549_741">Дата закінчення</span>
        <span className="v549_742">До закінчення</span>
        <span className="v549_743">Початкова ціна</span>
        <span className="v549_744">{startingPrice} грн</span>
        <span className="v549_745">Зробити ставку</span>
        <span className="v549_746">Мінімальна ставка від продавця</span>
        <span className="v549_747">25.03.2025, 21:01:00</span>
        <span className="v549_748">7 днів, 11:22:00</span>
        <div className="v549_749">
          <div className="v549_750"></div>
          <span className="v549_751">{minBidIncrement} грн</span>
        </div>

        <div className="bid-controls">
          <button className="bid-button minus" onClick={decrementBid}>
            -
          </button>
          <input
            type="text"
            className="bid-input"
            value={currentBid}
            onChange={handleBidChange}
          />
          <button className="bid-button plus" onClick={incrementBid}>
            +
          </button>
        </div>

        <div className="v549_760" onClick={handleMakeBid}>
          <div className="v549_761"></div>
          <span className="v549_762">Зробити ставку</span>
        </div>
      </div>

      {/* Модальне вікно */}
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
