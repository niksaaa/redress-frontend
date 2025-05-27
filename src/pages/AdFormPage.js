import "../styles/ad-form.css";
import CategoryModal from "../components/CategoryModal";
import AdType from "../components/AdType";
import React, { useState, useEffect } from "react";
import { fetchCategoryTree } from "../api/category";
import { createListing, startAuction, uploadListingImage } from "../api/createListing";
import axios from "axios";

export default function AdFormPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedSubcategory, setSelectedSubcategory] = useState("");
  // const [selectedSize, setSelectedSize] = useState("");
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
    
    const sectionName = selectedSection === "Вона" ? "Female" : 
                       selectedSection === "Він" ? "Male" : "Unisex";
    
    return categoryTree.filter(cat => cat.sex === sectionName);
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
      // Створення оголошення
      const listingId = await createListing(listingData);
      
      // Завантаження зображень
      if (images.length > 0) {
        const uploadPromises = images.map(image => 
          uploadListingImage(image, listingId)
        );
        await Promise.all(uploadPromises);
      }

      // Якщо це аукціон - створюємо аукціон
      if (adType === "auction") {
        const auctionData = {
          endAt: endDate,
          startPrice: parseFloat(price),
          minStep: parseFloat(minBid),
          listingId
        };
        await startAuction(listingId, auctionData);
      }

      alert("Оголошення успішно створено!");
      // Тут можна додати перенаправлення на сторінку оголошення
    } catch (error) {
      console.error("Помилка при створенні оголошення:", error);
      alert("Сталася помилка при створенні оголошення");
    }
  };

  // Обробник для аукціонного оголошення
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
      // Створення оголошення
      const listingId = await createListing(listingData);
      
      // Створення аукціону
      const auctionData = {
        endAt: endDate,
        startPrice: parseFloat(price),
        minStep: parseFloat(minBid),
        listingId
      };
      await startAuction(listingId, auctionData);

      alert("Аукціонне оголошення успішно створено!");
      // Тут можна додати перенаправлення на сторінку оголошення
    } catch (error) {
      console.error("Помилка при створенні аукціонного оголошення:", error);
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

        {/* <SizeSelector
          category={selectedCategory}
          selectedSize={selectedSize}
          onSelect={setSelectedSize}
        />

        <span className="ad-description-text-6">Бренд*</span>
        <BrandSelector
          selectedBrand={selectedBrand}
          onSelect={(brand) => setSelectedBrand(brand)}
        />

        <span className="ad-description-text-7">Виберіть до 2 відтінків</span>
        <ColorOptions /> */}
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
