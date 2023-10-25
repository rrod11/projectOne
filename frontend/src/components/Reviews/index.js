import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { allTheReviews } from "../../store/reviews";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ReviewDetail = ({ spotId, spot }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const reviewArr = Object.values(reviews);
  let orderedReviews;
  const setDate = (date) => {
    const dateParts = Date(date).split(" ");
    return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
  };
  const compareByDate = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };
  const sortedReviews = Object.values(reviews).sort(compareByDate);
  // const newArray = reviewArr?.map((ele) => setDate(ele.createdAt));
  let reviewGrid;
  if (spot.numReviews > 1) {
    reviewGrid = <span>{`${spot.numReviews} Reviews`}</span>;
  } else if (spot.numReviews == 1) {
    reviewGrid = <span>{`${spot.numReviews} Review`}</span>;
  } else {
    reviewGrid = null;
  }
  useEffect(() => {
    dispatch(allTheReviews(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      <div>GO CRAZY</div>
      <span>
        <i className="fa-solid fa-star"></i>
        {spot.avgRating ? (
          <span>{parseFloat(`${spot.avgRating}`).toFixed(2)}</span>
        ) : (
          <span>New</span>
        )}
      </span>
      {/* {spot.numReviews > 0 ? (
        <i class="fa-solid fa-circle  fa-2xs" style={{ zoom: ".25" }}></i>
      ) : null} */}
      {reviewGrid}
    </>
  );
};

export default ReviewDetail;
