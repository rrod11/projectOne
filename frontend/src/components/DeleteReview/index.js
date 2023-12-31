import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";
import "./index.css";

function DeleteAReviewModal({ reviewId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const closeScreen = () => {
    closeModal();
  };
  const beginDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteAReview(reviewId)).then(closeModal);
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
        <p>Are you sure you want to remove this review?</p>
        <div>
          <button className="delete-button" onClick={beginDelete}>
            Yes(Delete Review)
          </button>
          <button className="update-button" onClick={closeScreen}>
            No(Keep Review)
          </button>
        </div>
      </div>
    </>
  );
}
export default DeleteAReviewModal;
