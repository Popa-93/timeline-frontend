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

function App() {
  const [filter, setFilter] = useState([]);
  const [activities, setActivities] = useState([]);

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme); //TODO -> https://material-ui.com/customization/theming/

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities`)
      .then((res) => res.json())
      .then(
        (res) => {
          setFilter(res.results.map((activity) => activity.id));
          setActivities(res.results);
        },
        (error) => {
          console.log("Error during activities initialization fetch :", error);
        }
      );
    //TODO add error processing and !!!! timeout handling !!!!
  }, []);

  return (
    <>
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
          </ErrorBoundary>
          <ErrorBoundary>
            <Timeline filter={filter} />
          </ErrorBoundary>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
