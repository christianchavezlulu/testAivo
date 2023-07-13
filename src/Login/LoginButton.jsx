import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  loginButton: {
    marginTop: "50px",
    backgroundColor: "#2196f3",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
});

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <Button
      className={classes.loginButton}
      variant="contained"
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );
};

export default LoginButton;
