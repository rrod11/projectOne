import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const allSpots = (payload) => {
  return {
    type: ALL_SPOTS,
    payload,
  };
};

export const allTheSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(allSpots(spots));
  //   console.log("🚀 ~ file: spots.js:11 ~ allTheSpots ~ spots:", spots);
  return spots;
};
const initialState = { spots: null };
const spotReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case ALL_SPOTS:
      newState = { ...action.payload };
      //   newState.spots = action.payload;
      return newState;
    // case REMOVE_USER:
    //   newState = Object.assign({}, state);
    //   newState.user = null;
    //   return newState;
    default:
      return state;
  }
};

export default spotReducer;
