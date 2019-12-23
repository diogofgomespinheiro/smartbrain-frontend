import React, { useState } from "react";

const ProfileIcon = (props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return(
    <div className="pa4 tc">
      <img src="http://tachyons.io/img/logo.jpg" className="br-100 ba h3 w3 dib" alt="avatar"/>
    </div>
  );
}

export default ProfileIcon;