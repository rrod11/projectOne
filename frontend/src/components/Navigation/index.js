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
      <NavLink
        to="/"
        className="iconImg"
        style={{
          fontSize: "20px",
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <img
          className="iconImg"
          src="
      https://png.pngtree.com/png-clipart/20230425/original/pngtree-3d-location-icon-clipart-in-transparent-background-png-image_9095284.png"
          onClick={redirection}
        />
        <span style={{ fontSize: "30px" }}>Renter Depot</span>
      </NavLink>
      <ul>
        {isLoaded && (
          <li className="profileButton">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navigation;
