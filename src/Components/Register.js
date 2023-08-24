import React, { useState } from "react";
import "./RegisterStyles.css";
import logo from "../Assets/logo 4.png";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };
  const navigate = useNavigate();

  //to show and hide password
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // google login success
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    navigate("/service"); // Navigate to "/service" after successful login
  };
  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  //handling registration submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formdata:", formData);
    const { password, confirmpassword } = formData;
    //password and confirm password

    if (password !== confirmpassword) {
      alert("password do not match, retry");
      return;
    }

    //Registration API
    const res = await fetch(`http://localhost:4000/auth/register`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.ok) {
      navigate("/service");
      alert("Successfully Registered");
    }
  };
  return (
    <div>
      <div>
        <div className="login-left">
          <img src={logo} alt="XeroCodee" className="logo" />
          <h1>Hello!</h1>
          <p
            style={{
              fontSize: "1rem",
              fontFamily: "serif",
              marginLeft: "40%",
              marginBottom: "0%",
            }}
          >
            Create Your Account
          </p>
          <form onSubmit={handleSubmit}>
            <div className="centering">
              <div className="box">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    autoComplete="given-name"
                    placeholder="First Name"
                    required
                    className={`input_field`}
                    onChange={handleInputChange}
                    value={formData.firstname}
                  />
                  <label className={`input_label`}>First Name</label>
                </div>
              </div>
            </div>
            <div className="centering">
              <div className="box">
                <div className="input-wrapper">
                  <input
                    type="text"
                    name="lastname"
                    autoComplete="given-lastname"
                    id="lastname"
                    placeholder="Last Name"
                    required
                    className={`input_field`}
                    onChange={handleInputChange}
                    value={formData.lastname}
                  />
                  <label className={`input_label`}>Last Name</label>
                </div>
              </div>
            </div>
            <div className="centering">
              <div className="box">
                <div className="input-wrapper">
                  <input
                    type="email"
                    name="username"
                    id="username"
                    placeholder="E-mail"
                    required
                    className={`input_field`}
                    onChange={handleInputChange}
                    value={formData.username}
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
                    required
                    onChange={handleInputChange}
                    value={formData.password}
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
            <div className="centering">
              <div className="box">
                <div className="input-wrapper">
                  <input
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    value={formData.confirmpassword}
                    required
                    className={`input_field`}
                  />
                  <label className={`input_label`}>Confirm Password</label>
                </div>
              </div>
            </div>
            <button className="signup">SIGN UP</button>
          </form>
          <p style={{ textAlign: "center", marginLeft: "25%", marginTop: "0" }}>
            or
          </p>
          <div className="login-bottom">
            <GoogleOAuthProvider clientId="249462161684-kpururpdrdl7m3053aem5uo0ro1qvkd1.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
              />
            </GoogleOAuthProvider>
            <button className="git">
              <span
                style={{ padding: "2px 1px 4px 0", display: "inline-block" }}
              >
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
    </div>
  );
};

export default Register;
