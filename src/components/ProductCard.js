import React from "react";
import "../styles/product-card.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '../api/favorite';
import fallbackImage from '../images/defaultProductImage.png';
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';

const ProductCard = ({ id, price, title, imageUrl, isOwner, onDelete }) => {
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
    <Link to={`/product/${id}`} className="product-card-link">
    <div className="product-card-m">
      <div className="v46_164">
        <div className="v31_86"></div>
        <div
          className="v30_108"
          style={{ 
            backgroundImage: `url(${imageUrl || fallbackImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <span className="v31_75">{price} грн</span>
        <span className="v31_82">{title}</span>
        <div className="v46_121">
          <div className="v46_120"></div>
            <div className="v46_118">
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

export default ProductCard;
