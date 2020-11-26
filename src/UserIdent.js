import React, { useState } from "react";
import { GoogleLogin, useGoogleLogout } from "react-google-login";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { useTheme, makeStyles } from "@material-ui/core/styles";
import { styled } from "@material-ui/core/styles";
import { spacing } from "@material-ui/system";

const StyledTypography = styled(Typography)(spacing);
const StyledButton = styled(Button)(spacing);

const useStyles = makeStyles((theme) => ({
  scrollPaper: {
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
}));

function LogoutDialog(props) {
  const theme = useTheme();
  const classes = useStyles();

  const { signOut } = useGoogleLogout({
    clientId:
      "614074181352-mr1i43q42ace1so4p10rm0pr2723iu7e.apps.googleusercontent.com",
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
          alt={props.googleUser.name}
          src={props.googleUser.imageUrl}
          style={{ width: theme.spacing(7), height: theme.spacing(7) }}
        ></Avatar>
      </DialogTitle>
      <StyledTypography px={1} variant="subtitle2">
        {props.googleUser.name}
      </StyledTypography>
      <StyledTypography px={1} variant="body2">
        {props.googleUser.email}
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

export default function UserIdent(props) {
  const [open, setOpen] = useState(false);
  const [googleUserObj, setGoogleUserObj] = useState();

  //TODO useMemo
  let userIdentRender;
  if (googleUserObj) {
    userIdentRender = (
      <>
        <Tooltip
          title=<div>
            <div>{googleUserObj.profileObj.name}</div>
            <div>{googleUserObj.profileObj.email}</div>
          </div>
        >
          <Avatar
            alt={googleUserObj.profileObj.name}
            src={googleUserObj.profileObj.imageUrl}
            onClick={() => setOpen(true)}
            style={{ position: "relative" }}
          ></Avatar>
        </Tooltip>
        <LogoutDialog
          open={open}
          onClose={() => setOpen(false)}
          onLogout={() => setGoogleUserObj(null)}
          googleUser={googleUserObj.profileObj}
        />
      </>
    );
  } else {
    userIdentRender = (
      <GoogleLogin
        clientId="614074181352-mr1i43q42ace1so4p10rm0pr2723iu7e.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={(receivedObj) => {
          setGoogleUserObj(receivedObj);
          console.log("googleId ", receivedObj.profileObj.googleId);
        }}
        onFailure={() => setGoogleUserObj(null)}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    );
  }
  return <div className="user-ident">{userIdentRender}</div>;
}
