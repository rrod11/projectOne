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
      {spots?.map((ele) => (
        <div key={ele.id} className="imageDiv">
          <div className="tooltip">
            <img src={ele.previewImage} className="actualImages" />
            <p className="tooltiptext">{ele.name}</p>
          </div>
          <div className="houseInfo">
            <p>
              {ele.city}, {ele.state}
            </p>
            <di className="ratingInfo">
              <i class="fa-solid fa-moon"></i>
              <p>{parseFloat(`${ele.avgRating}`).toFixed(2)}</p>
            </di>
          </div>
          <p>${ele.price} /night</p>
        </div>
      ))}
    </div>
  );
};

export default LandingPage;
