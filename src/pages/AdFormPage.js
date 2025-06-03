import "../styles/ad-form.css";
import CategoryModal from "../components/CategoryModal";
import AdType from "../components/AdType";
import React, { useState, useEffect } from "react";
import { fetchCategoryTree } from "../api/category";
import { createListing, startAuction, uploadListingImage } from "../api/createListing";
import { useNavigate } from "react-router-dom";

export default function AdFormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [adType, setAdType] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [minBid, setMinBid] = useState("");
  const [selectedCategoryPath, setSelectedCategoryPath] = useState([]);
  const [categoryTree, setCategoryTree] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const navigate = useNavigate();

  // Отримання даних користувача з localStorage
  useEffect(() => {
    const profileData = JSON.parse(localStorage.getItem('profileEditData'));
    if (profileData?.user?.latitude && profileData?.user?.longitude) {
      setLocation({
        latitude: profileData.user.latitude,
        longitude: profileData.user.longitude
      });
    }
  }, []);

  // Отримання дерева категорій
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const tree = await fetchCategoryTree();
        console.log("categoryTree", tree);
        setCategoryTree(tree);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setIsModalOpen(true);
    console.log(`Selected section: ${section}, looking for sex:`, 
      section === "Вона" ? 1 : 
      section === "Він" ? 0 : 
      2);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectCategory = (path, categoryId) => {
    // setSelectedSize(""); // Скидаємо вибраний розмір при зміні категорії
    setSelectedCategoryPath(path);
    setSelectedCategoryId(categoryId);
    setIsModalOpen(false);
  };

  // const [selectedBrand, setSelectedBrand] = useState("");

  const getSectionCategories = () => {
    if (!selectedSection) return [];
    
    // Конвертуємо назву розділу у відповідне числове значення для sex
  const sexValue = selectedSection === "Вона" ? 1 : 
  selectedSection === "Він" ? 0 : 
  2; // Для "Діти"
    
    return categoryTree.filter(cat => cat.sex === sexValue);
  };

  // Завантаження зображень
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    setImages(prevImages => [...prevImages, ...files]);
  };

  // Створення оголошення
  const handleSubmit = async () => {
    if (!selectedCategoryId) {
      alert("Будь ласка, виберіть категорію");
      return;
    }

    const listingData = {
      title,
      description,
      price: parseFloat(price),
      categoryId: selectedCategoryId,
      latitude: location.latitude,
      longitude: location.longitude
    };

    try {
    // 1. Створення оголошення
    console.log("Creating listing...", listingData);
    const listingId = await createListing(listingData); // Отримуємо безпосередньо ID
    console.log("Created listing with ID:", listingId);
    
    // Невелика пауза
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Завантаження фото (послідовно)
    if (images.length > 0) {
      console.log("Uploading images...");
      for (const [index, image] of images.entries()) {
        console.log(`Uploading image ${index + 1}/${images.length} for listing ${listingId}`);
        await uploadListingImage(image, listingId);
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    alert("Оголошення успішно створено!");
    // Перенаправлення на сторінку користувача
    navigate("/profile");
  } catch (error) {
    console.error("Помилка при створенні оголошення:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    alert(`Помилка при створенні оголошення: ${error.message}`);
  }
  };

  // Обробник для аукціонного оголошення з додаванням фото
const handleAuctionSubmit = async () => {
  if (!selectedCategoryId) {
    alert("Будь ласка, виберіть категорію");
    return;
  }

  const listingData = {
    title,
    description,
    price: parseFloat(price),
    categoryId: selectedCategoryId,
    latitude: location.latitude,
    longitude: location.longitude
  };

  try {
    // 1. Створення оголошення
    const listingId = await createListing(listingData);
    console.log("Оголошення створено з ID:", listingId);

    // Невелика пауза
    await new Promise(resolve => setTimeout(resolve, 500));

    // 2. Завантаження фото (якщо є)
    if (images.length > 0) {
      console.log("Завантаження фото...");
      for (const [index, image] of images.entries()) {
        console.log(`Фото ${index + 1}/${images.length}`);
        await uploadListingImage(image, listingId);
        // Невелика пауза, щоб уникнути перевантаження сервера
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    // Невелика пауза
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 3. Створення аукціону
    const auctionData = {
      endAt: new Date(endDate).toISOString(),
      startPrice: parseFloat(price),
      minStep: parseFloat(minBid),
      listingId
    };
    console.log("Створення аукціону з даними:", auctionData);
    await startAuction(listingId, auctionData);

    alert("Аукціонне оголошення успішно створено!");
    navigate("/profile"); // перенаправлення після успіху
  } catch (error) {
    console.error("Помилка при створенні аукціонного оголошення:", {
      message: error.message,
      response: error.response?.data,
      stack: error.stack
    });
    alert("Сталася помилка при створенні аукціонного оголошення");
  }
};



  return (
    <main>
      <div className="container-1">
        <span className="ad-description">
          Якісно заповнене оголошення підвищує вірогідність продажу вашого
          товару
        </span>
        <span className="ad-description-text">Додайте фото товару </span>
        <span className="ad-description-text-1">
          Рекомендована кількість від трьох фото*
        </span>
        <div className="container-btn">
        <input
            type="file"
            id="image-upload"
            multiple
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload" className="text-btn">
            Перейти до завантаження фотографій
          </label>
          {images.length > 0 && (
            <span>{images.length} фото вибрано</span>
          )}
        </div>
        <span className="ad-description-text-2">Опишіть вашу річ</span>
        <span className="ad-description-text-3">Назва (українською мовою)</span>
        <input
          type="text"
          className="input-line"
          maxLength={200}
          placeholder="Введіть назву"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className="ad-description-text-4">Опис (українською мовою)*</span>
        <textarea
          className="input-line-1"
          placeholder="Опишіть річ"
          maxLength={500}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <span className="ad-description-text-5">Виберіть розділ</span>
        <div className={`container-1 ${isModalOpen ? "blurred" : ""}`}>
          {selectedCategoryPath.length === 0 ? (
            <div className="sections-wrapper">
              <div
                className="section-container"
                onClick={() => handleSectionClick("Вона")}
              >
                <div className="icon-common women"></div>
                <span className="section-text">Вона</span>
              </div>
              <div
                className="section-container"
                onClick={() => handleSectionClick("Він")}
              >
                <div className="icon-common men"></div>
                <span className="section-text">Він</span>
              </div>
              <div
                className="section-container"
                onClick={() => handleSectionClick("Діти")}
              >
                <div className="icon-common kids"></div>
                <span className="section-text">Діти</span>
              </div>
            </div>
          ) : (
            <div className="sections-wrapper">
              <div
                className="section-container selected"
                onClick={() => {
                  setSelectedCategoryPath([]);
                  setSelectedSection("");
                  setSelectedCategoryId(null);
                }}
              >
                <span className="change-text">Змінити</span>
                <div
                  className={`icon-common ${
                    selectedSection === "Вона"
                      ? "women"
                      : selectedSection === "Він"
                      ? "men"
                      : "kids"
                  }`}
                ></div>
                <span className="section-text">{selectedSection}</span>
                <div className="selected-subcategory-text">
                  {selectedCategoryPath.join(" / ")}
                </div>
              </div>
            </div>
          )}
        </div>


        {isModalOpen && !loading && (
          <CategoryModal
          categories={getSectionCategories()}
          onClose={closeModal}
          onSelect={(path, categoryId) => handleSelectCategory(path, categoryId)}
          />
        )}
        <span className="ad-description-text-8">Вкажіть ціну</span>
        <div className="pay-container">
          <div className="pay-container-block">
          <input
              type="number"
              className="price-input"
              placeholder="Введіть суму"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span className="currency-label">грн</span>
          </div>
          <div className="icon-money"></div>
          <span className="pay-text">Оплата</span>
        </div>
        <span className="ad-description-text-9">Оберіть тип оголошення</span>
        <AdType onTypeChange={setAdType} />

        {/* Додаткові поля для аукціону */}
        {adType === "auction" && (
          <>
            <div className="auction-fields">
              <span className="ad-description-text-10">Дата закінчення*</span>
              <input
                type="datetime-local"
                className="input-line"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div className="auction-fields">
              <span className="ad-description-text-10">Мінімальна ставка*</span>
              <div className="pay-container-block-1">
              <input
                  type="number"
                  className="price-input"
                  placeholder="Введіть суму"
                  value={minBid}
                  onChange={(e) => setMinBid(e.target.value)}
                />
                <span className="currency-label">грн</span>
              </div>
            </div>

            <div className="btn-container" onClick={handleAuctionSubmit}>
              <span className="btn-text">Створити аукціон</span>
            </div>
          </>
        )}

{adType !== "auction" && (
          <div className="btn-container" onClick={handleSubmit}>
            <span className="btn-text">Створити оголошення</span>
          </div>
        )}
      </div>
    </main>
  );
}
