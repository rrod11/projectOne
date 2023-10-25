import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function CreateASpot() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [credentialCheck, setCredentialCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    if (errors != {}) {
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.message) {
            // data.message = "The provided credentials were invalid";
            setErrors(data);
          }
        });
    } else {
      history.push(`/spots/`);
    }
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
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>

        <label>
          Street Address
          <input
            type="text"
            placeholder="Address"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          City
          <input
            type="text"
            placeholder="City"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          State
          <input
            type="text"
            placeholder="STATE"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          Latitude
          <input
            type="text"
            placeholder="Latitude"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          Longitude
          <input
            type="text"
            placeholder="Longitude"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <h2>Liven up your spot with photos</h2>
        <p>Submit a link to at least one photo to publish your spot</p>
        <label>
          <input
            type="text"
            placeholder="Preview Image URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label>
          <input
            type="text"
            placeholder="Image URL"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {errors.message && (
          <p className="errors">The provided credentials were invalid </p>
        )}

        <button
          type="submit"
          disabled={credential.length < 4 || password.length < 6}
          className="loginButton"
        >
          Create Spot
        </button>
      </form>
    </>
  );
}

export default CreateASpot;
