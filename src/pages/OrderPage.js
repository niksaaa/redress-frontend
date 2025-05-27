import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/order-page.css";
import DeliveryOptions from "../components/DeliveryOptions";
import RecipientInfo from "../components/RecipientInfo";
import ProductSellerInfo from "../components/ProductSellerInfo";
import OrderSummary from "../components/OrderSummary";
import FeedbackModal from "../components/FeedbackModal"; // The feedback modal component
import { fetchProfileDetails, fetchUserDetails } from "../api/listing";
import { fetchCurrentUserProfile } from "../api/profile";
import { createDeal, createFeedback } from "../api/deal";

const OrderPage = () => {
  // State to control the visibility of the feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [dealId, setDealId] = useState(null);
  // Initialize the navigate function for programmatic navigation
  const navigate = useNavigate();

  // Function called when the "Сплатити" button is clicked
  const handlePayClick = () => {
    console.log("Payment initiated!");
    setShowFeedbackModal(true); // Show the feedback modal
  };

  const location = useLocation();
  const [listing, setListing] = useState(null);
  const [seller, setSeller] = useState(null);
  const [buyerPhone, setBuyerPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); // Для індикатора завантаження

  useEffect(() => {
    const loadData = async () => {
      try {
        const listingData = location.state?.listing || 
          JSON.parse(localStorage.getItem('currentOrderListing'));
        
        if (!listingData) {
          navigate('/');
          return;
        }

        setListing(listingData);

        if (listingData.profileId) {
          const profile = await fetchProfileDetails(listingData.profileId);
          const user = await fetchUserDetails(profile.userId);
          setSeller({ profile, user });
        }

        const userProfile = await fetchCurrentUserProfile();
        if (userProfile && userProfile.userId) {
          const buyerUser = await fetchUserDetails(userProfile.userId);
          if (buyerUser && buyerUser.phoneNumber) {
            setBuyerPhone(buyerUser.phoneNumber);
          } else {
            setBuyerPhone('Номер не вказаний');
          }
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location, navigate]);

  // Функція для створення угоди
  const createDealHandler = async () => {
    if (!listing) return;

    try {
      setIsProcessingPayment(true);
      
      const dealData = {
        Status: 'Completed', // або 'Pending' залежно від вашої логіки
        ListingType: listing.isAuction ? 'Auction' : 'Sale',
        Price: listing.price,
        ListingId: listing.id,
        ProfileId: listing.profileId
      };

      // Викликаємо API для створення угоди
      const createdDealId = await createDeal(dealData);
      setDealId(createdDealId);
      
      // Показуємо модалку для відгуку після успішного створення угоди
      setShowFeedbackModal(true);
    } catch (error) {
      console.error('Помилка при створенні угоди:', error);
      alert('Сталася помилка при оформленні замовлення. Спробуйте ще раз.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Функція для відправки відгуку
  const handleSubmitFeedback = async ({ rating, comment }) => {
    if (!dealId) {
      console.error('ID угоди відсутній');
      return;
    }

    try {
      const feedbackData = {
        Rating: rating,
        Comment: comment,
        DealId: dealId
      };

      await createFeedback(feedbackData);
      alert('Дякуємо за ваш відгук!');
      navigate("/main-page");
    } catch (error) {
      console.error('Помилка при відправці відгуку:', error);
      alert('Сталася помилка при відправці відгуку. Спробуйте ще раз.');
    }
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
    navigate("/main-page");
  };

  if (loading) return <div className="loading">Завантаження даних...</div>;
  if (error) return <div className="error">Помилка: {error}</div>;
  if (!listing) return <div className="no-data">Дані товару не знайдені</div>;

  return (
    <div className="order-container">
      <div className="order-info">
      <ProductSellerInfo
        productName={listing.title}
        price={`${listing.price} грн`}
          sellerName={seller?.user?.username || 'Продавець'}
          sellerAvatar={seller?.profile?.profileImage?.url}
        productImage={listing.images?.[0]?.url}
      />

      <DeliveryOptions />
      <RecipientInfo phoneNumber={buyerPhone} />
      </div>

      <OrderSummary
        productPrice={`${listing.price} грн`}
        deliveryPrice="За тарифами перевізника"
        totalPrice={`${listing.price} грн`}
        onPayClick={createDealHandler}
        isProcessing={isProcessingPayment}
      />

      {/* Conditionally render the FeedbackModal based on showFeedbackModal state */}
      {showFeedbackModal && (
        <FeedbackModal
          onClose={handleCloseFeedbackModal} // Pass function to close modal
          onSubmit={handleSubmitFeedback} // Pass function to handle submitted feedback
        />
      )}
    </div>
  );
};

export default OrderPage;
