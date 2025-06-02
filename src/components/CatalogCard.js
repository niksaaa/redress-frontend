import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import "../styles/catalog-card.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '../api/favorite';
import fallbackImage from '../images/defaultProductImage.png';
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';

const CatalogCard = ({ 
  id, 
  title, 
  price, 
  imageUrl, 
  isAuction, 
  isOwner,
  onDelete 
}) => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const isAdmin = userRole === 0;
  const queryClient = useQueryClient();
  const profileId = localStorage.getItem('profileId');

  // Отримуємо список обраних з localStorage
  const favorites = JSON.parse(localStorage.getItem('favorites') || []);
  const isItemFavorite = favorites.includes(id);

  // Мутації для додавання/видалення
  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isItemFavorite) {
        await removeFromFavorites(profileId, id);
      } else {
        await addToFavorites(profileId, id);
      }
    },
    onSuccess: () => {
      // Оновлюємо localStorage
      const updatedFavorites = isItemFavorite
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      
      // Інвалідуємо запити
      queryClient.invalidateQueries(['favorites']);
    }
  });

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (!profileId) {
      alert('Будь ласка, увійдіть, щоб додавати товари до обраного');
      return;
    }
    toggleFavorite();
  };

  const handleDelete = (e) => {
    e.preventDefault();  // Відміняємо перехід за лінком
    e.stopPropagation(); // Зупиняємо спливання, щоб не викликалися інші обробники
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="catalog-card-link">
      <div className="catalog-card">
        <div className="card-container">
          <div className="card-background"></div>
          <div 
            className="catalog-image"
            style={{ 
              backgroundImage: `url(${imageUrl || fallbackImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>
          <div className="price-row">
            <span className="catalog-price">{price} грн</span>
            {isAuction && <span className="auction-label">Аукціон</span>}
          </div>
          <span className="catalog-title">{title}</span>
          <div className="like-button" onClick={handleFavoriteClick}>
            <img 
              src={isItemFavorite ? likedIcon : likeIcon} 
              alt={isItemFavorite ? "В обраному" : "Додати до обраного"}
              className="like-icon2"
            />
          </div>
          {(isOwner || isAdmin) && onDelete && (
            <div className="delete-button" onClick={handleDelete}>
              <div className="delete-icon"></div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CatalogCard;