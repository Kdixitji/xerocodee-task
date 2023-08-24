import React from "react";
import image1 from "../Assets/bacgkround.png";
import "./HeroStyles.css";

const Hero = () => {
  return (
    <div>
      <img
        style={{ width: "300px", height: "350px" }}
        src={image1}
        alt="coding infinity"
        className="bg-photo"
      />
      <svg
        className="bottom"
        xmlns="http://www.w3.org/2000/svg"
        width="590"
        height="98"
        viewBox="0 0 538 144"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 144L22.4167 125.913C44.8333 107.826 89.6667 71.6522 134.5 66.087C179.333 59.8261 224.167 84.1739 269 96C313.833 107.826 358.667 107.826 403.5 89.7391C448.333 71.6522 493.167 36.1739 515.583 18.087L538 0V144H515.583C493.167 144 448.333 144 403.5 144C358.667 144 313.833 144 269 144C224.167 144 179.333 144 134.5 144C89.6667 144 44.8333 144 22.4167 144H0Z"
          fill="#1F64FF"
        />
      </svg>
    </div>
  );
};

export default Hero;
