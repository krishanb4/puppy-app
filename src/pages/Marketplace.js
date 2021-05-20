import React from 'react';
import axios from 'axios';
import loading from '../images/giphy.gif';
import ImageUploader from 'react-images-upload';
import {FaUsers, FaStore, FaDollarSign} from 'react-icons/fa';
import {SiOpslevel} from 'react-icons/si';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Modal,
  Breadcrumb,
  Pagination,
  Form,
  Tabs,
  Tab,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import Features from '../Features';
import {getProfile} from '../functions/data';
import {
  mint,
  connect,
  checkBalance,
  puppyBalance,
  aquiredNFTs,
  waitForTx,
  toAddress,
  signMessage,
  ensureConnection,
} from '../functions/ethFunc';
import {updateProfile, uploadImage} from '../functions/pinataFunc';
import {themesList} from 'web3modal';
import {ethers} from 'ethers';

import CollectibleCard from './Items/CollectibleCard';

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        address: '',
        pro_pic: '',
        claims: 0,
      },
      currentAccount: '',
      show: false,
      uploadedImage: '',
      step: 'Save Changes',
      saving: false,
    };
  }

  async componentDidMount() {
    await ensureConnection();
    const profile = await getProfile(toAddress(window.currentAccount));
    this.setState({profile: profile});
    this.setState({currentAccount: window.currentAccount});
    this.setState({uploadedImage: profile.pro_pic});
  }
  render() {
    var cards = [];
    for (var i = 0; i < 7; i = i + 4) {
      var first = i;
      var last = i + 4 > 7 ? 7 : i + 4;
      var cols = [];
      for (var j = first; j < last; j++) {
        cols.push(<CollectibleCard />);
      }
      cards.push(
        <Row style={{marginTop: '1rem'}} key={i}>
          {cols}
        </Row>
      );
    }
    let active = 0;
    return (
      <div className="container">
        <div className="main-body">
          <Tabs
            defaultActiveKey="all"
            id="uncontrolled-tab-example"
            variant="pills"
          >
            <Tab eventKey="all" title="All">
              {cards}
            </Tab>
            <Tab eventKey="sale" title="On-Sale">
              {cards}
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Marketplace;
