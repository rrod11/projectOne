import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { oneSpot } from "../../store/spots";
import ReviewDetail from "../Reviews";
import "./index.css";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spotObj = useSelector((state) => state.spots);
  const spot = spotObj[spotId];
  console.log("🚀 ~ file: index.js:11 ~ SpotDetail ~ spot:", spot);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const reviewsObj = useSelector((state) => state.reviews);
  const reviewsArr = Object.values(reviewsObj);

  useEffect(() => {
    dispatch(oneSpot(spotId));
  }, [dispatch, spotId, reviewsArr.length]);
  // if (!spot.Owner) return null;

  if (spot?.SpotImages?.length < 5) {
    for (let i = spot.SpotImages.length; i < 5; i++) {
      const img = {
        id: i,
        url: "https://t4.ftcdn.net/jpg/03/08/68/19/360_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg",
      };
      spot.SpotImages.push(img);
    }
  }
  let reviews;
  if (reviewsArr?.length > 1) {
    reviews = <span>{`${reviewsArr.length} Reviews`}</span>;
  } else if (reviewsArr.length == 1) {
    reviews = <span>{`${reviewsArr.length} Review`}</span>;
  } else {
    reviews = null;
  }
  function comingSoon() {
    alert("Feature coming soon");
  }

  if (!spot?.Owner) return null;
  return (
    <div className="spot-details">
      <div className="spot-detail-header">
        <h1>{spot.name}</h1>
        <h4>
          {spot.city} {spot.state}, {spot.country}
        </h4>
      </div>

      <div className="spot-detail-pictures">
        {spot?.SpotImages?.map(({ id, url }) => (
          <img src={url} key={id} alt={`${id} visual`}></img>
        ))}
      </div>

      <div className="spot-detail-details">
        <div className="spot-info">
          <h4>
            Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
          </h4>
          <p>{spot.description}</p>
        </div>
        <div
          className="detail-review-block"
          style={{
            width: "100%",

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className="detail-reviews-slab">
            <span>${spot.price}/night</span>
            <span>
              <i className="fa-solid fa-star"></i>
              {spot.avgRating ? (
                <span>{parseFloat(`${spot.avgRating}`).toFixed(2)}</span>
              ) : (
                <span>New</span>
              )}
            </span>
            {reviewsArr.length > 0 ? (
              <i class="fa-solid fa-circle  fa-2xs" style={{ zoom: ".25" }}></i>
            ) : null}
            {reviews}
          </div>
          <div className="reservation">
            <button
              style={{
                backgroundColor: "red",
                maxWidth: "100%",
                width: "300px",
              }}
              onClick={comingSoon}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
      {/* <div
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
          > */}
      {/* </div> */}

      <ReviewDetail spotId={spotId} spot={spot} user={sessionUser} />
    </div>
  );
};

export default SpotDetail;
