import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "reviews/allReviews";
const CREATE_REVIEW = "reviews/createAReview";

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

export const allTheReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/`);
  const reviews = await response.json();
  dispatch(allReviews(reviews.Reviews));
  return reviews.Reviews;
};
export const createAReview = (spotId, payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  const review = await response.json();
  dispatch(createReview(review));
  return review;
};
const initialState = { spots: null };
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_REVIEWS:
      newState = { ...action.payload };
      return newState;
    case CREATE_REVIEW:
      newState = { ...state, ...action.payload };
      return newState;
    default:
      return state;
  }
};

export default reviewReducer;
