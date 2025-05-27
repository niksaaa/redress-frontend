import { demoUserData } from '../demoData';
import { demoFavoritesData, getPaginatedData, demoProductsData} from '../demoData';

export const fetchUserById = async (id) => {
    if (process.env.REACT_APP_DEMO_MODE === 'true') {
        return new Promise(resolve => {
          setTimeout(() => resolve(demoUserData), 500);
        });
    }
    
    const response = await fetch(`https://localhost:7029/API/User/GetById?${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!response.ok) throw new Error('Не вдалося отримати дані користувача');
    return response.json();
  };
  
export const updateUser = async ({ id, updateDto }) => {
  const response = await fetch(`https://localhost:7029/API/User/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(updateDto)
  });
  if (!response.ok) throw new Error('Не вдалося оновити користувача');
  return response.json();
};

export const fetchUserFavorites = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoFavoritesData, page, pageSize)), 500);
    });
  }
  
  const response = await fetch(`https://localhost:7029/API/Favorite/GetUserFavorites?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Не вдалося завантажити обрані товари');
  return response.json();
};


export const fetchUserProducts = async (profileId, page = 1, pageSize = 5) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => resolve(getPaginatedData(demoProductsData, page, pageSize)), 500);
    });
  }
  
  const response = await fetch(`https://localhost:7029/API/Listing/GetByProfile?profileId=${profileId}&page=${page}&pageSize=${pageSize}`);
  if (!response.ok) throw new Error('Не вдалося завантажити обрані товари');
  return response.json();
};