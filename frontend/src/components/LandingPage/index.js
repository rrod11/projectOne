import { useDispatch, useSelector } from "react-redux";
import { allTheSpots } from "../../store/spots";
import { useEffect } from "react";

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.Spots);
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);

  console.log("🚀 ~ file: index.js:4 ~ spot:", spots);
  return !spots ? null : (
    <div className="LPImages">
      {spots?.map((ele) => (
        <div key={ele.id}>
          <img src={ele.previewImage} className="actualImages" />
          <div className="houseInfo">
            <p>{ele.name}</p>
            <di className="ratingInfo">
              <i class="fa-solid fa-moon"></i>
              <p>{parseFloat(`${ele.avgRating}`).toFixed(2)}</p>
            </di>
          </div>
          <p>${ele.price} /night</p>
        </div>
      ))}
      FOUND ME
    </div>
  );
};

export default LandingPage;
