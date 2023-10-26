import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { createAReview } from "../../store/reviews";

function PostAReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const { id, firstName, lastName } = useSelector(
    (state) => state.session.user
  );
  const [reviewText, setReviewText] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const newReview = {
    spotId,
    userId: id,
    review: reviewText,
    stars,
  };
  function checkCredentials() {
    const errObj = {};
    if (!stars) errObj.stars = "Stars is required";
    if (!reviewText)
      errObj.reviewText = "Review text must be at least 10 characters";
    setErrors(errObj);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors && !Object.values(errors).length) {
      await dispatch(createAReview(spotId, newReview))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  return (
    <>
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label>
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
        <label>
          <div class="rating">
            <span
              value="1"
              onChange={(e) => setStars(e.target.value)}
              className="fa-regular fa-star"
            ></span>
            <span
              value="2"
              onChange={(e) => setStars(e.target.value)}
              className="fa-regular fa-star"
            ></span>
            <span
              value="3"
              onChange={(e) => setStars(e.target.value)}
              className="fa-regular fa-star"
            ></span>
            <span
              value="4"
              onChange={(e) => setStars(e.target.value)}
              className="fa-regular fa-star"
            ></span>
            <span
              value="5"
              onChange={(e) => setStars(e.target.value)}
              className="fa-regular fa-star"
            ></span>
            <span>stars</span>
            {/* "fa-solid fa-star" */}
          </div>
        </label>
        {errors.stars && <p className="errors">{errors.stars}</p>}
        <button
          type="submit"
          onClick={checkCredentials}
          style={{ backgroundColor: "red", maxWidth: "100%", width: "300px" }}
        >
          Submit Your Review
        </button>
      </form>
    </>
  );
}

export default PostAReviewFormModal;
