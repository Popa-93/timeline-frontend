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

export default function ActivityAvatarEditor(props) {
  const [avatar, setAvatar] = useState(null);
  const [allowValidation, setAllowValidation] = useState(false);

  const classes = useStyles();

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={props.onClose}
    >
      <Popper
        style={{ zIndex: 2 }}
        className={classes.popper}
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
            onCrop={(avatar) => {
              setAllowValidation(true);
              setAvatar(avatar);
              props.setNewAvatar(avatar);
            }}
            //onBeforeFileLoad={this.onBeforeFileLoad}
            src=""
          />
        </Paper>
      </Popper>
    </ClickAwayListener>
  );
}

ActivityAvatarEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object.isRequired,
  setNewAvatar: PropTypes.func.isRequired,
  onClose : PropTypes.func.isRequired,
};
