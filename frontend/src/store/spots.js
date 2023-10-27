import { csrfFetch } from "./csrf";

const ALL_SPOTS = "spots/allSpots";
const GET_SPOT = "spots/getSpot";
const CREATE_SPOT = "spots/createSpot";
const CURRENT_USER_SPOTS = "spots/currentUserSpots";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";
const allSpots = (payload) => {
  return {
    type: ALL_SPOTS,
    payload,
  };
};
const currentUserSpots = (payload) => {
  return {
    type: CURRENT_USER_SPOTS,
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
const updateSpot = (payload) => {
  return {
    type: UPDATE_SPOT,
    payload,
  };
};
const deleteSpot = (payload, spotId) => {
  return {
    type: DELETE_SPOT,
    payload: spotId,
  };
};

export const allTheSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  const spots = await response.json();
  dispatch(allSpots(spots));
  return spots;
};
export const getCurrentUserSpots = (user) => async (dispatch) => {
  const response = await csrfFetch("/api/current");
  const spots = await response.json(user);
  dispatch(currentUserSpots(spots));
  return spots;
};
export const oneSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  const spot = await response.json();
  dispatch(getSpot(spot));
  return spot;
};
export const createASpot = (payload, images) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  if (response.ok) {
    const data = await response.json();
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
export const updateASpot = (payload, images, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload }),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(updateSpot(data));
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
export const deleteASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(),
  });
  if (response.ok) {
    const data = await response.json();
    dispatch(deleteSpot(data, spotId));
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
      {
        const spotData = {};
        action.payload.Spots.forEach((spot) => {
          spotData[spot.id] = spot;
        });
        return spotData;
      }

      // newState = { ...action.payload };
      return newState;
    case GET_SPOT:
      newState = { ...action.spotId };
      return newState;
    case CREATE_SPOT:
      newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    case CURRENT_USER_SPOTS:
      newState = { ...action.payload };
      return newState;
    case DELETE_SPOT:
      let deleteState;
      console.log(
        "🚀 ~ file: spots.js:174 ~ spotReducer ~ action.payload:",
        action.payload
      );
      deleteState = { ...state };
      delete deleteState[action.payload];
      return deleteState;
    default:
      return state;
  }
};

export default spotReducer;
