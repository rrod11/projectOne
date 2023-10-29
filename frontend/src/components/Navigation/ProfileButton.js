// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import * as sessionActions from "../../store/session";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className="dropdown" className={ulClassName} ref={ulRef}>
//         <li>{user.username}</li>
//         <li>
//           {user.firstName} {user.lastName}
//         </li>
//         <li>{user.email}</li>
//         <li>
//           <button onClick={logout}>Log Out</button>
//         </li>
//       </ul className="dropdown">
//     </>
//   );
// }

// export default ProfileButton;
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button style={{}} onClick={openMenu}>
        <i class="fa-solid fa-bars" style={{ fontSize: "20px" }}></i>
        <i className="fas fa-user-circle" style={{ fontSize: "22px" }}></i>
      </button>

      <ul className="dropdown" className={ulClassName} ref={ulRef}>
        {user ? (
          <ul className="dropdown">
            {/* <li>{user.username}</li> */}
            <li>Hello, {user.firstName}</li>
            <li style={{ borderBottom: "1px solid black" }}>{user.email}</li>
            <li>
              <a to="/current">
                <button
                  style={{
                    height: "40px",
                    width: "80px",
                    border: "0px solid transparent",
                    backgroundColor: "transparent",
                    width: "100%",
                  }}
                >
                  Manage Spots
                </button>
              </a>
            </li>
            <li>
              <button onClick={logout}>Log Out</button>
            </li>
          </ul>
        ) : (
          <ul className="dropdown">
            <li>
              <OpenModalButton
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </li>
          </ul>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch } from "react-redux";
// import * as sessionActions from "../../store/session";
// import OpenModalMenuItem from "./OpenModalMenuItem";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";

// function ProfileButton({ user }) {
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const ulRef = useRef();

//   const openMenu = () => {
//     if (showMenu) return;
//     setShowMenu(true);
//   };

//   useEffect(() => {
//     if (!showMenu) return;

//     const closeMenu = (e) => {
//       if (!ulRef.current.contains(e.target)) {
//         setShowMenu(false);
//       }
//     };

//     document.addEventListener("click", closeMenu);

//     return () => document.removeEventListener("click", closeMenu);
//   }, [showMenu]);

//   const closeMenu = () => setShowMenu(false);

//   const logout = (e) => {
//     e.preventDefault();
//     dispatch(sessionActions.logout());
//     closeMenu();
//   };

//   const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

//   return (
//     <>
//       <button onClick={openMenu}>
//         <i className="fas fa-user-circle" />
//       </button>
//       <ul className="dropdown" className={ulClassName} ref={ulRef}>
//         {user ? (
//           <>
//             <li>{user.username}</li>
//             <li>
//               {user.firstName} {user.lastName}
//             </li>
//             <li>{user.email}</li>
//             <li>
//               <button onClick={logout}>Log Out</button>
//             </li>
//           </>
//         ) : (
//           <>
//             <OpenModalMenuItem
//               itemText="Log In"
//               onItemClick={closeMenu}
//               modalComponent={<LoginFormModal />}
//             />
//             <OpenModalMenuItem
//               itemText="Sign Up"
//               onItemClick={closeMenu}
//               modalComponent={<SignupFormModal />}
//             />
//           </>
//         )}
//       </ul className="dropdown">
//     </>
//   );
// }

// export default ProfileButton;
