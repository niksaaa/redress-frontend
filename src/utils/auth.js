// Функція для отримання ID користувача з токена
export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // У реальному додатку тут буде розпарсинг JWT токена
    // Для демо-версії просто повертаємо фіксований ID
    return '123e4567-e89b-12d3-a456-426614174000';
  };
  
  // Функція для отримання ролі користувача з токена
  export const getUserRoleFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    // Для демо-версії повертаємо фіксовану роль
    return 'User';
  };