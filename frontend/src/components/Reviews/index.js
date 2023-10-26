import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { allTheReviews } from "../../store/reviews";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import PostAReviewFormModal from "../PostaReviewModal";

const ReviewDetail = ({ spotId, spot, user }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  console.log("🚀 ~ file: index.js:11 ~ ReviewDetail ~ reviews:", reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const dateSetter = (date) => {
    const dateParts = Date(date).split(" ");
    return `${dateParts[1]} ${dateParts[2]} ${dateParts[3]} ${dateParts[4]}`;
  };
  const dateComparison = (a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  };
  const sortedReviews = Object.values(reviews).sort(dateComparison);
  console.log(
    "🚀 ~ file: index.js:20 ~ ReviewDetail ~ sortedReviews:",
    sortedReviews
  );
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
    reviewsGuide = sortedReviews?.map((review) => (
      <div>
        <h4>
          {review?.User.firstName} {review?.User.lastName}
        </h4>
        <h5>{dateSetter(review.createdAt)}</h5>
        <p>{review.review}</p>
      </div>
    ));
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
          style={{ backgroundColor: "red", maxWidth: "100%", width: "300px" }}
          modalComponent={
            <PostAReviewFormModal spotId={spotId} itemText="Post A Review" />
          }
        />
      );
    }
  };

  return (
    <>
      <span>
        <i className="fa-solid fa-star"></i>
        {spot.avgRating ? (
          <span>{parseFloat(`${spot.avgRating}`).toFixed(2)}</span>
        ) : (
          <span>New</span>
        )}
      </span>
      {user && showReviewButton()}

      {reviewGrid}
      {reviewsGuide}
    </>
  );
};

export default ReviewDetail;
