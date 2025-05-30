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
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import likedIcon from '../images/liked.png';
import likeIcon from '../images/like.png';

export default function ProductPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const loadListing = async () => {
      try {
        const data = await fetchListingDetails(id);
        setListing(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!isAuthenticated()) {
      alert('Будь ласка, увійдіть, щоб додавати товари до обраного');
      return;
    }
    toggleFavorite(id);
  };


  if (loading) return <div className="loading">Завантаження даних товару...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;
  if (!listing) return <div className="no-data">Товар не знайдено</div>;

  const formattedDate = format(new Date(listing.createdAt), 'dd.MM.yyyy, HH:mm:ss', { locale: uk });
  const isItemFavorite = isFavorite(id);

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
            <PriceSection price={listing.price} listing={listing} />
          </div>
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
