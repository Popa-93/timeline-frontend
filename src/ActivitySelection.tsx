// @ts-nocheck
// TODO Fix this => <CachedInput> PropTypes à définir

import { useState, useRef, useCallback } from "react";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import ActivityAvatarEditor from "./ActivityAvatarEditor";
import CachedInput from "./CachedInput";

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
  const [editorOpened, setEditorOpened] = useState(false);
  const classes = useStyles();
  const focusOnActivityID = useRef(0); //0 = Falsy + not an index
  const [arrowRef, setArrowRef] = useState(null);

  const callbackRef = useCallback(
    (inputElement) => {
      //Note add condition on ArrowRef to prevent losing focus when arrowRef is initialized init
      //Damned crappy arrowRef mechanism
      if (inputElement && arrowRef) {
        inputElement.focus();
      }
    },
    [arrowRef]
  );

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
            <ListItem
              button
              onClick={() => {
                setEditorOpened(true);
              }}
            >
              <Dialog
                onMouseDown={(e) => {
                  e.stopPropagation();
                  // To prevent ripple effect on parent item
                }}
                style={{ zIndex: 2, display: "inline-block" }}
                aria-labelledby="Avatar editor"
                open={editorOpened}
                onClose={() => {
                  focusOnActivityID.current = 0;
                  setEditorOpened(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  // Dialog is closed on backdrop click
                  // This stop prevent dialog reopening (click tranmitted to parent)
                }}
              >
                <ActivityAvatarEditor
                  open={editorOpened}
                  onValidate={(newAvatar) => {
                    setEditorOpened(false);
                    props.addActivity(newAvatar, "", (activityID) => {
                      focusOnActivityID.current = activityID;
                      props.updateActivityIDInRecord(activityID);
                    });
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

              <ListItemText primary="Ajouter une catégorie" />
              {/* //TODO I18n */}
            </ListItem>
            {props.activities &&
              props.activities
                .slice()
                .reverse()
                .map((activity) => {
                  // if (activity.id === focusOnActivityID.current) {
                  //   console.log("FOCUS on ", activity.id);
                  //   focusOnActivityID.current = 0;
                  // } else {
                  //   console.log("STD inputComponent");
                  // }
                  return (
                    <ListItem
                      key={activity.id}
                      button
                      onClick={() => {
                        props.onClose();
                        props.updateActivityIDInRecord(activity.id);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar src={activity.avatar}></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        onMouseDown={(e) => {
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // To prevent item selection in list
                          // -> Allowing inline name category'name edition
                        }}
                      >
                        <CachedInput
                          inputRef={
                            activity.id === focusOnActivityID.current &&
                            callbackRef
                          }
                          fullWidth
                          value={activity.name}
                          onKeyPress={(event) => {
                            if (
                              event.key === "Enter" &&
                              focusOnActivityID.current
                            ) {
                              focusOnActivityID.current = 0;
                              props.onClose();
                            }
                          }}
                          onChange={(e) => {
                            props.updateActivity({
                              id: activity.id,
                              name: e.target.value,
                            });
                          }}
                          onBlur={() => {
                            console.log("BLUR TODO");
                            focusOnActivityID.current = 0;
                          }}
                          placeholder="Nom de la catégorie"
                          //TODO I18N
                          //{/* TODO Limit input size On all Inputs */}
                        />
                      </ListItemText>
                    </ListItem>
                  );
                })}
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
  addActivity: PropTypes.func.isRequired,
  updateActivity: PropTypes.func.isRequired,
  updateActivityIDInRecord: PropTypes.func.isRequired,
};
