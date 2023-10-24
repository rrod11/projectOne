import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const GET_SPOT = "spots/getSpot";
const allSpots = (payload) => {
  return {
    type: ALL_SPOTS,
    payload,
  };
};
const getSpot = (spotId) => {
  return {
    type: GET_SPOT,
    spotId,
  };
};

export const allTheSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(allSpots(spots));
  return spots;
};
export const oneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  dispatch(getSpot(spot));
  return spot;
};
const initialState = { spots: null };
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_SPOTS:
      newState = { ...action.payload };
      return newState;
    case GET_SPOT:
      newState = { ...action.spotId };
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
