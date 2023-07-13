import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  logoutButton: {
    marginTop: "16px",
    backgroundColor: "#f44336",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#d32f2f",
    },
  },
});

const LogoutButton = () => {
  const { logout } = useAuth0();
  const classes = useStyles();

  return (
    <Button 
      className={classes.logoutButton}
      variant="contained" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
