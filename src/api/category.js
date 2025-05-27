// import {
//     parentCategories,
//     demoCategoriesFemale,
//     demoCategoriesMale,
//     demoCategoriesKids
//   } from '../demoData';
  
//   export const fetchParentCategories = async () => {
//     if (process.env.REACT_APP_DEMO_MODE === 'true') {
//       return new Promise(resolve => resolve(parentCategories));
//     }
//     // Реальний запит для батьківських категорій
//   };
  
//   export const fetchSubcategoriesBySex = async (sex) => {
//     if (process.env.REACT_APP_DEMO_MODE === 'true') {
//       return new Promise(resolve => {
//         setTimeout(() => {
//           switch (sex) {
//             case 'female': resolve(demoCategoriesFemale);
//             case 'male': resolve(demoCategoriesMale);
//             case 'kids': resolve(demoCategoriesKids);
//             default: resolve([]);
//           }
//         }, 300);
//       });
//     }
    
//     const response = await fetch(`https://localhost:7029/API/Category/GetBySex/${sex}`);
//     if (!response.ok) throw new Error('Не вдалося отримати категорії');
//     return response.json();
//   };

import { demoParentCategories, demoSubcategories, generatedCategories } from '../demoData';
import axios from 'axios';

export const fetchParentCategories = async () => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => resolve(demoParentCategories));
  }
  const response = await fetch('https://localhost:7029/API/Category/parent-categories');
  if (!response.ok) throw new Error('Не вдалося отримати батьківські категорії');
  return response.json();
};

export const fetchSubcategoriesBySex = async (sex) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(demoSubcategories[sex] || []), 300);
    });
  }
  const response = await fetch(`https://localhost:7029/API/Category/GetBySex/${sex}`);
  if (!response.ok) throw new Error('Не вдалося отримати підкатегорії');
  return response.json();
};


export const fetchCategoryTree = async () => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generatedCategories);
      }, 300);
    });
  }

  try {
    const response = await axios.get(`https://localhost:7029/API/Category/GetTree`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні категорій');
  }
};