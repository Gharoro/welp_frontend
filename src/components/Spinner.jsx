import React from "react";
import spinner from "../assets/svg/spinner.svg"

export default function Spinner() {
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <img src={spinner} alt="spinner" />
        <span>Loading...</span>
      </div>
    </div>
  );
}
