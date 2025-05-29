import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProfileFeedbacks } from '../api/feedback';
import { useState } from 'react';
import Pagination from './Pagination';
import FeedbackItem from './FeedbackItem';
import '../styles/feedback.css';

export const FeedbackList = ({ profileId }) => {
    const [page, setPage] = useState(1);
    const pageSize = 5;

    const { data: feedbacksData, isLoading, error } = useQuery({
        queryKey: ['feedbacks', profileId, page],
    queryFn: () => fetchProfileFeedbacks(profileId, page, pageSize),
    enabled: !!profileId || process.env.REACT_APP_DEMO_MODE === 'true',
    keepPreviousData: true
    });

    // Функція для зміни сторінки з прокруткою
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

    if (isLoading) return <div className="loading">Завантаження відгуків...</div>;
    if (error) return <div className="error">Помилка: {error.message}</div>;
    
    // Якщо немає даних або пустий масив
    if (!feedbacksData?.items || feedbacksData.items.length === 0) {
        return (
            <div className="content-section">
                <div className="text-wrapper"><p className="text">Тут поки пусто</p></div>
            </div>
        );
    }

    return (
        <div className="content-section-4">
            <div className="feedbacks-container">
                {feedbacksData.items.map(feedback => (
                    <FeedbackItem key={feedback.id} feedback={feedback} />
                ))}
            </div>
            {feedbacksData.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={feedbacksData.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
    );
};