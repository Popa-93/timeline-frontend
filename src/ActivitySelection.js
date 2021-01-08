import { useState } from "react";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1,

    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: "-0.9em",
      height: "3em",
      width: "1em",
      "&::before": {
        borderWidth: "1em 1em 1em 0",
        borderColor: `transparent ${theme.palette.background.paper} transparent transparent`,
      },
    },
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
}));

export default function ActivitySelection(props) {
  const [arrowRef, setArrowRef] = useState(null);
  const classes = useStyles();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={props.onClose}
    >
      <Popper
        className={classes.popper}
        //aria-labelledby="simple-dialog-title"
        open={props.open}
        //anchorEl={props.activityIconRef}
        anchorEl={props.activitySectionRef}
        placement={"right-start"}
        //disablePortal={false}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: "scrollParent",
          },
          arrow: {
            enabled: true,
            element: arrowRef,
          },
          offset: {
            enabled: true,
            offset: "0, 3em",
          },
        }}
      >
        <span className={classes.arrow} ref={setArrowRef} />
        <Paper elevation={3}>
          <List>
            {/* {emails.map((email) => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))} */}

            <ListItem autoFocus button onClick={() => {}}>
              <ListItemAvatar>
                <Avatar>
                  <AddIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Add category" />
              {/* //TODO I18n */}
            </ListItem>
          </List>
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
}

ActivitySelection.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  activityIconRef: PropTypes.object.isRequired,
};
