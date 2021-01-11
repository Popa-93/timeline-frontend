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

export const IdentContext = React.createContext({
  ident: null,
  setIdent: function(newIdent: object) : void {}, //TODO precise the object type
});

function App() {
  const [ident, setIdent] = useState(null);
  const [filter, setFilter] = useState([]);
  const [timelineID, setTimelineID] = useState(null);
  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme); //TODO -> https://material-ui.com/customization/theming/

  useEffect(() => {
    const doSomethingBeforeUnload = () => {
      console.log("Closing");
    };
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      return doSomethingBeforeUnload();
    });
  }, []);

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
                {ident && (
                  
                    <ActivityFilter filter={filter} setFilter={setFilter} />
                  
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
                    <RecordList filter={filter} />
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
