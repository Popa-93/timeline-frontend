import React, { useState, useEffect } from "react";

import "./App.css";

import ErrorBoundary from "./ErrorBoundary";
import SkillSelector from "./SkillSelector";
import Timeline from "./Timeline";

function App() {
  const [filter, setFilter] = useState([]);
  const [activities, setActivities] = useState([]);

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
  }, []); //Specify no dependency to ensure there this hook only run once at initialization

  return (
    <>
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
    </>
  );
}

export default App;
