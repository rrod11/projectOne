// import React from "react";
// import { NavLink } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProfileButton from "./ProfileButton";
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
// import "./Navigation.css";

// function Navigation({ isLoaded }) {
//   const sessionUser = useSelector((state) => state.session.user);

//   let sessionLinks;
//   if (sessionUser) {
//     sessionLinks = (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     );
//   } else {
//     sessionLinks = (
//       <li>
//         <OpenModalButton
//           buttonText="Log In"
//           modalComponent={<LoginFormModal />}
//         />
//         <OpenModalButton
//           buttonText="Sign Up"
//           modalComponent={<SignupFormModal />}
//         />
//       </li>
//     );
//   }

//   return (
//     <ul>
//       <li>
//         <NavLink exact to="/">
//           Home
//         </NavLink>
//       </li>
//       {isLoaded && sessionLinks}
//     </ul>
//   );
// }

// export default Navigation;
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navigation({ isLoaded }) {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  function redirection() {
    history.push("/");
  }
  return (
    <div className="navBar">
      <a
        href="/"
        className="iconImg"
        style={{
          fontSize: "20px",
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        <img
          className="iconImg"
          src="
      https://png.pngtree.com/png-clipart/20230425/original/pngtree-3d-location-icon-clipart-in-transparent-background-png-image_9095284.png"
          onClick={redirection}
        />
        <span
          style={{ fontSize: "25px", textDecoration: "none", color: "red" }}
        >
          Renter Depot
        </span>
      </a>
      <div className="header-right">
        {sessionUser ? (
          <div>
            <a
              href="/spots/new"
              style={{
                fontSize: "20px",
                textDecoration: "none",
                cursor: "pointer",
                color: "red",
              }}
            >
              Create A New Spot
            </a>
          </div>
        ) : null}
        {isLoaded && (
          <li className="profileButton">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;
