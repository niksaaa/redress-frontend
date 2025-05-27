// components/ProductSellerInfo.js
import React from "react";
import PropTypes from "prop-types";
import "../styles/product-seller-info.css"

const ProductSellerInfo = ({
  productName,
  price,
  sellerName,
  sellerAvatar,
  productImage
}) => {
  return (
    <div className="product-seller-container">
      <span className="order-title">Оформити замовлення</span>
      
      <div className="seller-info-container">
        <span className="seller-label">Продавець:</span>
        <div className="seller-block">
          <div className="seller-avatar">
            <div className="avatar-icon" style={{ backgroundImage: sellerAvatar ? `url(${sellerAvatar})` : 'none' }}></div>
          </div>
          <span className="seller-nickname">{sellerName}</span>
        </div>
      </div>

      <div className="product-card2">
        <div className="product-content">
          <div className="product-image" style={{ backgroundImage: productImage ? `url(${productImage})` : 'none' }}></div>
          <span className="product-name">{productName}</span>
        </div>
        <span className="product-price">{price}</span>
      </div>
    </div>
  );
};

ProductSellerInfo.propTypes = {
  productName: PropTypes.string,
  price: PropTypes.string,
  sellerName: PropTypes.string,
  sellerAvatar: PropTypes.string,
  productImage: PropTypes.string,
};

export default ProductSellerInfo;