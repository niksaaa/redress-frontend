import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/product-page.css";
import ProductGallery from "../components/ProductGallery"; // Import the new component
import PriceSection from "../components/PriceSection";
import TagsContainer from "../components/TagsContainer";
import LocationSection from "../components/LocationSection";
import SellerSection from "../components/SellerSection";
import DescriptionSection from "../components/DescriptionSection";
import BiddingInfo from "../components/BiddingInfo";
import { fetchListingDetails } from "../api/listing";
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

export default function ProductPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className="loading">Завантаження даних товару...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;
  if (!listing) return <div className="no-data">Товар не знайдено</div>;

  const formattedDate = format(new Date(listing.createdAt), 'dd.MM.yyyy, HH:mm:ss', { locale: uk });

  return (
    <div className="container-2">
      <ProductGallery images={listing.images} />
      <span className="product-title">{listing.title}</span>
      <TagsContainer listingId={listing.id}/>
      <DescriptionSection description={listing.description} />
      <LocationSection 
        latitude={listing.latitude} 
        longitude={listing.longitude} 
      />
      <div className="action-buttons">
        <div className="like-btn"></div>
      </div>
      {/* <BiddingInfo isAuction={listing.isAuction} /> */}
      <PriceSection price={listing.price} listing={listing} />
      <SellerSection profileId={listing.profileId} />
      <span className="post-date">{formattedDate}</span> 
    </div>
  );
}
