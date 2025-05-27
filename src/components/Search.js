import "../styles/search.css";

export default function Search() {
    return (
        <div className="search-container">
  <div className="search-wrapper">
    <input
      type="text"
      placeholder="Шукати"
      className="search-input"
    />
    <button className="search-icon-button">
    <div className="search-icon2"></div>
    </button>
  </div>
</div>
    );
}