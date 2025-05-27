import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';
import '../styles/bio.css';

const BioComponent = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
        select: (profile) => profile.bio,
        staleTime: 1000 * 60 * 5, // 5 хвилин кешування
      });
      

  if (isLoading) return <div className="bio-loading">Завантаження опису...</div>;
  if (error) return <div className="bio-error">Помилка завантаження опису</div>;
  if (!data) return <div className="bio-empty">Користувач не додав опис</div>;

  return (
    <div className="bio-container">
      <p className="bio-text">{data}</p>
    </div>
  );
};

export default BioComponent;