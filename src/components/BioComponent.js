import React from 'react';
import '../styles/bio.css';

const BioComponent = ({text}) => {
  return (
    <div className="bio-container">
      <p className="bio-text">{text}</p>
    </div>
  );
};

export default BioComponent;