import React from 'react';
import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import logo from '.././images/main.png';
import puppy from '../puppy.png';
import {generateItem} from '../functions/pinataFunc';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class Loyalty extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      balance: 100.24,
      level: 3,
    };
    this.checkLevel = this.checkLevel.bind(this);
    this.generate = this.generate.bind(this);
  }

  async checkLevel() {
    const level = 4;
    this.setState({level: this.state.level + 1});
    return level;
  }

  async generate() {
    const level = await this.checkLevel();
    const ipfs_res = await generateItem(level, '', '', '', '');
    const hash = ipfs_res.IpfsHash;
    console.log(hash);
  }
  componentDidMount() {
    this.checkLevel();
  }

  render() {
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
        <Row>
          <Col>
            <Button variant="outline-light" onClick={this.generate}>
              Claim NFT
            </Button>
          </Col>
        </Row>
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
