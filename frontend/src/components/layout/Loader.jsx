import React from "react";
import "../../styles/loader.css";

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-wrapper">
        <div className="loader-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
