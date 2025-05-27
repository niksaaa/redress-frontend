// import React from "react";
// import CatalogCard from "./CatalogCard";
// import "../styles/catalog-list.css";

// const CatalogList = ({ items }) => {
//   // return (
//   //   <div className="items-grid">
//   //     {items.map((item, index) => (
//   //       <CatalogCard
//   //         key={index}
//   //         price={item.price}
//   //         title={item.title}
//   //         imageUrl={item.imageUrl}
//   //         isAuction={item.isAuction} // Додайте це поле в ваші тестові дані
//   //       />
//   //     ))}
//   //   </div>
//   // );
// };

// export default CatalogList;


import React, { useState, useEffect } from "react";
import CatalogCard from "./CatalogCard";
import "../styles/catalog-list.css";
// import { fetchListingImages } from "../api/listing";

const CatalogList = ({ items }) => {
  // const [itemsWithImages, setItemsWithImages] = useState([]);
  // const [isLoadingImages, setIsLoadingImages] = useState(true);

  // useEffect(() => {
  //   const loadImages = async () => {
  //     setIsLoadingImages(true);
  //     try {
  //       const itemsWithImages = await Promise.all(
  //         items.map(async (item) => {
  //           try {
  //             const images = await fetchListingImages(item.id);
  //             return {
  //               ...item,
  //               imageUrl: images[0]?.url || '../images/main-page/v30_108.png'
  //             };
  //           } catch (error) {
  //             console.error(`Error loading images for listing ${item.id}:`, error);
  //             return {
  //               ...item,
  //               imageUrl: '../images/main-page/v30_108.png'
  //             };
  //           }
  //         })
  //       );
  //       setItemsWithImages(itemsWithImages);
  //     } finally {
  //       setIsLoadingImages(false);
  //     }
  //   };

  //   if (items && items.length > 0) {
  //     loadImages();
  //   } else {
  //     setIsLoadingImages(false);
  //   }
  // }, [items]);

  // if (isLoadingImages) {
  //   return <div className="loading">Завантаження зображень...</div>;
  // }

  // if (!items || items.length === 0) {
  //   return <div className="no-items">Оголошення не знайдено</div>;
  // }

  return (
    <div className="items-grid">
      {items.map((item) => (
        <CatalogCard
          key={item.id}
          id={item.id}
          price={item.price}
          title={item.title}
          imageUrl={item.url}
          isAuction={item.isAuction}
        />
      ))}
    </div>
  );
};

export default CatalogList;