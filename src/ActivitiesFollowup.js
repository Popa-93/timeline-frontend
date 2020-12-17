import React, { useContext, useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import FastfoodIcon from "@material-ui/icons/Fastfood"; //TODO replace
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

import { IdentContext } from "./App";
import PrettyDateDisplay from "./PrettyDateDisplay";

const useStyles = makeStyles((theme) => ({
  main: {
    width: "80%",
  },
  itemcontent: {
    textAlign: "left",
    //TODO Add header de couleur + activité = couleur
  },
}));

function ActivitiesFollowup(props) {
  const classes = useStyles();
  const { ident } = useContext(IdentContext);
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false); //TODO add loading spinner

  //TODO Create a custom hook to handle fetch
  // -> https://www.robinwieruch.de/react-hooks-fetch-data

  useEffect(() => {
    setIsLoading(true);
    if (!ident) {
      setRecords(null);
    } else {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/records/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(
          (res) => {
            setRecords(res.results);
            setIsLoading(false);
          },
          (error) => {
            setRecords(null);
            throw new Error(
              "Error during records initialization fetch :",
              error
            );
            // TODO Display image in place of component using missing datas
          }
        );
    }
    setIsLoading(false);
  }, [ident]);

  return (
    <Fragment>
      {isLoading ? <p>Loading</p> : <p>Not loading</p>}
      <Timeline align="alternate">
        {records &&
          records
            .filter((record) => props.filter.includes(record.activity))
            .map((record) => (
              <TimelineItem>
                <TimelineOppositeContent>
                  <PrettyDateDisplay date={record.date} />
                  {/* //TODO Sprite date */}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot>
                    {/* variant="outlined" TODO decide*/}
                    <FastfoodIcon />
                    {/* <Typography>{record.activity}</Typography> */}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper
                    elevation={3}
                    className={`${classes.paper} ${classes.itemcontent}`}
                  >
                    <Typography variant="h6" component="h1">
                      {record.title}
                    </Typography>
                    <Typography>{record.description}</Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
      </Timeline>
    </Fragment>
  );
}

ActivitiesFollowup.propTypes = {
  filter: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default ActivitiesFollowup;
