import React from "react";
import Main from "../Components/Main";

const Home = ({ onLogin }) => {
  return (
    <div>
      <Main onLogin={onLogin} />
    </div>
  );
};

export default Home;
