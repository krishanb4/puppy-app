import React from "react";
import logo from "./puppy.png";
import * as ReactBootStrap from "react-bootstrap";
import bootstrap from "bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { useWallet, UseWalletProvider } from "use-wallet";

function Navigation() {
  const wallet = useWallet();
  window.wallet = wallet;
  const blockNumber = wallet.getBlockNumber();
  window.currentAccount = window.wallet.account || ethers.constants.AddressZero;

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
            {wallet.status === "connected" ? (
              <div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    wallet.reset();
                    window.location.reload();
                  }}
                >
                  disconnect
                </button>
              </div>
            ) : (
              <div>
                Connect:
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    wallet.connect();
                  }}
                >
                  MetaMask
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    wallet.connect("walletconnect");
                  }}
                >
                  wc
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      portis: { dAppId: "my-dapp-id-123-xyz" },
      walletconnect: {
        rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
      },
    }}
  >
    <Navigation />
  </UseWalletProvider>
);
