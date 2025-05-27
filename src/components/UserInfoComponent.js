import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';
import '../styles/user-info.css';

const UserInfoComponent = ({ createdAt, location }) => {
  const [userInfo, setUserInfo] = useState({
    createdAt: new Date(),
    location: 'Харків'
  });
//   const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
    
const { data: profileData, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    select: (data) => ({
      createdAt: data.createdAt,
      latitude: data.latitude,
      longitude: data.longitude,
    }),
    staleTime: 1000 * 60 * 5, // 5 хвилин кешування
  });
  
    

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

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         setLoading(true);
        
//         if (demoMode) {
//           // Демо-режим - генеруємо рандомні дані
//           setTimeout(() => {
//             setUserInfo(generateRandomData());
//             setLoading(false);
//           }, 500);
//         } else {
//           // Реальний режим - запит до бекенду
//           const response = await fetch("https://localhost:7029/api/Profile/user", {
//             headers: {
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           });
          
//           if (!response.ok) throw new Error('Не вдалося отримати дані профілю');
          
//           const data = await response.json();
          
//           setUserInfo({
//             createdAt: data.createdAt || new Date(),
//             location: data.latitude && data.longitude 
//               ? getLocationFromCoords(data.latitude, data.longitude)
//               : 'Не вказано'
//           });
//         }
//       } catch (err) {
//         setError(err.message);
//         console.error('Помилка отримання даних:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserInfo();
//   }, [demoMode]);

  if (isLoading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="user-info">
//       <div className="info-wrapper">
//         <div className="date-wrapper">
//           <div className="date-icon">📅</div>
//           <span className="creation-date">На REDRESS з {formatDate(userInfo.createdAt)}</span>
//         </div>
//         <div className="location-wrapper">
//           <div className="location-icon">📍</div>
//           <span className="location">{userInfo.location}</span>
//         </div>
//       </div>
//     </div>
    //   );
    
    return (
        <div className="user-info">
          <div className="info-wrapper">
            <div className="date-wrapper">
              <div className="date-icon">📅</div>
              <span className="creation-date">
                На REDRESS з {formatDate(profileData?.createdAt || new Date())}
              </span>
            </div>
            <div className="location-wrapper">
              <div className="location-ico">📍</div>
              <span className="location">{profileData?.latitude}</span>
            </div>
          </div>
        </div>
      );
};

export default UserInfoComponent;