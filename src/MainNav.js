import React from 'react';
import logo from './puppy.png';
import MainHeader from './MainHeader';
import {Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function Navigation() {
  return (
    <>
      <Navbar bg="transparent" variant="dark">
        <Navbar.Brand href="#home" className="">
          <img
            alt=""
            src={logo}
            width="60"
            className="d-inline-block align-top"
          />{' '}
          Puppy Finance
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="/features">Features</Nav.Link>
          <Nav.Link href="/loyalty">Loyalty</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Link className="btn-wallet-connect">Connect</Nav.Link>
        </Nav>
      </Navbar>
      <MainHeader />
    </>
  );
}

export default Navigation;
