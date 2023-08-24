import React, { useState, useEffect } from "react";
import "./LoginStyles.css";
import logo from "../Assets/logo 4.png";
import Cookies from "js-cookie";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLoginClick = () => {
    //console.log("login button clicked");
  };

  ///github authentication
  //const clientId = "7517ba101e161c1eba76"; // Replace with your GitHub Client ID
  // const redirectUri = "http://localhost:3000"; // Replace with your redirect URL

  const handleGitHubLogin = () => {
    window.location.href = githubUrl; // Redirect to GitHub login page
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  // google login success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    alert("Logged in successfully using Google");
    navigate("/service");
  };
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
    alert("Login Failed, Please try again");
  };

  //to show password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  //submitting the login detail
  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:4000/login`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });

    const { token } = await res.json();

    if (res.ok) {
      Cookies.set("token", token);
      navigate("/service");
      alert("logged in Successfully");
    } else {
      alert("Login Failed, Please check credentials and try again");
    }
  };
  return (
    <div>
      <div className="login-left">
        <img src={logo} alt="XeroCodee" className="logo" />

        <h1>Welcome!</h1>

        <p
          style={{
            fontSize: "1rem",
            fontFamily: "serif",
            marginLeft: "40%",
            marginBottom: "0%",
          }}
        >
          Login to your Account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="centering">
            <div className="box">
              <div className="input-wrapper">
                <input
                  type="email"
                  name="username"
                  id="username"
                  autoComplete="off"
                  placeholder="E-mail"
                  onChange={handleInputChange}
                  value={formData.username}
                  required
                  className={`input_field`}
                />
                <label className={`input_label`}>E-mail</label>
              </div>
            </div>
          </div>
          <div className="centering">
            <div className="box">
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Password"
                  id="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  autoComplete="off"
                  required
                  className={`input_field ${showPassword ? "visible" : ""}`}
                />
                <label
                  className={`input_label ${showPassword ? "visible" : ""}`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className={`input_icon ${showPassword ? "visible" : ""}`}
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <BiHide size={20} />
                  ) : (
                    <BiShowAlt size={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button className="signup" onClick={handleLoginClick}>
            LOGIN
          </button>
          <p style={{ textAlign: "center", marginLeft: "25%", marginTop: "0" }}>
            or
          </p>
        </form>
        <div className="login-bottom">
          <GoogleOAuthProvider clientId="249462161684-kpururpdrdl7m3053aem5uo0ro1qvkd1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
          {/*
          <GoogleOAuthProvider clientId="249462161684-kpururpdrdl7m3053aem5uo0ro1qvkd1.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </GoogleOAuthProvider>
          */}
          <button className="git" onClick={handleGitHubLogin}>
            <span style={{ padding: "2px 1px 4px 0", display: "inline-block" }}>
              Login in with Github
            </span>
            <BsGithub
              size={20}
              style={{ margin: "4px 1px", verticalAlign: "middle" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
