import React from "react";
import "../styles/сatalog-card.css";
import { useState } from 'react';
import { Link } from "react-router-dom";
import fallbackImage from '../images/main-page/v31_67.png';

const CatalogCard = ({ id, price, title, imageUrl, isAuction }) => {
  const [currentImage, setCurrentImage] = useState(imageUrl);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setCurrentImage('../images/main-page/v30_108.png');
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
        <div className="like-button">
          <div className="like-icon2"></div>
        </div>
      </div>
      </div>
      </Link>
  );
};

export default CatalogCard;