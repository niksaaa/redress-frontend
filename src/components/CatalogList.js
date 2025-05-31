import React, { useState, useEffect } from "react";
import CatalogCard from "./CatalogCard";
import "../styles/catalog-list.css";

const CatalogList = ({ items }) => {

  if (!items || items.length === 0) {
    return <div className="no-items">Оголошення не знайдено</div>;
  }

  return (
    <div className="items-grid">
      {items.map((item) => (
        <CatalogCard
          key={item.id}
          id={item.id}
          price={item.price}
          title={item.title}
          imageUrl={item.url}
          isAuction={item.isAuction}
        />
      ))}
    </div>
  );
};

export default CatalogList;