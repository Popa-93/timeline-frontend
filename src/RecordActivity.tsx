// @ts-nocheck
//TODO Understand and fix this damn crao

import { useState } from "react";

import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import ActivitySelection from "./ActivitySelection";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    padding: 0,
  },
}));

export default function RecordActivity(props) {
  const classes = useStyles();
  const [activitySelectionOpened, setActivitySelectionOpened] = useState(false);
  const [activityIconRef, setActivityIconRef] = useState();

  console.log("Render RecordActivity");
  return (
    <Box ref={setActivityIconRef}>
      <ActivitySelection
        open={activitySelectionOpened}
        onClose={() => setActivitySelectionOpened(false)}
        activityIconRef={activityIconRef}
        //activitySectionRef={props.activitySectionRef}
        //TODO REmove once decided
      />
      <IconButton
        className={classes.icon}
        aria-label="activity"
        onClick={() => setActivitySelectionOpened(true)}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
    </Box>
  );
}

RecordActivity.propTypes = {
  activityID: PropTypes.number.isRequired,
  updateActivityID: PropTypes.func.isRequired,
  activitySectionRef: PropTypes.object.isRequired,
};
