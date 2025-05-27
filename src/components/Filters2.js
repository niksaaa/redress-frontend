import "../styles/filters.css";
import React, { useState, useEffect } from 'react';
import { fetchCategoryTree } from '../api/category';

export default function Filters({ sex, onCategorySelect, onPriceChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [inputPrice, setInputPrice] = useState({ min: 0, max: 50000 });
  const [currentParentCategory, setCurrentParentCategory] = useState(null);

  // Отримуємо дерево категорій
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const tree = await fetchCategoryTree();
        setCategories(tree);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Фільтруємо категорії за статтю
  const getFilteredCategories = () => {
    if (!sex) return [];
    return categories.filter(cat => cat.sex === sex);
  };

  // Обробник вибору категорії
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  // Перемикаємо розгортання категорії
  const toggleCategory = (category) => {
    if (category.children && category.children.length > 0) {
      setCurrentParentCategory(category);
      setExpandedCategories(prev => ({
        ...prev,
        [category.id]: !prev[category.id]
      }));
    } else {
      handleCategorySelect(category.id);
    }
  };

  // Обробники для ціни
  const handlePriceChange = (e, type) => {
    const value = parseInt(e.target.value);
    setInputPrice(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handlePriceBlur = (type) => {
    let value = inputPrice[type];
    
    if (isNaN(value)) {
      value = type === 'min' ? 0 : 50000;
    }
    
    if (type === 'min' && value < 0) value = 0;
    if (type === 'max' && value > 50000) value = 50000;
    if (type === 'min' && value > priceRange.max) value = priceRange.max;
    if (type === 'max' && value < priceRange.min) value = priceRange.min;
    
    setInputPrice(prev => ({
      ...prev,
      [type]: value
    }));
    
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSliderChange = (e, type) => {
    const value = parseInt(e.target.value);
    
    if (type === 'min' && value >= priceRange.max) {
      setPriceRange(prev => ({
        min: prev.max - 1,
        max: prev.max
      }));
      setInputPrice(prev => ({
        min: prev.max - 1,
        max: prev.max
      }));
      return;
    }
    
    if (type === 'max' && value <= priceRange.min) {
      setPriceRange(prev => ({
        min: prev.min,
        max: prev.min + 1
      }));
      setInputPrice(prev => ({
        min: prev.min,
        max: prev.min + 1
      }));
      return;
    }
    
    setPriceRange(prev => ({
      ...prev,
      [type]: value
    }));
    setInputPrice(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const resetPrice = () => {
    setPriceRange({ min: 0, max: 50000 });
    setInputPrice({ min: 0, max: 50000 });
  };

  const applyPrice = () => {
    if (onPriceChange) {
      onPriceChange(priceRange);
    }
  };

  const renderParentCategories = () => {
    return getFilteredCategories().map(category => (
      <div key={category.id} className="category">
        <div 
          className="category-header" 
          onClick={() => toggleCategory(category)}
        >
          {category.name}
          {category.children && category.children.length > 0 && (
            <span className="toggle-icon">
              {expandedCategories[category.id] ? '-' : '+'}
            </span>
          )}
        </div>
      </div>
    ));
  };

  const renderChildCategories = () => {
    if (!currentParentCategory) return null;

    return (
      <div className="category">
        <div className="category-header" onClick={() => {
          setCurrentParentCategory(null);
          setExpandedCategories(prev => ({
            ...prev,
            [currentParentCategory.id]: false
          }));
        }}>
          ← Назад до {currentParentCategory.name}
        </div>

        <div className="subcategory-list">
          <label>
            <input
              type="radio"
                        name="category"
                        className="category-radio"
              checked={selectedCategoryId === currentParentCategory.id}
              onChange={() => handleCategorySelect(currentParentCategory.id)}
            />
            {currentParentCategory.name}
          </label>

          {currentParentCategory.children.map(child => (
            <label key={child.id}>
              <input
                type="radio"
                      name="category"
                      className="category-radio"
                checked={selectedCategoryId === child.id}
                onChange={() => handleCategorySelect(child.id)}
              />
              {child.name}
            </label>
          ))}
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Завантаження категорій...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;

  return (
    <div className="filter-block">
      <div className="filter-title">Для {getSexLabel(sex)}</div>
      
      {currentParentCategory ? renderChildCategories() : renderParentCategories()}

      <div className="category">
        <div className="category-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
          Ціна
          <span className="toggle-icon">{isPriceOpen ? '-' : '+'}</span>
        </div>
        
        {isPriceOpen && (
          <div className="subcategory-list price-filter">
            <div className="price-slider-container">
              <div className="price-slider-line">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange.min}
                  onChange={(e) => handleSliderChange(e, 'min')}
                  className="price-slider min-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange.max}
                  onChange={(e) => handleSliderChange(e, 'max')}
                  className="price-slider max-slider"
                />
              </div>
            </div>
            
            <div className="price-inputs">
              <div className="price-input-group">
                <label>від</label>
                <input
                  type="number"
                  value={inputPrice.min}
                  onChange={(e) => handlePriceChange(e, 'min')}
                  onBlur={() => handlePriceBlur('min')}
                  min="0"
                  max={priceRange.max}
                />
              </div>
              
              <div className="price-input-group">
                <label>до</label>
                <input
                  type="number"
                  value={inputPrice.max}
                  onChange={(e) => handlePriceChange(e, 'max')}
                  onBlur={() => handlePriceBlur('max')}
                  min={priceRange.min}
                  max="50000"
                />
              </div>
            </div>
            
            <div className="price-buttons">
              <button onClick={resetPrice} className="price-button reset">
                Скинути
              </button>
              <button onClick={applyPrice} className="price-button apply">
                Застосувати
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getSexLabel(sex) {
  switch (sex) {
    case 'Female': return 'жінок';
    case 'Male': return 'чоловіків';
    case 'Child': return 'дітей';
    default: return '';
  }
}