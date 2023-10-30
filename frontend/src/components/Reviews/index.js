import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { allTheReviews } from "../../store/reviews";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import PostAReviewFormModal from "../PostaReviewModal";
import DeleteAReviewModal from "../DeleteReview";
import "./index.css";

const ReviewDetail = ({ spotId, spot, user }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  console.log("🚀 ~ file: index.js:11 ~ ReviewDetail ~ reviews:", reviews);
  const sessionUser = useSelector((state) => state.session.user);
  console.log(
    "🚀 ~ file: index.js:14 ~ ReviewDetail ~ sessionUser:",
    sessionUser
  );
  const dateSetter = (date) => {
    const dateParts = Date(date).split(" ");
    return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
  };
  const dateComparison = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };
  const sortedReviews = Object.values(reviews).sort(dateComparison);

  useEffect(() => {
    dispatch(allTheReviews(spotId));
  }, [dispatch, spotId]);
  let reviewGrid;
  if (spot?.numReviews > 1) {
    reviewGrid = <span>{`${spot.numReviews} Reviews`}</span>;
  } else if (spot?.numReviews == 1) {
    reviewGrid = <span>{`${spot.numReviews} Review`}</span>;
  } else {
    reviewGrid = null;
  }
  let reviewsGuide;

  if (!reviews || !sortedReviews[0]) {
    reviewsGuide = (
      <div>
        <h4>Be the first to post a Review</h4>
      </div>
    );
  } else {
    reviewsGuide = sortedReviews?.map((review) => {
      const user = sessionUser?.id == review?.userId;
      return (
        <div className="usersReviews">
          <h4
            style={{ fontSize: "18px", fontWeight: "800", marginTop: "10px" }}
          >
            {review?.User.firstName} {review?.User.lastName}
          </h4>
          <h5 style={{ color: "grey", fontSize: "15px", fontWeight: "500" }}>
            {dateSetter(review.createdAt)}
          </h5>
          <p
            style={{
              margin: "0px 0px 10px",
              fontSize: "20px",
              fontFamily: "Times New Roman",
            }}
          >
            {review.review}
          </p>
          {user ? deleteReviewButton(review.id) : null}
        </div>
      );
    });
  }
  function deleteReviewButton(reviewId) {
    return (
      <OpenModalButton
        buttonText="Delete"
        style={{ backgroundColor: "red", maxWidth: "30%", width: "300px" }}
        modalComponent={
          <DeleteAReviewModal reviewId={reviewId} itemText="Delete" />
        }
      />
    );
  }
  const showReviewButton = () => {
    const userReview = sortedReviews?.find(
      (review) => review?.userId === user.id
    );
    if (
      (userReview && userReview !== undefined) ||
      user?.id === spot?.ownerId
    ) {
      return null;
    } else {
      return (
        <OpenModalButton
          buttonText="Post a Review"
          className="green"
          modalComponent={
            <PostAReviewFormModal spotId={spotId} itemText="Post A Review" />
          }
        />
      );
    }
  };

  return (
    <div className="review-box">
      <div className="review-header">
        <span>
          <i className="fa-solid fa-star"></i>
          {spot.avgRating ? (
            <span>{parseFloat(`${spot.avgRating}`).toFixed(2)}</span>
          ) : (
            <span>New</span>
          )}
        </span>
        {sortedReviews.length > 0 ? (
          <i
            class="fa-solid fa-circle  fa-2xs"
            style={{ zoom: ".25", margin: "0 30px" }}
          ></i>
        ) : null}
        {reviewGrid}
      </div>

      {user && showReviewButton()}
      {reviewsGuide}
    </div>
  );
};

export default ReviewDetail;
