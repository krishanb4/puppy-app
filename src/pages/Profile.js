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
} from 'react-bootstrap';
import Features from './Features';
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
import {withRouter} from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        name: '',
        address: '',
        pro_pic: '',
        claims: 0,
        balance: 0,
      },
      currentAccount: '',
      show: false,
      uploadedImage: '',
      step: 'Save Changes',
      saving: false,
    };
    this.editProfile = this.editProfile.bind(this);
  }

  async componentDidMount() {
    await ensureConnection();
    var address = this.props.match.params.address || window.currentAccount;
    address = ethers.utils.isAddress(address)
      ? address
      : ethers.constants.AddressZero;
    const profile = await getProfile(toAddress(address));
    const puppy = await puppyBalance(address);
    profile.balance = puppy[0];
    profile.level = puppy[1];
    this.setState({profile: profile});
    this.setState({currentAccount: window.currentAccount});
    this.setState({uploadedImage: profile.pro_pic});
  }

  editProfile() {
    const _this = this;

    var profile = this.state.profile;
    const handleClose = async function () {
      _this.setState({show: false});
      var address = this.props.match.params.address || window.currentAccount;
      address = ethers.utils.isAddress(address)
        ? address
        : ethers.constants.AddressZero;
      const prof = await getProfile(toAddress(address));
      const puppy = await puppyBalance(address);
      prof.balance = puppy[0];
      prof.level = puppy[1];
      _this.setState({profile: prof});
    };
    const handleShow = () => this.setState({show: true});
    const handleName = (event) => {
      profile.name = event.target.value;
    };
    const handleDes = (event) => {
      profile.description = event.target.value;
    };
    const changeFile = async function (files) {
      const FormData = require('form-data');
      let data = new FormData();

      //we gather a local file for this example, but any valid readStream source will work here.
      if (files.length > 0) {
        var url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        data.append('file', files[files.length - 1]);

        //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
        //metadata is optional
        const metadata = JSON.stringify({
          name: files[files.length - 1].name + Date.now(),
          keyvalues: {
            proPic: files[files.length - 1].name,
            timestamp: Date.now(),
          },
        });
        data.append('pinataMetadata', metadata);

        //pinataOptions are optional
        const pinataOptions = JSON.stringify({
          cidVersion: 0,
          customPinPolicy: {
            regions: [
              {
                id: 'FRA1',
                desiredReplicationCount: 1,
              },
              {
                id: 'NYC1',
                desiredReplicationCount: 2,
              },
            ],
          },
        });
        data.append('pinataOptions', pinataOptions);
        _this.setState({
          uploadedImage: loading,
        });
        await axios
          .post(url, data, {
            maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
              'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
              pinata_api_key: '343d76156f497161c8d3',
              pinata_secret_api_key:
                '42ef4dfec173684e7e544686d94d20b006e79ea96cc74c5cc59eed1574ef2e59',
            },
            onUploadProgress: function (uploadEvent) {
              console.log(
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
              );
            },
          })
          .then(function (response) {
            profile.pro_pic = 'https://ipfs.io/ipfs/' + response.data.IpfsHash;
            _this.setState({
              uploadedImage: 'https://ipfs.io/ipfs/' + response.data.IpfsHash,
            });
            //console.log(_this.state);
          })
          .catch(function (error) {
            //console.log(error);
          });
      }
    };

    const handleSave = async function (event) {
      _this.setState({step: 'Saving..', saving: true});
      var sig = await signMessage('I want to update my profile.');
      const hash = await updateProfile(
        profile.name,
        profile.description,
        profile.pro_pic,
        sig
      );
      _this.setState({step: 'Save Changes', saving: false});

      handleClose();
    };

    return (
      <>
        <Modal
          show={this.state.show}
          onHide={handleClose}
          animation={false}
          style={{margin: '0 auto'}}
        >
          <Modal.Header>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col sm>
              <img
                src={this.state.uploadedImage}
                alt="Admin"
                className="rounded-circle"
                width="150"
              />
            </Col>
            <Form>
              <Form.Group>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={changeFile}
                  imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                  maxFileSize={5242880}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  defaultValue={this.state.profile.name}
                  onChange={handleName}
                />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a short description"
                  defaultValue={this.state.profile.description}
                  onChange={handleDes}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              disabled={this.state.saving}
            >
              {this.state.step}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  render() {
    var profile = this.state.profile;
    var followersCount = 0;
    var followingCount = 0;
    var aquiredCount = 0;
    var salesCount = 0;
    var tempBalance = 0;
    var balance = profile.balance;
    var level = profile.level;
    var proButton;
    if (
      profile.address == this.state.currentAccount &&
      this.state.address != ethers.constants.AddressZero
    ) {
      proButton = (
        <Button
          variant="outline-primary"
          onClick={() => this.setState({show: true})}
        >
          Edit Profile
        </Button>
      );
    } else {
      proButton = (
        <Button variant="outline-primary" disabled>
          Coming Soon
        </Button>
      );
    }

    var cards = <Features />;
    /*var cards = [];
    for (var i = 0; i < 7; i = i + 4) {
      var first = i;
      var last = i + 4 > 7 ? 7 : i + 4;
      var cols = [];
      for (var j = first; j < last; j++) {
        cols.push(
          <Col key={j}>
            <Card style={{width: '12rem'}}>
              <Card.Img
                variant="top"
                src="https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV"
              />
              <Card.Body>
                <Card.Title>Monaliza</Card.Title>
                <Card.Text>A famous art</Card.Text>
                <Button variant="outline-primary">Sell</Button>
              </Card.Body>
            </Card>
          </Col>
        );
      }
      cards.push(
        <Row style={{marginTop: '1rem'}} key={i}>
          {cols}
        </Row>
      );
    }*/
    let active = 0;
    let filters = [
      <Pagination.Item
        key={0}
        active={active === 0}
        onClick={() => (active = 0)}
      >
        All
      </Pagination.Item>,
      <Pagination.Item
        key={1}
        active={active === 1}
        onClick={() => (active = 1)}
      >
        On-Sale
      </Pagination.Item>,
    ];
    return (
      <div className="container">
        <this.editProfile />
        <div className="main-body">
          <Row className="gutters-sm">
            <Col className="md-4 mb-3">
              <Card>
                <Card.Body>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={profile.pro_pic}
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{profile.name}</h4>
                      <p className="text-secondary mb-1">
                        {profile.address.substring(0, 10) + '...'}
                      </p>
                      {proButton}
                    </div>
                  </div>
                </Card.Body>
              </Card>
              <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <FaUsers /> Followers
                    </h6>
                    <span className="text-secondary">Coming Soon!</span>
                  </li>
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <FaUsers /> Following
                    </h6>
                    <span className="text-secondary">Coming Soon!</span>
                  </li>
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <FaStore /> My Sales
                    </h6>
                    <span className="text-secondary">Coming Soon!</span>
                  </li>
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <SiOpslevel /> Aquired Level NFTs
                    </h6>
                    <span className="text-secondary">Coming Soon!</span>
                  </li>
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <FaDollarSign /> Balance to be Distributed
                    </h6>
                    <span className="text-secondary">
                      {this.state.profile.claims} PUPPY
                    </span>
                  </li>
                  <li
                    className="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
                flex-wrap
              "
                  >
                    <h6 className="mb-0">
                      <FaDollarSign /> Balance in the Wallet
                    </h6>
                    <span className="text-secondary">{balance} PUPPY</span>
                  </li>
                </ul>
              </div>
            </Col>
            <div className="col-md-8">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile.name}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Wallet Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Level</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">{level}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Description</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {profile.description}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
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
          </Row>
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);
