import React from "react";

const Rank = ({name, entries}) => {
  return (
    <div>
      <div className="white f1">
        {`Welcome ${name}`}
      </div>
      <div className="white f2">
        {`You have done ${entries} uploads until now.`}
      </div>
    </div>
  );
};

export default Rank;
