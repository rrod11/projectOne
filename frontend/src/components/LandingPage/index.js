import { useDispatch, useSelector } from "react-redux";
import { allTheSpots } from "../../store/spots";
import { useEffect } from "react";
import "./landingPage.css";
const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.Spots);
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);

  console.log("🚀 ~ file: index.js:4 ~ spot:", spots);
  function myFunction(e) {
    let x = e.clientX;
    let y = e.clientY;
    // document.getElementByClassName("tooltiptext").style.left = `${x} + "px"`;
    // document.getElementByClassName("tooltiptext").style.top = `${y} + "px"`;
  }
  return !spots ? null : (
    <div className="LPImages" onMouseMove={myFunction}>
      {spots?.map(
        ({ id, name, city, state, previewImage, avgRating, price }) => (
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
            <p>${price} /night</p>
          </div>
        )
      )}
    </div>
  );
};

export default LandingPage;
