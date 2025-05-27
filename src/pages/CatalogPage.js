import "../styles/catalog-page.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Filters from "../components/Filters";
import Search from "../components/Search";
import SortSelector from "../components/SortSelector";
import dressImg from "../images/main-page/v30_108.png";
import CatalogList from "../components/CatalogList";
import Pagination from "../components/Pagination";
import { useQuery } from '@tanstack/react-query';
import { fetchListingsBySex } from '../api/listing';
import Filters2 from "../components/Filters2";
// import { demoListings as fetchListingsBySex } from '../demoData';


const sortOptions1 = ["За популярністю", "Дешевше", "Дорожче", "За новинками"];

const sortOptions2 = ["Всі оголошення", "Аукціон", "Звичайні оголошення"];

export default function CatalogPage() {
  const [sort1, setSort1] = useState(sortOptions1[0]);
  const [sort2, setSort2] = useState(sortOptions2[0]);
  const [page, setPage] = useState(1);
  const { sex } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['listings', sex, page],
    queryFn: () => fetchListingsBySex(sex, page),
    keepPreviousData: true
  });

  const handleReset = () => {
    setSort1(sortOptions1[0]);
    setSort2(sortOptions2[0]);
    setPage(1);
  };

  // Функція для зміни сторінки з прокруткою
  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  // Фільтрація оголошень за типом
  const filteredItems = data?.items?.filter(item => {
    if (sort2 === "Всі оголошення") return true;
    if (sort2 === "Аукціон") return item.isAuction;
    return !item.isAuction;
  }) || [];

  // Сортування оголошень
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sort1) {
      case "Дешевше": return a.price - b.price;
      case "Дорожче": return b.price - a.price;
      default: return 0; // Базове сортування (як отримали з API)
    }
  });

  // if (isLoading) return <div className="loading">Завантаження оголошень...</div>;
  // if (error) return <div className="error">Помилка: {error.message}</div>;


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Inria+Serif&display=swap"
        rel="stylesheet"
      />
      <div className="container">
        <div className="filters">
          <Filters2 sex={sex} />
        </div>

        <div className="content-area">
          <div className="search-sort-row">
            {/* <div className="search">
              <Search />
            </div> */}
            <Search />
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
