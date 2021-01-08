import { useState, useRef } from "react";

import PropTypes from "prop-types";

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
  const activityIconRef = useRef();

  return (
    <div ref={activityIconRef}>
      <ActivitySelection
        open={activitySelectionOpened}
        onClose={() => setActivitySelectionOpened(false)}
        activityIconRef={activityIconRef.current}
        activitySectionRef={props.activitySectionRef}
      />
      <IconButton
        className={classes.icon}
        aria-label="activity"
        onClick={() => setActivitySelectionOpened(true)}
      >
        <HelpOutlineIcon fontSize="large" />
      </IconButton>
    </div>
  );
}

RecordActivity.propTypes = {
  activityID: PropTypes.number.isRequired,
  updateActivityID: PropTypes.func.isRequired,
  activitySectionRef: PropTypes.object.isRequired,
};
