import "../styles/catalog-page.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Search from "../components/Search";
import SortSelector from "../components/SortSelector";
import CatalogList from "../components/CatalogList";
import Pagination from "../components/Pagination";
import { useQuery } from '@tanstack/react-query';
import { fetchListingsBySex, fetchListingsByCategory, fetchListingsByPriceRange } from '../api/listing';
import Filters2 from "../components/Filters2";


const sortOptions1 = ["За популярністю", "Дешевше", "Дорожче"];

const sortOptions2 = ["Всі оголошення", "Аукціон", "Звичайні оголошення"];

export default function CatalogPage() {
  const [sort1, setSort1] = useState(sortOptions1[0]);
  const [sort2, setSort2] = useState(sortOptions2[0]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const { sex } = useParams();

  // Визначаємо який запит виконувати в залежності від обраних фільтрів
  const getQueryFn = () => {
    if (selectedCategory) {
      return () => fetchListingsByCategory(selectedCategory, page);
    }
    if (priceRange) {
      return () => fetchListingsByPriceRange(priceRange.min, priceRange.max, page);
    }
    return () => fetchListingsBySex(sex, page);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', sex, page, selectedCategory, priceRange],
    queryFn: getQueryFn(),
    keepPreviousData: true
  });

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Зберігаємо пошуковий термін в нижньому регістрі
    setPage(1); // Скидаємо на першу сторінку при новому пошуку
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setPriceRange(null); // Скидаємо фільтр по ціні при зміні категорії
    setPage(1);
  };

  const handlePriceChange = (range) => {
    setPriceRange(range);
    setSelectedCategory(null); // Скидаємо фільтр по категорії при зміні ціни
    setPage(1);
  };

  const handleReset = () => {
    setSort1(sortOptions1[0]);
    setSort2(sortOptions2[0]);
    setPage(1);
    setSearchTerm(''); // Очищуємо пошуковий термін
    setSelectedCategory(null);
    setPriceRange(null);
  };

  // Функція для зміни сторінки з прокруткою
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Фільтрація оголошень за типом та пошуковим терміном
  const filteredItems = data?.items?.filter(item => {
    // Пошук за назвою (якщо є пошуковий термін)
    if (searchTerm && !item.title.toLowerCase().includes(searchTerm)) {
      return false;
    }
    
    // Фільтрація за типом оголошення
    if (sort2 === "Всі оголошення") return true;
    if (sort2 === "Аукціон") return item.isAuction;
    return !item.isAuction;
  }) || [];

  // Сортування оголошень
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sort1) {
      case "Дешевше": return a.price - b.price;
      case "Дорожче": return b.price - a.price;
      default: return 0;
    }
  });

  if (isLoading) return <div className="loading">Завантаження оголошень...</div>;
  if (error) return <div className="error">Помилка: {error.message}</div>;


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
        rel="stylesheet"
      />
      <div className="container">
        <div className="filters">
          <Filters2
          sex={sex} 
          onCategorySelect={handleCategorySelect}
          onPriceChange={handlePriceChange}
          selectedCategoryId={selectedCategory}
          />
        </div>

        <div className="content-area">
          <div className="search-sort-row">
            <Search
            onSearch={handleSearch} 
            searchTerm={searchTerm} // Передаємо поточний пошуковий термін
            />
            <SortSelector
              options={sortOptions1}
              active={sort1}
              setActive={setSort1}
              variant="default"
            />
          </div>

          <div className="sort-reset-row">
            <SortSelector
              options={sortOptions2}
              active={sort2}
              setActive={setSort2}
              variant="reverse"
            />
            <button className="reset-filters-btn" onClick={handleReset}>
              Скинути всі фільтри
            </button>
          </div>
          
          </div>
          
          <CatalogList items={sortedItems} />
          
          {data && data.totalPages > 1 && (
            <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}  // Тепер використовуємо нашу нову функцію
          />
          )}
        </div>
    </>
  );
}
