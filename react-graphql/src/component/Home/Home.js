import React from "react";

const Home = () => {
  return <h1>{localStorage.getItem("message")}</h1>;
};
export default Home;
