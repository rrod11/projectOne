import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./form.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [credentialCheck, setCredentialCheck] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          // data.message = "The provided credentials were invalid";
          setErrors(data);
        }
      });
  };
  function DemoUser() {
    setCredential("Demo-lition");
    setPassword("password");
  }
  return (
    <div className="form-container">
      <div className="login">
        <h1>Log In</h1>
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="login-form"
          onSubmit={handleSubmit}
        >
          <spam>Username or Email</spam>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />

          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errors.message && (
            <p className="errors">The provided credentials were invalid </p>
          )}

          <button
            type="submit"
            disabled={credential.length < 4 || password.length < 6}
            className="loginButton"
            style={{
              backgroundColor: "red",
              boxShadow: "3px 3px 2px #d3d3d3",
              padding: " 10px 5px",
            }}
          >
            Log In
          </button>

          <button
            style={{
              backgroundColor: "#fff",
              border: "none",
              color: "#8a8a8a",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            type="submit"
            onClick={DemoUser}
            className="demoButton"
          >
            Demo User
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
