import React, { useState, useEffect } from 'react';
import '../styles/user-info.css';

const UserInfoComponent = ({ createdAt, location }) => {
  
  // Функція для перетворення координат у назву міста (дуже спрощена версія)
  const getLocationFromCoords = (lat, lng) => {
    // Це дуже спрощена імітація - в реальному додатку використовуйте API геокодінгу
    const locations = {
      '50.4501,30.5234': 'Київ',
      '49.9935,36.2304': 'Харків',
      '46.4825,30.7233': 'Одеса',
      '48.9226,24.7111': 'Івано-Франківськ',
      '49.8425,24.0322': 'Львів'
    };
    
    const key = `${lat?.toFixed(4)},${lng?.toFixed(4)}`;
    return locations[key] || 'Не вказано';
  };

  // Функція для форматування дати
  const formatDate = (date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(date).toLocaleDateString('uk-UA', options);
  };

  // Функція для генерації рандомних даних для демонстрації
//   const generateRandomData = () => {
//     const cities = ['Київ', 'Харків', 'Одеса', 'Львів', 'Дніпро', 'Запоріжжя'];
//     const randomDate = new Date();
//     randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 365 * 3)); // До 3 років тому
    
//     return {
//       createdAt: randomDate,
//       location: cities[Math.floor(Math.random() * cities.length)]
//     };
//   };


    return (
        <div className="user-info">
          <div className="info-wrapper">
            <div className="date-wrapper">
              <div className="date-icon">📅</div>
              <span className="creation-date">
                На REDRESS з {formatDate(createdAt || new Date())}
              </span>
            </div>
            <div className="location-wrapper">
              <div className="location-ico">📍</div>
              <span className="location">{location.latitude}, {location.longitude}</span>
            </div>
          </div>
        </div>
      );
};

export default UserInfoComponent;