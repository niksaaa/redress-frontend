import "../styles/search.css";
import { useState, useEffect } from 'react';

export default function Search({ onSearch, searchTerm }) {
    const [inputValue, setInputValue] = useState(searchTerm);

    useEffect(() => {
      setInputValue(searchTerm);
    }, [searchTerm]);
  
    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(inputValue);
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-wrapper">
                <input
                    type="text"
                    placeholder="Шукати"
                    className="search-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit" className="search-icon-button">
                    <div className="search-icon2"></div>
                </button>
            </form>
        </div>
    );
}