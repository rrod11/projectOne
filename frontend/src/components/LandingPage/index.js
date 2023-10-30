import { useDispatch, useSelector } from "react-redux";
import { allTheSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./landingPage.css";
const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots);
  const spotArr = Object.values(spots);
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);
  if (!spotArr.length) return null;

  return (
    <div className="spot-container">
      {spotArr.map(
        ({ id, name, city, state, previewImage, avgRating, price }) => (
          <div className="individual-spot">
            <a
              href={`/spots/${id}`}
              key={id}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div key={id} className="spot-tile">
                <img
                  src={previewImage}
                  className="spot-image"
                  alt="id in case"
                />
                <div className="houseInfo">
                  <div className="spot-tile-details">
                    <p>
                      {city}, {state}
                    </p>
                    <p className="spot-tile-rating">
                      <i className="fa-solid fa-star"></i>
                      {avgRating ? (
                        <p>{parseFloat(`${avgRating}`).toFixed(2)}</p>
                      ) : (
                        <p>New</p>
                      )}
                    </p>
                  </div>
                  <div className="spot-tile-price">
                    <p style={{ margin: "5px 0" }}>
                      <span style={{ fontWeight: "bold" }}>${price}</span>
                      {` /night`}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        )
      )}
    </div>
    // <div className="LPImages">
    //   {spotArr.map(
    //     ({ id, name, city, state, previewImage, avgRating, price }) => (
    //       <>
    //         <div key={id} className="imageDiv">
    //           <NavLink to={`/spots/${id}`} key={id}>
    //             <div className="tooltip" title={name}>
    //               <img
    //                 src={previewImage}
    //                 className="actualImages"
    //                 alt="id in case"
    //               />
    //               <p className="tooltiptext">{name}</p>
    //             </div>
    //           </NavLink>
    //           <div className="houseInfo">
    //             <div>
    //               <p>
    //                 {city}, {state}
    //               </p>
    //               <p style={{ margin: "5px 0" }}>
    //                 <span style={{ fontWeight: "bold" }}>${price}</span>
    //                 {` /night`}
    //               </p>
    //             </div>
    //             <div className="ratingInfo">
    //               <i className="fa-solid fa-star"></i>
    //               {avgRating ? (
    //                 <p>{parseFloat(`${avgRating}`).toFixed(2)}</p>
    //               ) : (
    //                 <p>New</p>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </>
    //     )
    //   )}
    // </div>
  );
};

export default LandingPage;
