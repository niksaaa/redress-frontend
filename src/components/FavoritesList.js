import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchUserFavorites } from '../api/user';
import CatalogCard from './CatalogCard';
import Pagination from './Pagination';

export const FavoritesList = ({ profileId }) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data: favoritesData, isLoading, error } = useQuery({
    queryKey: ['favorites', profileId, page],
    queryFn: () => fetchUserFavorites(profileId, page, pageSize),
    enabled: !!profileId || process.env.REACT_APP_DEMO_MODE === 'true',
    keepPreviousData: true
  });
    
    // Функція для зміни сторінки з прокруткою
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div className="loading">Завантаження товарів...</div>;
  if (error) return <div className="error">Помилка: {error.message}</div>;
  
  if (!favoritesData?.items || favoritesData.items.length === 0) {
    return (
      <div className="content-section">
        <div className="text-wrapper"><p className="text">Тут поки пусто</p></div>
      </div>
    );
  }

  return (
    <div className="content-section-3">
      <div className="favorites-grid">
        {favoritesData.items.map(item => (
          <CatalogCard
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            imageUrl={item.url}
            isAuction={item.isAuction}
          />
        ))}
      </div>
      {/* <div className="pagination">
        <button 
          onClick={() => setPage(p => Math.max(1, p - 1))} 
          disabled={page === 1}
        >
          Попередня
        </button>
        <span>Сторінка {page}</span>
        <button 
          onClick={() => setPage(p => p + 1)} 
          disabled={!favoritesData?.hasNextPage}
        >
          Наступна
        </button>
      </div> */}
          {favoritesData.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={favoritesData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};