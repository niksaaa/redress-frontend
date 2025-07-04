import SortSelector from "../components/SortSelector";
import "../styles/profile.css";
import React, { useState, useEffect } from 'react';
import RatingComponent from '../components/RatingComponent';
import UserInfoComponent from '../components/UserInfoComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../api/profile';
import { fetchUserById } from "../api/user";
import ProfileImage from '../components/ProfileImage';
import BioComponent from '../components/BioComponent';
import WalletBalance from '../components/WalletBalance';
import { FeedbackList } from '../components/FeedbackList';
import { FavoritesList } from "../components/FavoritesList";
import { UserProductList } from "../components/UserProductList";
import { useAuth } from '../context/AuthContext';

const sortOptions1 = [
    "За популярністю",
    "Дешевше",
    "Дорожче",
    "За новинками"
  ];

const sortOptions2 = [
    "Мої товари",
    "Відгуки",
    "Гаманець",
    "Обране",
    "Про мене"
];
  
export default function Profile() {
  const { logout } = useAuth();

  // Отримуємо дані профілю
  console.log('Початок завантаження даних профілю');
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    staleTime: 1000 * 60 * 5, // Дані будуть "свіжими" 5 хвилин
  });

  console.log('Профіль завантажено, отримую дані користувача');

  // Отримуємо дані користувача, коли profileData доступний
  const { data: userData, isLoading: isUserLoading, error: userError } = useQuery({
    queryKey: ['user', profileData?.userId],
    queryFn: () => fetchUserById(profileData?.userId),
    // enabled: !!profileData && !!profileData.UserId, // Запит виконується тільки коли є UserId
    staleTime: 1000 * 60 * 5,
  });

  console.log('Дані юзера завантажено');

  // Об'єднуємо стан завантаження та помилок
  const isLoading = isProfileLoading || isUserLoading;
  const error = profileError || userError;

  // Зберігаємо дані в localStorage для сторінки редагування
  useEffect(() => {
    if (profileData && userData) {
      localStorage.setItem('profileEditData', JSON.stringify({
        profile: profileData,
        user: userData
      }));
    }
  }, [profileData, userData]);

  
  const { state } = useLocation();
    const [sort1, setSort1] = useState(sortOptions1[0]);
      const [sort2, setSort2] = useState(state?.activeTab || sortOptions2[0]);
    
      const handleReset = () => {
        setSort1(sortOptions1[0]);
        setSort2(sortOptions2[0]);
  };
  
  const navigate = useNavigate();

  useEffect(() => {
    // Якщо є активний таб у стані, встановлюємо його
    if (state?.activeTab) {
      setSort2(state.activeTab);
    }
  }, [state]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) return <div className="loading">Завантаження профілю...</div>;
  if (error) return <div className="error">Помилка: {error.message}</div>;
    
    return (
        <>
          <link
            href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
            rel="stylesheet"
        />
        {/* <RatingComponent 
        rating={profileData?.averageRating} 
        count={profileData?.ratingCount} 
        status={profileData?.ratingStatus} 
      /> */}

<div className="top-section">
        <ProfileImage imageUrl={profileData?.profileImage?.url} />

        <div className="info-section">
            <span className="username">{userData?.username}</span>

            <RatingComponent
            rating={profileData?.averageRating}
            count= {profileData?.ratingCount}
            status= {profileData?.ratingStatus}
            />

          <UserInfoComponent 
            createdAt={profileData?.createdAt} 
            location={{ 
              latitude: profileData?.latitude, 
              longitude: profileData?.longitude 
            }} 
          />

          <div className="buttons-wrapper">
          <button 
        className="edit-btn" 
        onClick={() => navigate("/edit-profile-page", { 
          state: { 
            profileData: profileData,
            userData: userData
          } 
        })}
      >
        Редагувати профіль
      </button>
            <button className="add-listing-btn" onClick={() => navigate("/ad-form")}>
              Додати оголошення
              </button>
              <button className="logout-btn2" onClick={handleLogout}>
          Вийти
        </button>
          </div>
        </div>
      </div>
             
        <div className="add-info-list">
        <SortSelector
                  options={sortOptions2}
                  active={sort2}
                  setActive={setSort2}
                  variant="reverse"
                />
          </div>

                

        <div className="line"></div>
        
        {sort2 === "Гаманець" && (
          <div className="content-section">
            <WalletBalance balance={profileData?.balance}/>
          </div>
        )}

        {sort2 === "Про мене" && (
          <div className="content-section">
            <BioComponent text={profileData?.bio} />
          </div>
        )}

        {sort2 === "Мої товари" && (
          <div className="content-section-2">
            {/* <div className="sort">
            <SortSelector
            options={sortOptions1}
            active={sort1}
            setActive={setSort1}
            variant="default"
          />
            </div> */}
            <UserProductList profileId={profileData.id} />
        </div>
        )}

{sort2 === "Відгуки" && (
          <div className="content-section">
                      <FeedbackList profileId={profileData.id} />
                    </div>
        )}

{sort2 === "Обране" && (
          <div className="content-section-2">
                            <FavoritesList profileId={profileData?.id} />
                  </div>
        )}

        </>
      );
}