import React from "react";
import logo from "./puppy.png";
import MainHeader from "./MainHeader";
import { Navbar, Nav } from "react-bootstrap";
import connect from "./waletconnect/web3connect";

class Navigation extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="transparent" variant="dark">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="60"
              className="d-inline-block align-top"
            />{" "}
            Puppy Finance
          </Navbar.Brand>
          <Nav>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/loyalty">Loyalty</Nav.Link>
          </Nav>
          <div>
            <Nav.Link className="btn-wallet-connect" onClick={() => connect()}>
              Connect
            </Nav.Link>
          </div>
        </Navbar>
        <MainHeader />
      </>
    );
  }
}

export default Navigation;
