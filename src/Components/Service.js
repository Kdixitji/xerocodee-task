import React, { useState } from "react";
import "./ServiceStyles.css";
import logo from "../Assets/logo 4.png";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const [selectedButton, setSelectedButton] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showServiceButton, setShowServiceButton] = useState(true);
  const [showHostingButtons, setShowHostingButtons] = useState(false);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  const [showSelfHostingOptions, setShowSelfHostingOptions] = useState(false);
  const [showXeroCodeeHostingInput, setShowXeroCodeeHostingInput] =
    useState(false);
  const [selectedHostingoption, setSelectedHostingOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [organizationSubmitted, setOrganizationSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setShowHostingButtons(false);
    setShowInput(true);
    setOrganizationName("");
    setShowServiceButton(false);
    setSubmitButtonDisabled(true);
    setShowSelfHostingOptions(false);
    setShowXeroCodeeHostingInput(false);
  };

  const handleBackButtonClick = () => {
    setSelectedButton("");
    setOrganizationName("");
    setShowInput(false);
    setShowHostingButtons(false);
    setShowServiceButton(true); // Show the service buttons again
    setSubmitButtonDisabled(true); // Disable the submit button initially
    setShowXeroCodeeHostingInput(false);
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setOrganizationName(inputValue);
    setSubmitButtonDisabled(inputValue.trim() === "");

    // Enable the Submit button if the input value is not empty
    if (inputValue.trim() !== "") {
      setSubmitButtonDisabled(false);
    }
  };

  const handleSelfHostingClick = () => {
    setShowSelfHostingOptions(true);
    setShowHostingButtons(false);
    setShowXeroCodeeHostingInput(false);
  };

  const handleXeroCodeeHostingClick = () => {
    setShowSelfHostingOptions(false);
    setShowXeroCodeeHostingInput(true);
  };

  const submitData = async () => {
    const dataToSend = {
      userType: selectedButton,
      name: organizationName,
      hostingType:
        showHostingButtons === "selfHosting"
          ? "Xerocodee Hosting"
          : "self Hosting",
      hostingOptions: showSelfHostingOptions === "GitHub" || "AWS Cloud",
    };

    setIsSubmitting(true);
    await fetch(`http://localhost:4000/service`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Service Data Saved", data);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error("Error saving service data:", error);
        setIsSubmitting(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    if (organizationName.trim() !== "") {
      setOrganizationSubmitted(true);
      setShowServiceButton(false);
      setShowInput(false);
      setShowHostingButtons(true);
      // No need to disable the submit button here
    }
  };

  const handleAWSClick = () => {
    setSelectedHostingOption("AWS Cloud");
    setIsSubmitting(true);
    setTimeout(submitData, 3000);
    window.open("https://aws.amazon.com/", "_blank");
  };

  const handleGitHubDownloadClick = () => {
    setSelectedHostingOption("GitHub");
    setIsSubmitting(true);
    setTimeout(submitData, 3000);
    if (navigator.userAgent.includes("GitHub Desktop")) {
      window.open("https://desktop.github.com/", "_blank");
      window.open("https://github.com/your-username/your-repo", "_blank");
    }
  };

  return (
    <div className="service">
      <div className="service-box">
        <img src={logo} alt="xerocodee" className="logo" />
        <div className="logout-btn" onClick={handleLogout}>
          Logout
        </div>
        <h1>Welcome!</h1>
        <p>
          {showServiceButton
            ? "Choose from the following"
            : showHostingButtons
            ? "Choose From The Following Deployment Options"
            : ""}
        </p>
        <div className="service-btns">
          {showServiceButton ? (
            <>
              <button
                className="service-btn"
                onClick={() => handleButtonClick("Developer")}
              >
                Developer
              </button>
              <button
                className="service-btn"
                onClick={() => handleButtonClick("Organisation")}
              >
                Organisation
              </button>
              <button
                className="service-btn"
                onClick={() => handleButtonClick("Company")}
              >
                Company
              </button>
            </>
          ) : (
            <>
              {showInput && (
                <BiArrowBack
                  size={25}
                  cursor="pointer"
                  className="back-btn"
                  onClick={handleBackButtonClick}
                />
              )}
              {showHostingButtons && !showSelfHostingOptions && (
                <>
                  <button
                    className="service-btn"
                    onClick={handleSelfHostingClick}
                  >
                    Self Hosting
                  </button>
                  <button
                    className="service-btn"
                    onClick={handleXeroCodeeHostingClick}
                  >
                    Xerocodee Hosting
                  </button>
                </>
              )}
              {showSelfHostingOptions && !showXeroCodeeHostingInput && (
                <>
                  <button className="service-btn" onClick={handleAWSClick}>
                    AWS Cloud
                  </button>
                  <button
                    className="service-btn"
                    onClick={handleGitHubDownloadClick}
                  >
                    GitHub
                  </button>
                </>
              )}
            </>
          )}
        </div>
        <div className="input-container">
          {showInput && (
            <div className="input-wrapperss">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder={`Enter ${selectedButton} Name`}
                  required
                  className="service-input"
                  value={organizationName}
                  onChange={handleInputChange}
                  disabled={organizationSubmitted}
                />

                {!showHostingButtons && (
                  <button
                    type="submit"
                    className="submit"
                    disabled={submitButtonDisabled}
                  >
                    Submit
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;
