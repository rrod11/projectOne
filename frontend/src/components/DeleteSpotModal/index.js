import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteASpot } from "../../store/spots";
import "./index.css";
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
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Times New Roman",
          justifyContent: "center",
          padding: "25px",
          width: "250px",
        }}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div style={{ height: "40px", display: "flex" }}>
          <button className="delete-button" onClick={beginDelete}>
            Yes(Delete Spot)
          </button>
          <button className="update-button" onClick={closeScreen}>
            No(Keep Spot)
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteASpotModal;
