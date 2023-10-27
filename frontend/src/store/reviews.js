import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "reviews/allReviews";
const CREATE_REVIEW = "reviews/createAReview";
const DELETE_REVIEW = "reviews/deleteReview";

const allReviews = (payload) => {
  return {
    type: ALL_REVIEWS,
    payload,
  };
};
const createReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};
const deleteReview = (payload, reviewId) => {
  return {
    type: DELETE_REVIEW,
    payload: reviewId,
  };
};

export const allTheReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/`);
  const reviews = await response.json();
  console.log("🚀 ~ file: reviews.js:22 ~ allTheReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews));
  return reviews;
};
export const createAReview = (spotId, payload, user) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  const review = await response.json();
  review.User = user;

  dispatch(createReview(review));
  return review;
};
export const deleteAReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteReview(data, reviewId));
  } else {
    const errors = await response.json();
    return errors;
  }
};
const initialState = {};
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_REVIEWS: {
      const returnData = {};
      // newState = { ...action.payload };
      action.payload.Reviews.forEach((review) => {
        returnData[review.id] = review;
      });
      return returnData;
    }
    case CREATE_REVIEW:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_REVIEW:
      let deleteState;
      console.log(
        "🚀 ~ file: reviews.js:79 ~ reviewReducer ~ action.payload:",
        action.payload
      );
      deleteState = { ...state };
      delete deleteState[action.payload];
      return deleteState;
    default:
      return state;
  }
};

export default reviewReducer;
