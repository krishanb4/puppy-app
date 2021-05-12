import React from "react";
import logo from "./puppy.png";
import { Navbar, Nav } from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="transparent" variant="dark">
      <Navbar.Brand href="#home" className="">
        <img
          alt=""
          src={logo}
          width="60"
          className="d-inline-block align-top"
        />{" "}
        Puppy Finance
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <button className="btn-wallet-connect">Connect</button>
    </Navbar>
  );
}

export default Navigation;
