import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { oneSpot } from "../../store/spots";

const SpotDetail = () => {
  const { spotId } = useParams();
  const spot = useSelector((state) => state.spots);

  const dispatch = useDispatch();
  console.log("🚀 ~ file: index.js:7 ~ SpotDetail ~ spotId:", spotId);
  console.log("🚀 ~ file: index.js:8 ~ SpotDetail ~ spot:", spot);
  console.log(
    "🚀 ~ file: index.js:8 ~ SpotDetail ~ spotIMAGES:",
    spot.SpotImages
  );

  useEffect(() => {
    dispatch(oneSpot(spotId));
  }, [dispatch]);
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
          <img src={url} key={id}></img>
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
          maxWidth: "300px",
          width: "fit-content",
          padding: "30px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <span>${spot.price}/night</span>
        <button
          style={{ backgroundColor: "red", maxWidth: "100%", width: "200px" }}
          onClick={comingSoon}
        >
          Reserve
        </button>
      </div>
    </>
  );
};

export default SpotDetail;
