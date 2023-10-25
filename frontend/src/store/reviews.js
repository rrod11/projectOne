import { csrfFetch } from "./csrf";

const ALL_REVIEWS = "reviews/allReviews";

const allReviews = (payload) => {
  return {
    type: ALL_REVIEWS,
    payload,
  };
};

export const allTheReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/reviews/`);
  const reviews = await response.json();
  // console.log("🚀 ~ file: reviews.js:15 ~ allTheReviews ~ reviews:", reviews);
  dispatch(allReviews(reviews.Reviews));
  return reviews.Reviews;
};
// export const oneSpot = (spotId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${spotId}`);
//   const spot = await response.json();
//   dispatch(getSpot(spot));
//   return spot;
// };
const initialState = { spots: null };
const reviewReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_REVIEWS:
      newState = { ...action.payload };
      return newState;
    // case GET_SPOT:
    //   newState = { ...action.spotId };
    //   return newState;
    default:
      return state;
  }
};

export default reviewReducer;
