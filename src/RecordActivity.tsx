// @ts-nocheck
//TODO Understand and fix this damn crao

import { useState } from "react";

import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ActivitySelection from "./ActivitySelection";
//TODO Use it for undefined
//import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

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

  return (
    <Box ref={setActivityIconRef}>
      {activityIconRef && (
        <ActivitySelection
          open={activitySelectionOpened}
          onClose={() => setActivitySelectionOpened(false)}
          activityIconRef={activityIconRef}
          activities={props.activities}
          addActivity={props.addActivity}
          updateActivity={props.updateActivity}
          updateActivityIDInRecord={props.updateActivityIDInRecord}
        />
      )}
      <IconButton
        className={classes.icon}
        aria-label="activity"
        onClick={() => setActivitySelectionOpened(true)}
      >
        {props.activities &&
          props.activities
            .filter((activity) => activity.id === props.activityID)
            .map((activity) => (
              <Tooltip
                key={activity.id}
                title={activity.name}
                placement="right"
                TransitionProps={{ timeout: 600 }}
                enterDelay={500}
              >
                <Avatar alt={activity.name} src={activity.avatar} />
              </Tooltip>
            ))}
      </IconButton>
    </Box>
  );
}

RecordActivity.propTypes = {
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  addActivity: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  activityID: PropTypes.number.isRequired,
  updateActivityIDInRecord: PropTypes.func.isRequired,
};
