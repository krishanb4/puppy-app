import React from 'react';
import logo from './puppy.png';
import {Navbar, Nav, Button, Modal} from 'react-bootstrap';
import {ethers} from 'ethers';

import {Link} from 'react-router-dom';
import {useWallet, UseWalletProvider} from 'use-wallet';

function Navigation() {
  const wallet = useWallet();
  window.wallet = wallet;
  const blockNumber = wallet.getBlockNumber();
  window.currentAccount = window.wallet.account || ethers.constants.AddressZero;

  return (
    <>
      <Navbar bg="transparent" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt=""
            src={logo}
            width="60"
            className="d-inline-block align-top"
          />{' '}
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
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
          {wallet.status === 'connected' ? (
            <div>
              <Button onClick={() => wallet.reset()}>disconnect</Button>
            </div>
          ) : (
            <div>
              Connect:
              <Button onClick={() => wallet.connect()}>MetaMask</Button>
              <Button onClick={() => wallet.connect('walletconnect')}>
                wc
              </Button>
            </div>
          )}
        </Nav>
        <div>
          {/*<Nav.Link className="btn-wallet-connect">Connect</Nav.Link> */}
        </div>
      </Navbar>
    </>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      portis: {dAppId: 'my-dapp-id-123-xyz'},
      walletconnect: {rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545'},
    }}
  >
    <Navigation />
  </UseWalletProvider>
);
