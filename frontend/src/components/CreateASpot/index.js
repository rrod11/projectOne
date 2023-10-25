import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateASpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [image5, setImage5] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    // if (errors != {}) {
    //   return dispatch(sessionActions.login({ credential, password }))
    //     .then(closeModal)
    //     .catch(async (res) => {
    //       const data = await res.json();
    //       if (data && data.message) {
    //         // data.message = "The provided credentials were invalid";
    //         setErrors(data);
    //       }
    //     });
    // }
    // else {
    history.push(`/spots/`);
    // }
  };

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
        {errors.country && <p className="errors">Country is required </p>}

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
          //   disabled={credential.length < 4 || password.length < 6}
          className="loginButton"
        >
          Create Spot
        </button>
      </form>
    </>
  );
}

export default CreateASpot;
