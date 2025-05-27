import React from "react";
import ProductCard from "./ProductCard";
import "../styles/product-list.css";

const ProductList = ({ products }) => {
  return (
    <div className="products-container">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          price={product.price}
          title={product.title}
          imageUrl={product.imageUrl}
        />
      ))}
    </div>
  );
};

export default ProductList;

// import React from "react";
// import ProductCard from "./ProductCard";
// import "../styles/product-list.css";
// import defaultDressImg from "../images/main-page/v30_108.png"; // Імпортуємо зображення за замовчуванням

// const ProductList = ({ products }) => {
//   return (
//     <div className="product-container">
//       {products && products.length > 0 ? (
//         products.map((product) => (
//           <ProductCard
//             key={product.id} // Використовує `id` з об'єкта `product`
//             price={product.price}
//             title={product.title}
//             imageUrl={product.imageUrl || defaultDressImg} // Використовує `imageUrl` з об'єкта, або `defaultDressImg` як запасний
//           />
//         ))
//       ) : (
//         <p>Наразі оголошень не знайдено.</p>
//       )}
//     </div>
//   );
// };

// export default ProductList;
