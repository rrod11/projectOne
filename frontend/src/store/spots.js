import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const GET_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot";
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
const createSpot = (payload) => {
  return {
    type: CREATE_SPOT,
    payload,
  };
};

export const allTheSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  console.log("🚀 ~ file: spots.js:21 ~ allTheSpots ~ spots:", spots);
  dispatch(allSpots(spots));
  return spots;
};
export const oneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  dispatch(getSpot(spot));
  return spot;
};
export const createASpot = (payload, images) => async (dispatch) => {
  console.log("🚀 ~ file: spots.js:39 ~ createASpot ~ images:", images);
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  if (response.ok) {
    const data = await response.json();
    console.log("🚀 ~ file: spots.js:58 ~ createASpot ~ data:", data);
    dispatch(createSpot(data));
    if (images.length === 1) {
      await csrfFetch(`/api/spots/${data.id}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: images[0],
          preview: false,
        }),
      });
      return data;
    }
    if (images.length > 1) {
      images.map(async (img) => {
        await csrfFetch(`/api/spots/${data.id}/images`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: img,
            preview: false,
          }),
        });
      });
      return data;
    }
  } else {
    const errors = await response.json();
    return errors;
  }
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
    case CREATE_SPOT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    default:
      return state;
  }
};

export default spotReducer;
