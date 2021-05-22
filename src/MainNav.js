import React from 'react';
import logo from './images/puppy.png';
import * as ReactBootStrap from 'react-bootstrap';
import bootstrap from 'bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
import ConnectButton from './pages/Components/Buttons/ConnectButton';
import Box from '@material-ui/core/Box';

function Navigation() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              alt=""
              src={logo}
              width="60"
              className="d-inline-block align-top"
            />
            PuppyWorld Finance
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <p class="nav-link">
                  <Link to="/">Home</Link>
                </p>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/nft">
                  <Link to="/nft">NFT Marketplace</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/loyality">
                  <Link to="/loyality">Loyality</Link>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile">
                  <Link to="/profile">Profile</Link>
                </a>
              </li>
            </ul>
          </div>
          <Box display="flex" flexDirection="row-reverse" p={1} m={1}>
            <ConnectButton></ConnectButton>
          </Box>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
