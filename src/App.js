import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import "./App.css";

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
        <ErrorBoundary>
          <UserIdent />
        </ErrorBoundary>
        <div>
          {/* <ErrorBoundary>
            <SkillSelector
              activities={activities}
              filter={filter}
              setFilter={setFilter}
            ></SkillSelector>
            <p>{ident ? "Identified" : "No ident"}</p>
          </ErrorBoundary> */}

          <ErrorBoundary>
            <ActivitiesFollowup filter={filter} />
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </IdentContext.Provider>
  );
}

export default App;
