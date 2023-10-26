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
    default:
      return state;
  }
};

export default reviewReducer;
