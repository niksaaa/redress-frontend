import React, { useState, useEffect } from 'react';
import '../styles/rating.css';

const RatingComponent = ({ rating, count, status }) => {
    return (
        <div className="rating-wrapper">
          <div className="rating">
            <div className="star-icon">⭐</div>
            <span className="average-rating">{rating?.toFixed(1) || '0.0'}</span>
            <span className="rating-counts">{count || 0} {getRatingText(count)}</span>
          </div>
          <div className="status">
            <div className="status-icon">👑</div>
            <span className="rating-status">{status || 'Новачок'}</span>
          </div>
        </div>
      );
};

// Допоміжна функція для правильного відображення тексту "оцінок"
const getRatingText = (count) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'оцінок';
  if (lastDigit === 1) return 'оцінка';
  if (lastDigit >= 2 && lastDigit <= 4) return 'оцінки';
  return 'оцінок';
};

export default RatingComponent;