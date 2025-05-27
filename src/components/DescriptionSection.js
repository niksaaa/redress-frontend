import React from "react";
import "../styles/description-section.css";

const DescriptionSection = ({ description }) => {
  return (
    <div className="description-section">
      <div className="section-bg">
        <span className="section-title-2">Опис</span>
        <span className="description-text">
          {description || "Опис відсутній"}
        </span>
      </div>
    </div>
  );
};

export default DescriptionSection;