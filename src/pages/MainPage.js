import React from "react";
import "../styles/main-page.css";
import { useQuery } from '@tanstack/react-query';
import { fetchAllListings } from '../api/listing';
import ProductList from "../components/ProductList";
import AuctionList from "../components/AuctionList";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { data: listings, isLoading, isError } = useQuery(
    ['listings'],
    () => fetchAllListings({ page: 1, pageSize: 20 }) // Fetch enough items for both sections
  );

  const navigate = useNavigate();

  const handleCategoryClick = (sex) => {
    navigate(`/catalog-page/${sex}`);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (isError) return <div>Помилка завантаження даних</div>;

  // Filter items for top offers (first 4 non-auction items)
  const topOffers = listings?.items
    ?.filter(item => !item.isAuction)
    .slice(0, 4) || [];

  // Filter items for auctions (first 5 auction items)
  const auctionItems = listings?.items
    ?.filter(item => item.isAuction)
    .slice(0, 5) || [];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
        rel="stylesheet"
      />
      <div className="gallery-wrapper">
        <div className="gallery">
          <div
            className="image-block image-woman"
            onClick={() => handleCategoryClick("Female")}
          >
            <span className="label">Вона</span>
          </div>
          <div
            className="image-block image-man"
            onClick={() => handleCategoryClick("Male")}
          >
            <span className="label">Він</span>
          </div>
          <div
            className="image-block image-kids"
            onClick={() => handleCategoryClick("Child")}
          >
            <span className="label">Діти</span>
          </div>
        </div>
      </div>
      <div>
        <span className="v30_33">ТОП ПРОПОЗИЦІЇ</span>
        <div className="product-list-wrapper">
        <ProductList items={topOffers} />
        </div>
      </div>
      <span className="v30_106">Час аукціону спливає, не зволікай!</span>
      <div>
      <AuctionList items={auctionItems} />
      </div>
    </>
  );
}

