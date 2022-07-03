import { GoogleLogin } from "react-google-login";

const clientId =
  "610244300559-cl80pouiui037cmau3jm78ujefmfv466.apps.googleusercontent.com";

export default function Login(props) {
  const onSuccess = (res) => {
    props.onLogin();
  };

  const onFailure = (res) => {
    props.onFailure();
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy="single_host_origin"
        isSignedIn={true}
        render={(renderProps) => (
          <button
            style={{
              fontFamily: '"Lexend Deca", sans-serif',
              color: "#444",
              border: "none",
              fontSize: "initial",
              cursor: "pointer",
              padding: "0.2em 0",
            }}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Zaloguj
          </button>
        )}
      ></GoogleLogin>
    </div>
  );
}
