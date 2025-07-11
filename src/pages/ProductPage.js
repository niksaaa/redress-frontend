import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/product-page.css";
import ProductGallery from "../components/ProductGallery";
import PriceSection from "../components/PriceSection";
import TagsContainer from "../components/TagsContainer";
import LocationSection from "../components/LocationSection";
import SellerSection from "../components/SellerSection";
import DescriptionSection from "../components/DescriptionSection";
import BiddingInfo from "../components/BiddingInfo";
import { fetchListingDetails } from "../api/listing";
import { getAuctionById } from "../api/auction";
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useAuth } from "../context/AuthContext";
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToFavorites, removeFromFavorites } from '../api/favorite';

export default function ProductPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [auctionDetails, setAuctionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const profileId = localStorage.getItem('profileId');
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const isItemFavorite = favorites.includes(id);
  const queryClient = useQueryClient();
  const { user, userRole } = useAuth();
  const isAdmin = userRole === 0;
  const [showAdminModal, setShowAdminModal] = useState(false);

  const fetchListingData = async () => {
    try {
      const listingData = await fetchListingDetails(id);
      setListing(listingData);
      
      if (listingData.isAuction && listingData.auctionId) {
        const auctionData = await getAuctionById(listingData.auctionId);
        setAuctionDetails(auctionData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshAuctionData = async () => {
    if (listing?.auctionId) {
      try {
        const data = await getAuctionById(listing.auctionId);
        setAuctionDetails(data);
      } catch (error) {
        console.error("Помилка оновлення аукціону:", error);
      }
    }
  };

  useEffect(() => {
    fetchListingData();
  }, [id]);

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async () => {
      if (isItemFavorite) {
        await removeFromFavorites(profileId, id);
      } else {
        await addToFavorites(profileId, id);
      }
    },
    onSuccess: () => {
      const updatedFavorites = isItemFavorite
        ? favorites.filter(favId => favId !== id)
        : [...favorites, id];
      
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      queryClient.invalidateQueries(['favorites']);
    }
  });

  const handleFavoriteClick = () => {
    if (!profileId) {
      alert('Будь ласка, увійдіть, щоб додавати товари до обраного');
      return;
    }
    toggleFavorite();
  };

  const handleAdminRestriction = () => {
    setShowAdminModal(true);
  };

  if (loading) return <div className="loading">Завантаження даних товару...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;
  if (!listing) return <div className="no-data">Товар не знайдено</div>;

  const formattedDate = format(new Date(listing.createdAt), 'dd.MM.yyyy, HH:mm:ss', { locale: uk });

  return (
    <div className="product-page-container">
      <div className="product-top-row">
        <ProductGallery images={listing.images} />
        <div className="product-info-section">
        <span className="post-date">{formattedDate}</span>
          <div className="title-and-favorite">
            <span className="product-title">{listing.title}</span>
            <div 
  className={`like-btn ${isItemFavorite ? "liked" : "not-liked"}`} 
  onClick={handleFavoriteClick}
  title={isItemFavorite ? "В обраному" : "Додати до обраного"}
/>
          </div>
          {listing.isAuction ? (
            <BiddingInfo 
              currentPrice={auctionDetails?.currentPrice || listing.price}
              startPrice={auctionDetails?.startPrice || listing.price}
              minStep={auctionDetails?.minStep || 10}
              endAt={auctionDetails?.endAt}
              auctionId={listing.auctionId} 
              onBidSuccess={refreshAuctionData}
              isAdmin={isAdmin}
              onAdminRestriction={handleAdminRestriction}
            />
          ) : (
            <PriceSection 
          price={listing.price} 
          listing={listing}
          isAdmin={isAdmin}
          onAdminRestriction={handleAdminRestriction}
        />
          )}

          {/* Модальне вікно для адміністратора */}
      {showAdminModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Адміністратори не можуть робити покупки або ставки на аукціонах</p>
            <button onClick={() => setShowAdminModal(false)}>Закрити</button>
          </div>
        </div>
      )}
          </div>
      </div>
      <TagsContainer listingId={listing.id}/>
      <DescriptionSection description={listing.description} />
      <LocationSection 
        latitude={listing.latitude} 
        longitude={listing.longitude} 
      />
      {/* <BiddingInfo isAuction={listing.isAuction} /> */}
      <SellerSection profileId={listing.profileId} />
    </div>
  );
}
