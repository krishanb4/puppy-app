import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "./images/main.png";
import logo1 from "./images/1.png";
import logo2 from "./images/2.png";
import logo3 from "./images/3.png";
import logo4 from "./images/4.png";
import dog1 from "./images/dog1.png";
import dog2 from "./images/dog2.png";
import dog3 from "./images/dog3.png";
import dog4 from "./images/dog4.png";
import twitter from "./images/twitter.png";
import github from "./images/github.png";
import medium from "./images/medium.png";
import telegram from "./images/telegram.png";

function MainHeader() {
  return (
    <>
      <div className="container">
        <div className="main-header row">
          <div className="col-md-8 puppy-head">
            <h1 className="mb-3">
              The Puppy store , Next level of NFT marketplace
            </h1>
            <p>
              Puppy Finance is a next-generation decentralized NFT yield farming
              ecosystem powered by Binance Smart Chain. Non-fungible token
              farming has been developed by Puppy Finance considering the
              current NFT utility, diverging from the conventional yield farming
              strategies to provide the maximum benefit for all the users.
            </p>
          </div>
          <div className="col-md-4">
            <img src={logo} className="img-fluid" alt="" width="80%" />
          </div>
        </div>
        <div className="features">
          <div className="content">
            <div className="block-center">
              <h2
                data-w-id="c0134b8c-83d5-8cb3-75cd-01896103e19b"
                className="heading headingblue opacity-cards"
              >
                What is on Puppy Finance
              </h2>
            </div>
            <div className="w-layout-grid grid-sequence">
              <div data-w-id="Div Block 7" className="sequence opacity-cards">
                <div className="icon-sequence-bg">
                  <img
                    src={logo1}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">Next level NFT marketplace</h4>
              </div>

              <div
                data-w-id="5939fced-061f-0f25-e75e-7a91559b0cd7"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={logo2}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">Yeild optimized farm</h4>
              </div>

              <div
                data-w-id="1dd55293-f75c-254b-cf9b-00c735c9a649"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={logo3}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">Rewards for NFT holders</h4>
              </div>
              <div
                data-w-id="1dd55293-f75c-254b-cf9b-00c735c9a649"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={logo4}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">Loyality program</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="nft-section">
          <h2 className="heading headingblue opacity-cards">NFT Marketplace</h2>
          <p>
            Those who buy Puppy’s native token PUPPY will be able to claim
            Puppy’s NFTs same time with a first-time free claiming chance
            through our platform. Users will be fallen under different Tiers
            that are introduced by the platform according to the amount of PUPPY
            they bought. The type and amount of NFTs that you receive will
            depend on your tier. The more the tokens bought higher the NFT
            reward.
          </p>
        </div>
        <div className="tokenomics">
          <div className="content">
            <div className="block-center">
              <h2
                data-w-id="c0134b8c-83d5-8cb3-75cd-01896103e19b"
                className="heading headingblue opacity-cards"
              >
                Tokenomics
              </h2>
            </div>
            <div className="w-layout-grid grid-sequence">
              <div data-w-id="Div Block 7" className="sequence opacity-cards">
                <div className="icon-sequence-bg">
                  <img
                    src={dog1}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">45% Public/Private Sale</h4>
              </div>

              <div
                data-w-id="5939fced-061f-0f25-e75e-7a91559b0cd7"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={dog2}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">30% NFT Rewards</h4>
              </div>

              <div
                data-w-id="1dd55293-f75c-254b-cf9b-00c735c9a649"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={dog3}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">5% Airdrop</h4>
              </div>
              <div
                data-w-id="1dd55293-f75c-254b-cf9b-00c735c9a649"
                className="sequence opacity-cards"
              >
                <div className="icon-sequence-bg">
                  <img
                    src={dog4}
                    loading="lazy"
                    width="35"
                    alt=""
                    className="icon-sequence"
                  />
                </div>
                <h4 className="heading-sequence">20% Product Development</h4>
              </div>
            </div>
          </div>
        </div>
        <div className="social-btns">
          <a href="https://" className="btn">
            <img className="img-fluid img-social" src={twitter} alt="" />
          </a>
          <a href="https://" className="btn">
            <img className="img-fluid img-social" src={github} alt="" />
          </a>
          <a href="https://" className="btn">
            <img className="img-fluid img-social" src={medium} alt="" />
          </a>
          <a href="https://" className="btn">
            <img className="img-fluid img-social" src={telegram} alt="" />
          </a>
        </div>
      </div>
    </>
  );
}

export default MainHeader;
