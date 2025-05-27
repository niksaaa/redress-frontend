export const demoProfileData = {
  Id: '123e4567-e89b-12d3-a456-426614174000',
    UserId: '123e4567-e89b-12d3-a456-426614174000',
    profileImage: {
      url: "https://i.pinimg.com/736x/fe/38/a9/fe38a90127def08c876ccdd77956e7ff.jpg"
    },
    averageRating: 4.8,
    ratingCount: 24,
    ratingStatus: "Надійний",
    createdAt: "2023-05-15T10:00:00Z",
    latitude: 49.9935,
    longitude: 36.2304,
    bio: "Привіт! Я дизайнерка з Харкова. Люблю створювати красиві речі та знаходити унікальні рішення.",
  balance: 876.50, 
};
  
export const demoUserData = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  username: 'sxirens',
  email: 'kira.sxirens.2006@gmail.com',
  role: 'User',
  phoneNumber: '+380987654321'
};

// // Базові категорії (Parent categories)
// export const parentCategories = [
//   { id: 'parent1', name: "Одяг", type: "radio" },
//   { id: 'parent2', name: "Взуття", type: "radio" },
//   { id: 'parent3', name: "Аксесуари", type: "radio" },
//   { id: 'parent4', name: "Колір", type: "checkbox" },
//   { id: 'parent5', name: "Розмір", type: "size" },
//   { id: 'parent6', name: "Матеріал", type: "checkbox" },
//   { id: 'parent7', name: "Бренд", type: "checkbox" }
// ];

// // Підкатегорії для жінок
// export const demoCategoriesFemale = [
//   { id: 'f1', name: "Весільні сукні", parentId: "parent1" },
//   { id: 'f2', name: "Вечірні сукні", parentId: "parent1" },
//   { id: 'f3', name: "Джинси", parentId: "parent1" },
//   { id: 'f4', name: "Кросівки", parentId: "parent2" },
//   { id: 'f5', name: "Сумки", parentId: "parent3" }
// ];

// // Підкатегорії для чоловіків
// export const demoCategoriesMale = [
//   { id: 'm1', name: "Костюми", parentId: "parent1" },
//   { id: 'm2', name: "Джинси", parentId: "parent1" },
//   { id: 'm3', name: "Кеди", parentId: "parent2" },
//   { id: 'm4', name: "Гаманці", parentId: "parent3" }
// ];

// // Підкатегорії для дітей
// export const demoCategoriesKids = [
//   { id: 'k1', name: "Дитячі сукні", parentId: "parent1" },
//   { id: 'k2', name: "Дитяче взуття", parentId: "parent2" },
//   { id: 'k3', name: "Рюкзаки", parentId: "parent3" }
// ];

export const demoParentCategories = [
  {
    id: '1',
    name: "Одяг",
    type: "radio",
    defaultOption: "Увесь одяг"
  },
  {
    id: '2',
    name: "Взуття",
    type: "radio",
    defaultOption: "Усе взуття"
  },
  {
    id: '3',
    name: "Аксесуари",
    type: "radio",
    defaultOption: "Усі аксесуари"
  }
  // {
  //   id: '4',
  //   name: "Колір",
  //   type: "checkbox",
  //   defaultOption: "Всі оголошення"
  // },
  // {
  //   id: '5',
  //   name: "Розмір",
  //   type: "size",
  //   sizeType: "clothing",
  //   options: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One size", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"]
  // },
  // {
  //   id: '6',
  //   name: "Матеріал",
  //   type: "checkbox",
  //   defaultOption: "Всі оголошення"
  // },
  // {
  //   id: '7',
  //   name: "Бренд",
  //   type: "checkbox",
  //   defaultOption: "Всі оголошення"
  // }
];

export const demoSubcategories = {
  female: [
    { id: 'f1', name: "Весільні сукні", parentId: "1" },
    { id: 'f2', name: "Джинси", parentId: "1" },
    { id: 'f3', name: "Кросівки", parentId: "2" },
    { id: 'f4', name: "Сумки", parentId: "3" },
    { id: 'f5', name: "Червоний", parentId: "4" },
    { id: 'f6', name: "Бавовна", parentId: "6" }
  ],
  male: [
    { id: 'm1', name: "Костюми", parentId: "1" },
    { id: 'm2', name: "Футболки", parentId: "1" },
    { id: 'm3', name: "Кеди", parentId: "2" },
    { id: 'm4', name: "Синій", parentId: "4" },
    { id: 'm5', name: "Поліестер", parentId: "6" }
  ],
  kids: [
    { id: 'k1', name: "Дитячі сукні", parentId: "1" },
    { id: 'k2', name: "Кросівки", parentId: "2" },
    { id: 'k3', name: "Рюкзаки", parentId: "3" },
    { id: 'k4', name: "Зелений", parentId: "4" }
  ]
};

// Демо-дані для списку товарів
export const demoListings = Array.from({ length: 60 }, (_, i) => ({
  id: `${i+1}a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d`,
  title: `Товар ${i+1}`,
  price: Math.floor(Math.random() * 10000) + 2000,
  isAuction: Math.random() > 0.7,
  // Додайте інші поля, які використовуються у вашому додатку
}));

export const demoImages = {
  '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d': [
    { id: 'img1', url: 'https://example.com/dress1.jpg' }
  ],
  '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e': [
    { id: 'img2', url: 'https://example.com/suit1.jpg' }
  ]
};

// export const demoListingDetails = {
//   '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d': {
//     createdAt: '2023-05-15T10:00:00Z'
//   },
//   '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e': {
//     createdAt: '2023-06-20T14:30:00Z'
//   }
// };

export const demoListingDetails = [{
  id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  title: 'Жакет на гудзиках Mango',
  latitude: 49.9935,
  longitude: 36.2304,
  price: 2500,
  createdAt: '2024-03-25T21:01:00Z',
  status: 'Active',
  isAuction: false,
  description: `Mango
Made in Morocco
Красиве й дуже якісне, тканина відмінно тримає форму
80% вовна
Розмір: XL
Плечі 46,
Груди 57,
Талія 54,
Низ 57,
Рукав 62,
Довжина 80.
Стан ідеальний, як нове, без дефектів.`,
  profileId: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
  categoryId: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',
  images: [
    {
      id: '1fa85f64-5717-4562-b3fc-2c963f66afa9',
      url: 'https://i.pinimg.com/736x/38/24/b2/3824b281c386fa011e59f5a3dade0943.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    },
    {
      id: '2fa85f64-5717-4562-b3fc-2c963f66afa0',
      url: 'https://i.pinimg.com/736x/c7/01/d1/c701d15fff6dd7fa23f2c2d284d099bd.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
      url: 'https://i.pinimg.com/736x/d4/f1/60/d4f1609b4e573fd6d40873ff7fcc6a61.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    }
  ]
},
{
  id: '2a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  title: 'Жакет на гудзиках Mango',
  latitude: 49.9935,
  longitude: 36.2304,
  price: 2500,
  createdAt: '2025-03-25T21:01:00Z',
  status: 'Active',
  isAuction: false,
  description: `Mango Made in Morocco
Красиве й дуже якісне, тканина відмінно тримає форму
80% вовна
Розмір: XL
Плечі 46,
Груди 57,
Талія 54,
Низ 57,
Рукав 62,
Довжина 80.
Стан ідеальний, як нове, без дефектів.`,
  profileId: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
  categoryId: '6fa85f64-5717-4562-b3fc-2c963f66afa8',
  images: [
    {
      id: '1fa85f64-5717-4562-b3fc-2c963f66afa9',
      url: 'https://i.pinimg.com/736x/38/24/b2/3824b281c386fa011e59f5a3dade0943.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    },
    {
      id: '2fa85f64-5717-4562-b3fc-2c963f66afa0',
      url: 'https://i.pinimg.com/736x/c7/01/d1/c701d15fff6dd7fa23f2c2d284d099bd.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    },
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa1',
      url: 'https://i.pinimg.com/736x/d4/f1/60/d4f1609b4e573fd6d40873ff7fcc6a61.jpg',
      createdAt: '2024-03-25T21:01:00Z'
    }
  ]
},
];

export const demoCategories = {
  '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d': {
    id: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',
    name: 'Жіночий одяг',
    sex: 'Female',
    parentId: null,
    children: [
      {
        id: '9e8f7a6b-5c4d-3e2f-1a0b-9c8d7e6f5a4b',
        name: 'Верхній одяг',
        sex: 'Female',
        parentId: '8d7e6f5a-4b3c-2d1e-0f9a-8b7c6d5e4f3a',
        children: [
          {
            id: '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
            name: 'Жакети',
            sex: 'Female',
            parentId: '9e8f7a6b-5c4d-3e2f-1a0b-9c8d7e6f5a4b',
            children: []
          }
        ]
      }
    ]
  },
  '2a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d': {
    id: '7d6e5f4a-3b2c-1d0e-9f8a-7b6c5d4e3f2a',
    name: 'Чоловічий одяг',
    sex: 'Male',
    parentId: null,
    children: [
      {
        id: '8e7f6a5b-4c3d-2e1f-0a9b-8d7e6f5a4b3c',
        name: 'Верхній одяг',
        sex: 'Male',
        parentId: '7d6e5f4a-3b2c-1d0e-9f8a-7b6c5d4e3f2a',
        children: []
      }
    ]
  }
};

export const demoProfiles = {
  '5fa85f64-5717-4562-b3fc-2c963f66afa7': {
    id: '5fa85f64-5717-4562-b3fc-2c963f66afa7',
    userId: '6fa85f64-5717-4562-b3fc-2c963f66afa8',
    ratingCount: 67,
    averageRating: 4.4,
    ratingStatus: 'Reliable',
    profileImage: {
      url: 'https://i.pinimg.com/736x/35/63/c6/3563c636ff52eb8013376264c6114d8d.jpg'
    }
  }
};

export const demoUsers = {
  '6fa85f64-5717-4562-b3fc-2c963f66afa8': {
    username: 'ketrin38',
    email: 'ketrin28@example.com',
    phoneNumber: '+380991234567'
  }
};


// demoData.js
export const demoFeedbackData = [
  { id: '1', rating: 5, comment: 'Чудовий продавець!', createdAt: '2023-05-15T10:30:00Z' },
  { id: '2', rating: 4, comment: 'Якісний товар', createdAt: '2023-04-22T14:15:00Z' },
  { id: '3', rating: 5, comment: 'Рекомендую!', createdAt: '2023-03-10T09:45:00Z' },
  { id: '4', rating: 3, comment: 'Були невеликі проблеми', createdAt: '2023-02-28T16:20:00Z' },
  { id: '5', rating: 5, comment: 'Супер!', createdAt: '2023-01-15T11:10:00Z' },
  { id: '6', rating: 4, comment: 'Швидка доставка', createdAt: '2022-12-05T08:15:00Z' },
  { id: '7', rating: 5, comment: 'Все сподобалось', createdAt: '2022-11-20T13:45:00Z' },
  { id: '8', rating: 2, comment: 'Не відповідає опису', createdAt: '2022-10-10T17:30:00Z' },
  { id: '9', rating: 5, comment: 'Ідеальна покупка', createdAt: '2022-09-01T09:20:00Z' },
  { id: '10', rating: 4, comment: 'Гарне співвідношення ціна/якість', createdAt: '2022-08-15T14:10:00Z' }
];

export const demoFavoritesData = [
  { id: '101', title: 'Смартфон Samsung Galaxy S21', price: 18999, isAuction: false, url: 'https://example.com/phone.jpg' },
  { id: '102', title: 'Ноутбук ASUS VivoBook 15', price: 24999, isAuction: true, url: 'https://example.com/laptop.jpg' },
  { id: '103', title: 'Навушники Sony WH-1000XM4', price: 8999, isAuction: false, url: 'https://example.com/headphones.jpg' },
  { id: '104', title: 'Фотоапарат Canon EOS R6', price: 58999, isAuction: false, url: 'https://example.com/camera.jpg' },
  { id: '105', title: 'Монітор Dell 27"', price: 12999, isAuction: false, url: 'https://example.com/monitor.jpg' },
  { id: '106', title: 'Мишка Logitech MX Master', price: 2499, isAuction: false, url: 'https://example.com/mouse.jpg' },
  { id: '107', title: 'Клавіатура Keychron K8', price: 3499, isAuction: false, url: 'https://example.com/keyboard.jpg' },
  { id: '108', title: 'SSD Samsung 1TB', price: 3999, isAuction: false, url: 'https://example.com/ssd.jpg' },
  { id: '109', title: 'Powerbank Xiaomi 20000mAh', price: 1499, isAuction: false, url: 'https://example.com/powerbank.jpg' },
  { id: '110', title: 'Кава-машина DeLonghi', price: 15999, isAuction: false, url: 'https://example.com/coffee.jpg' }
];

export const getPaginatedData = (allItems, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = allItems.slice(startIndex, endIndex);
  
  return {
    items,
    totalCount: allItems.length,
    page,
    pageSize,
    totalPages: Math.ceil(allItems.length / pageSize),
    hasNextPage: endIndex < allItems.length
  };
};

export const demoProductsData = [
  {
    id: '201',
    title: 'Кросівки Nike Air Max 270',
    price: 3499,
    isAuction: false,
    url: 'https://example.com/nike-air-max-270.jpg'
  },
  {
    id: '202',
    title: 'Сукня Zara з квітковим принтом',
    price: 2199,
    isAuction: false,
    url: 'https://example.com/zara-dress.jpg'
  },
  {
    id: '203',
    title: 'Годинник Casio G-Shock',
    price: 2799,
    isAuction: true,
    url: 'https://example.com/casio-gshock.jpg'
  },
  {
    id: '204',
    title: 'Сумка Michael Kors Bedford',
    price: 3999,
    isAuction: false,
    url: 'https://example.com/mk-bedford.jpg'
  },
  {
    id: '205',
    title: 'Чоловіча футболка Levi’s Classic',
    price: 899,
    isAuction: false,
    url: 'https://example.com/levis-tshirt.jpg'
  },
  {
    id: '206',
    title: 'Жіночі туфлі Aldo',
    price: 2899,
    isAuction: true,
    url: 'https://example.com/aldo-heels.jpg'
  },
  {
    id: '207',
    title: 'Сонцезахисні окуляри Ray-Ban Aviator',
    price: 3299,
    isAuction: false,
    url: 'https://example.com/rayban-aviator.jpg'
  },
  {
    id: '208',
    title: 'Спортивні штани Adidas Essentials',
    price: 1599,
    isAuction: false,
    url: 'https://example.com/adidas-pants.jpg'
  },
  {
    id: '209',
    title: 'Жіноча куртка The North Face',
    price: 4899,
    isAuction: true,
    url: 'https://example.com/tnf-jacket.jpg'
  },
  {
    id: '210',
    title: 'Шкіряний ремінь Timberland',
    price: 999,
    isAuction: false,
    url: 'https://example.com/timberland-belt.jpg'
  }
]


export const generatedCategories = [
  // Жіночі категорії
  {
    id: '10000000-0000-0000-0000-000000000001',
    name: 'Жіночий одяг',
    sex: 'Female',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000011',
        name: 'Сукні',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000001',
        children: []
      },
      {
        id: '10000000-0000-0000-0000-000000000012',
        name: 'Спідниці',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000001',
        children: []
      },
      {
        id: '10000000-0000-0000-0000-000000000013',
        name: 'Спідниці',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000001',
        children: []
      },
      {
        id: '10000000-0000-0000-0000-000000000014',
        name: 'Спідниці',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000001',
        children: []
      },
      {
        id: '10000000-0000-0000-0000-000000000015',
        name: 'Спідниці',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000001',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000002',
    name: 'Жіноче взуття',
    sex: 'Female',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000012',
        name: 'Туфлі',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000002',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000003',
    name: 'Жіночі аксесуари',
    sex: 'Female',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000013',
        name: 'Сумки',
        sex: 'Female',
        parentId: '10000000-0000-0000-0000-000000000003',
        children: []
      }
    ]
  },

  // Чоловічі категорії
  {
    id: '10000000-0000-0000-0000-000000000004',
    name: 'Чоловічий одяг',
    sex: 'Male',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000014',
        name: 'Куртки',
        sex: 'Male',
        parentId: '10000000-0000-0000-0000-000000000004',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000005',
    name: 'Чоловіче взуття',
    sex: 'Male',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000015',
        name: 'Кросівки',
        sex: 'Male',
        parentId: '10000000-0000-0000-0000-000000000005',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000006',
    name: 'Чоловічі аксесуари',
    sex: 'Male',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000016',
        name: 'Гаманці',
        sex: 'Male',
        parentId: '10000000-0000-0000-0000-000000000006',
        children: []
      }
    ]
  },

  // Дитячі категорії
  {
    id: '10000000-0000-0000-0000-000000000007',
    name: 'Дитячий одяг',
    sex: 'Child',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000017',
        name: 'Комбінезони',
        sex: 'Child',
        parentId: '10000000-0000-0000-0000-000000000007',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000008',
    name: 'Дитяче взуття',
    sex: 'Child',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000018',
        name: 'Черевики',
        sex: 'Child',
        parentId: '10000000-0000-0000-0000-000000000008',
        children: []
      }
    ]
  },
  {
    id: '10000000-0000-0000-0000-000000000009',
    name: 'Дитячі аксесуари',
    sex: 'Child',
    parentId: null,
    children: [
      {
        id: '10000000-0000-0000-0000-000000000019',
        name: 'Шапки',
        sex: 'Child',
        parentId: '10000000-0000-0000-0000-000000000009',
        children: []
      }
    ]
  }
];
