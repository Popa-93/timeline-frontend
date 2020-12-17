import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  date: {
    margin: 0,
    padding: 0,
    color: "blue",
    backgroundColor: "rgb(90, 94, 107)",
    textAlign: "center",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "auto",
    gridTemplateAreas: `
      "Month Month Year"
      "Day Day Year"
      "Day Day Year"
      `,
  },

  dateYearContainer: {
    margin: 0,
    padding: 0,
    gridArea: "Year",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  dateYear: {
    transform: "rotate(270deg)",
    transformOrigin: "(0 0)",
    border: "1px solid white",
  },

  dateMonth: {
    gridArea: "Month",
    border: "1px solid white",
  },

  dateDay: {
    gridArea: "Day",
    border: "1px solid white",
  },
}));

export default function PrettyDateDisplay(props) {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.date}>
      <div className={classes.dateYearContainer}>
        <Typography variant="h6" className={classes.dateYear}>
          2000
        </Typography>
      </div>
      <Typography variant="h6" className={classes.dateMonth}>
        Jan
      </Typography>
      <Typography variant="h4" className={classes.dateDay}>
        12
      </Typography>
    </Paper>
  );
}
