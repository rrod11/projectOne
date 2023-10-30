import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { allTheSpots, updateASpot } from "../../store/spots";

function UpdateASpot({ formType = "Update A Spot" }) {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  console.log("🚀 ~ file: index.js:13 ~ UpdateASpot ~ spotId:", spotId);
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots);
  const targets = Object.values(spots);
  console.log("🚀 ~ file: index.js:16 ~ UpdateASpot ~ targets:", targets);
  const spot = targets.find((target) => target?.id == spotId);
  const userTruth = user?.id == spot?.ownerId;
  console.log("🚀 ~ file: index.js:17 ~ UpdateASpot ~ userTruth:", userTruth);
  console.log("🚀 ~ file: index.js:16 ~ UpdateASpot ~ spot:", spot);
  const stock = {
    city: spot?.city,
    address: spot?.address,
    country: spot?.country,
    description: spot?.description,
    name: spot?.name,
    previewImage: spot?.previewImage,
    price: spot?.price,
    state: spot?.state,
    lat: spot?.lat,
    lng: spot?.lng,
  };

  const history = useHistory();

  const [country, setCountry] = useState(stock.country);
  const [address, setAddress] = useState(stock.address);
  const [city, setCity] = useState(stock.city);
  const [state, setState] = useState(stock.state);
  const [latitude, setLatitude] = useState(stock.lat);
  const [longitude, setLongitude] = useState(stock.lng);
  const [description, setDescription] = useState(stock.description);
  const [title, setTitle] = useState(stock.name);
  const [price, setPrice] = useState(stock.price);
  const [image1, setImage1] = useState(stock.previewImage);
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});
  const imgs = [];
  if (image1) {
    imgs.push(image1);
    if (image2) imgs.push(image2);
    if (image3) imgs.push(image3);
    if (image4) imgs.push(image4);
    if (image5) imgs.push(image5);
  }
  const spotObj = {
    ownerId: user?.id,
    country,
    address,
    city,
    state,
    lat: latitude,
    lng: longitude,
    description,
    name: title,
    price,
    previewImage: image1,
  };
  // const authorized = spot?.id == user.id

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors && !Object.values(errors).length) {
      const res = await dispatch(updateASpot(spotObj, imgs, spotId));
      history.push(`/spots/${spotId}`);
    }
  };
  function checkCredentials() {
    const errObj = {};
    if (!country) errObj.country = "Country is required";
    if (!address) errObj.address = "Address is required";
    if (!city) errObj.city = "City is required";
    if (!state) errObj.state = "State is required";
    if (description.length < 30)
      errObj.description = "Description needs 30 or more characters";
    if (!title) errObj.name = "Name is required";
    if (
      (latitude && isNaN(latitude)) ||
      (latitude && latitude > 90) ||
      (latitude && latitude < -90)
    )
      errObj.latitude = "Latitude must be a number between -90 and 90";
    if (
      (longitude && isNaN(longitude)) ||
      (longitude && longitude > 180) ||
      (longitude && longitude < -180)
    )
      errObj.longitude = "Longitude must be a number between -180 and 180";
    if (!price) errObj.price = "Price per night is required";
    if (price < 1) errObj.price = "Price cannot be less than $1";

    setErrors(errObj);
  }
  useEffect(() => {
    dispatch(allTheSpots());
  }, [dispatch]);
  return !user || !userTruth ? (
    <div
    // style={{ maxHeight: "1vh", maxWidth: "1vw" }}
    >
      <h1>Real Recognize Real and You looking REAL unfamiliar</h1>
      <p style={{ display: "flex", flexDirection: "column" }}>
        <span>
          ░░░░██████████████████████████████████████████████░░░░░░░░░░
        </span>
        <span>
          ░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░
        </span>
        <span>
          ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░
        </span>
        <span>
          ██░░░░██████░░░░██████░░██░░░░░░██░░██████░░░░██░░░░██░░░░░░
        </span>
        <span>
          ██░░░░██░░░░██░░██░░██░░██░░░░░░██░░██░░░░██░░██░░░░██░░░░░░
        </span>
        <span>
          ██░░░░████████░░██████░░██░░██░░██░░████████░░██░░░░██░░░░░░
        </span>
        <span>
          ██░░░░██░░██░░░░██░░██░░██░░██░░██░░██░░██░░░░░░░░░░██░░░░░░
        </span>
        <span>
          ██░░░░██░░░░██░░██░░██░░░░██░░██░░░░██░░░░██░░██░░░░██░░░░░░
        </span>
        <span>
          ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░
        </span>
        <span>
          ░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░
        </span>
        <span>
          ░░░░██████████████████░░░░░░██████████████████████░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░██░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░██░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░▓▓▒▒▒▒▓▓▒▒▒▒▒▒██░░▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒████▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░▒▒▒▒░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░▒▒▒▒▒▒░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▒▒░░▒▒
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒▒▒░░▒▒▒▒▒▒░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░░▒▒▒▒░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒░░░░░░▒▒░░░░░░░░░░░░░░
        </span>
        <span>
          ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒░░░░▒▒▒▒░░░░░░░░░░░░░░
        </span>
      </p>
    </div>
  ) : (
    <div className="createForm">
      <div className="create-a-spot">
        <form className="createSpot" onSubmit={handleSubmit}>
          <h1>Create a New Spot</h1>
          <h3 style={{ margin: "10px 0" }}>Where's your place located</h3>
          <p style={{ marginBottom: "20px" }}>
            Guests will only get your exact address once they booked a
            reservation
          </p>
          <label>Country</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
          {errors.country && <p className="errors">{errors.country}</p>}

          <label>Street Address</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {errors.address && <p className="errors">{errors.address}</p>}

          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          {errors.city && <p className="errors">{errors.city}</p>}
          <label>State</label>
          <input
            type="text"
            placeholder="STATE"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          {errors.state && <p className="errors">{errors.state}</p>}

          <label>Latitude</label>
          <input
            type="number"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          {errors.latitude && <p className="errors">{errors.latitude}</p>}

          <label>Longitude</label>
          <input
            type="number"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          {errors.longitude && <p className="errors">{errors.longitude}</p>}
          <span className="lineCutter"></span>
          <h3>Describe your place to guests</h3>
          <p style={{ margin: "10px 0" }}>
            Mention the best features of your space, any special amenities like
            fast wifi or parking, and what you love about the neighborhood
          </p>
          <label>
            <textarea
              type="textarea"
              placeholder="Please write at least 30 characters"
              cols="40"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          {errors.description && <p className="errors">{errors.description}</p>}
          <span className="lineCutter"></span>
          <h3>Create a title for your spot</h3>
          <p>
            Catch guests' attention with a spot title that highlights what makes
            your place special
          </p>
          <label>
            <input
              type="text"
              placeholder="Name of your spot"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          {errors.name && <p className="errors">{errors.name}</p>}
          <span className="lineCutter"></span>
          <h3>Set a base price for your spot</h3>
          <p>
            Competitive pricing can help your listing stand out and rank higher
            in search results
          </p>
          <label>
            $
            <input
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          {errors.price && <p className="errors">{errors.price}</p>}
          <span className="lineCutter"></span>
          <h3>Liven up your spot with photos</h3>
          <p>Submit a link to at least one photo to publish your spot</p>
          <label>
            <input
              type="text"
              placeholder="Preview Image URL"
              value={image1}
              onChange={(e) => setImage1(e.target.value)}
              required
            />
          </label>
          {errors.image1 && <p className="errors">{errors.image1}</p>}
          <label>
            <input
              type="text"
              placeholder="Image URL"
              value={image2}
              onChange={(e) => setImage2(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Image URL"
              value={image3}
              onChange={(e) => setImage3(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Image URL"
              value={image4}
              onChange={(e) => setImage4(e.target.value)}
            />
          </label>
          <label>
            <input
              type="text"
              placeholder="Image URL"
              value={image5}
              onChange={(e) => setImage5(e.target.value)}
            />
          </label>
          <span className="lineCutter"></span>

          <button
            type="submit"
            onClick={checkCredentials}
            className="loginButton"
            style={{
              alignSelf: "center",
              backgroundColor: "red",
              color: "white",
              padding: "10px 0",
              width: "100px",
            }}
          >
            Create Spot
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateASpot;
