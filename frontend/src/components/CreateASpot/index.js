import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createASpot } from "../../store/spots";

function CreateASpot({ formType = "Create A Spot" }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState(80.76);
  const [longitude, setLongitude] = useState(50.34);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});
  console.log("🚀 ~ file: index.js:10 ~ CreateASpot ~ user:", user);
  const imgs = [];
  if (image1) {
    imgs.push(image1);
    if (image2) imgs.push(image2);
    if (image3) imgs.push(image3);
    if (image4) imgs.push(image4);
    if (image5) imgs.push(image5);
  }
  const spotObj = {
    ownerId: user.id,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors && !Object.values(errors).length) {
      setLatitude(80.75);
      setLongitude(50.85);
      const res = await dispatch(createASpot(spotObj, imgs));
      console.log("🚀 ~ file: index.js:48 ~ handleSubmit ~ res:", res);
      history.push(`/spots/${res.id}`);
    } else {
      console.log("ERRORS PRESENT");
    }
  };
  //   useEffect(() => {
  //     dispatch(createASpot());
  //   }, [dispatch]);
  function checkCredentials() {
    const errObj = {};
    if (!country) errObj.country = "Country is required";
    if (!address) errObj.address = "Address is required";
    if (!city) errObj.city = "City is required";
    if (!state) errObj.state = "State is required";
    if (description.length < 30)
      errObj.description = "Description needs 30 or more characters";
    if (!title) errObj.name = "Name is required";
    if (isNaN(price) || price < 1) errObj.price = "Price per night is required";
    // if (image1.endsWith(".jpg" || ".jpeg" || ".png"))
    // errObj.image1 = "Preview Image must end with .jpg, .jpeg, or .png";
    if (!image1 || image1) {
      if (image1.endsWith(".jpg")) {
        setErrors(errObj);
      } else if (image1.endsWith(".jpeg")) {
        setErrors(errObj);
      } else if (image1.endsWith(".png")) {
        setErrors(errObj);
      } else {
        errObj.image1 = "Preview Image must end with .jpg, .jpeg, or .png";
      }
    }

    // setErrors(errObj);
  }
  return (
    <>
      <h1>Create a New Spot</h1>
      <form onSubmit={handleSubmit}>
        <h2>Where's your place located</h2>
        <p>
          Guests will only get your exact address once they booked a reservation
        </p>
        <label>
          Country
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        {errors.country && <p className="errors">{errors.country}</p>}

        <label>
          Street Address
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        {errors.address && <p className="errors">{errors.address}</p>}

        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        {errors.city && <p className="errors">{errors.city}</p>}
        <label>
          State
          <input
            type="text"
            placeholder="STATE"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        {errors.state && <p className="errors">{errors.state}</p>}

        <label>
          Latitude
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>

        <label>
          Longitude
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <h2>Describe your place to guests</h2>
        <p>
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
        <h2>Create a title for your spot</h2>
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
        <h2>Set a base price for your spot</h2>
        <p>
          Competitive pricing can help your listing stand out and rank higher in
          search results
        </p>
        <label>
          $
          <input
            type="text"
            placeholder="Price per night (USD)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        {errors.price && <p className="errors">{errors.price}</p>}
        <h2>Liven up your spot with photos</h2>
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

        <button
          type="submit"
          onClick={checkCredentials}
          className="loginButton"
        >
          Create Spot
        </button>
      </form>
    </>
  );
}
// "proxy": "http://localhost:8000",
export default CreateASpot;
