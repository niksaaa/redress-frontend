import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingComponent from '../components/RatingComponent';
import UserInfoComponent from '../components/UserInfoComponent';
import ProfileImage from '../components/ProfileImage';
import BioComponent from '../components/BioComponent';
import SortSelector from "../components/SortSelector";
import { fetchProfileDetails, fetchUserDetails } from "../api/listing";
import { FeedbackList } from "../components/FeedbackList";
import { UserProductList } from "../components/UserProductList";
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
  
    useEffect(() => {
        const savedData = localStorage.getItem('currentSellerProfile');
        
        if (savedData) {
          try {
            const parsedData = JSON.parse(savedData);
            if (parsedData.profile.id === id) {
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
                  <UserProductList profileId={profile.id} />
        </div>
        )}

{sort2 === "Відгуки" && (
          <div className="content-section">
            <FeedbackList profileId={profile.id} />
          </div>
        )}
      </div>
  );
}