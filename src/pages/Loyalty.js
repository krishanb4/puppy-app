import React from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import logo from '.././images/main.png';
import puppy from '../puppy.png';
import {generateItem} from '../functions/pinataFunc';
import {
  mint,
  connect,
  checkBalance,
  puppyBalance,
  aquiredNFTs,
} from '../functions/ethFunc';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Loyalty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      balance: 100.24,
      level: 1,
      claims: [
        {id: 1, claimed: false},
        {id: 2, claimed: false},
        {id: 3, claimed: false},
        {id: 4, claimed: false},
        {id: 5, claimed: false},
        {id: 6, claimed: false},
      ],
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
    const ipfs_res = await generateItem(id, '', '', '', '');
    const hash = ipfs_res.IpfsHash;
    await mint(`https://ipfs.io/ipfs/${hash}`, id);
    console.log(hash);
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
            <Col>
              <Button variant="outline-light" disabled>
                Level not reached!
              </Button>
            </Col>
          );
        } else {
          return (
            <Col>
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
          <Col>
            <Button variant="outline-light" disabled>
              Level {value.id} NFT already claimed!
            </Button>
          </Col>
        );
      }
    });
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: {max: 4000, min: 3000},
        items: 5,
      },
      desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 4,
      },
      tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
      },
      mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
      },
    };
    for (var i = 0; i < 5; i++) {
      this.state.items.push(<img width={100} className="mr-3" src={puppy} />);
    }

    return (
      <div className="sm puppy-head">
        <Row>{buttons}</Row>
        <h3>What is Loyalty?</h3>
        <p>
          There are levels to all PUPPY Holders. You can claim NFTs matching
          your level!
        </p>

        <Row>
          <Col></Col>
          <Col sm>
            <Card style={{width: '18rem'}} className="bg-dark text-white">
              <Card.Body>
                <Card.Title>PUPPY Balance</Card.Title>
                <h4>{this.state.balance}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card style={{width: '18rem'}} className="bg-dark text-white">
              <Card.Body>
                <Card.Title>Current Loyalty Level</Card.Title>
                <h4>{this.state.level}</h4>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
          <Col sm>
            <h3>Collected</h3>
            <Carousel responsive={responsive}>{this.state.items}</Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Loyalty;
