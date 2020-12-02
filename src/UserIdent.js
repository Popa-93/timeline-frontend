import React, { useContext, useState } from "react";
import { GoogleLogin } from "react-google-login";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import { IdentContext } from "./App";

import LogoutDialog from "./LogoutDialog.js";

export default function UserIdent(props) {
  const [logoutDialogOpened, setLogoutDialogOpened] = useState(false);
  const { ident, setIdent } = useContext(IdentContext);

  //TODO useMemo
  let userIdentRender;
  if (ident) {
    userIdentRender = (
      <>
        <Tooltip
          title=<div>
            <div>{ident.profileObj.name}</div>
            <div>{ident.profileObj.email}</div>
          </div>
        >
          <Avatar
            alt={ident.profileObj.name}
            src={ident.profileObj.imageUrl}
            onClick={() => setLogoutDialogOpened(true)}
            style={{ position: "relative" }}
          ></Avatar>
        </Tooltip>
        <LogoutDialog
          open={logoutDialogOpened}
          onClose={() => setLogoutDialogOpened(false)}
          onLogout={() => setIdent(null)}
          googleUser={ident.profileObj}
        />
      </>
    );
  } else {
    userIdentRender = (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_CLIENTID}
        buttonText="Login"
        onSuccess={(receivedObj) => {
          setIdent(receivedObj);
          console.log("GoogleLogin : googleObj ", receivedObj); //TODO remove
          /*Auth on backend*/
          fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/google/`, {
            method: "POST",
          })
            .then((response) => {
              console.log("**TRY TO** AUTH ON BACKEND"); //TODO Remove
              if (!response.ok) {
                throw new Error(
                  `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}//api/auth/activities return status ` +
                    response.status
                );
              }
              return response.json();
            })
            .then(
              (response) => {
                return response.results; //TODO
              },
              (error) => {
                throw new Error("Error during auth on backend : ", error);
              }
            );
        }}
        onFailure={() => setIdent(null)}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    );
  }
  return <div className="user-ident">{userIdentRender}</div>;
}
