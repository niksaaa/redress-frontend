import React from 'react';
import '../styles/user-item.css';

const UserItem = ({ user, onDelete }) => {
  const getRoleText = (role) => {
    switch (role) {
      case 0:
        return 'Адміністратор';
      case 1:
        return 'Модератор';
      case 2:
        return 'Користувач';
      default:
        return 'Невідома роль';
    }
  };

  return (
    <div className="user-item">
      <div className="user-header">
        <div className="user-info">
          <span className="user-username">{user.username}</span>
          <span className="user-role">{getRoleText(user.role)}</span>
        </div>
        <button 
          className="delete-btn" 
          onClick={() => onDelete(user.id)}
        >
          Видалити
        </button>
      </div>
      <div className="user-details">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{user.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Телефон:</span>
          <span className="detail-value">{user.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default UserItem; 