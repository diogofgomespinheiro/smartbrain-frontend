import React from "react";
import "./Logo.css";
import brain from "./brain.svg";

const Logo = () => {
  return (
    <div className="ma4 mt0 center">
      <div
        className="Tilt br4 shadow-2 pa3"
        style={{
          height: 150,
          width: 150
        }}
      >
        <img src={brain} alt="logo" />
      </div>
    </div>
  );
};

export default Logo;
