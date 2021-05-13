
import React from 'react';
import {Container, Row, Col, Button, Card, Modal} from 'react-bootstrap';
import logo from '.././images/main.png';
import puppy from '../puppy.png';
import {generateItem} from '../functions/pinataFunc';
import {
  mint,
  connect,
  checkBalance,
  puppyBalance,
  aquiredNFTs,
  waitForTx,
} from '../functions/ethFunc';
import {loyaltyCollectibles} from '../constants/constants';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


class Loyalty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0,
      level: 0,
      claims: [
        {id: 1, claimed: false},
        {id: 2, claimed: false},
        {id: 3, claimed: false},
        {id: 4, claimed: false},
        {id: 5, claimed: false},
        {id: 6, claimed: false},
      ],
      minting: false,
    };
    this.checkLevel = this.checkLevel.bind(this);
    this.generate = this.generate.bind(this);
  }

  async checkLevel() {
    const level = 1;
    //this.setState({level: level});
    return level;
  }

  async generate(id) {
    console.log(id);
    this.setState({minting: true});
    const ipfs_res = await generateItem(id, '', '', '', '');
    const hash = ipfs_res.IpfsHash;
    const txHash = await mint(`https://ipfs.io/ipfs/${hash}`, id);
    const status = await waitForTx(txHash);
    if (status == true) {
      aquiredNFTs(window.currentAccount).then((data) => {
        var newClaims = [];
        for (var i = 1; i < 7; i++) {
          newClaims.push({
            id: i,
            claimed: data[`${i}`],
          });

          this.setState({claims: newClaims});
        }
      });
    }

    this.setState({minting: false});
  }
  async componentDidMount() {
    connect().then((dat) => {
      //this.checkLevel();
      puppyBalance(window.currentAccount).then((data) => {
        this.setState({balance: Number(data[0]).toFixed(3)});
        this.setState({level: data[1]});
      });

      aquiredNFTs(window.currentAccount).then((data) => {
        var newClaims = [];
        for (var i = 1; i < 7; i++) {
          newClaims.push({
            id: i,
            claimed: data[`${i}`],
          });

          this.setState({claims: newClaims});
        }
      });
    });
  }

  render() {
    const buttons = this.state.claims.map((value, key) => {
      if (!value.claimed) {
        if (value.id > this.state.level) {
          return (
            <Col key={key}>
              <Button variant="outline-light" disabled>
                Level not reached!
              </Button>
            </Col>
          );
        } else {
          return (
            <Col key={key}>
              <Button
                variant="outline-light"
                onClick={() => this.generate(value.id)}
              >
                Claim Level {value.id} NFT
              </Button>
            </Col>
          );
        }
      } else {
        return (
          <Col key={key}>
            <Button variant="outline-light" disabled>
              Level {value.id} NFT already claimed!
            </Button>
          </Col>
        );
      }
    });

    const items = this.state.claims.map((value, key) => {
      if (value.claimed) {
        return (
          <Card
            style={{width: '18rem'}}
            className="mx-auto bg-dark puppy-head"
            key={key}
          >
            <Card.Img variant="top" src={loyaltyCollectibles[value.id].image} />
            <Card.Body>
              <Card.Title>
                <h3>{loyaltyCollectibles[value.id].name}</h3>
              </Card.Title>
              <Card.Text>{loyaltyCollectibles[value.id].description}</Card.Text>
            </Card.Body>
          </Card>
        );
      }
    });

    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };

    return (
      <div className="sm puppy-head">
        <Modal show={this.state.minting} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>A collectible is mining!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Wait for your collectible to mint!</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Row>{buttons}</Row>
        <h3>What is Loyalty?</h3>
        <p>
          There are levels to all PUPPY Holders. You can claim NFTs matching
          your level!
        </p>

        <Row>
          <Col></Col>
          <Col sm>
            <Card style={{ width: "18rem" }} className="bg-dark text-white">
              <Card.Body>
                <Card.Title>PUPPY Balance</Card.Title>
                <h4>{this.state.balance}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card style={{ width: "18rem" }} className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Current Loyalty Level</Card.Title>
                <h4>{this.state.level}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <h3>Collected</h3>
          <Carousel responsive={responsive}>{items}</Carousel>
        </Row>
      </div>
    );
  }
}
export default Loyalty;
