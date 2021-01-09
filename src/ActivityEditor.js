import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AvatarEdit from "react-avatar-edit";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popper: {
    zIndex: 99, //Ignored
    backgroundColor: "red",
    width: "800px",

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
}));

export default function ActivityEditor(props) {
  const [avatar, setAvatar] = useState();
  const [src, setSrc] = useState();
  const classes = useStyles();

  return (
    console.log("classes.popper =", classes.popper) || (
      <ClickAwayListener
        mouseEvent="onMouseDown"
        touchEvent="onTouchStart"
        onClickAway={props.onClose}
      >
        <Popper
          style={{ zIndex: 2 }}
          classes={classes.popper}
          aria-labelledby="simple-dialog-title"
          open={props.open}
          anchorEl={props.anchorEl}
          placement={"right-start"}
          //   modifiers={{
          //     flip: {
          //       enabled: true,
          //     },
          //     preventOverflow: {
          //       enabled: true,
          //       boundariesElement: "scrollParent",
          //     },
          //     offset: {
          //       enabled: true,
          //       offset: "0, -40px",
          //     },
          //   }}
        >
          <Paper variant="outlined">
            <AvatarEdit
              width={390}
              height={295}
              onCrop={(avatar) => setAvatar(avatar)}
              onClose={() => setAvatar(null)}
              //onBeforeFileLoad={this.onBeforeFileLoad}
              src={src}
            />
          </Paper>
        </Popper>
      </ClickAwayListener>
    )
  );
}

ActivityEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
