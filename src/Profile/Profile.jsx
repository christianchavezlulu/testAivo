import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Login/LogOutButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  profile: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: "30px",
    marginBottom: "30px",
    padding: '15px', 
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginRight: "16px",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  profileName: {
    fontWeight: "bold",
    marginTop: "4px",
  },
  profileEmail: {
    color: "#888",
  },
});

const Profile = () => {
  const { user: { picture, name='User without name', email='nonameofuser@hotmail.com'}, isAuthenticated } = useAuth0();
  const classes = useStyles();

  return (
    isAuthenticated && (
      <div className={classes.profile}>
          <img
          className={classes.profileImage}
          src={picture}
          alt={name}
        />
        <div className={classes.profileInfo}>
          <Typography className={classes.profileName} variant="h4">
            {name}
          </Typography>
          <Typography className={classes.profileEmail} variant="body1">
            {email}
          </Typography>
        </div>
        <LogoutButton />
      </div>
    )
  );
};

export default Profile;