import { demoParentCategories, demoSubcategories, generatedCategories } from '../demoData';
import { authService } from './authService';


export const fetchSubcategoriesBySex = async (sex) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(demoSubcategories[sex] || []), 300);
    });
  }
  try {
    const response = await authService.get(`/Category/GetBySex/by-sex/${sex}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Не вдалося отримати підкатегорії');
  }
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
    const response = await authService.get('/Category/GetTree/tree');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні категорій');
  }
};