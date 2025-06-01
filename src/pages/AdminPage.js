import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CatalogCard from '../components/CatalogCard';
import UserItem from '../components/UserItem';
import Pagination from '../components/Pagination';
import { fetchAllListings } from '../api/listing';
import { fetchAllUsers } from '../api/user';
import { deleteProduct } from '../api/profile';
import { deleteUser } from '../api/user';
import '../styles/admin-page.css';

const AdminPage = () => {
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('listings');
  const [listingsPage, setListingsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const queryClient = useQueryClient();

  // Отримання списку оголошень
  const { data: listingsData, isLoading: isListingsLoading } = useQuery({
    queryKey: ['adminListings', listingsPage],
    queryFn: () => fetchAllListings({ page: listingsPage, pageSize: 10 }),
  });

  // Отримання списку користувачів
  const { data: usersData, isLoading: isUsersLoading } = useQuery({
    queryKey: ['adminUsers', usersPage],
    queryFn: () => fetchAllUsers({ page: usersPage, pageSize: 10 }),
  });

  // Мутація для видалення оголошення
  const deleteListingMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminListings']);
    },
  });

  // Мутація для видалення користувача
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['adminUsers']);
    },
  });
    
     // Перевірка ролі адміністратора
  useEffect(() => {
    if (userRole !== 0) {
      navigate('/');
    }
  }, [userRole, navigate]);

  const handleDeleteListing = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити це оголошення?')) {
      try {
        await deleteListingMutation.mutateAsync(id);
      } catch (error) {
        console.error('Помилка при видаленні оголошення:', error);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Ви впевнені, що хочете видалити цього користувача?')) {
      try {
        await deleteUserMutation.mutateAsync(id);
      } catch (error) {
        console.error('Помилка при видаленні користувача:', error);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Панель адміністратора</h1>
        <button className="logout-btn2" onClick={handleLogout}>
          Вийти
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => setActiveTab('listings')}
        >
          Оголошення
        </button>
        <button
          className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Користувачі
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'listings' ? (
          <>
            {isListingsLoading ? (
              <div className="loading">Завантаження оголошень...</div>
            ) : (
              <>
                  <div className="items-grid">
                    {listingsData?.items.map(item => (
                      <CatalogCard
                        key={item.id}
                        id={item.id}
                        price={item.price}
                        title={item.title}
                        imageUrl={item.url}
                        isAuction={item.isAuction}
                        isOwner={true}
                        onDelete={handleDeleteListing}
                      />
                    ))}
                  </div>
                {listingsData?.totalPages > 1 && (
                  <Pagination
                    currentPage={listingsPage}
                    totalPages={listingsData.totalPages}
                    onPageChange={setListingsPage}
                  />
                )}
              </>
            )}
          </>
        ) : (
          <>
            {isUsersLoading ? (
              <div className="loading">Завантаження користувачів...</div>
            ) : (
              <>
                <div className="users-list">
                  {usersData?.items.map(user => (
                    <UserItem 
                      key={user.id} 
                      user={user} 
                      onDelete={() => handleDeleteUser(user.id)}
                    />
                  ))}
                </div>
                {usersData?.totalPages > 1 && (
                  <Pagination
                    currentPage={usersPage}
                    totalPages={usersData.totalPages}
                    onPageChange={setUsersPage}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage; 