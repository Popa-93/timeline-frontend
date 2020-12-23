import React, { useState, useContext, useEffect, useRef } from "react";
import TextField from "@material-ui/core/TextField";
import { debounce } from "lodash";
import { IdentContext } from "./App.js";

import PropTypes from "prop-types";

export default function Title(props) {
  const [title, setTitle] = useState("");
  const { ident } = useContext(IdentContext);
  const { timelineID, setTimelineID } = props;

  //Fetch init data from backend
  useEffect(() => {
    const postBlanckTimeline = () => {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/`, {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: "",
        }),
      })
        .then((response) => {
          console.log("**TRY TO** POST BLANCK TIMELINE ON BACKEND"); //TODO Remove
          if (!response.ok) {
            // TODO Cleanup this crap and manage asynch log cleanly
            console.log("** POST BLANCK TIMELINE ON BACKEND ** KO");
            console.log(
              "Response status ",
              response.status + " \n text " + response.statusText
            );
            response.text().then(function (text) {
              console.log("TXT =", text);
            });

            throw new Error(
              `POST ${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/ return status ` +
                response.status
            );
          }
          console.log(
            "** POST BLANCK TIMELINE ON BACKEND ** OK, reponse=",
            response
          );
          return response.json();
        })
        .then(
          (response) => {
            setTitle("");
            setTimelineID(response.id);
            return response;
          },

          (error) => {
            //TODO correct this with await to allow ErrorBoundary (usecase no server)
            console.error("Error during POST timeline on backend : ", error);
          }
        );
    };

    if (ident === null) {
      setTimelineID(null);
      setTitle("");
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/`, {
        credentials: "include",
      })
        .then((response) => {
          console.log("**TRY TO** GET Timelines");
          if (!response.ok) {
            setTimelineID(null);
            setTitle("");
            console.warn(
              `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/ return status ` +
                response.status
            );
          }
          return response.json();
        })
        .then(
          (response) => {
            console.log("** OK ** GET Timelines ** response = ", response);
            if (response.results.length > 0) {
              setTimelineID(response.results[0].id);
              setTitle(response.results[0].title); //TODO Manage multiple timeline
            } else {
              //No timelime existing for this user, create one
              postBlanckTimeline();
            }
          },
          (error) => {
            setTimelineID(null);
            setTitle("");
            console.warn("Error during timeline initialization fetch :", error);
          }
        );
    }
  }, [ident, setTimelineID]);

  //Debounce API call after onChange
  const postTitleToBackend = useRef(null);
  useEffect(() => {
    const postTitle = (id, newTitle) => {
      console.log("posttTitle, newTitle =", newTitle);
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/${id}/`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      }).then((response) => {
        console.log("**TRY TO** PATCH TIMELINE TITLE ON BACKEND"); //TODO Remove
        if (!response.ok) {
          // TODO Cleanup this crap and manage asynch log cleanly
          console.log("**PATCH TIMELINE TITLE ** KO");
          console.log(
            "Response status ",
            response.status + " \n text " + response.statusText
          );
          response.text().then(function (text) {
            console.log("TXT =", text);
          });

          throw new Error(
            `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/timelines/ return status ` +
              response.status
          );
        }
        console.log("** PATCH TIMELINE TITLE ** OK");
      });
    };

    postTitleToBackend.current = debounce(postTitle, 500);
    return postTitleToBackend.current.cancel();
  }, []);

  function changeTitle(e) {
    console.log("changeTitle called");
    setTitle(e.target.value);
    postTitleToBackend.current(timelineID, e.target.value);
  }

  // Render
  if (!ident) {
    return null;
  } else {
    return (
      <TextField
        fullWidth
        value={title}
        onChange={changeTitle}
        placeholder="Titre de la timeline"
        inputProps={{ "aria-label": "Titre de la timeline" }}
      />
    );
  }
  //TODO i18n
}

Title.propTypes = {
  timelineID: PropTypes.number,
  setTimelineID: PropTypes.func.isRequired,
};
