import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchFeedbackDetails } from '../api/feedback';
import { fetchUserDetails } from '../api/listing';
import { useAuth } from '../context/AuthContext';
import { deleteFeedback } from '../api/feedback';
import '../styles/feedback.css';

export const FeedbackItem = ({ feedback }) => {
  const { userRole } = useAuth();
  const queryClient = useQueryClient();
  const isModerator = userRole === 1; // 1 - роль модератора

  // Отримуємо деталі відгуку тільки для звичайного користувача
  const { data: feedbackDetails } = useQuery({
    queryKey: ['feedbackDetails', feedback.id],
    queryFn: () => fetchFeedbackDetails(feedback.id),
    enabled: !!feedback.id && !isModerator // Викликаємо тільки якщо не модератор
  });

  // Отримуємо дані користувача для обох ролей
  const { data: userData } = useQuery({
    queryKey: ['userDetails', isModerator ? feedback.userId : feedbackDetails?.profile?.userId],
    queryFn: () => fetchUserDetails(isModerator ? feedback.userId : feedbackDetails?.profile?.userId),
    enabled: !!(isModerator ? feedback.userId : feedbackDetails?.profile?.userId)
  });

  // Мутація для видалення відгуку
  const deleteMutation = useMutation({
    mutationFn: () => deleteFeedback(feedback.id),
    onSuccess: () => {
      queryClient.invalidateQueries(['feedbacks']);
    },
  });

  const handleDelete = () => {
    if (window.confirm('Ви впевнені, що хочете видалити цей відгук?')) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="feedback-item">
      <div className="feedback-header">
        <div className="feedback-user-info">
          {userData?.username && (
            <span className="feedback-username">{userData.username}</span>
          )}
        </div>
        <div className="feedback-rating-date">
          <span className="feedback-rating">Рейтинг: {feedback.rating}/5</span>
          <span className="feedback-date">
            {new Date(feedback.createdAt).toLocaleDateString('uk-UA')}
          </span>
        </div>
      </div>
      {feedback.comment && (
        <div className="feedback-comment">
          <p>{feedback.comment}</p>
        </div>
      )}
      {isModerator && (
        <div className="feedback-actions">
          <button 
            className="delete-btn2" 
            onClick={handleDelete}
            disabled={deleteMutation.isLoading}
          >
            {deleteMutation.isLoading ? 'Видалення...' : 'Видалити'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;