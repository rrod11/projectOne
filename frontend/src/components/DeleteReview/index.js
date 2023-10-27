import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteAReview } from "../../store/reviews";

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
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>
      <button
        style={{ backgroundColor: "red", color: "white" }}
        onClick={beginDelete}
      >
        Yes(Delete Review)
      </button>
      <button
        style={{ backgroundColor: "grey", color: "white" }}
        onClick={closeScreen}
      >
        No(Keep Review)
      </button>
    </>
  );
}
export default DeleteAReviewModal;
