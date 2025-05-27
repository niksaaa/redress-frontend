import React from "react";
import "../styles/main-page.css";
import ProductList from "../components/ProductList";
import AuctionList from "../components/AuctionList";
import { useNavigate } from "react-router-dom";
import dressImg from "../images/main-page/v30_108.png";

export default function MainPage() {
  const products = [
    {
      price: "15000",
      title: "Весільна сукня",
      imageUrl: dressImg,
    },
    {
      price: "12000",
      title: "Сукня вечірня",
      imageUrl: dressImg,
    },
    {
      price: "10000",
      title: "Костюм чоловічий",
      imageUrl: dressImg,
    },
    {
      price: "18000",
      title: "Сукня для гостей",
      imageUrl: dressImg,
    },
  ];
  const auctions = [
    {
      price: "780",
      description: "Жовта сукня з візер...",
      imageSrc: dressImg,
      likeIcon: "../images/like.png",
    },
    {
      price: "950",
      description: "Сині джинси з потертостями",
      imageSrc: dressImg,
      likeIcon: "../images/like.png",
    },
    {
      price: "1150",
      description: "Червоний пуховик для зими",
      imageSrc: dressImg,
      likeIcon: "../images/like.png",
    },
    {
      price: "650",
      description: "Кросівки на платформі",
      imageSrc: dressImg,
      likeIcon: "../images/like.png",
    },
    {
      price: "650",
      description: "Кросівки на платформі",
      imageSrc: dressImg,
      likeIcon: "../images/like.png",
    },
  ];

  const navigate = useNavigate();

  const handleCategoryClick = (sex) => {
    navigate(`/catalog-page/${sex}`);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
        rel="stylesheet"
      />
      <div className="gallery-wrapper">
        <div className="gallery">
          <div
            className="image-block image-woman"
            onClick={() => handleCategoryClick("female")}
          >
            <span className="label">Вона</span>
          </div>
          <div
            className="image-block image-man"
            onClick={() => handleCategoryClick("male")}
          >
            <span className="label">Він</span>
          </div>
          <div
            className="image-block image-kids"
            onClick={() => handleCategoryClick("kids")}
          >
            <span className="label">Діти</span>
          </div>
        </div>
      </div>
      <div>
        <span className="v30_33">ТОП ПРОПОЗИЦІЇ</span>
        <div className="name"></div>
        <div className="product-list-wrapper">
          <ProductList products={products} />
        </div>
      </div>
      <span className="v30_106">Час аукціону спливає, не зволікай!</span>
      <div>
        <AuctionList auctions={auctions} />
      </div>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import "../styles/main-page.css";
// import ProductList from "../components/ProductList";
// import AuctionList from "../components/AuctionList"; // Цей компонент буде використовувати ListingDto
// import { useNavigate } from "react-router-dom";
// import dressImg from "../images/main-page/v30_108.png"; // Зображення за замовчуванням

// export default function MainPage() {
//   const navigate = useNavigate();

//   // --- ДЕМО-ДАНІ (тепер всі імітують ListingDto) ---
//   const initialAllListings = [
//     // Звичайні товари
//     {
//       id: "demoprodid1",
//       title: "Весільна сукня",
//       price: 15000,
//       isAuction: false,
//       imageUrl: dressImg,
//     },
//     {
//       id: "demoprodid2",
//       title: "Сукня вечірня",
//       price: 12000,
//       isAuction: false,
//       imageUrl: dressImg,
//     },
//     {
//       id: "demoprodid3",
//       title: "Костюм чоловічий",
//       price: 10000,
//       isAuction: false,
//       imageUrl: dressImg,
//     },
//     {
//       id: "demoprodid4",
//       title: "Сукня для гостей",
//       price: 18000,
//       isAuction: false,
//       imageUrl: dressImg,
//     },

//     // Аукціонні товари (використовуємо поля ListingDto)
//     // `price` тут - це `Price` з ListingDto, яке для аукціону може бути стартовою/поточною ціною.
//     {
//       id: "auctionid1",
//       title: "Жовта сукня з візер...",
//       price: 780,
//       isAuction: true,
//       imageUrl: dressImg,
//     },
//     {
//       id: "auctionid2",
//       title: "Сині джинси з потертостями",
//       price: 950,
//       isAuction: true,
//       imageUrl: dressImg,
//     },
//     {
//       id: "auctionid3",
//       title: "Червоний пуховик для зими",
//       price: 1150,
//       isAuction: true,
//       imageUrl: dressImg,
//     },
//     {
//       id: "auctionid4",
//       title: "Кросівки на платформі",
//       price: 650,
//       isAuction: true,
//       imageUrl: dressImg,
//     },
//     {
//       id: "auctionid5",
//       title: "Елегантний годинник",
//       price: 2500,
//       isAuction: true,
//       imageUrl: dressImg,
//     },
//   ];
//   // --- КІНЕЦЬ ДЕМО-ДАНІ ---

//   // Стан для всіх оголошень (з яких будемо фільтрувати продукти та аукціони)
//   const [allListings, setAllListings] = useState(initialAllListings);

//   // Прапорець для керування API-викликами
//   const ENABLE_API_CALLS = false; // <<< Змініть на `true`, коли бекенд буде готовий

//   // Базовий URL API
//   const API_BASE_URL = "https://localhost:7000"; // Замініть на реальний URL!

//   // Функція для отримання всіх оголошень з бекенду за статтю
//   // (Наприклад, GetListingsBySexQuery в ListingController)
//   const fetchAllListings = async (sex = "Female", page = 1, pageSize = 28) => {
//     if (!ENABLE_API_CALLS) {
//       console.log("API-виклики вимкнені. Використовуються демо-дані.");
//       return;
//     }

//     try {
//       // Викликаємо GetBySex в ListingController. Він поверне список ListingDto.
//       const response = await fetch(
//         `${API_BASE_URL}/api/Listing?sex=${sex}&page=${page}&pageSize=${pageSize}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP помилка! статус: ${response.status}`);
//       }

//       const data = await response.json();
//       setAllListings(data.items); // Встановлюємо всі отримані ListingDto
//     } catch (error) {
//       console.error("Помилка під час отримання оголошень:", error);
//       setAllListings(initialAllListings); // У випадку помилки повертаємося до демо-даних
//     }
//   };

//   useEffect(() => {
//     if (ENABLE_API_CALLS) {
//       // Завантажуємо оголошення. Якщо "ТОП ПРОПОЗИЦІЇ" має бути щось конкретне (наприклад, жіночі),
//       // то фільтруємо за статтю. Якщо це просто випадкові "топові", то можна створити окремий метод на бекенді
//       // або витягувати з усіх оголошень перші N.
//       fetchAllListings("Female"); // Для прикладу, завантажуємо "жіночі" оголошення
//     } else {
//       setAllListings(initialAllListings); // Використовуємо демо-дані, якщо API вимкнено
//     }
//   }, [ENABLE_API_CALLS]); // Залежність від прапорця, щоб ефект реагував на його зміну

//   // Фільтруємо отримані оголошення на звичайні продукти та аукціони
//   // Обидва списки будуть складатися з об'єктів ListingDto
//   const products = allListings.filter((listing) => !listing.isAuction);
//   const auctions = allListings.filter((listing) => listing.isAuction);

//   const handleCategoryClick = (sex) => {
//     // Навігація до сторінки каталогу
//     // На `/catalog-page/${sex}` вам також потрібно буде вирішити, як отримувати дані
//     // (через API або демо), і відображати їх.
//     navigate(`/catalog-page/${sex}`);
//   };

//   return (
//     <>
//       <link
//         href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
//         rel="stylesheet"
//       />
//       <div className="gallery-wrapper">
//         <div className="gallery">
//           <div
//             className="image-block image-woman"
//             onClick={() => handleCategoryClick("Female")}
//           >
//             <span className="label">Вона</span>
//           </div>
//           <div
//             className="image-block image-man"
//             onClick={() => handleCategoryClick("Male")}
//           >
//             <span className="label">Він</span>
//           </div>
//           <div
//             className="image-block image-kids"
//             onClick={() => handleCategoryClick("Child")}
//           >
//             <span className="label">Діти</span>
//           </div>
//         </div>
//       </div>
//       <div>
//         <span className="v30_33">ТОП ПРОПОЗИЦІЇ</span>
//         <div className="name"></div>
//         <div className="product-list-wrapper">
//           {/* ProductList отримує звичайні товари (ListingDto) */}
//           <ProductList products={products} />
//         </div>
//       </div>
//       <span className="v30_106">Час аукціону спливає, не зволікай!</span>
//       <div>
//         {/* AuctionList отримує аукціонні товари (які також є ListingDto) */}
//         <AuctionList auctions={auctions} />
//       </div>
//     </>
//   );
// }
