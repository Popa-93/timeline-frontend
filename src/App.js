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
import Timeline from "./Timeline";

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
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities`)
      .then((response) => {
        console.log("**TRY TO** SET ACTIVITIES AND FILTERS");
        if (!response.ok) {
          /*
          throw new Error(
            `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities return status ` +
              response.status
          );
          //Reactivate after moving it in an error boundary
          */
          throw "Baaa"; // TODO remove
        }
        return response.json();
      })
      .then(
        (response) => {
          setFilter(response.results.map((activity) => activity.id));
          setActivities(response.results);
        },
        (error) => {
          /*
          throw new Error(
            "Error during activities initialization fetch :",
            error
          );
                //Reactivate after moving it in an error boundary
               */
        }
      );
    //TODO add error processing and !!!! timeout handling !!!!
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
        <div className="main">
          <ErrorBoundary>
            <SkillSelector
              activities={activities}
              filter={filter}
              setFilter={setFilter}
            ></SkillSelector>
            <p>{ident ? "Identified" : "No ident"}</p>
          </ErrorBoundary>
          {/*
          <ErrorBoundary>
            <Timeline filter={filter} />
          </ErrorBoundary>
          */}
        </div>
      </ThemeProvider>
    </IdentContext.Provider>
  );
}

export default App;
