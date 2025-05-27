import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingComponent from '../components/RatingComponent';
import UserInfoComponent from '../components/UserInfoComponent';
import ProfileImage from '../components/ProfileImage';
import BioComponent from '../components/BioComponent';
import SortSelector from "../components/SortSelector";
import { fetchProfileDetails, fetchUserDetails } from "../api/listing";
import { FeedbackList } from "../components/FeedbackList";
import { FavoritesList } from "../components/FavoritesList";

// import "../styles/seller-profile.css";
import "../styles/profile.css";

const sortOptions1 = [
    "За популярністю",
    "Дешевше",
    "Дорожче",
    "За новинками"
  ];

const sortOptions2 = [
    "Мої товари",
    "Відгуки",
    "Про мене"
];
  

export default function SellerPage() {
  const { id } = useParams();
  const [sellerData, setSellerData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const [sort1, setSort1] = useState(sortOptions1[0]);
          const [sort2, setSort2] = useState(sortOptions2[0]);
        
          const handleReset = () => {
            setSort1(sortOptions1[0]);
            setSort2(sortOptions2[0]);
    };

//   useEffect(() => {
//     const loadSellerData = async () => {
//       try {
//         const data = await fetchSellerDetails(id);
//         setSellerData(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSellerData();
    //   }, [id]);
    
//   if (loading) return <div className="loading">Завантаження даних продавця...</div>;
//   if (error) return <div className="error">Помилка: {error}</div>;
    //   if (!sellerData) return <div className="no-data">Продавець не знайдений</div>;
    // console.log('початкове значення sort2:', sort2);
    // useEffect(() => {
    //     // Отримуємо дані з localStorage
    //     const savedData = localStorage.getItem('currentSellerProfile');
        
    //     if (savedData) {
    //       try {
    //         const parsedData = JSON.parse(savedData);
    //         // Перевіряємо, чи це дані для поточного продавця
    //         if (parsedData.profile.Id === id) {
    //             setSellerData(parsedData);
    //             console.log('Профіль встановлено:', parsedData.profile.Id);
    //           setLoading(false);
    //           return;
    //         }
    //       } catch (e) {
    //         console.error('Помилка парсингу даних продавця', e);
    //       }
    //     }
        
    //     // Якщо даних немає в localStorage, завантажуємо з API
    //     const fetchData = async () => {
    //       try {
    //         const profileData = await fetchProfileDetails(id);
    //         const userData = await fetchUserDetails(profileData.userId);
    //           setSellerData({ profile: profileData, user: userData });
    //           console.log('Профіль встановлено:', profileData.Id);
    //       } catch (err) {
    //         console.error('Помилка завантаження даних продавця', err);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
        
    //     fetchData();
    // }, [id]);
    
    // useEffect(() => {
    //     console.log('useEffect перевірка:', sort2, sellerData?.profile?.Id);
    //     if (sellerData?.profile?.Id && sort2 === "Мої товари") {
    //       loadFavorites();
    //     }
    //   }, [sort2, sellerData?.profile?.Id]);
    
    // //   const loadFavorites = async () => {
    // //     setFavoritesLoading(true);
    // //     try {
    // //       const data = await fetchUserFavorites(sellerData.profile.Id);
    // //       setFavorites(data.items || []);
    // //     } catch (error) {
    // //       console.error('Помилка завантаження обраних товарів:', error);
    // //     } finally {
    // //       setFavoritesLoading(false);
    // //     }
    // //   };
    // const loadFavorites = async () => {
    //     setFavoritesLoading(true);
    //     try {
    //       console.log('Завантаження обраних, демо режим:', process.env.REACT_APP_DEMO_MODE);
    //       const data = await fetchUserFavorites(sellerData.profile.Id);
    //       console.log('Отримані обрані:', data);
    //       setFavorites(data.items || []);
    //     } catch (error) {
    //       console.error('Помилка завантаження обраних товарів:', error);
    //     } finally {
    //       setFavoritesLoading(false);
    //     }
    //   };

    useEffect(() => {
        const savedData = localStorage.getItem('currentSellerProfile');
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.profile.Id === id) {
              setSellerData(parsedData);
              setLoading(false);
              return;
            }
          } catch (e) {
            console.error('Помилка парсингу даних продавця', e);
          }
        }
        
        const fetchData = async () => {
          try {
            const profileData = await fetchProfileDetails(id);
            const userData = await fetchUserDetails(profileData.userId);
            setSellerData({ profile: profileData, user: userData });
          } catch (err) {
            console.error('Помилка завантаження даних продавця', err);
          } finally {
            setLoading(false);
          }
        };
        
        fetchData();
      }, [id]);
    
    
      if (loading) return <div className="loading">Завантаження даних продавця...</div>;
      if (!sellerData) return <div className="no-data">Дані продавця не знайдено</div>;
    
      const { profile, user } = sellerData;

  return (
    <div className="seller-profile-container">
      <div className="top-section">
        <ProfileImage imageUrl={profile?.profileImage?.url} />
        
        <div className="info-section">
          <span className="username">{user?.username}</span>
          
          <RatingComponent 
            rating={profile?.averageRating} 
            count={profile?.ratingCount} 
            status={profile?.ratingStatus} 
          />
          
          <UserInfoComponent 
            createdAt={profile?.createdAt} 
            location={{ 
              latitude: profile?.latitude, 
              longitude: profile?.longitude 
            }}
          />
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
      
          {sort2 === "Про мене" && (
          <div className="content-section">
            <BioComponent text={profile?.bio} />
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
                  <FavoritesList profileId={profile.Id} />
        </div>
        )}

{sort2 === "Відгуки" && (
          <div className="content-section">
            <FeedbackList profileId={profile.Id} />
          </div>
        //   <div className="content-section">
        //     <div className="text-wrapper"><p className="text">Тут поки пусто</p></div>
        //   </div>
        )}
      </div>
  );
}