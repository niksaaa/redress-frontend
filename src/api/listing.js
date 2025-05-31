import { authService } from './authService';
import { demoListings } from '../demoData'; // Імпорт демо-функції
import { demoListingDetails, demoCategories, demoProfiles, demoUsers } from '../demoData';


// Демо-функція для імітації API
const demoFetchListings = async (sex, page = 1, pageSize = 12) => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Імітація затримки
    
    // Генеруємо великий набір демо-даних (60 товарів)
    const generateDemoItems = () => {
      const items = [];
      const categories = {
        'Male': ['Костюм', 'Сорочка', 'Штани', 'Піджак', 'Куртка'],
        'Female': ['Сукня', 'Блузка', 'Спідниця', 'Кофта', 'Пальто'],
        'Child': ['Комбінезон', 'Футболка', 'Шорти', 'Світшот', 'Плащ']
      };
      
      const currentCategory = sex === 'Male' ? 'Male' : 
                            sex === 'Female' ? 'Female' : 'Child';
      
      for (let i = 0; i < 60; i++) {
        const categoryItems = categories[currentCategory];
        const itemName = categoryItems[i % categoryItems.length];
        
        items.push({
          id: `${i+1}a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d`,
          title: `${itemName} ${currentCategory.toLowerCase()} ${i+1}`,
          price: Math.floor(Math.random() * 10000) + 2000,
          isAuction: Math.random() > 0.7,
          url: '../images/main-page/v30_108.png'
        });
      }
      
      return items;
    };
  
    const allItems = generateDemoItems();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = allItems.slice(startIndex, endIndex);
  
    return {
      items: paginatedItems,
      totalPages: Math.ceil(allItems.length / pageSize),
      totalCount: allItems.length
    };
  };

// Отримання оголошень за статтю
export const fetchListingsBySex = async (sex, page = 1, pageSize = 12) => {
  // Якщо DEMO_MODE увімкнено — повертаємо демо-дані
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return demoFetchListings(sex, page, pageSize);
  }

  // Інакше — реальний запит до API
  try {
    // Конвертуємо рядкове значення у числове для enum
    const sexValue = sex === 'Male' ? 0 : sex === 'Female' ? 1 : 2;
    
    const response = await authService.get('/Listing/GetBySex', {
      params: { sex, page, pageSize }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні оголошень');
  }
};


export const fetchListingDetails = async (id) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        // Шукаємо товар в demoListingDetails за ID
        const listing = Array.isArray(demoListingDetails) 
          ? demoListingDetails.find(item => item.id === id)
          : demoListingDetails.id === id 
            ? demoListingDetails 
            : null;
        
        if (listing) {
          resolve(listing);
        } else {
          // Якщо не знайдено, створюємо об'єкт з мінімальними даними
          resolve({
            id,
            title: `Товар ${id}`,
            price: 0,
            isAuction: false,
            description: 'Опис відсутній',
            images: [],
            createdAt: new Date().toISOString(),
            status: 'Active'
          });
        }
      }, 500);
    });
  }

  // Реальний запит до API
  try {
    const response = await authService.get(`/Listing/GetById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch listing details');
  }
};


// Функція для отримання категорій товару
export const fetchListingCategories = async (listingId) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        const category = demoCategories[listingId] || {
          id: 'default-category',
          name: 'Загальна категорія',
          sex: 'Unisex',
          parentId: null,
          children: []
        };
        resolve(category);
      }, 300);
    });
  }

  try {
    const response = await authService.get(`/Category/GetByListingId/by-listing/${listingId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні категорій');
  }
};

// Функція для отримання даних профілю
export const fetchProfileDetails = async (profileId) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(demoProfiles[profileId] || {
          id: profileId,
          userId: 'default-user-id',
          ratingCount: 0,
          averageRating: 0,
          ratingStatus: 'New',
          profileImage: null
        });
      }, 300);
    });
  }

  try {
    const response = await authService.get(`/Profile/GetById/${profileId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні профілю');
  }
};

// Функція для отримання даних користувача
export const fetchUserDetails = async (userId) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(demoUsers[userId] || {
          username: 'user' + Math.floor(Math.random() * 1000),
          email: 'user@example.com',
          phoneNumber: '+380000000000'
        });
      }, 300);
    });
  }

  try {
    const response = await authService.get(`/User/GetById/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні користувача');
  }
};


export const fetchListingsByCategory = async (categoryId, page = 1, pageSize = 12) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return demoFetchListings(null, page, pageSize); // Можете адаптувати для демо-режиму
  }

  try {
    const response = await authService.get(`/Listing/GetByCategory`, {
      params: {
        categoryId,
        page,
        pageSize
      }
    });

    return {
      items: response.data.items,
      totalPages: response.data.totalPages,
      totalCount: response.data.totalCount
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні оголошень за категорією');
  }
};

export const fetchListingsByPriceRange = async (minPrice, maxPrice, page = 1, pageSize = 12) => {
  if (process.env.REACT_APP_DEMO_MODE === 'true') {
    return demoFetchListings(null, page, pageSize); // Можете адаптувати для демо-режиму
  }

  try {
    const response = await authService.get(`/Listing/GetByPriceRange/by-price-range`, {
      params: {
        minPrice,
        maxPrice,
        page,
        pageSize
      }
    });

    return {
      items: response.data.items,
      totalPages: response.data.totalPages,
      totalCount: response.data.totalCount
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Помилка при завантаженні оголошень за ціною');
  }
};