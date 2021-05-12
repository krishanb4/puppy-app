import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import logo from './images/main.png';

function MainHeader() {
  return (
    <>
      <div className="main-header row">
        <div className="col-md-6 puppy-head">
          <h1>The Puppy shop</h1>
          <p>
            Puppy Finance is a community driven experimental Defi + NFT
            protocol, based on popular TV series The Simpsons, built on Ethereum
            Blockchain. Farm $SIMF, stake LP tokens and get the exclusive access
            to our rare NFT Simpson cards collection.
          </p>
        </div>
        <div className="col-md-6">
          <img src={logo} alt="" width="50%" />
        </div>
      </div>
    </>
  );
}

export default MainHeader;
