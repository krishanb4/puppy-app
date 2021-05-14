import React from "react";
import MainNav from "./MainNav";
import dogsoon from "./images/dogsoon.gif";

function Features() {
  return (
    <>
      <MainNav />
      <div className="container">
        <h1 className="coming-soon-head">Coming Soon!</h1>
        <img className="img-fluid searching-dog" src={dogsoon} alt="" />
      </div>
    </>
  );
}

export default Features;
