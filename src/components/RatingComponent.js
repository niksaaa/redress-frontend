import React, { useState, useEffect } from 'react';
import '../styles/rating.css';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';

const RatingComponent = () => {
  const [ratingData, setRatingData] = useState({
    averageRating: 0,
    ratingCount: 0,
    ratingStatus: 'Новачок'
  });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        select: (profile) => ({
          rating: profile.averageRating,
          count: profile.ratingCount,
          status: profile.ratingStatus,
        }),
      });
      
    
      if (!data) return null;
    
// Функція для генерації рандомних даних для демонстрації
// const generateRandomData = () => {
//     const randomRating = (Math.random() * 5).toFixed(1);
//     const randomCount = Math.floor(Math.random() * 100);
//     const statuses = ['Новачок', 'Перевірений', 'Надійний'];
//     const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
//     return {
//       averageRating: parseFloat(randomRating),
//       ratingCount: randomCount,
//       ratingStatus: randomStatus
//     };
//   };

//   useEffect(() => {
//     const fetchRatingData = async () => {
//       try {
//           setLoading(true);
//           if (demoMode) {
//               // Демо-режим - генеруємо рандомні дані
//               setTimeout(() => {
//                   setRatingData(generateRandomData());
//                   setLoading(false);
//               }, 500); // Невелика затримка для імітації завантаження
//           } else {
//               // Реальний режим - запит до бекенду
//               const response = await fetch("https://localhost:7029/api/Profile/user", {
//                   headers: {
//                       'Authorization': `Bearer ${localStorage.getItem('token')}` // Додайте токен авторизації
//                   }
//               });
        
//               if (!response.ok) {
//                   throw new Error('Не вдалося отримати дані профілю');
//               }
        
//               const data = await response.json();
//               setRatingData({
//                   averageRating: data.averageRating || 0,
//                   ratingCount: data.ratingCount || 0,
//                   ratingStatus: data.ratingStatus || 'Новачок'
//               });
//           }
//       } catch (err) {
//         setError(err.message);
//         console.error('Помилка отримання даних:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     // Викликаємо функцію отримання даних при відкритті сторінки профілю
//     fetchRatingData();
//   }, []);

//   if (loading) return <div className="loading">Завантаження...</div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="rating-wrapper">
//       <div className="rating">
//         <div className="star">★</div>
//         <span className="average-rating">{ratingData.averageRating.toFixed(1)}</span>
//         <span className="rating-count">{ratingData.ratingCount} {getRatingText(ratingData.ratingCount)}</span>
//       </div>
//       <div className="status">
//         <div className="status-icon"></div>
//         <span className="rating-status">{ratingData.ratingStatus}</span>
//       </div>
//     </div>
    //   );
    
    return (
        <div className="rating-wrapper">
          <div className="rating">
            <div className="star-icon">⭐</div>
            <span className="average-rating">{data.rating?.toFixed(1) || '0.0'}</span>
            <span className="rating-counts">{data.count || 0} {getRatingText(data.count)}</span>
          </div>
          <div className="status">
            <div className="status-icon">👑</div>
            <span className="rating-status">{data.status || 'Новачок'}</span>
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