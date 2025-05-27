import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/feedback-modal.css";

const FeedbackModal = ({ onClose, onSubmit }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const parsedRating = parseInt(rating);

    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      setRatingError(true);
      return;
    }

    setRatingError(false);
    onSubmit({ rating: parsedRating, comment });
    // The modal will close via the onSubmit function in OrderPage
    // No need to clear fields here if it closes immediately.
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {/* Added modal-title class for centering */}
        <h3 className="modal-title">Якщо бажаєте, залиште відгук</h3>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rating">Оцінка (від 1 до 5):</label>
            <input
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
                setRatingError(false); // Clear error on change
              }}
              className={ratingError ? "input-error" : ""}
              required
            />
            {ratingError && (
              <span className="error-message">
                Будь ласка, введіть оцінку від 1 до 5.
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="comment">Коментар:</label>
            <textarea
              id="comment"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Введіть ваш коментар стосовно товару..."
            ></textarea>
          </div>

          <button type="submit" className="submit-review-button">
            Надіслати відгук
          </button>
        </form>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default FeedbackModal;
