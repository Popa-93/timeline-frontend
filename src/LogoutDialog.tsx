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

import PropTypes from "prop-types";

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
  const { ident, setIdent } = useContext(IdentContext);

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_APP_CLIENTID,
    onLogoutSuccess: () => {
      fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/logout/`, {
        method: "POST",
        credentials: "include",
        headers: {
          accept: "*/*",
          "content-type": "application/json",
        },
        body: "{}",
      })
        .then((response) => {
          if (!response.ok) {
            // TODO Cleanup this crap and manage asynch log cleanly
            console.log("** LOGOUT ON BACKEND ** KO");
            console.log(
              "Response status ",
              response.status + " \n text " + response.statusText
            );
            response.text().then(function (text) {
              console.log("TXT =", text);
            });
            setIdent(null);
            throw new Error(
              `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/google/ return status ` +
                response.status
            );
          }
          return response.json();
        })
        .then(
          (response) => {
            setIdent(null);
          },
          (error) => {
            setIdent(null);
            console.warn("Error during logout on backend : ", error);
          }
        );
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

LogoutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};
