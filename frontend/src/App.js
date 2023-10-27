import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetail";
import CreateASpot from "./components/CreateASpot";
import CurrentUserSpots from "./components/CurrentUserSpots";
import UpdateASpot from "./components/UpdateASpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} className="nav" />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/spots/new">
            <CreateASpot />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <UpdateASpot />
          </Route>
          <Route exact path="/current">
            <CurrentUserSpots />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route>
            <>
              <h1 style={{ color: "red", backgroundColor: "pink" }}>
                Page Not Found
              </h1>
              <p
                style={{
                  color: "red",
                  backgroundColor: "pink",
                }}
              >
                ________________________██████████████████__________________________________
                ____________________████▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░██__________________________________
                ______________██████▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░██________________________________
                ____________██░░░░▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░████____________________________
                ____________██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██__________________________
                ____________██░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██__________________________
                ____________██░░████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██________________________
                ____________██░░▒▒██▓▓░░░░░░░░░░░░░░░░░░░░░░░░░░░░██________________________
                ____________██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██________________________
                ______________██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██________________________
                ______________██░░░░░░░░░░░░░░░░░░░░░░░░░░░░████████________________________
                ______________██░░░░░░░░░░░░░░░░░░░░░░░░▓▓▓▓▒▒░░██__________________________
                ______________██░░░░░░░░░░████░░░░░░████▒▒░░▒▒██____________________________
                ______________██░░██░░░░░░██░░██████▒▒__▒▒▒▒▒▒██____________________________
                ______________██░░██░░░░░░██░░__▒▒__▒▒▒▒▒▒▒▒▒▒██____________________________
                ____________▓▓░░░░░░▓▓▓▓░░██░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓__________________________
                ____________██░░░░░░████░░██░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░██__________________________
                ____________██░░░░░░░░░░██░░██▒▒__▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓__________________________
                __________██░░░░░░░░░░░░░░██░░████▒▒__▒▒▒▒▒▒▒▒▒▒__▓▓________________________
                __________██░░░░░░░░░░░░░░░░██░░░░████▒▒__▒▒__▒▒████________________________
                __________██░░░░░░░░░░░░░░░░░░████░░░░██████████░░██__________________██____
                ________▓▓░░░░░░░░░░░░░░░░░░░░▒▒▒▒▓▓▓▓░░░░░░▒▒░░░░██__________________████__
                ________██░░░░░░░░░░░░░░░░░░░░░░▒▒██__██▓▓████████____________________██░░██
                ________██░░░░░░░░░░░░░░░░░░░░░░▒▒▒▒██________________________________██░░██
                ____████████░░░░░░░░░░██▒▒▓▓░░░░▒▒▒▒▒▒██______________________________██░░██
                __██░░░░░░░░░░░░░░░░██░░░░░░░░░░░░▒▒▒▒▒▒██__________________________██░░░░██
                __██░░██████░░░░░░██░░░░████░░░░░░░░▒▒▒▒▒▒████______________________██░░██__
                __████░░██░░░░░░░░██░░██░░░░░░░░░░░░▒▒▒▒▒▒▒▒▓▓██__________________██░░░░██__
                ________██░░░░░░░░████░░░░░░░░░░░░░░░░██▒▒▒▒▒▒▒▒██______________██▒▒░░░░██__
                ________██░░░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░▒▒▒▒▒▒██▓▓██______██▒▒░░░░██____
                __________██░░░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░▓▓▒▒▒▒██████▒▒░░░░░░██____
                __________██░░░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██▒▒▒▒▒▒▒▒░░░░░░██______
                ________██░░██░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░██______
                ________██░░██░░░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░░░░░░░░░██________
                ________██░░░░██░░░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░░░░░░░██__________
                ________██░░░░░░██░░░░░░░░░░░░░░░░██░░░░░░░░░░░░░░░░██░░░░░░░░██____________
                ________██░░░░░░░░██░░░░░░░░░░░░░░██░░░░░░░░░░░░░░██░░░░░░████______________
                __________██░░░░░░░░████░░░░░░░░░░░░██░░░░░░░░░░░░██░░████__________________
                __________██░░░░░░░░░░░░██████░░░░░░░░██░░░░░░░░░░████______________________
                ____________████░░░░░░░░██____████████████░░░░░░░░██________________________
                ________________██████░░░░▓▓________░░▒▒__██████░░░░██______________________
                __________________██░░░░░░██________________██░░░░░░██______________________
                __________________██░░░░░░██________________██░░░░░░██______________________
                __________________██░░░░▓▓__________________██░░░░▓▓░░______________________
                __________________██░░░░██__________________██░░░░██________________________
                ________________████░░░░██________________████░░░░▓▓________________________
                ______________██░░░░░░░░██______________██░░░░░░░░██________________________
                ______________██▓▓▓▓▓▓████______________██▓▓██▓▓▓▓██________________________
              </p>
            </>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
