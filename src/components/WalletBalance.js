import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';
import '../styles/wallet-balance.css';

const WalletBalance = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        select: (profile) => ({
          balance: profile.balance || 0,
        }),
        staleTime: 1000 * 60 * 5, // 5 хвилин кешування
      });
      

  const formatBalance = (amount) => {
    return new Intl.NumberFormat('uk-UA', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  if (isLoading) return <div className="wallet-loading">Завантаження балансу...</div>;
  if (error) return <div className="wallet-error">Помилка: {error.message}</div>;

  return (
    <div className="wallet-container">
      <div className="wallet-info">
        <span className="wallet-label">Ваш рахунок:</span>
        <span className="wallet-amount">
          {formatBalance(data?.balance)} грн
        </span>
      </div>

      <button className="topup-button">
        Поповнити гаманець
      </button>
    </div>
  );
};

export default WalletBalance;