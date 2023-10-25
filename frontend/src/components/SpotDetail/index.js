import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { oneSpot } from "../../store/spots";
import ReviewDetail from "../Reviews";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(oneSpot(spotId));
  }, [dispatch, spotId]);
  if (!spot.Owner) return null;

  if (spot.SpotImages.length < 5) {
    for (let i = spot.SpotImages.length; i < 5; i++) {
      const img = {
        id: i,
        url: "https://t4.ftcdn.net/jpg/03/08/68/19/360_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg",
      };
      spot.SpotImages.push(img);
    }
  }
  let reviews;
  if (spot.numReviews > 1) {
    reviews = <span>{`${spot.numReviews} Reviews`}</span>;
  } else if (spot.numReviews == 1) {
    reviews = <span>{`${spot.numReviews} Review`}</span>;
  } else {
    reviews = null;
  }
  function comingSoon() {
    alert("Feature coming soon");
  }

  return !spot?.Owner ? null : (
    <>
      <h1>{spot.name}</h1>
      <h2>
        {spot.city} {spot.state}, {spot.country}
      </h2>

      {spot?.SpotImages?.map(({ id, url }) => (
        <div className="spot-detail-images">
          <img src={url} key={id} alt={`${id} visual`}></img>
        </div>
      ))}
      <h4>
        Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
      </h4>
      <p>{spot.description}</p>
      <div
        className="callout"
        style={{
          border: "2px solid black",
          maxWidth: "400px",
          width: "fit-content",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          className="detail-review"
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>${spot.price}/night</span>
          <span>
            <i className="fa-solid fa-star"></i>
            {spot.avgRating ? (
              <span>{parseFloat(`${spot.avgRating}`).toFixed(2)}</span>
            ) : (
              <span>New</span>
            )}
          </span>
          {spot.numReviews > 0 ? (
            <i class="fa-solid fa-circle  fa-2xs" style={{ zoom: ".25" }}></i>
          ) : null}
          {/* {spot.numReviews > 1 ? (
            <span>{spot.numReviews} Reviews</span>
          ) : (
            <span>{spot.numReviews} Review</span>
          )} */}
          {reviews}
        </div>
        <button
          style={{ backgroundColor: "red", maxWidth: "100%", width: "300px" }}
          onClick={comingSoon}
        >
          Reserve
        </button>
      </div>
      <ReviewDetail spotId={spotId} spot={spot} />
    </>
  );
};

export default SpotDetail;
