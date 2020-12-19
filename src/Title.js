import React, { useState, useContext, useEffect } from "react";
import Input from "@material-ui/core/Input";

import { IdentContext } from "./App.js";

export default function Title() {
  const [title, setTitle] = useState("");
  const { ident } = useContext(IdentContext);

  useEffect(() => {
    if (ident === null) {
      setTitle(null);
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/activities/`, {
        credentials: "include",
      })
        .then((response) => {
          console.log("**TRY TO** SET ACTIVITIES AND FILTERS");
          if (!response.ok) {
            //setActivities(null);
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
            //setFilter(response.results.map((activity) => activity.id));
          },
          (error) => {
            setTitle("");
            console.warn(
              "Error during activities initialization fetch :",
              error
            );
          }
        );
    }
  }, [ident]);

  const changeTitle = (event) => {
    //TODO Add debounce
    console.log("setTitle", event.target.value);
    setTitle(event.target.value);
  };

  return (
    <Input
      fullWidth
      value={title}
      onChange={changeTitle}
      placeholder="Titre de la timeline"
      inputProps={{ "aria-label": "Titre de la timeline" }}
    />
  );
  //TODO i18n
}
