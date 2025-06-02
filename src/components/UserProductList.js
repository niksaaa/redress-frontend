import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserProducts } from '../api/user';
import { deleteProduct } from '../api/profile';
import CatalogCard from './CatalogCard';
import Pagination from './Pagination';

export const UserProductList = ({ profileId }) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const queryClient = useQueryClient();
  console.log('UserProductList - profileId:', profileId);
  const currentUserProfileId = localStorage.getItem('profileId'); // Отримуємо ID поточного користувача
  const isOwner = currentUserProfileId === profileId; // Перевіряємо, чи це профіль поточного користувача

  const { data: userProductsData, isLoading, error } = useQuery({
    queryKey: ['userProducts', profileId, page],
    queryFn: () => fetchUserProducts(profileId, page, pageSize),
    enabled: !!profileId || process.env.REACT_APP_DEMO_MODE === 'true',
    keepPreviousData: true,
    onSuccess: (data) => {
      console.log('User products data:', data); // Додайте це
    },
    onError: (err) => {
      console.error('Error fetching user products:', err); // Додайте це
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProducts', profileId]);
    }
  });

  const handleDelete = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (error) {
        console.error('Помилка при видаленні товару:', error);
      }
    }
  };
    
    // Функція для зміни сторінки з прокруткою
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) return <div className="loading">Завантаження товарів...</div>;
  if (error) return <div className="error">Помилка: {error.message}</div>;
  
  if (!userProductsData?.items || userProductsData.items.length === 0) {
    return (
      <div className="content-section">
        <div className="text-wrapper"><p className="text">Тут поки пусто</p></div>
      </div>
    );
  }

  return (
    <div className="content-section-3">
      <div className="favorites-grid">
        {userProductsData.items.map(item => (
          <CatalogCard
            key={item.id}
            id={item.id}
            price={item.price}
            title={item.title}
            imageUrl={item.url}
            isAuction={item.isAuction}
            isOwner={isOwner} // Передаємо результат перевірки
            onDelete={isOwner ? handleDelete : null} // Передаємо функцію видалення тільки якщо це профіль власника
          />
        ))}
      </div>
          {userProductsData.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={userProductsData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};