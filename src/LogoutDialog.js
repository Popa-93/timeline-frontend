import React, { useContext } from "react";
import { useGoogleLogout } from "react-google-login";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";
import { IdentContext } from "./App";

const StyledTypography = styled(Typography)(spacing);
const StyledButton = styled(Button)(spacing);

const useStyles = makeStyles((theme) => ({
  scrollPaper: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
}));

export default function LogoutDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { ident } = useContext(IdentContext);

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_APP_CLIENTID,
    onLogoutSuccess: () => {
      props.onLogout();
      props.onClose();
    },
  });

  return (
    <Dialog
      classes={{ scrollPaper: classes.scrollPaper }}
      aria-labelledby="simple-dialog-title"
      open={props.open}
      onClose={props.onClose}
      style={{
        textAlign: "center",
      }}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Avatar
          alt={ident.profileObj.name}
          src={ident.profileObj.imageUrl}
          style={{ width: theme.spacing(7), height: theme.spacing(7) }}
        ></Avatar>
      </DialogTitle>
      <StyledTypography px={1} variant="subtitle2">
        {ident.profileObj.name}
      </StyledTypography>
      <StyledTypography px={1} variant="body2">
        {ident.profileObj.email}
      </StyledTypography>
      <StyledButton
        variant="outlined"
        color="primary"
        onClick={signOut}
        mx="auto"
        my={1}
      >
        Logout
      </StyledButton>
    </Dialog>
  );
}
