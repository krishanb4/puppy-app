import React from 'react';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import logo from '.././images/main.png';

class Loyalty extends React.Component {
  render() {
    const items = [];
    for (var i = 0; i < 5; i++) {
      items.push(
        <Carousel.Item>
          <img
            className="d-block w-10"
            src="https://picsum.photos/500/300?img=1"
            alt="First slide"
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      );
    }
    return (
      <div>
        <Row>
          <Col sm>
            <h3>PUPPY Balance</h3>
          </Col>
          <Col sm>
            <h3>Current Loyalty Level</h3>
          </Col>
          <Col sm>
            <h3>Collected</h3>
            <Carousel>{items}</Carousel>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Loyalty;
