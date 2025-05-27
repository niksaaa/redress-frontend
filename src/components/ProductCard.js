import React from "react";
import "../styles/product-card.css";

const ProductCard = ({ price, title, imageUrl }) => {
  return (
    <div className="product-card-m">
      <div className="v46_164">
        <div className="v31_86"></div>
        <div
          className="v30_108"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        <span className="v31_75">{price} грн</span>
        <span className="v31_82">{title}</span>
        <div className="v46_121">
          <div className="v46_120"></div>
          <div className="v46_118"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
