import React, { useContext, useState } from "react";
import { GoogleLogin, GoogleLoginResponse } from "react-google-login";
import Avatar from "@material-ui/core/Avatar";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

import { IdentContext } from "./App";
import LogoutDialog from "./LogoutDialog";

export default function UserIdent() {
  const [logoutDialogOpened, setLogoutDialogOpened] = useState(false);
  const { ident, setIdent } = useContext(IdentContext);

  //TODO useMemo
  let userIdentRender;
  if (ident) {
    userIdentRender = (
      <>
        <Tooltip
          title={
            <Box>
              <Box>{ident.profileObj.name}</Box>
              <Box>{ident.profileObj.email}</Box>
            </Box>
          }
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
        />
      </>
    );
  } else {
    userIdentRender = (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_APP_CLIENTID}
        buttonText="Login"
        accessType="online"
        responseType="token"
        onSuccess={(receivedObj: GoogleLoginResponse) => {
          // TODO Move this in context management on setIdent?
          fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/google/`, {
            method: "POST",
            credentials: "include",
            headers: {
              accept: "*/*",
              "content-type": "application/json",
            },
            body: JSON.stringify({
              access_token: receivedObj.accessToken,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                // TODO Cleanup this crap and manage asynch log cleanly
                response.text().then(function (text) {
                  console.log("TXT =", text);
                });

                throw new Error(
                  `Fetch ${process.env.REACT_APP_BACKEND_BASE_URL}/api/auth/google/ return status ` +
                    response.status
                );
              }
              return response.json();
            })
            .then(
              (response) => {
                setIdent(receivedObj);
                return response.results;
              },

              (error) => {
                //TODO correct this with await to allow ErrorBoundary (usecase no server)
                console.error("Error during auth on backend : ", error);
              }
            );
        }}
        onFailure={() => {
          setIdent(null);
          console.log("Google login Failure");
        }}
        cookiePolicy={"single_host_origin"}
      ></GoogleLogin>
    );
  }
  return <div className="user-ident">{userIdentRender}</div>;
}
