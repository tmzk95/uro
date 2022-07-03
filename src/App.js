import "./App.css";
import Main from "./components/Main.js";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { Alert, Collapse } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const clientId =
  "610244300559-cl80pouiui037cmau3jm78ujefmfv466.apps.googleusercontent.com";

function App() {
  const [authorization, setAuthorization] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  useEffect(() => {
    setAuthorization(false);
    function start() {
      gapi.client
        .init({
          clientId: clientId,
          scope: "https://www.googleapis.com/auth/photoslibrary",
        })
        .then(() => {
          // GetAllPhotoGoogleApi();
          setAuthorization(true);
        });
    }

    gapi.load("client:auth2", start);
  }, [loggedIn]);

  return (
    <div className="App">
      <div
        style={{
          position: "fixed",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Collapse in={openAlert}>
          <Alert
            severity="success"
            sx={{
              mb: 2,
            }}
          >
            {alertMessage}
          </Alert>
        </Collapse>
      </div>
      <div
        style={{
          position: "fixed",
          marginTop: "50px",
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Collapse in={openErrorAlert}>
          <Alert
            severity="error"
            sx={{
              mb: 2,
            }}
          >
            Błąd Logowania
          </Alert>
        </Collapse>
      </div>
      <Main
        authorization={authorization}
        onLogin={() => {
          setLoggedIn(true);
          setOpenAlert(true);
          setAlertMessage("Zalogowano na konto Google");
          setTimeout(() => {
            setOpenAlert(false);
          }, 2000);
        }}
        onLogout={() => {
          setLoggedIn(false);
          setAuthorization(false);
          setOpenAlert(true);
          setAlertMessage("Wylogowano z konta Google");
          setTimeout(() => {
            setOpenAlert(false);
          }, 2000);
        }}
        onLoginFailure={() => {
          setOpenErrorAlert(true);
          setTimeout(() => {
            setOpenErrorAlert(false);
          }, 2000);
        }}
      ></Main>
    </div>
  );
}

export default App;
