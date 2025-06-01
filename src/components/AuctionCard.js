import React from "react";
import "../styles/auction-card.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '../api/favorite';
import fallbackImage from '../images/defaultProductImage.png';
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';

const AuctionCard = ({ id, price, title, imageUrl, isOwner, onDelete }) => {
  const queryClient = useQueryClient();
  const profileId = localStorage.getItem('profileId');

  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const isItemFavorite = favorites.includes(id);

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isItemFavorite) {
        await removeFromFavorites(profileId, id);
      } else {
        await addToFavorites(profileId, id);
      }
    },
    onSuccess: () => {
      const updatedFavorites = isItemFavorite
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      queryClient.invalidateQueries(['favorites']);
    }
  });

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!profileId) {
      alert('Будь ласка, увійдіть, щоб додавати товари до обраного');
      return;
    }
    toggleFavorite();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="auction-card-link">
    <div className="auction-card">
      <div className="v46_164">
        <div className="auction-card__header">
          <span className="auction-label-card">Аукціон</span>
        </div>
        <div
          className="auction-card__image"
          style={{ backgroundImage: `url(${imageUrl || fallbackImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center' }}
        ></div>
        <div className="auction-card__details">
          <span className="auction-card__price">{price} грн</span>
          <span className="auction-card__description">{title}</span>
        </div>
        <div className="v46_121_like">
          <div className="v46_120_like"></div>
            <div className="v46_118_like" onClick={handleFavoriteClick}>
            <img 
              src={isItemFavorite ? likedIcon : likeIcon} 
              alt={isItemFavorite ? "В обраному" : "Додати до обраного"}
              className="like-icon2"
            />
          </div>
          </div>
          {isOwner && (
            <div className="delete-button" onClick={handleDeleteClick}>
              <div className="delete-icon"></div>
            </div>
          )}
      </div>
      </div>
      </Link>
  );
};

export default AuctionCard;

