import React, { useState } from "react";
import {
  ThemeProvider,
  createMuiTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

import "./App.css";

import { Grid, Typography } from "@material-ui/core";
import ErrorBoundary from "./ErrorBoundary";
import UserIdent from "./UserIdent";
import ActivityFilter from "./ActivityFilter";
import ActivitiesFollowup from "./ActivitiesFollowup";
import Input from "@material-ui/core/Input";

export const IdentContext = React.createContext({
  ident: null,
  setIdent: () => {},
});

function App() {
  const [ident, setIdent] = useState(null);
  const [filter, setFilter] = useState([]);

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme); //TODO -> https://material-ui.com/customization/theming/

  //TODO fetch Title

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
              <form noValidate autoComplete="off">
                <Input
                  fullWidth
                  margin="dense"
                  //id
                  //value
                  //onChange //A voir après test du submit, sinon debounce puis call
                  //onSubmit={this.persistWinner}
                  required
                  placeholder="Titre de la timeline"
                  inputProps={{ "aria-label": "Titre de la timeline" }}
                />
                {/* //TODO i18n */}
              </form>
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
                {ident && (
                  <ErrorBoundary>
                    <ActivityFilter filter={filter} setFilter={setFilter} />
                  </ErrorBoundary>
                )}
              </Grid>
            </Grid>
            <Grid item xs={10} container justify="center" alignItems="center">
              <Grid item xs={12}>
                <ErrorBoundary>
                  <div
                    style={{
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
    </IdentContext.Provider>
  );
}

export default App;
