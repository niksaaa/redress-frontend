import React from "react";
import "../styles/location-section.css";

const LocationSection = ({ latitude, longitude }) => {
  // Тут можна додати логіку для визначення адреси за координатами
  const locationText = latitude && longitude 
    ? `Координати: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
    : "Місцезнаходження не вказано";

  return (
    <div className="location-section">
  <div className="section-bg">
    <span className="section-title-2">Місцезнаходження</span>
    <div className="location-content">
      <div className="location-icon"></div>
      <span className="location-text">{locationText}</span>
    </div>
  </div>
</div>

  );
};

export default LocationSection;