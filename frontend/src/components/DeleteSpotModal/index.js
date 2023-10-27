import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";

function DeleteASpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const closeScreen = () => {
    closeModal();
  };
  const beginDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteASpot(spotId)).then(closeModal);
  };
  return (
    <>
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this spot?</p>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={beginDelete}
      >
        Yes(Delete Spot)
      </button>
      <button
        style={{ backgroundColor: "grey", color: "white" }}
        onClick={closeScreen}
      >
        No(Keep Spot)
      </button>
    </>
  );
}
export default DeleteASpotModal;
