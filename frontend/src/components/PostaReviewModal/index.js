import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { createAReview } from "../../store/reviews";

function PostAReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const user = useSelector((state) => state.session.user);
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState(0);
  const [activeRating, setActiveRating] = useState(0);
  const [errors, setErrors] = useState({});
  const disabled = reviewText.length < 10;

  const { closeModal } = useModal();
  console.log("🚀 ~ file: index.js:14 ~ PostAReviewFormModal ~ stars:", stars);
  const newReview = {
    spotId,
    userId: id,
    review: reviewText,
    stars,
  };
  function checkCredentials() {
    const errObj = {};
    if (!stars) errObj.stars = "Stars is required";
    if (!reviewText || reviewText.length < 10)
      errObj.reviewText = "Review text must be at least 10 characters";
    setErrors(errObj);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors && !Object.values(errors).length) {
      await dispatch(createAReview(spotId, newReview, user)).then(closeModal);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ width: "80%" }}>
          <textarea
            rows="10"
            cols="45"
            placeholder="Leave your review here"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
          />
        </label>
        {errors.reviewText && <p className="errors">{errors.reviewText}</p>}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label>
            <div
              class="rating"
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div
                onMouseEnter={() => {
                  if (!disabled) setActiveRating(1);
                }}
                onMouseLeave={() => {
                  if (!disabled) setActiveRating(stars);
                }}
                onClick={() => {
                  if (!disabled) setStars(1);
                }}
              >
                <i
                  className={
                    activeRating >= 1 || stars >= 1
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                ></i>
              </div>
              <div
                onMouseEnter={() => {
                  if (!disabled) setActiveRating(2);
                }}
                onMouseLeave={() => {
                  if (!disabled) setActiveRating(stars);
                }}
                onClick={() => {
                  if (!disabled) setStars(2);
                }}
              >
                <i
                  className={
                    activeRating >= 2 || stars >= 2
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                ></i>
              </div>
              <div
                onMouseEnter={() => {
                  if (!disabled) setActiveRating(3);
                }}
                onMouseLeave={() => {
                  if (!disabled) setActiveRating(stars);
                }}
                onClick={() => {
                  if (!disabled) setStars(3);
                }}
              >
                <i
                  className={
                    activeRating >= 3 || stars >= 3
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                ></i>
              </div>
              <div
                onMouseEnter={() => {
                  if (!disabled) setActiveRating(4);
                }}
                onMouseLeave={() => {
                  if (!disabled) setActiveRating(stars);
                }}
                onClick={() => {
                  if (!disabled) setStars(4);
                }}
              >
                <i
                  className={
                    activeRating >= 4 || stars >= 4
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                ></i>
              </div>
              <div
                onMouseEnter={() => {
                  if (!disabled) setActiveRating(5);
                }}
                onMouseLeave={() => {
                  if (!disabled) setActiveRating(stars);
                }}
                onClick={() => {
                  if (!disabled) setStars(5);
                }}
              >
                <i
                  className={
                    activeRating >= 5 || stars >= 5
                      ? "fa-solid fa-star"
                      : "fa-regular fa-star"
                  }
                ></i>
              </div>
              <span>stars</span>
            </div>
          </label>
        </div>
        {errors.stars && <p className="errors">{errors.stars}</p>}
        <button
          type="submit"
          onClick={checkCredentials}
          disabled={disabled}
          style={{ backgroundColor: "red", maxWidth: "100%", width: "300px" }}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostAReviewFormModal;
