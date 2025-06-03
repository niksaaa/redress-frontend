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
import emailjs from 'emailjs-com';

const OrderPage = () => {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [dealId, setDealId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [listing, setListing] = useState(null);
  const [seller, setSeller] = useState(null);
  const [buyerPhone, setBuyerPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState(null);
  const [recipientData, setRecipientData] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    phone: ''
  });

  // Ініціалізація EmailJS
  useEffect(() => {
    emailjs.init("K-Gb4s6NTk679_FAO"); // Замініть на ваш User ID з EmailJS
  }, []);

  // Функція для відправки email продавцю
  const sendEmailToSeller = async () => {
    try {
      const sellerProfile = JSON.parse(localStorage.getItem('currentSellerProfile'));
      const listingData = JSON.parse(localStorage.getItem('currentOrderListing'));
      
      const templateParams = {
        to_email: seller?.user?.email || sellerProfile?.email,
        to_name: seller?.user?.username || sellerProfile?.username,
        product_name: listing?.title || listingData?.title,
        product_price: listing?.price || listingData?.price,
        buyer_name: `${recipientData.lastName} ${recipientData.firstName} ${recipientData.middleName}`,
        buyer_phone: recipientData.phone || buyerPhone,
        delivery_method: deliveryOption,
        from_name: "REDRESS"
      };

      await emailjs.send(
        'service_lplxrjg', // Service ID
        'template_a7zk9w3', // ID шаблону для продавця
        templateParams
      );
    } catch (error) {
      console.error('Failed to send email to seller:', error);
    }
  };

  // Функція для відправки email покупцю
  const sendEmailToBuyer = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      const listingData = JSON.parse(localStorage.getItem('currentOrderListing'));
      
      const templateParams = {
        to_email: currentUser?.email,
        to_name: currentUser?.username,
        product_name: listing?.title || listingData?.title,
        product_price: listing?.price || listingData?.price,
        seller_name: seller?.user?.username,
        from_name: "REDRESS"
      };

      await emailjs.send(
        'service_lplxrjg', // Замініть на ваш Service ID
        'template_7izrmxa', // Замініть на ID шаблону для покупця
        templateParams
      );
    } catch (error) {
      console.error('Failed to send email to buyer:', error);
    }
  };

  // Function called when the "Сплатити" button is clicked
  const handlePayClick = () => {
    console.log("Payment initiated!");
    setShowFeedbackModal(true); // Show the feedback modal
  };

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

      // Отримуємо profileId з localStorage
      const buyerProfileId = localStorage.getItem('profileId');
      if (!buyerProfileId) {
        throw new Error('Не вдалося отримати ID профілю покупця');
      }
      
      const dealData = {
        Status: 2, // Completed
        ListingType: listing.isAuction ? 1 : 0, // Auction : Sale
        Price: listing.price,
        ListingId: listing.id,
        ProfileId: buyerProfileId // Використовуємо profileId покупця
      };

      // Викликаємо API для створення угоди
      const createdDealId = await createDeal(dealData);
      setDealId(createdDealId);

      // Відправка email після успішного створення угоди
      await Promise.all([
        sendEmailToSeller(),
        sendEmailToBuyer()
      ]);
      
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
        rating: rating,
        comment: comment,
        dealId: dealId
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

  const handleDeliveryChange = (option) => {
    setDeliveryOption(option);
  };
  
  const handleRecipientDataChange = (data) => {
    setRecipientData(data);
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

      <DeliveryOptions onDeliveryChange={handleDeliveryChange} />
      <RecipientInfo phoneNumber={buyerPhone} onRecipientDataChange={handleRecipientDataChange} />
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
