import React, { useState } from "react";
import "./MainStyles.css";
import Login from "./Login";
import Hero from "./Hero";
import Register from "./Register";

const Main = ({ onLogin }) => {
  const [showRegistration, setShowRegistration] = useState(false);

  const handleSignupClick = () => {
    setShowRegistration(true);
  };

  const handleTabSwitch = () => {
    setShowRegistration(false);
  };
  return (
    <div style={{ background: "#C2DAFB", height: "100vh", width: "100%" }}>
      <div className="main">
        <div className="login-box">
          {!showRegistration ? (
            <Login
              handleSignupClick={handleSignupClick}
              handleTabSwitch={handleTabSwitch}
              onLogin={onLogin}
            />
          ) : (
            <Register handleTabSwitch={handleTabSwitch} />
          )}
          <div className="container-bottom" style={{ marginLeft: "30%" }}>
            {showRegistration ? (
              <p>
                Already have an Account ?{" "}
                <span
                  onClick={() => setShowRegistration(false)}
                  style={{ cursor: "pointer", color: "blueviolet" }}
                >
                  LOGIN
                </span>
              </p>
            ) : (
              <p>
                Don't have an Account ?{" "}
                <span
                  style={{ cursor: "pointer", color: "blueviolet" }}
                  onClick={handleSignupClick}
                >
                  SIGN UP
                </span>
              </p>
            )}
          </div>
        </div>
        <hr className="line" />
        <Hero />
      </div>
    </div>
  );
};

export default Main;
