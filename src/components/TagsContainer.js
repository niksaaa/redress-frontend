import React, { useEffect, useState } from "react";
import "../styles/tags-container.css";
import { fetchListingCategories } from "../api/listing";

const TagsContainer = ({ listingId }) => {
  const [categoryPaths, setCategoryPaths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoryTree = await fetchListingCategories(listingId);
        const paths = buildCategoryPaths(categoryTree);
        setCategoryPaths(paths);
      } catch (error) {
        console.error("Error loading categories:", error);
        setCategoryPaths([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [listingId]);

  // Функція для побудови повних шляхів категорій
  const buildCategoryPaths = (category) => {
    const paths = [];

    // Рекурсивна функція для обходу дерева
    const traverse = (node, currentPath = []) => {
      if (!node) return;

      // Додаємо поточну категорію до шляху
      const newPath = [...currentPath, node.name];

      // Якщо це кінцевий вузол (немає дітей), додаємо шлях
      if (!node.children || node.children.length === 0) {
        paths.push(newPath.join(': '));
      }

      // Рекурсивно обходимо дітей
      if (node.children) {
        node.children.forEach(child => traverse(child, newPath));
      }
    };

    traverse(category);
    return paths;
  };

  if (loading) return <div className="loading-tags">Завантаження категорій...</div>;

  return (
    <div className="tags-container">
      {categoryPaths.length > 0 ? (
        categoryPaths.map((path, index) => (
          <div key={index} className="tag">
            {path}
          </div>
        ))
      ) : (
        <div className="tag">Категорії не вказані</div>
      )}
    </div>
  );
};

export default TagsContainer;