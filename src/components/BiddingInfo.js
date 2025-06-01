import React, { useState } from "react";
import "../styles/bidding-info.css";
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const BiddingInfo = ({ currentPrice, startPrice, minStep, endAt }) => {
  const [currentBid, setCurrentBid] = useState(currentPrice || startPrice);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleBidChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setCurrentBid(value);
    }
  };

  const incrementBid = () => {
    setCurrentBid(currentBid + minStep);
  };

  const decrementBid = () => {
    if (currentBid - minStep >= startPrice) {
      setCurrentBid(currentBid - minStep);
    }
  };

  const handleMakeBid = () => {  
    const userBalance = parseFloat(localStorage.getItem('userBalance')) || 0;
    const requiredAmount = currentBid;

    if (currentBid <= currentPrice) {
      setModalMessage('Ваша ставка повинна бути вищою за поточну ціну');
      setShowModal(true);
      setCurrentBid(currentPrice); // Скидаємо до поточної ціни
      return;
    }

    if (userBalance < requiredAmount) {
      const shortage = requiredAmount - userBalance;
      setModalMessage(`Для участі у аукціоні на Вашому рахунку, нажаль, недостатньо
              коштів. Вам не вистачає ${shortage} грн.\n \n Перейдіть до особистого кабінету, щоб поповнити рахунок.`);
      setShowModal(true);
      setCurrentBid(currentPrice); // Скидаємо до поточної ціни
      return;
    }

    // Якщо все добре - робимо ставку
    console.log("Робимо ставку:", currentBid);
  };

  const formattedEndDate = endAt ? format(new Date(endAt), 'dd.MM.yyyy, HH:mm', { locale: uk }) : 'Не вказано';

  return (
    <div className="bidding-info">
      <div className="info-row">
        <span className="info-label">Дата закінчення</span>
        <span className="info-value">{formattedEndDate}</span>
      </div>
      
      <div className="info-row">
        <span className="info-label">Початкова ціна</span>
        <span className="info-value">{startPrice} грн</span>
      </div>

      <div className="info-row">
        <span className="info-label">Поточна ціна</span>
        <span className="info-value">{currentPrice} грн</span>
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
          <span className="bid-value">{minStep} грн</span>
        </div>
      </div>
      
      <button className="place-bid-btn" onClick={handleMakeBid}>
        Зробити ставку
      </button>
      
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
          <p>
            {modalMessage}
            </p>
            <button onClick={() => setShowModal(false)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiddingInfo;
