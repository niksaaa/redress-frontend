import React from "react";
import AuctionCard from "./AuctionCard";
import "../styles/auction-list.css";

const AuctionList = ({ auctions }) => {
  return (
    <div className="auction-list">
      {auctions.map((auction, index) => (
        <AuctionCard
          key={index}
          price={auction.price}
          description={auction.description}
          imageSrc={auction.imageSrc}
        />
      ))}
    </div>
  );
};

export default AuctionList;

// import React from "react";
// import AuctionCard from "./AuctionCard";
// import "../styles/auction-list.css";
// import defaultDressImg from "../images/main-page/v30_108.png";

// const AuctionList = ({ auctions }) => {
//   return (
//     <div className="auction-list">
//       {auctions && auctions.length > 0 ? (
//         auctions.map((auctionItem) => {
//           console.log("auctionItem.imageUrl:", auctionItem.imageUrl); // Що тут?
//           return (
//             <AuctionCard
//               key={auctionItem.id}
//               price={auctionItem.price}
//               description={auctionItem.title}
//               imageUrl={auctionItem.imageUrl || defaultDressImg}
//             />
//           );
//         })
//       ) : (
//         <p>Наразі активних аукціонів не знайдено.</p>
//       )}
//     </div>
//   );
// };

// export default AuctionList;
