import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AvatarEdit from "react-avatar-edit";
import { styled, useTheme } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import PropTypes from "prop-types";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";

const StyledPaper = styled(Paper)(spacing);

const useStyles = makeStyles((theme) => ({
  validateButton: {
    color: "white",
    minWidth: 20,
    width: 20,
    minHeight: 20,
    height: 20,
    position: "absolute",
    zIndex: 999,
    cursor: "pointer",
    right: theme.spacing(1) + 10,
    top: theme.spacing(1) + 10,
    backgroundColor: "transparent",
    border: "none",
  },
}));

export default function ActivityAvatarEditor(props) {
  const [allowValidation, setAllowValidation] = useState(false);
  const [avatar, setAvatar] = useState("");
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <StyledPaper p={1} variant="outlined">
      <AvatarEdit
        width={390}
        height={295}
        onCrop={(newAvatar) => {
          //TODO console.log("Oncrop Avatar =", avatar);
          setAvatar(newAvatar);
          setAllowValidation(true);
        }}
        onClose={() => props.onClose()}
        //label="Coucou" //TODO I18N
        src=""
      ></AvatarEdit>
      {allowValidation && (
        <DoneOutlineIcon
          aria-label="Validate"
          onClick={(e) => {
            e.stopPropagation();
            props.onClose();
            props.onValidate(avatar);
          }}
          className={classes.validateButton}
        />
      )}
    </StyledPaper>
  );
}

ActivityAvatarEditor.propTypes = {
  open: PropTypes.bool.isRequired,
  onValidate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
