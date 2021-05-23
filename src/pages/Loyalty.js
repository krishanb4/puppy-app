import React from 'react';
import {Container, Row, Col, Modal} from 'react-bootstrap';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';

import {withStyles} from '@material-ui/core/styles';
import logo from '.././images/main.png';
import puppy from '../images/puppy.png';
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

const useStyles = (theme) => ({
  grid: {
    flexGrow: 1,
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: 10,
  },
  card: {
    maxWidth: 345,
    minWidth: 300,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  media: {
    width: '50%',
    margin: 'auto',
  },
});

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
    //console.log(id);
    this.setState({minting: true});
    //const ipfs_res = await generateItem(id, '', '', '', '');
    //const hash = ipfs_res.IpfsHash;
    const txHash = await mint(id);
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
    const {classes} = this.props;
    const buttons = this.state.claims.map((value, key) => {
      if (!value.claimed) {
        if (value.id > this.state.level) {
          return (
            <Grid key={key} item>
              <Badge badgeContent="Coming soon" color="primary">
                <Button className={classes.button} disabled>
                  Level not reached!
                </Button>
              </Badge>
            </Grid>
          );
        } else {
          return (
            <Grid key={key} item>
              <Badge badgeContent="Coming soon" color="primary">
                <Button
                  className={classes.button}
                  //onClick={() => this.generate(value.id)}
                >
                  Claim Level {value.id} NFT
                </Button>
              </Badge>
            </Grid>
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
          <Card className={classes.card}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt=""
                image={loyaltyCollectibles[value.id].image}
                title=""
              />
              <CardContent>
                <Typography
                  gutterBottom
                  //color="textSecondary"
                  className={classes.text}
                >
                  {loyaltyCollectibles[value.id].name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {loyaltyCollectibles[value.id].description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
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
        items: 1,
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

    return (
      <div className={classes.root}>
        <Modal show={this.state.minting} backdrop="static" keyboard={false}>
          <Modal.Header>
            <Modal.Title>A collectible is mining!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Wait for your collectible to mint!</Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
        <Grid container className={classes.grid} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {buttons}
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  alt=""
                  image={puppy}
                  title=""
                  className={classes.media}
                />
                <CardContent>
                  <Typography variant="h5"> My Balance</Typography>
                  <Typography variant="h8"> {this.state.balance}</Typography>
                  <Typography variant="h5"> My Level</Typography>
                  <Typography variant="h8"> {this.state.level}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(useStyles, {withTheme: true})(Loyalty);
