import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./images/main.png";

function MainHeader() {
  return (
    <div className="main-header">
      <div>
        <h1>Puppy will eventually be rare collectibles</h1>
        <p></p>
      </div>
      <div>
        <img src={logo} alt="" />
      </div>
    </div>
  );
}

export default MainHeader;
