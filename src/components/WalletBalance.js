import React from 'react';
import '../styles/wallet-balance.css';

const WalletBalance = ({balance}) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="wallet-container">
      <div className="wallet-info">
        <span className="wallet-label">Ваш рахунок:</span>
        <span className="wallet-amount">
          {formatBalance(balance)} грн
        </span>
      </div>

      <button className="topup-button">
        Поповнити гаманець
      </button>
    </div>
  );
};

export default WalletBalance;