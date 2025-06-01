import React from "react";
import ProductCard from "./ProductCard";
import "../styles/product-list.css";

const ProductList = ({ items }) => {
  if (!items || items.length === 0) {
    return <div className="no-items">Товари не знайдено</div>;
  }

  return (
    <div className="products-container">
      {items.map((item) => (
        <ProductCard
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

export default ProductList;
