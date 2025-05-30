import React from "react";
import "../styles/сatalog-card.css";
import { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { Link } from "react-router-dom";
import fallbackImage from '../images/main-page/v31_67.png';

const CatalogCard = ({ id, price, title, imageUrl, isAuction, isOwner, onDelete }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [imgError, setImgError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();
  console.log('Отримано контекст обраного:', { isFavorite, toggleFavorite });

  console.log(`Рендер CatalogCard для ${id}, isFavorite:`, isFavorite(id));

  const handleImageError = () => {
    setCurrentImage('../images/main-page/v30_108.png');
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Клік по сердечку для:', id);
    if (toggleFavorite && typeof toggleFavorite === 'function') {
      toggleFavorite(id).catch(error => {
        console.error('Помилка при переключенні обраного:', error);
      });
    }
  };


  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <Link to={`/product/${id}`} className="catalog-card-link">
    <div className="catalog-card">
      <div className="card-container">
        <div className="card-background"></div>
        {imgError ? (
          <div 
            className="catalog-image"
            style={{ 
              backgroundImage: `url(${fallbackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
        ) : (
          <div 
            className="catalog-image"
            style={{ 
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onError={() => setImgError(true)}
          >
            {/* Додаємо реальний img для відлову помилок */}
            <img 
              src={imageUrl} 
              alt="" 
              style={{ display: 'none' }}
              onError={() => setImgError(true)}
            />
          </div>
        )}
        <div className="price-row">
          <span className="catalog-price">{price} грн</span>
          {isAuction && <span className="auction-label">Аукціон</span>}
        </div>
        <span className="catalog-title">{title}</span>
        <div className="like-button" onClick={handleFavoriteClick}>
        <div 
          className={`like-icon2 ${isFavorite(id) ? 'liked' : 'unliked'}`}
        ></div>
          </div>
          {isOwner && (
            <div className="delete-button" onClick={handleDeleteClick}>
              <div 
                className="delete-icon"
              ></div>
            </div>
          )}
      </div>
      </div>
      </Link>
  );
};

export default CatalogCard;