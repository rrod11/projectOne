import { useDispatch, useSelector } from "react-redux";
import { allTheSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import "./landingPage.css";
const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.Spots);
  console.log("🚀 ~ file: index.js:9 ~ LandingPage ~ spots:", spots);
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);

  // function myFunction(e) {
  //   let x = e.clientX;
  //   let y = e.clientY;
  //   // document.getElementByClassName("tooltiptext").style.left = `${x} + "px"`;
  //   // document.getElementByClassName("tooltiptext").style.top = `${y} + "px"`;
  // }
  return !spots ? null : (
    <div className="LPImages">
      {spots?.map(
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
          </NavLink>
        )
      )}
    </div>
  );
};

export default LandingPage;
