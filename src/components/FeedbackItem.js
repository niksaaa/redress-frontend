import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProfileDetails, fetchUserDetails } from '../api/listing';
import { useAuth } from '../context/AuthContext';
import { deleteFeedback } from '../api/feedback';
import { Link } from "react-router-dom";
import '../styles/feedback.css';

export const FeedbackItem = ({ feedback }) => {
  const { userRole } = useAuth();
  const queryClient = useQueryClient();
  const isModerator = userRole === 1; // 1 - роль модератора

  // Отримуємо дані профілю
  const { data: profileData } = useQuery({
    queryKey: ['profileDetails', feedback.profile.id],
    queryFn: () => fetchProfileDetails(feedback.profile.id),
    enabled: !!feedback.profile.id
  });

  // Отримуємо дані користувача через userId з профілю
  const { data: userData } = useQuery({
    queryKey: ['userDetails', profileData?.userId],
    queryFn: () => fetchUserDetails(profileData?.userId),
    enabled: !!profileData?.userId
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
      <Link to={`/seller/${feedback.profile.id}`}>
        <div className="feedback-user-info">
          {/* Аватарка користувача */}
          {profileData?.profileImage?.url && (
            <img 
              src={profileData.profileImage.url} 
              alt="Аватар" 
              className="feedback-avatar"
            />
          )}
          
          {/* Нікнейм користувача */}
          {userData?.username && (
            <span className="feedback-username">{userData.username}</span>
          )}
          </div>
          </Link>
        
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