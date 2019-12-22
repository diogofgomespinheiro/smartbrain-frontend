import React from "react";
import "./FaceRecognition.css";
import ReactTooltip from "react-tooltip";

const FaceRecognition = ({ imageUrl, boxes}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2 pa3">
        <img
          id="inputImage"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        {boxes.map((box, index) => {
          return (
            <div key={index}>
              <div
                className="bounding-box"
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol
                }}
                data-tip
                data-for={`tolltip${index}`}
              ></div>
              <ReactTooltip id={`tolltip${index}`}>
                <div>
                  <p>Age: {box.age.name} ({Math.floor(box.age.value*100)}%) </p>
                  <p>Gender: {box.gender.name} ({Math.floor(box.gender.value*100)}%) </p>
                  <p>Multicultural: {box.multicultural.name} ({Math.floor(box.multicultural.value*100)}%) </p>
                </div>
              </ReactTooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
