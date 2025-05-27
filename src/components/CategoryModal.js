import React, { useState } from "react";
import "../styles/category-modal.css";

export default function CategoryModal({ categories, onClose, onSelect }) {
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleCategorySelect = (node, level) => {
    const newSelectedNodes = [...selectedNodes.slice(0, level), node];
    setSelectedNodes(newSelectedNodes);
    setCurrentLevel(level + 1);

    if (!node.children || node.children.length === 0) {
      onSelect(newSelectedNodes.map(n => n.name), node.id);
    }
  };

  const getCurrentCategories = () => {
    if (selectedNodes.length === 0) return categories;
    
    let current = selectedNodes[selectedNodes.length - 1].children;
    for (let i = 0; i < currentLevel - 1; i++) {
      if (!current || current.length === 0) break;
      current = current[0].children;
    }
    
    return current || [];
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-">
        <div className="breadcrumbs">
          {selectedNodes.length > 0 && (
            <span>
              {selectedNodes.map((node, i) => (
                <React.Fragment key={node.id}>
                  <span 
                    className="breadcrumb-item" 
                    onClick={() => {
                      setSelectedNodes(selectedNodes.slice(0, i + 1));
                      setCurrentLevel(i + 1);
                    }}
                  >
                    {node.name}
                  </span>
                  {i < selectedNodes.length - 1 && <span> / </span>}
                </React.Fragment>
              ))}
            </span>
          )}
        </div>

        <div className="category-list">
          {getCurrentCategories().map(category => (
            <div
              key={category.id}
              className="category-item"
              onClick={() => handleCategorySelect(category, currentLevel)}
            >
              {category.name}
              {category.children && category.children.length > 0 && (
                <span className="arrow">→</span>
              )}
            </div>
          ))}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
}
