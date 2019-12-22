import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, OnButtonSubmit }) => {
  return (
    <div>
      <p className="f3 white">
        {"This Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
          />
          <button
            className="w-30 f4 grow bg-light-red white br3 br--right btn"
            onClick={OnButtonSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
