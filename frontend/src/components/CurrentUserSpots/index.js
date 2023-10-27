import { useDispatch, useSelector } from "react-redux";
import { allTheSpots, getCurrentUserSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
const CurrentUserSpots = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.Spots);
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);

  const userSpots = spots?.filter((spot) => spot.ownerId === user.id);

  return !spots ? null : (
    <>
      <h1>MANAGE SPOTS</h1>
      {userSpots.length > 0 ? (
        <div className="LPImages">
          {userSpots?.map(
            ({ id, name, city, state, previewImage, avgRating, price }) => (
              <NavLink to={`/spots/${id}`} key={id}>
                <div key={id} className="imageDiv">
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
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <span>
                    <NavLink to={`/spots/${id}/edit`}>
                      <button>Update</button>
                    </NavLink>
                  </span>
                  <span>
                    <button>Delete</button>
                  </span>
                </div>
              </NavLink>
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
