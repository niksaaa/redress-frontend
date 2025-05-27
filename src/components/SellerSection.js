import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/seller-section.css";
import { fetchProfileDetails, fetchUserDetails } from "../api/listing";

const SellerSection = ({ profileId }) => {
  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const loadSellerData = async () => {
  //     try {
  //       // Завантажуємо дані профілю
  //       const profileData = await fetchProfileDetails(profileId);
  //       setProfile(profileData);

  //       // Якщо є userId, завантажуємо дані користувача
  //       if (profileData.userId) {
  //         const userData = await fetchUserDetails(profileData.userId);
  //         setUser(userData);
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (profileId) {
  //     loadSellerData();
  //   }
  // }, [profileId]);

  useEffect(() => {
    const loadSellerData = async () => {
      try {
        const profileData = await fetchProfileDetails(profileId);
        setProfile(profileData);

        if (profileData.userId) {
          const userData = await fetchUserDetails(profileData.userId);
          setUser(userData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (profileId) {
      loadSellerData();
    }
  }, [profileId]);

  const handleViewSeller = () => {
    if (profile && user) {
      // Зберігаємо дані продавця в localStorage
      localStorage.setItem('currentSellerProfile', JSON.stringify({
        profile,
        user
      }));
      navigate(`/seller/${profileId}`);
    }
  };


  if (loading) return <div className="loading">Завантаження даних продавця...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;

  const getRatingStatusText = (status) => {
    switch (status) {
      case 'Reliable': return 'Надійний продавець';
      case 'Verified': return 'Перевірений продавець';
      default: return 'Новий продавець';
    }
  };

  return (
    <div className="seller-section" onClick={handleViewSeller} style={{ cursor: 'pointer' }}>
      <div className="section-bg">
        <span className="section-title-2">Продавець</span>
        <div className="seller-info">
          <div className="seller-avatar-2">
            <div 
              className="avatar-bg"
              style={{ 
                backgroundImage: profile?.profileImage?.url 
                  ? `url(${profile.profileImage.url})` 
                  : 'none' 
              }}
            ></div>
          </div>
          <div className="seller-text">
            <span className="seller-name">{user?.username || 'Продавець'}</span>
            {profile?.ratingCount && (
              <div className="seller-rating">
                <div className="star">⭐</div>
                <span className="average-rating-2">{profile.averageRating?.toFixed(1) || '0.0'}</span>
                <span className="rating-count">
                  {profile.ratingCount} оцінок
                </span>
              </div>
            )}
            {profile?.ratingStatus && (
              <div className="trusted-seller">
                <div className="trusted-icon">👑</div>
                <span className="trusted-text">
                  {getRatingStatusText(profile.ratingStatus)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSection;