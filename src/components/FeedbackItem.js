import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchFeedbackDetails } from '../api/feedback';
import { fetchUserDetails } from '../api/listing';

const FeedbackItem = ({ feedback }) => {
  // Отримуємо деталі відгуку
  const { data: feedbackDetails } = useQuery({
    queryKey: ['feedbackDetails', feedback.id],
    queryFn: () => fetchFeedbackDetails(feedback.id),
    enabled: !!feedback.id
  });

  // Отримуємо дані користувача
  const { data: userData } = useQuery({
    queryKey: ['userDetails', feedbackDetails?.profile?.userId],
    queryFn: () => fetchUserDetails(feedbackDetails?.profile?.userId),
    enabled: !!feedbackDetails?.profile?.userId
  });

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
    </div>
  );
};

export default FeedbackItem;