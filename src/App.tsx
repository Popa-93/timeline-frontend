import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import "./App.css";

import { Grid, Typography } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary";
import Title from "./Title";
import UserIdent from "./UserIdent";
import ActivityFilter from "./ActivityFilter";
import RecordList from "./RecordList";
import jwtRefreshingFetch from "./jwtRefreshingFetch";

export const IdentContext = React.createContext({
  ident: null,
  setIdent: function (newIdent: object) {}, //TODO precise the object type
});

function App() {
  const [ident, setIdent] = useState(null);

  //TODO Link activiies and filter in the same state or use Redux
  // -> Optimize / remove the crappy double rendering on update
  const [activities, setActivities] = useState([]); //Shared among ActivityFilter & ActivitySelection (in Record)
  const [filter, setFilter] = useState([]); //Shared among ActivityFilter & Record rendering (applying filter)

  const [timelineID, setTimelineID] = useState(null);
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme); //TODO -> https://material-ui.com/customization/theming/

  //TODO Remove or use for new Record Adds?
  useEffect(() => {
    const doSomethingBeforeUnload = () => {
      console.log("Closing");
    };
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  }, []);

  const updateActivity = (activityObj) => {
    const formData = new FormData();
    activityObj.avatar && formData.append("avatar", activityObj.avatar);
    activityObj.name && formData.append("name", activityObj.name);

    jwtRefreshingFetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/${activityObj.id}/`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          accept: "*/*",
        },
        body: formData,
      }
    ).then((response) => {
      if (!response.ok) {
        // TODO Cleanup this crap and manage asynch log cleanly
        console.log(
          `PATCH ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/${activityObj.id} return status ` +
            response.status +
            response.statusText
        );
        response.text().then((respBody) => {
          throw new Error(
            `PATCH ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/${activityObj.id} return status= ` +
              response.status +
              " statusText= " +
              response.statusText +
              " " +
              respBody
          );
        });
      } else {
        response.json().then((respBody) => {
          setActivities(
            activities.map((activity) =>
              activity.id === respBody.id ? respBody : activity
            )
          );
        });
      }
    });
  };

  const addActivity = (avatar, name, updateActivityIDInRecordCallBack) => {
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);

    jwtRefreshingFetch(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "*/*",
        },
        body: formData,
      }
    ).then((response) => {
      if (!response.ok) {
        // TODO Cleanup this crap and manage asynch log cleanly
        console.log(
          `POST ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/ return status ` +
            response.status +
            response.statusText
        );
        response.json().then((respBody) => {
          throw new Error(
            `POST ${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/ return status= ` +
              response.status +
              " statusText= " +
              response.statusText +
              " " +
              respBody
          );
        });
      } else {
        response.json().then((respBody) => {
          setActivities([...activities, respBody]);
          setFilter([...filter, respBody.id]);
          //Return new activity.id to allow direct use in Record
          updateActivityIDInRecordCallBack(respBody.id);
        });
      }
    });
  };

  useEffect(() => {
    if (ident === null) {
      setActivities(null);
    } else {
      jwtRefreshingFetch(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/`,
        {
          credentials: "include",
        }
      )
        .then((response) => {
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
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <Grid
            style={{
              height: "100vh",
              minWidth: "100%",
              border: "1px solid red",
            }}
            container
          >
            {/* //TODO Fix Min size for dislayed items. */}
            {/* #First line */}
            <Grid
              item
              xs={12}
              //TODO Replace % with police size + margin for header/footer + other auto
              //typography.fontsize?
              style={{ border: "1px solid black", height: "40px" }}
              //previous 10%
              container
            >
              <Grid item xs={1} style={{ height: "40px" }}>
                <p>TODO Menu/icon</p>
              </Grid>
              <Grid item xs={1} style={{ height: "40px" }} />
              <Grid
                item
                xs={8}
                container
                alignItems="center"
                style={{ height: "40px" }}
              >
                <Title timelineID={timelineID} setTimelineID={setTimelineID} />
              </Grid>
              <Grid item xs={1} style={{ height: "40px" }} />
              <Grid item xs={1}>
                <UserIdent />
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
                  {activities && (
                    <ActivityFilter
                      activities={activities}
                      filter={filter}
                      setFilter={setFilter}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid item xs={10} container justify="center" alignItems="center">
                <Grid item xs={12}>
                  <div
                    style={{
                      maxHeight: "85vh",
                      //TODO Find something else than 85vh
                      overflow: "auto",
                    }}
                  >
                    {activities && timelineID && (
                      <RecordList
                        timelineID={timelineID}
                        activities={activities}
                        addActivity={addActivity}
                        updateActivity={updateActivity}
                        filter={filter}
                      />
                    )}
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={1} container justify="center" alignItems="center">
                <Grid item xs={12}>
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
      </ErrorBoundary>
    </IdentContext.Provider>
  );
}

export default App;
