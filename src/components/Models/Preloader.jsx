import React from "react";
import "../components/Models/styles/prloader.css"

const PreLoader = () => {
  return (
    <div className="preloader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default PreLoader;



