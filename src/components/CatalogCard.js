// import React from "react";
// import "../styles/сatalog-card.css";
// import { useState } from 'react';
// import { useFavorites } from '../context/FavoritesContext';
// import { Link } from "react-router-dom";
// import fallbackImage from '../images/main-page/v31_67.png';
// import likedIcon from '../images/liked.png';
// import likeIcon from '../images/like.png';

// const CatalogCard = ({ id, price, title, imageUrl, isAuction, isOwner, onDelete, forceFavorite }) => {
//   const [currentImage, setCurrentImage] = useState(imageUrl);
//   const [imgError, setImgError] = useState(false);
//   const { isFavorite, toggleFavorite } = useFavorites();
//   console.log('Отримано контекст обраного:', { isFavorite, toggleFavorite });

//   console.log(`Рендер CatalogCard для ${id}, isFavorite:`, isFavorite(id));

//   // Для сторінки обраного - завжди показуємо як обране
//   const showAsFavorite = forceFavorite || isFavorite(id);

//   const handleImageError = () => {
//     setCurrentImage('../images/main-page/v30_108.png');
//   };

//   const handleFavoriteClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     console.log('Клік по сердечку для:', id);
//     if (toggleFavorite && typeof toggleFavorite === 'function') {
//       toggleFavorite(id).catch(error => {
//         console.error('Помилка при переключенні обраного:', error);
//       });
//     }
//   };


//   const handleDeleteClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onDelete(id);
//   };

//   return (
//     <Link to={`/product/${id}`} className="catalog-card-link">
//     <div className="catalog-card">
//       <div className="card-container">
//         <div className="card-background"></div>
//         {imgError ? (
//           <div
//             className="catalog-image"
//             style={{
//               backgroundImage: `url(${fallbackImage})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//           ></div>
//         ) : (
//           <div
//             className="catalog-image"
//             style={{
//               backgroundImage: `url(${imageUrl})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//             onError={() => setImgError(true)}
//           >
//             {/* Додаємо реальний img для відлову помилок */}
//             <img
//               src={imageUrl}
//               alt=""
//               style={{ display: 'none' }}
//               onError={() => setImgError(true)}
//             />
//           </div>
//         )}
//         <div className="price-row">
//           <span className="catalog-price">{price} грн</span>
//           {isAuction && <span className="auction-label">Аукціон</span>}
//         </div>
//         <span className="catalog-title">{title}</span>
//         <div className="like-button" onClick={handleFavoriteClick}>
//         <img
//               src={showAsFavorite ? likedIcon : likeIcon}
//               alt={showAsFavorite ? "В обраному" : "Додати до обраного"}
//               className="like-icon2"
//             />
//           </div>
//           {isOwner && (
//             <div className="delete-button" onClick={handleDeleteClick}>
//               <div
//                 className="delete-icon"
//               ></div>
//             </div>
//           )}
//       </div>
//       </div>
//       </Link>
//   );
// };

// export default CatalogCard;


// import React from "react";
// import "../styles/сatalog-card.css";
// import { useFavorites } from '../context/FavoritesContext';
// import { Link } from "react-router-dom";
// import fallbackImage from '../images/defaultProductImage.png';
// import likedIcon from '../images/liked.png';
// import likeIcon from '../images/like.png';

// const CatalogCard = ({ id, price, title, imageUrl, isAuction, isOwner, onDelete, forceFavorite }) => {
//   const { isFavorite, toggleFavorite } = useFavorites();
//   const isItemFavorite = isFavorite(id);

//   // Для сторінки обраного - завжди показуємо як обране
//   const showAsFavorite = forceFavorite || isFavorite(id);

//   const handleFavoriteClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     toggleFavorite(id);
//   };

//   const handleDeleteClick = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (onDelete) {
//       onDelete(id);
//     }
//   };

//   return (
//     <Link to={`/product/${id}`} className="catalog-card-link">
//       <div className="catalog-card">
//         <div className="card-container">
//           <div className="card-background"></div>
//           <div
//             className="catalog-image"
//             style={{
//               backgroundImage: `url(${imageUrl || fallbackImage})`,
//               backgroundSize: 'cover',
//               backgroundPosition: 'center'
//             }}
//           ></div>
//           <div className="price-row">
//             <span className="catalog-price">{price} грн</span>
//             {isAuction && <span className="auction-label">Аукціон</span>}
//           </div>
//           <span className="catalog-title">{title}</span>
//           <div className="like-button" onClick={handleFavoriteClick}>
//                    <img
//               src={showAsFavorite ? likedIcon : likeIcon}
//                alt={showAsFavorite ? "В обраному" : "Додати до обраного"}
//               className="like-icon2"
//              />
//           </div>
//           {isOwner && (
//             <div className="delete-button" onClick={handleDeleteClick}>
//               <div className="delete-icon"></div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CatalogCard;


import React from "react";
import "../styles/сatalog-card.css";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '../api/favorite';
import fallbackImage from '../images/defaultProductImage.png';
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';

const CatalogCard = ({ id, price, title, imageUrl, isAuction, isOwner, onDelete }) => {
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

export default CatalogCard;