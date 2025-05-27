import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (sex) => {
    navigate(`/catalog-page/${sex}`);
  };

  const handleLikeClick = () => {
    // Переходимо на сторінку профілю з параметром для активного розділу
    navigate('/profile', { state: { activeTab: 'Обране' } });
  };
  
  return (
    <header className="v162_3">
      {/* Общий хедер для всех страниц */}
      <div className="v162_4">
        <div className="search-icon"></div>
        <div className="like-icon" onClick={handleLikeClick} title="Обране"></div>
        <Link to="/profile">
          <div className="profile-icon" title="Профіль"></div>
        </Link>
        <Link to="/help">
          <div className="help-icon" title="Допомога"></div>
        </Link>
      </div>
      <Link to="/main-page">
      <div className="logo"></div>
        </Link>
      <nav className="menu">
        <span className="he-option" onClick={() => handleCategoryClick('Male')}>Він</span>
        <span className="she-option" onClick={() => handleCategoryClick('Female')}>Вона</span>
        <span className="children-option" onClick={() => handleCategoryClick('Child')}>Діти</span>
      </nav>
    </header>
  );
};

export default Header;
