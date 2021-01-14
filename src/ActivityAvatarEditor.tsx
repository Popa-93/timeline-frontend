import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import AvatarEdit from "react-avatar-edit";
import { styled, useTheme } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import PropTypes from "prop-types";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const StyledPaper= styled(Paper)(spacing);

const useStyles = makeStyles((theme) => ({
  validateButton: {
    color: "white",
    minWidth: 20,
    width: 20,
    minHeight: 20,
    height: 20,
    position: 'absolute',
    zIndex: 999,
    cursor: 'pointer',
    right: theme.spacing(1) + 10,
    top: theme.spacing(1) + 10,
    backgroundColor: "transparent",
    border: "none"
  }

}));

export default function ActivityAvatarEditor(props) {
  const [allowValidation, setAllowValidation] = useState(false);
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={props.onClose}
    >
      <Popper
        style={{ zIndex: 2, display: "inline-block"}}
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
        <StyledPaper p={1} variant="outlined" 
        //style={{display: "inline-block"}}
        >
          <AvatarEdit
            width={390}
            height={295}
            onCrop={(avatar) => {
              setAllowValidation(true);
              props.setNewAvatar(avatar);
            }}
            onClose={() => props.onClose()}
            //label="Coucou" //TODO I18N
            //onBeforeFileLoad={this.onBeforeFileLoad}
            src=""
          >
          </AvatarEdit>
          {allowValidation && <DoneOutlineIcon
            aria-label="Validate"
            onClick={() => console.log('TODO')}
            className={classes.validateButton}/>

          }
        </StyledPaper>
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
