import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FeedbackItem } from '../components/FeedbackItem';
import Pagination from '../components/Pagination';
import { fetchAllFeedbacks } from '../api/feedback';
import '../styles/moderator-page.css';

const ModeratorPage = () => {
  const { userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const pageSize = 10;


  const { data: feedbacksData, isLoading } = useQuery({
    queryKey: ['feedbacks', page],
    queryFn: () => fetchAllFeedbacks({ page, pageSize }),
  });

  const handleLogout = () => {
    logout();
    navigate('/');
    };
    
    // Перевірка ролі модератора
    useEffect(() => {
        if (userRole !== 1) {
          navigate('/');
        }
      }, [userRole, navigate]);

  return (
    <>
      <div className="moderator-page">
        <div className="moderator-header">
          <h1>Панель модератора</h1>
          <button className="logout-btn2" onClick={handleLogout}>
            Вийти
          </button>
        </div>

        <div className="moderator-content">
          {isLoading ? (
            <div className="loading">Завантаження відгуків...</div>
          ) : (
            <>
              <div className="feedbacks-section">
                <h2>Відгуки користувачів</h2>
                <div className="feedbacks-list">
                {feedbacksData?.items?.length === 0 ? (
  <p>Відгуків поки немає.</p>
) : (
  feedbacksData?.items.map(feedback => (
    <FeedbackItem key={feedback.id} feedback={feedback} />
  ))
)}
                </div>
                {feedbacksData?.totalPages > 1 && (
                  <Pagination
                    currentPage={page}
                    totalPages={feedbacksData.totalPages}
                    onPageChange={setPage}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ModeratorPage; 