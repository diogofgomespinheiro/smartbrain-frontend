import React from "react";
import ProfileIcon from "../Profile/ProfileIcon";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <ProfileIcon />
        <p
          onClick={() => onRouteChange("signout")}
          className="f3 link dim black underline pa3 pointer white"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p onClick={() => onRouteChange("signin")} className="f3 link dim black underline pa3 pointer white">
            Sign In
          </p>
          <p onClick={() => onRouteChange("register")} className="f3 link dim black underline pa3 pointer white">
            Register
          </p>
        </nav>
    );
  }
};

export default Navigation;
