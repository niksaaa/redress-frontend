// import "../styles/filters.css";
// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import {
//   fetchParentCategories,
//   fetchSubcategoriesBySex
// } from '../api/category';

// export default function Filters({ sex }) {
//   const [openCategories, setOpenCategories] = useState({});
//   const [selectedSubcategories, setSelectedSubcategories] = useState({});
//   const [selectedSizes, setSelectedSizes] = useState({ clothing: [], footwear: [] });
//   const [isPriceOpen, setIsPriceOpen] = useState(false);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
//   const [inputPrice, setInputPrice] = useState({ min: 0, max: 50000 });

//   // Отримуємо батьківські категорії
// const { data: parentCategories } = useQuery({
//   queryKey: ['parentCategories'],
//   queryFn: fetchParentCategories,
//   onSuccess: (data) => {
//     // Ініціалізуємо вибрані значення за замовчуванням
//     const initialSelection = {};
//     data.forEach(category => {
//       if (category.type === 'checkbox' || category.type === 'radio') {
//         initialSelection[category.name] = category.type === 'checkbox'
//           ? [category.defaultOption]
//           : category.defaultOption;
//       }
//     });
//     setSelectedSubcategories(initialSelection);
//   }
// });

// // Отримуємо підкатегорії для обраної статі
// const { data: subcategories, isLoading, error } = useQuery({
//   queryKey: ['subcategories', sex],
//   queryFn: () => fetchSubcategoriesBySex(sex)
// });


//   // Групуємо підкатегорії по батьківських категоріях
//   const getGroupedCategories = () => {
//     return parentCategories?.map(parent => {
//       let subItems = [];
      
//       if (parent.type === 'size') {
//         subItems = parent.options;
//       } else {
//         subItems = [
//           parent.defaultOption,
//           ...(subcategories?.filter(sc => sc.parentId === parent.id)?.map(sc => sc.name) || [])
//         ];
//       }
      
//       return {
//         ...parent,
//         subcategories: subItems
//       };
//     }) || [];
//   };

//   const toggleCategory = (categoryName) => {
//     setOpenCategories(prev => ({
//       ...prev,
//       [categoryName]: !prev[categoryName]
//     }));
//   };

//   const handleSubcategoryChange = (categoryName, subcategoryName, isCheckbox) => {
//     setSelectedSubcategories(prev => {
//       const prevSelection = prev[categoryName] || (isCheckbox ? [] : '');
      
//       if (isCheckbox) {
//         if (subcategoryName === parentCategories.find(c => c.name === categoryName)?.defaultOption) {
//           return { ...prev, [categoryName]: [subcategoryName] };
//         }
        
//         let newSelection;
//         if (prevSelection.includes(parentCategories.find(c => c.name === categoryName)?.defaultOption)) {
//           newSelection = [subcategoryName];
//         } else {
//           newSelection = prevSelection.includes(subcategoryName)
//             ? prevSelection.filter(item => item !== subcategoryName)
//             : [...prevSelection, subcategoryName];
          
//           if (newSelection.length === 0) {
//             newSelection = [parentCategories.find(c => c.name === categoryName)?.defaultOption];
//           }
//         }
        
//         return { ...prev, [categoryName]: newSelection };
//       } else {
//         return { ...prev, [categoryName]: subcategoryName };
//       }
//     });
//   };

//   const handleSizeToggle = (sizeType, size) => {
//     setSelectedSizes(prev => {
//       const current = prev[sizeType] || [];
//       const newSelection = current.includes(size)
//         ? current.filter(s => s !== size)
//         : [...current, size];
//       return { ...prev, [sizeType]: newSelection };
//     });
//   };

//   // Функції для роботи з ціною залишаються незмінними
//   // Обробники для ціни
//   const handlePriceChange = (e, type) => {
//     const value = parseInt(e.target.value);
//     setInputPrice(prev => ({
//       ...prev,
//       [type]: value
//     }));
//   };

//   const handlePriceBlur = (type) => {
//     let value = inputPrice[type];
    
//     // Валідація значень
//     if (isNaN(value)) {
//       value = type === 'min' ? 0 : 50000;
//     }
    
//     if (type === 'min' && value < 0) value = 0;
//     if (type === 'max' && value > 50000) value = 50000;
//     if (type === 'min' && value > priceRange.max) value = priceRange.max;
//     if (type === 'max' && value < priceRange.min) value = priceRange.min;
    
//     setInputPrice(prev => ({
//       ...prev,
//       [type]: value
//     }));
    
//     setPriceRange(prev => ({
//       ...prev,
//       [type]: value
//     }));
//   };

//   const handleSliderChange = (e, type) => {
//     const value = parseInt(e.target.value);
    
//     // Запобігаємо перетину повзунків
//     if (type === 'min' && value >= priceRange.max) {
//       setPriceRange(prev => ({
//         min: prev.max - 1,
//         max: prev.max
//       }));
//       setInputPrice(prev => ({
//         min: prev.max - 1,
//         max: prev.max
//       }));
//       return;
//     }
    
//     if (type === 'max' && value <= priceRange.min) {
//       setPriceRange(prev => ({
//         min: prev.min,
//         max: prev.min + 1
//       }));
//       setInputPrice(prev => ({
//         min: prev.min,
//         max: prev.min + 1
//       }));
//       return;
//     }
    
//     setPriceRange(prev => ({
//       ...prev,
//       [type]: value
//     }));
//     setInputPrice(prev => ({
//       ...prev,
//       [type]: value
//     }));
//   };
//   const resetPrice = () => {
//     setPriceRange({ min: 0, max: 50000 });
//     setInputPrice({ min: 0, max: 50000 });
//   };

//   const applyPrice = () => {
//     // Тут можна додати логіку застосування фільтра
//     console.log("Applied price range:", priceRange);
//     // Наприклад, викликати функцію фільтрації з батьківського компоненту
//   };

//   if (isLoading) return <div className="loading">Завантаження...</div>;
//   if (error) return <div className="error">Помилка: {error.message}</div>;

//   return (
//     <div className="filter-block">
//       <div className="filter-title">Для {getSexLabel(sex)}</div>
      
//       {getGroupedCategories().map(category => (
//         <div className="category" key={category.id}>
//           <div className="category-header" onClick={() => toggleCategory(category.name)}>
//             {category.name}
//             <span className="toggle-icon">{openCategories[category.name] ? '-' : '+'}</span>
//           </div>
          
//           {openCategories[category.name] && (
//             <div className="subcategory-list">
//               {category.type === 'radio' && category.subcategories.map(sub => (
//                 <label key={sub}>
//                   <input
//                     type="radio"
//                     name={category.name}
//                     checked={
//                       category.type === 'radio'
//                         ? selectedSubcategories[category.name] === sub
//                         : (selectedSubcategories[category.name] || []).includes(sub)
//                     }
//                     onChange={() => handleSubcategoryChange(category.name, sub, false)}
//                   />
//                   {sub}
//                 </label>
//               ))}
              
//               {/* {category.type === 'checkbox' && category.subcategories.map(sub => (
//                 <label key={sub}>
//                   <input
//                     type="checkbox"
//                     checked={(selectedSubcategories[category.name] || []).includes(sub)}
//                     onChange={() => handleSubcategoryChange(category.name, sub, true)}
//                   />
//                   {sub}
//                 </label>
//               ))} */}
              
//               {/* {category.type === 'size' && (
//                 <div className="size-buttons">
//                   {category.subcategories.map(size => (
//                     <button
//                       key={size}
//                       className={`size-button ${
//                         (selectedSizes[category.sizeType] || []).includes(size) ? 'selected' : ''
//                       }`}
//                       onClick={() => handleSizeToggle(category.sizeType, size)}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//               )} */}
//             </div>
//           )}
//         </div>
//       ))}
      
//       {/* Блок фільтрації за ціною (залишається незмінним) */}
//       <div className="category">
//         <div className="category-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
//           Ціна
//           <span className="toggle-icon">{isPriceOpen ? '-' : '+'}</span>
//         </div>
        
//         {isPriceOpen && (
//           <div className="subcategory-list price-filter">
//             <div className="price-slider-container">
//   <div className="price-slider-line">
//     <input
//       type="range"
//       min="0"
//       max="50000"
//       value={priceRange.min}
//       onChange={(e) => handleSliderChange(e, 'min')}
//       className="price-slider min-slider"
//     />
//     <input
//       type="range"
//       min="0"
//       max="50000"
//       value={priceRange.max}
//       onChange={(e) => handleSliderChange(e, 'max')}
//       className="price-slider max-slider"
//     />
//   </div>
// </div>
            
//             <div className="price-inputs">
//               <div className="price-input-group">
//                 <label>від</label>
//                 <input
//                   type="number"
//                   value={inputPrice.min}
//                   onChange={(e) => handlePriceChange(e, 'min')}
//                   onBlur={() => handlePriceBlur('min')}
//                   min="0"
//                   max={priceRange.max}
//                 />
//               </div>
              
//               <div className="price-input-group">
//                 <label>до</label>
//                 <input
//                   type="number"
//                   value={inputPrice.max}
//                   onChange={(e) => handlePriceChange(e, 'max')}
//                   onBlur={() => handlePriceBlur('max')}
//                   min={priceRange.min}
//                   max="50000"
//                 />
//               </div>
//             </div>
            
//             <div className="price-buttons">
//               <button onClick={resetPrice} className="price-button reset">
//                 Скинути
//               </button>
//               <button onClick={applyPrice} className="price-button apply">
//                 Застосувати
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // export default function Filters({ sex }) {
// //   const [openCategories, setOpenCategories] = useState({});
// //   const [selectedSubcategories, setSelectedSubcategories] = useState({});
// //   //   const [selectedSubcategories, setSelectedSubcategories] = useState({
// // //     "Одяг": "Увесь одяг",
// // //     "Взуття": "Усе взуття",
// // //     "Аксесуари": "Усі аксесуари",
// // //     "Колір": ["Всі оголошення"],
// // //     "Матеріал": ["Всі оголошення"],
// // //     "Бренд": ["Всі оголошення"]
// // //   });
  
// //   // Отримуємо батьківські категорії
// //   const { data: parents } = useQuery({
// //     queryKey: ['parentCategories'],
// //     queryFn: fetchParentCategories
// //   });
  
// //   // Отримуємо підкатегорії для обраної статі
// //   const { data: subcategories, isLoading, error } = useQuery({
// //     queryKey: ['subcategories', sex],
// //     queryFn: () => fetchSubcategoriesBySex(sex)
// //   });

// //   // Групуємо підкатегорії по батьківських категоріях
// //   const groupedCategories = parents?.map(parent => ({
// //     ...parent,
// //     subcategories: [
// //       `Усі ${parent.name.toLowerCase()}`,
// //       ...(subcategories?.filter(sc => sc.parentId === parent.id)?.map(sc => sc.name) || [])
// //     ]
// //   }));

// //   const toggleCategory = (categoryName) => {
// //     setOpenCategories(prev => ({
// //       ...prev,
// //       [categoryName]: !prev[categoryName]
// //     }));
// //   };

// //   const handleSubcategoryChange = (categoryName, subcategoryName, isCheckbox) => {
// //     setSelectedSubcategories(prev => ({
// //       ...prev,
// //       [categoryName]: isCheckbox
// //         ? toggleArrayItem(prev[categoryName] || [], subcategoryName, categoryName)
// //         : subcategoryName
// //     }));
// //   };

// //   const toggleArrayItem = (arr, item, categoryName) => {
// //     if (item === `Усі ${categoryName.name.toLowerCase()}`) {
// //       return [item];
// //     }
// //     return arr.includes(item)
// //       ? arr.filter(i => i !== item)
// //       : [...arr, item];
// //   };

// //   if (isLoading) return <div className="loading">Завантаження...</div>;
// //   if (error) return <div className="error">Помилка: {error.message}</div>;

// //   return (
// //     <div className="filter-block">
// //       <div className="filter-title">Для {getSexLabel(sex)}</div>
      
// //       {groupedCategories?.map(category => (
// //         <div className="category" key={category.id}>
// //           <div className="category-header" onClick={() => toggleCategory(category.name)}>
// //             {category.name}
// //             <span className="toggle-icon">
// //               {openCategories[category.name] ? '-' : '+'}
// //             </span>
// //           </div>
          
// //           {openCategories[category.name] && (
// //             <div className="subcategory-list">
// //               {category.type === 'radio' && category.subcategories.map(sub => (
// //                 <label key={sub}>
// //                   <input
// //                     type="radio"
// //                     name={category.name}
// //                     checked={selectedSubcategories[category.name] === sub}
// //                     onChange={() => handleSubcategoryChange(category.name, sub, false)}
// //                   />
// //                   {sub}
// //                 </label>
// //               ))}
              
// //               {category.type === 'checkbox' && category.subcategories.map(sub => (
// //                 <label key={sub}>
// //                   <input
// //                     type="checkbox"
// //                     checked={(selectedSubcategories[category.name] || []).includes(sub)}
// //                     onChange={() => handleSubcategoryChange(category.name, sub, true)}
// //                   />
// //                   {sub}
// //                 </label>
// //               ))}
              
// //               {category.type === 'size' && (
// //                 <div className="size-buttons">
// //                   {category.subcategories.map(size => (
// //                     <button
// //                       key={size}
// //                       className={`size-button ${
// //                         (selectedSubcategories[category.name] || []).includes(size) ? 'selected' : ''
// //                       }`}
// //                       onClick={() => handleSubcategoryChange(category.name, size, true)}
// //                     >
// //                       {size}
// //                     </button>
// //                   ))}
// //                 </div>
// //               )}
// //             </div>
// //           )}
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }


// // export default function Filters( { sex }) {
// //   const [categoriess, setCategories] = useState([]);
// //   const [openCategories, setOpenCategories] = useState({});
// //   const [selectedSubcategories, setSelectedSubcategories] = useState({
// //     "Одяг": "Увесь одяг",
// //     "Взуття": "Усе взуття",
// //     "Аксесуари": "Усі аксесуари",
// //     "Колір": ["Всі оголошення"],
// //     "Матеріал": ["Всі оголошення"],
// //     "Бренд": ["Всі оголошення"]
// //   });
// //     const [selectedSizes, setSelectedSizes] = useState({ clothing: [], footwear: [] });
// //     const mockCategories = [
// //         {
// //           name: "Одяг",
// //           type: "radio",
// //           selected: "Увесь одяг",
// //           subcategories: [
// //             "Не показувати",
// //             "Увесь одяг",
// //             "Підкатегорія 1",
// //             "Підкатегорія 2",
// //             "Підкатегорія 3",
// //             "Підкатегорія 4",
// //             "Підкатегорія 5",
// //             "Підкатегорія 6",
// //             "Підкатегорія 7",
// //             "Підкатегорія 8",
// //             "Підкатегорія 9",
// //             "Підкатегорія 10",
// //             "Підкатегорія 11",
// //             "Підкатегорія 12",
// //             "Підкатегорія 13",
// //             "Підкатегорія 14",
// //             "Підкатегорія 15",
// //             "Підкатегорія 16",
// //             "Підкатегорія 17"
// //           ]
// //         },
// //         {
// //           name: "Взуття",
// //           type: "radio",
// //           selected: "Усе взуття",
// //           subcategories: [
// //             "Не показувати",
// //             "Усе взуття",
// //             "Підкатегорія A",
// //             "Підкатегорія B",
// //             "Підкатегорія C",
// //             "Підкатегорія D",
// //             "Підкатегорія E",
// //             "Підкатегорія F",
// //             "Підкатегорія G",
// //             "Підкатегорія H"
// //           ]
// //         },
// //         {
// //           name: "Аксесуари",
// //           type: "radio",
// //           selected: "Усі аксесуари",
// //           subcategories: [
// //             "Не показувати",
// //             "Усі аксесуари",
// //             "Підкатегорія X",
// //             "Підкатегорія Y",
// //             "Підкатегорія Z",
// //             "Підкатегорія W",
// //             "Підкатегорія 1",
// //             "Підкатегорія 2",
// //             "Підкатегорія 3",
// //             "Підкатегорія 4",
// //             "Підкатегорія 5",
// //             "Підкатегорія 6",
// //             "Підкатегорія 7"
// //           ]
// //       },
// //       {
// //         name: "Розмір",
// //         type: "size",
// //         clothingSizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL", "One size"],
// //         shoeSizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"]
// //       },
// //         {
// //           name: "Колір",
// //           type: "checkbox",
// //           selected: ["Всі оголошення"],
// //           subcategories: [
// //             "Всі оголошення",
// //             "Червоний",
// //             "Синій",
// //             "Жовтий",
// //             "Зелений",
// //             "Чорний",
// //             "Білий",
// //             "Сірий",
// //             "Фіолетовий",
// //             "Коричневий",
// //             "Бежевий",
// //             "Оранжевий",
// //             "Бірюзовий",
// //             "Рожевий",
// //             "Золотий",
// //             "Срібний",
// //             "Мультиколір"
// //           ]
// //         },
// //         {
// //           name: "Матеріал",
// //           type: "checkbox",
// //           selected: ["Всі оголошення"],
// //           subcategories: [
// //             "Всі оголошення",
// //             "Бавовна",
// //             "Льон",
// //             "Шерсть",
// //             "Шкіра",
// //             "Штучна шкіра",
// //             "Джинс",
// //             "Поліестер",
// //             "Шовк",
// //             "Атлас",
// //             "Замша",
// //             "Мереживо",
// //             "Нейлон",
// //             "Твід",
// //             "Фліс",
// //             "Велюр"
// //           ]
// //         },
// //         {
// //           name: "Бренд",
// //           type: "checkbox",
// //           selected: ["Всі оголошення"],
// //           subcategories: [
// //             "Всі оголошення",
// //             "Nike",
// //             "Adidas",
// //             "Zara",
// //             "H&M",
// //             "Bershka",
// //             "Stradivarius",
// //             "Puma",
// //             "Reebok",
// //             "New Balance",
// //             "Levi’s",
// //             "Mango",
// //             "Massimo Dutti",
// //             "Gucci",
// //             "Chanel",
// //             "Louis Vuitton",
// //             "Prada",
// //             "Armani",
// //             "Tommy Hilfiger",
// //             "Ralph Lauren",
// //             "Lacoste",
// //             "Calvin Klein",
// //             "Versace",
// //             "Balenciaga",
// //             "Dolce & Gabbana",
// //             "The North Face",
// //             "Columbia",
// //             "Cropp",
// //             "Reserved",
// //             "Pull & Bear",
// //             "Uniqlo",
// //             "Under Armour"
// //           ]
// //         }
// //       ];
      
    
// //     // Для з'єднання з бекендом
// // // async function fetchCategories() {
// // //     const response = await fetch('https://localhost:5001/api/categories');
// // //     if (!response.ok) {
// // //       throw new Error('Не вдалося завантажити категорії');
// // //     }
// // //     return await response.json();
// // //   }
  

// // //   useEffect(() => {
// // //     fetchCategories()
// // //       .then(data => setCategories(data))
// // //       .catch(error => console.error(error));
// //     //   }, []);
    
// //     useEffect(() => {
// //         setCategories(mockCategories);
// //       }, []);
      

// //     const toggleCategory = (categoryName) => {
// //     setOpenCategories(prev => ({
// //       ...prev,
// //       [categoryName]: !prev[categoryName],
// //     }));
// //     console.log("openCategories state:", JSON.stringify(openCategories, null, 2));
// //   };

// //   const handleSubcategoryChange = (categoryName, subcategoryName, isCheckbox) => {
// //     setSelectedSubcategories(prev => {
// //       const prevSelection = prev[categoryName] || (isCheckbox ? [] : '');
      
// //       if (isCheckbox) {
// //         // Якщо вибираємо "Всі оголошення"
// //         if (subcategoryName === "Всі оголошення") {
// //           return {
// //             ...prev,
// //             [categoryName]: ["Всі оголошення"]
// //           };
// //         }
        
// //         // Якщо вибираємо інший чекбокс
// //         let newSelection;
// //         if (prevSelection.includes("Всі оголошення")) {
// //           // Якщо раніше було вибрано "Всі оголошення", видаляємо його
// //           newSelection = [subcategoryName];
// //         } else {
// //           // Інакше додаємо/видаляємо звичайним чином
// //           newSelection = prevSelection.includes(subcategoryName)
// //             ? prevSelection.filter(item => item !== subcategoryName)
// //             : [...prevSelection, subcategoryName];
            
// //           // Якщо нічого не вибрано, автоматично вибираємо "Всі оголошення"
// //           if (newSelection.length === 0) {
// //             newSelection = ["Всі оголошення"];
// //           }
// //         }
        
// //         return { ...prev, [categoryName]: newSelection };
// //       } else {
// //         // Логіка для радіокнопок залишається незмінною
// //         return { ...prev, [categoryName]: subcategoryName };
// //       }
// //     });
// //   };

// //   const handleSizeToggle = (type, size) => {
// //     setSelectedSizes(prev => {
// //       const current = prev[type];
// //       const newSelection = current.includes(size)
// //         ? current.filter(s => s !== size)
// //         : [...current, size];
// //       return { ...prev, [type]: newSelection };
// //     });
// //   };

// //   // Додаємо стан для ціни
// //   const [isPriceOpen, setIsPriceOpen] = useState(false);
// //   const [priceRange, setPriceRange] = useState({
// //     min: 0,
// //     max: 50000
// //   });
// //   const [inputPrice, setInputPrice] = useState({
// //     min: 0,
// //     max: 50000
// //   });

// //   // Обробники для ціни
// //   const handlePriceChange = (e, type) => {
// //     const value = parseInt(e.target.value);
// //     setInputPrice(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
// //   };

// //   const handlePriceBlur = (type) => {
// //     let value = inputPrice[type];
    
// //     // Валідація значень
// //     if (isNaN(value)) {
// //       value = type === 'min' ? 0 : 50000;
// //     }
    
// //     if (type === 'min' && value < 0) value = 0;
// //     if (type === 'max' && value > 50000) value = 50000;
// //     if (type === 'min' && value > priceRange.max) value = priceRange.max;
// //     if (type === 'max' && value < priceRange.min) value = priceRange.min;
    
// //     setInputPrice(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
    
// //     setPriceRange(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
// //   };

// //   const handleSliderChange = (e, type) => {
// //     const value = parseInt(e.target.value);
    
// //     // Запобігаємо перетину повзунків
// //     if (type === 'min' && value >= priceRange.max) {
// //       setPriceRange(prev => ({
// //         min: prev.max - 1,
// //         max: prev.max
// //       }));
// //       setInputPrice(prev => ({
// //         min: prev.max - 1,
// //         max: prev.max
// //       }));
// //       return;
// //     }
    
// //     if (type === 'max' && value <= priceRange.min) {
// //       setPriceRange(prev => ({
// //         min: prev.min,
// //         max: prev.min + 1
// //       }));
// //       setInputPrice(prev => ({
// //         min: prev.min,
// //         max: prev.min + 1
// //       }));
// //       return;
// //     }
    
// //     setPriceRange(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
// //     setInputPrice(prev => ({
// //       ...prev,
// //       [type]: value
// //     }));
// //   };
// //   const resetPrice = () => {
// //     setPriceRange({ min: 0, max: 50000 });
// //     setInputPrice({ min: 0, max: 50000 });
// //   };

// //   const applyPrice = () => {
// //     // Тут можна додати логіку застосування фільтра
// //     console.log("Applied price range:", priceRange);
// //     // Наприклад, викликати функцію фільтрації з батьківського компоненту
// //   };

// //   const [selectedCategory, setSelectedCategory] = useState(null);
  
// //   // Отримуємо категорії для обраної статі
// //   const { data: categories, isLoading, error } = useQuery({
// //     queryKey: ['categories', sex],
// //     queryFn: () => fetchCategoriesBySex(sex),
// //   });

// //   if (isLoading) return <div className="loading">Завантаження категорій...</div>;
// //   if (error) return <div className="error">Помилка: {error.message}</div>;

// //   return (
// //     <div className="filter-block">
// //           <div className="filter-title">Для {getSexLabel(sex)}</div>
// //           {categories.map(category => (
// //               console.log(category.name, category.subcategories),
// //             <div className="category" key={category.name}>
// //             <div className="category-header" onClick={() => toggleCategory(category.name)}>
// //               {category.name}
// //               <span className="toggle-icon">{openCategories[category.name] ? '-' : '+'}</span>
// //             </div>
// //           {openCategories[category.name] && (
// //             <div className="subcategory-list">
// //               {category.type === 'radio' && Array.isArray(category.subcategories) && category.subcategories.map(sub => (
// //                 <label key={sub}>
// //                   <input
// //                     type="radio"
// //                     name={category.name}
// //                     checked={selectedSubcategories[category.name] === sub}
// //                     onChange={() => handleSubcategoryChange(category.name, sub, false)}
// //                   />
// //                   {sub}
// //                 </label>
// //               ))}
// //               {category.type === 'checkbox' && Array.isArray(category.subcategories) && category.subcategories.map(sub => (
// //                 <label key={sub}>
// //                   <input
// //                     type="checkbox"
// //                     name={category.name}
// //                     checked={(selectedSubcategories[category.name] || []).includes(sub)}
// //                     onChange={() => handleSubcategoryChange(category.name, sub, true)}
// //                   />
// //                   {sub}
// //                 </label>
// //               ))}
// //               {category.type === 'size' && (
// //   <>
// //     {/* <div>Одяг:</div> */}
// //     <div className="size-buttons">
// //       {category.clothingSizes.map(size => (
// //         <button
// //           key={size}
// //           className={`size-button ${selectedSizes.clothing.includes(size) ? 'selected' : ''}`}
// //           onClick={() => handleSizeToggle('clothing', size)}
// //         >
// //           {size}
// //         </button>
// //       ))}
// //     </div>
// //     {/* <div>Взуття:</div> */}
// //     <div className="size-buttons">
// //       {category.shoeSizes.map(size => (
// //         <button
// //           key={size}
// //           className={`size-button ${selectedSizes.footwear.includes(size) ? 'selected' : ''}`}
// //           onClick={() => handleSizeToggle('footwear', size)}
// //         >
// //           {size}
// //         </button>
// //       ))}
// //     </div>
// //   </>
// // )}

// //             </div>
// //           )}
// //         </div>
// //           ))}
// //       {/* Блок фільтрації за ціною */}
// //       <div className="category">
// //         <div className="category-header" onClick={() => setIsPriceOpen(!isPriceOpen)}>
// //           Ціна
// //           <span className="toggle-icon">{isPriceOpen ? '-' : '+'}</span>
// //         </div>
        
// //         {isPriceOpen && (
// //           <div className="subcategory-list price-filter">
// //             <div className="price-slider-container">
// //   <div className="price-slider-line">
// //     <input
// //       type="range"
// //       min="0"
// //       max="50000"
// //       value={priceRange.min}
// //       onChange={(e) => handleSliderChange(e, 'min')}
// //       className="price-slider min-slider"
// //     />
// //     <input
// //       type="range"
// //       min="0"
// //       max="50000"
// //       value={priceRange.max}
// //       onChange={(e) => handleSliderChange(e, 'max')}
// //       className="price-slider max-slider"
// //     />
// //   </div>
// // </div>
            
// //             <div className="price-inputs">
// //               <div className="price-input-group">
// //                 <label>від</label>
// //                 <input
// //                   type="number"
// //                   value={inputPrice.min}
// //                   onChange={(e) => handlePriceChange(e, 'min')}
// //                   onBlur={() => handlePriceBlur('min')}
// //                   min="0"
// //                   max={priceRange.max}
// //                 />
// //               </div>
              
// //               <div className="price-input-group">
// //                 <label>до</label>
// //                 <input
// //                   type="number"
// //                   value={inputPrice.max}
// //                   onChange={(e) => handlePriceChange(e, 'max')}
// //                   onBlur={() => handlePriceBlur('max')}
// //                   min={priceRange.min}
// //                   max="50000"
// //                 />
// //               </div>
// //             </div>
            
// //             <div className="price-buttons">
// //               <button onClick={resetPrice} className="price-button reset">
// //                 Скинути
// //               </button>
// //               <button onClick={applyPrice} className="price-button apply">
// //                 Застосувати
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // Допоміжна функція для відображення мітки статі
// function getSexLabel(sex) {
//   switch (sex) {
//     case 'Female': return 'жінок';
//     case 'Male': return 'чоловіків';
//     case 'Child': return 'дітей';
//     default: return '';
//   }
// }



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

  // Перемикаємо розгортання категорії
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Обробник вибору категорії
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  // Обробник зміни ціни
  const handlePriceChange = (type, value) => {
    const newPriceRange = {
      ...priceRange,
      [type]: parseInt(value) || 0
    };
    setPriceRange(newPriceRange);
    if (onPriceChange) {
      onPriceChange(newPriceRange);
    }
  };

    const handlePriceBlur = (type) => {
    let value = inputPrice[type];
    
    // Валідація значень
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
    
    // Запобігаємо перетину повзунків
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
    // Тут можна додати логіку застосування фільтра
    console.log("Applied price range:", priceRange);
    // Наприклад, викликати функцію фільтрації з батьківського компоненту
  };

  // Рекурсивна функція для відображення категорій
  // const renderCategories = (categoriesToRender, level = 0) => {
  //   return categoriesToRender.map(category => (
  //     <div key={category.id} className="category-item" style={{ marginLeft: `${level * 15}px` }}>
  //       <label className="category-label">
  //         <input
  //           type="radio"
  //           name="category"
  //           checked={selectedCategoryId === category.id}
  //           onChange={() => handleCategorySelect(category.id)}
  //           className="category-radio"
  //         />
  //         <span className="category-name">{category.name}</span>
  //         {category.children && category.children.length > 0 && (
  //           <button 
  //             onClick={(e) => {
  //               e.preventDefault();
  //               toggleCategory(category.id);
  //             }}
  //             className="toggle-children"
  //           >
  //             {expandedCategories[category.id] ? '−' : '+'}
  //           </button>
  //         )}
  //       </label>
        
  //       {expandedCategories[category.id] && category.children && (
  //         <div className="children-container">
  //           {renderCategories(category.children, level + 1)}
  //         </div>
  //       )}
  //     </div>
  //   ));
  // };

  // if (loading) return <div className="loading">Завантаження категорій...</div>;
  // if (error) return <div className="error">Помилка: {error}</div>;

  // return (
  //   <div className="filter-block">
  //     <div className="filter-title">Для {getSexLabel(sex)}</div>
      
  //     <div className="filter-section">
  //       <h3 className="section-title">Категорії</h3>
  //       <div className="categories-list">
  //         {renderCategories(getFilteredCategories())}
  //       </div>
  //     </div>
      
  //     <div className="filter-section">
  //       <h3 className="section-title">Ціна</h3>
  //       <div className="price-range">
  //         <div className="price-inputs">
  //           <input
  //             type="number"
  //             value={priceRange.min}
  //             onChange={(e) => handlePriceChange('min', e.target.value)}
  //             min="0"
  //             max={priceRange.max}
  //             className="price-input"
  //             placeholder="Від"
  //           />
  //           <span className="price-separator">-</span>
  //           <input
  //             type="number"
  //             value={priceRange.max}
  //             onChange={(e) => handlePriceChange('max', e.target.value)}
  //             min={priceRange.min}
  //             max="50000"
  //             className="price-input"
  //             placeholder="До"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  
  const renderCategories = (categoriesToRender, level = 0) => {
    return categoriesToRender.map(category => (
      <div key={category.id} className="category">
        <div className="category-header" onClick={() => toggleCategory(category.id)}>
          {category.name}
          {category.children && category.children.length > 0 && (
            <span className="toggle-icon">
              {expandedCategories[category.id] ? '-' : '+'}
            </span>
          )}
        </div>
  
        {expandedCategories[category.id] && category.children && (
          <div className="subcategory-list">
            <label>
              <input
                type="radio"
                name="category"
                checked={selectedCategoryId === category.id}
                onChange={() => handleCategorySelect(category.id)}
              />
              {category.name}
            </label>
  
            <div style={{ paddingLeft: `${level * 15}px` }}>
              {renderCategories(category.children, level + 1)}
            </div>
          </div>
        )}
  
        {!category.children?.length && (
          <div className="subcategory-list">
            <label>
              <input
                type="radio"
                name="category"
                checked={selectedCategoryId === category.id}
                onChange={() => handleCategorySelect(category.id)}
              />
              {category.name}
            </label>
          </div>
        )}
      </div>
    ));
  };
  
  if (loading) return <div className="loading">Завантаження категорій...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;
  
  return (
    <div className="filter-block">
      <div className="filter-title">Для {getSexLabel(sex)}</div>
  
      <div className="categories-list">
        {renderCategories(getFilteredCategories())}
      </div>
  
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


// Допоміжна функція для відображення мітки статі
function getSexLabel(sex) {
  switch (sex) {
    case 'Female': return 'жінок';
    case 'Male': return 'чоловіків';
    case 'Child': return 'дітей';
    default: return '';
  }
}