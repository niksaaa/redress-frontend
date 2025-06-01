import React from "react";
import AuctionCard from "./AuctionCard";
import "../styles/auction-list.css";

const AuctionList = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className="no-items">Аукціонні товари не знайдено</div>;
  }

  return (
    <div className="auction-list">
      {items.map((item) => (
        <AuctionCard
          key={item.id}
          id={item.id}
          price={item.price}
          title={item.title}
          imageUrl={item.url}
        />
      ))}
    </div>
  );
};

export default AuctionList;

