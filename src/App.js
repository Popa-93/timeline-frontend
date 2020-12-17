import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import "./App.css";

import { Grid, Paper, Typography, Toolbar } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary";
import UserIdent from "./UserIdent";
import SkillSelector from "./SkillSelector";
import ActivitiesFollowup from "./ActivitiesFollowup";

export const IdentContext = React.createContext({
  ident: null,
  setIdent: () => {},
});

function App() {
  const [filter, setFilter] = useState([]);
  const [activities, setActivities] = useState([]);
  const [ident, setIdent] = useState(null);

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme); //TODO -> https://material-ui.com/customization/theming/

  //TODO Not the right place, move this in SkillSelector
  // CAre to separate filter and activity list

  useEffect(() => {
    if (ident === null) {
      setActivities(null);
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/`, {
        credentials: "include",
      })
        .then((response) => {
          console.log("**TRY TO** SET ACTIVITIES AND FILTERS");
          if (!response.ok) {
            setActivities(null);
            console.warn(
              `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/ return status ` +
                response.status
            );
          }
          return response.json();
        })
        .then(
          (response) => {
            console.log("** OK ** SET ACTIVITIES AND FILTERS ** ");
            setFilter(response.results.map((activity) => activity.id));
            setActivities(response.results);
          },
          (error) => {
            setActivities(null);
            console.warn(
              "Error during activities initialization fetch :",
              error
            );
          }
        );
    }
  }, [ident]);

  return (
    <IdentContext.Provider
      value={{
        ident: ident,
        setIdent: setIdent,
      }}
    >
      <ThemeProvider theme={theme}>
        <Grid
          style={{ height: "100vh", minWidth: "100%", border: "1px solid red" }}
          container
        >
          {/* //TODO Fix Min size for dislayed items. */}
          {/* #First line */}
          <Grid
            item
            xs={12}
            //TODO Replace % with police size + margin for header/footer + other auto
            //typography.fontsize?
            style={{ border: "1px solid black", height: "10%" }}
            container
          >
            <Grid item xs={1}>
              <p>TODO Menu/icon</p>
            </Grid>
            <Grid item xs={1} style={{ border: "1px solid black" }} />
            <Grid item xs={8}>
              <Typography variant="h3">
                TODO Ma timeline(editable direct)
              </Typography>
            </Grid>
            <Grid item xs={1} style={{ border: "1px solid black" }} />
            <Grid item xs={1}>
              <ErrorBoundary>
                <UserIdent />
              </ErrorBoundary>
            </Grid>
          </Grid>
          {/* Main Grid */}
          <Grid
            item
            xs={12}
            style={{ border: "1px solid blue", height: "85%" }}
            container
          >
            <Grid item xs={1} container justify="center" alignItems="center">
              <Grid item xs={12}>
                <p style={{ border: "1px solid black" }}>TODO Filtres</p>
              </Grid>
            </Grid>
            <Grid item xs={10} container justify="center" alignItems="center">
              <Grid item xs={12}>
                <ErrorBoundary>
                  <div
                    style={{
                      backgroundColor: "green",
                      maxHeight: "85vh",
                      //TODO Find something else than 85vh
                      overflow: "auto",
                    }}
                  >
                    <ActivitiesFollowup filter={filter} />
                  </div>
                </ErrorBoundary>
              </Grid>
            </Grid>
            <Grid item xs={1} container justify="center" alignItems="center">
              <Grid xs={12}>
                <p style={{ border: "1px solid black" }}>TODO nav timeline</p>
              </Grid>
            </Grid>
          </Grid>

          {/* Footer */}
          <Grid
            item
            xs={12}
            style={{ border: "1px solid orange", height: "5%" }}
            container
          >
            <Grid item xs={12} style={{ height: "10%" }}>
              <Typography align="center">
                TODO Mon footer(License + mon contact)
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </IdentContext.Provider>
  );
}

export default App;
/* <ErrorBoundary>
                    <SkillSelector
                      activities={activities}
                      filter={filter}
                      setFilter={setFilter}
                    ></SkillSelector>
                    <p>{ident ? "Identified" : "No ident"}</p>
                  </ErrorBoundary> */
