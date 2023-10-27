import { useDispatch, useSelector } from "react-redux";
import { allTheSpots, getCurrentUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteASpotModal from "../DeleteSpotModal";
const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  console.log("🚀 ~ file: index.js:11 ~ CurrentUserSpots ~ user:", user);
  const spots = useSelector((state) => state.spots);
  const { spotId } = useParams();
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);

  const userSpots = Object.values(spots)?.filter(
    (spot) => spot?.ownerId === user.id
  );
  const deleteSpotButton = (spotId) => {
    return (
      <OpenModalButton
        buttonText="Delete"
        style={{ backgroundColor: "red", maxWidth: "100%", width: "300px" }}
        modalComponent={<DeleteASpotModal spotId={spotId} itemText="Delete" />}
      />
    );
  };

  return spots == null ? null : (
    <>
      <h1>MANAGE SPOTS</h1>
      {userSpots.length > 0 ? (
        <div className="LPImages">
          {userSpots?.map(
            ({ id, name, city, state, previewImage, avgRating, price }) => (
              <>
                <div key={id} className="imageDiv">
                  <NavLink
                    // style={{ border: "2px solid green" }}
                    to={`/spots/${id}`}
                    key={id}
                  >
                    <div className="tooltip" title={name}>
                      <img src={previewImage} className="actualImages" />
                      <p className="tooltiptext">{name}</p>
                    </div>
                    <div className="houseInfo">
                      <p>
                        {city}, {state}
                      </p>
                      <div className="ratingInfo">
                        <i className="fa-solid fa-star"></i>
                        {avgRating ? (
                          <p>{parseFloat(`${avgRating}`).toFixed(2)}</p>
                        ) : (
                          <p>New</p>
                        )}
                      </div>
                    </div>
                    <p>${price}/night</p>
                  </NavLink>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <NavLink to={`/spots/${id}/edit`}>
                      <button>Update</button>
                    </NavLink>
                    {deleteSpotButton(id)}
                  </div>
                </div>
              </>
            )
          )}
        </div>
      ) : (
        <h2>
          <NavLink to="/spots/new">
            <button>Create a New Spot</button>
          </NavLink>
        </h2>
      )}
    </>
  );
};

export default CurrentUserSpots;
