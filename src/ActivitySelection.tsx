import { useState } from "react";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import ActivityAvatarEditor from "./ActivityAvatarEditor";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 1,
    display: "inline-block",

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
  const [editorOpened, setEditorOpened] = useState(false);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newAvatarName, setNewAvatarName] = useState("");
  const classes = useStyles();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={() => {
        props.onClose();
      }}
    >
      <Popper
        className={classes.popper}
        //aria-labelledby="simple-dialog-title"
        open={props.open}
        anchorEl={props.activityIconRef}
        placement={"right-start"}
        modifiers={{
          hide: {
            enabled: false,
          },
          preventOverflow: {
            enabled: false,
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
        <Paper variant="outlined">
          <List>
            {props.activities &&
              props.activities.map((activity) => {
                return (
                  <ListItem
                    key={activity.id}
                    button
                    onClick={() => props.updateActivityID(activity.id)}
                  >
                    <ListItemAvatar>
                      <Avatar src={activity.avatar}></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log("Edit cat name");
                      }}
                    >
                      <Input
                        fullWidth
                        disableUnderline
                        //readOnly To switch mode TODO
                        value={activity.name}
                        onChange={
                          //TODO
                          (e) => props.setNewAvatarName(e.target.value)
                        }
                        placeholder="Titre"
                        //TODO I18N
                      />
                      {/* TODO Limit input size On all Inputs */}
                    </ListItemText>
                  </ListItem>
                );
              })}
            <ListItem
              autoFocus
              button
              onClick={() => {
                setEditorOpened(true);
              }}
            >
              <Dialog
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                style={{ zIndex: 2, display: "inline-block" }}
                aria-labelledby="Avatar editor"
                open={editorOpened}
                onClose={() => {
                  setEditorOpened(false);
                  props.onClose();
                }}
              >
                <ActivityAvatarEditor
                  open={editorOpened}
                  setNewAvatar={(newAvatar) => {
                    setEditorOpened(false);
                  }}
                  onClose={() => {
                    setEditorOpened(false);
                  }}
                />
              </Dialog>
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
  activities: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActivities: PropTypes.func.isRequired,
  updateActivityID: PropTypes.func.isRequired,
};
