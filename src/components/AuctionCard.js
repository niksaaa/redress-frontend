import React from "react";
import "../styles/auction-card.css";

const AuctionCard = ({ price, description, imageSrc }) => {
  return (
    <div className="auction-card">
      <div className="v46_164">
        <div className="auction-card__header">
          <span className="auction-label-card">Аукціон</span>
        </div>
        <div
          className="auction-card__image"
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>
        <div className="auction-card__details">
          <span className="auction-card__price">{price} грн</span>
          <span className="auction-card__description">{description}</span>
        </div>
        <div className="v46_121_like">
          <div className="v46_120_like"></div>
          <div className="v46_118_like"></div>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;

// import React from "react";
// import "../styles/auction-card.css";

// const AuctionCard = ({ price, description, imageUrl }) => {
//   console.log("imageSrc in AuctionCard:", imageUrl); // Що тут?
//   return (
//     <div className="auction-card">
//       <div className="v46_164">
//         <div className="auction-card__header">
//           <span className="auction-label-card">Аукціон</span>
//         </div>
//         <div
//           className="auction-card__image"
//           style={{ backgroundImage: `url(${imageUrl})` }}
//         ></div>
//         <div className="auction-card__details">
//           <span className="auction-card__price">{price} грн</span>
//           <span className="auction-card__description">{description}</span>
//         </div>
//         <div className="v46_121_like">
//           <div className="v46_120_like"></div>
//           <div className="v46_118_like"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuctionCard;
