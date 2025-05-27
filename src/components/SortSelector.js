import React, { useState } from "react";
import "../styles/sortSelector.css";

const SortSelector = ({ options, active, setActive, variant = "default" }) => {
    return (
      <div className={`sort-container ${variant}`}>
        <ul className="sort-list">
          {options.map((option, index) => (
            <li
              key={index}
              className={`sort-item ${active === option ? "active" : ""}`}
              onClick={() => setActive(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SortSelector;
