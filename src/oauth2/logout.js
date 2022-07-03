import { GoogleLogout } from "react-google-login";

const clientId =
  "610244300559-cl80pouiui037cmau3jm78ujefmfv466.apps.googleusercontent.com";

export default function Logout(props) {
  const onSuccess = (res) => {
    props.onLogout();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
        render={(renderProps) => (
          <button
            style={{
              fontFamily: '"Lexend Deca", sans-serif',
              color: "#444",
              border: "none",
              fontSize: "initial",
              cursor: "pointer",
              padding: "0.2em 0",
              marginLeft: "20px",
            }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Wyloguj
          </button>
        )}
      ></GoogleLogout>
    </div>
  );
}
