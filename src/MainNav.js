import React from "react";
import logo from "./puppy.png";
import { Navbar, Nav } from "react-bootstrap";
import connect from "./waletconnect/web3connect";
import { Link } from "react-router-dom";

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
            PuppyWorld Finance
          </Navbar.Brand>
          <Nav>
            <Link to="/" className="nav-link">
              Home
            </Link>

            <Link to="/nft" className="nav-link">
              NFT Marketplace
            </Link>

            <Link to="/loyalty" className="nav-link">
              Loyalty
            </Link>
          </Nav>
          <div>
            <Nav.Link className="btn-wallet-connect">Connect</Nav.Link>
          </div>
        </Navbar>
      </>
    );
  }
}

export default Navigation;
