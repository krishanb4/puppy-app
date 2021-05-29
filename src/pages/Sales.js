import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import puppy from '../images/puppy.png';
import back from '../images/back.png';
import {collectibles} from '../constants/constants';

////////////////////custom functions////////////////
import {
  checkBalance,
  ensureConnection,
  puppyBalance,
  buyNFT,
  nftSale,
  waitForTx,
} from '../functions/ethFunc';

const useStyles = (theme) => ({
  root: {
    backgroundImage: `url(${back})`,
    backgroundSize: 'cover',
  },
  grid: {
    flexGrow: 1,
  },
  button: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 50,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    maxWidth: 300,
    minWidth: 300,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    marginRight: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 1,
  },
  media: {
    width: '50%',
    margin: 'auto',
  },
  paper: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    marginBottom: 50,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 30,
  },
  overlay: {
    position: 'relative',
    top: '50px',
    right: '15px',
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'right',
  },
});
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pre_sale: {
        total: 0,
        filled_total: 0,
        remaining_total: 0,
        user_filled: 0,
        user_remaining: 0,
        min: 0,
        max: 0,
      },
      private_sale: {
        total: 0,
        filled_total: 0,
        remaining_total: 0,
        user_filled: 0,
        user_remaining: 0,
        min: 0,
        max: 0,
      },
      nft_sale: {
        name: collectibles[0].name,
        id: collectibles[0].id,
        image: collectibles[0].thumbnail,
        user_filled: 0,
        price: 0,
        on_sale: collectibles[0].initial_sale,
        sold: 0,
      },
      buying_pvt_sale: false,
      buying_pre_sale: false,
      buying_nft_sale: false,
      bought_pvt_sale: false,
      bought_pre_sale: false,
      bought_nft_sale: false,
      open: false,
      message: 'NFT Bought',
      user_balance: 0,
      user_puppy_balance: 0,
      puppy_price: '?',
    };
  }

  async componentDidMount() {
    await ensureConnection();
    var balance = await checkBalance(window.currentAccount);
    var puppyB = await puppyBalance(window.currentAccount);
    var sale = await nftSale(this.state.nft_sale.id);
    const saleData = this.state.nft_sale;
    saleData.on_sale = Number(sale.forSale);
    saleData.sold = Number(sale.sold);
    saleData.price = Number(sale.tokenPrice) / 10 ** 18;
    this.setState({
      user_balance: Number(Number(balance) / 10 ** 18).toFixed(4),
      user_puppy_balance: Number(puppyB[0]).toFixed(4),
      nft_sale: saleData,
    });
  }

  render() {
    const {classes} = this.props;
    const _this = this;
    const buyCollectible = async function () {
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
      const hash = await buyNFT(
        _this.state.nft_sale.id,
        _this.state.nft_sale.price
      );
      _this.setState({
        open: true,
        message: 'NFT Buying in progress!',
        buying_nft_sale: true,
      });
      waitForTx(hash).then((status) => {
        if (status) {
          _this.setState({
            open: true,
            message: 'NFT Bought!',
            bought_nft_sale: true,
          });
        } else {
          _this.setState({
            open: true,
            message: 'Transaction Failed!',
            buying_nft_sale: false,
          });
        }
      });
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      _this.setState({open: false});
    };
    return (
      <div>
        <Snackbar
          open={this.state.open}
          autoHideDuration={6000}
          anchorOrigin={{vertical: 'center', horizontal: 'center'}}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            {this.state.message}
          </Alert>
        </Snackbar>
        <Paper className={classes.paper}>
          <Typography variant="h6" className={classes.text}>
            PUPPY Price: {this.state.puppy_price} $
          </Typography>
          <Typography variant="h6" className={classes.text}>
            PUPPY Balance: {this.state.user_puppy_balance}
          </Typography>
          <Typography variant="h6" className={classes.text}>
            BNB Balance: {this.state.user_balance}
          </Typography>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Card className={classes.card}>
                <CardMedia
                  component="img"
                  alt=""
                  image={this.state.nft_sale.image}
                  title=""
                />

                <CardContent>
                  <Typography variant="h4" className={classes.text}>
                    {this.state.nft_sale.name}
                  </Typography>
                  <Typography variant="p">
                    {this.state.nft_sale.price} BNB
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <Typography variant="p">
                    {this.state.nft_sale.sold} out of{' '}
                    {this.state.nft_sale.on_sale} sold.
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      (this.state.nft_sale.sold * 100) /
                      this.state.nft_sale.on_sale
                    }
                  />
                  <br></br>
                  <Typography variant="small">
                    In initial sale, a single user can buy one time only!
                  </Typography>
                  <br></br>
                  <Button
                    className={classes.button}
                    size="large"
                    color="primary"
                    onClick={buyCollectible}
                    disabled={
                      this.state.bought_nft_sale || this.state.buying_nft_sale
                    }
                  >
                    Buy
                  </Button>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt=""
                  image={puppy}
                  title=""
                />
                <CardContent>
                  <Typography variant="h4">Pre Sale</Typography>
                  <Typography variant="small">(Not started yet!)</Typography>
                  <br></br>
                  <Typography variant="p">
                    Min: {this.state.pre_sale.min}
                  </Typography>
                  <br></br>
                  <Typography variant="p">
                    Max: {this.state.pre_sale.max}
                  </Typography>
                  <Typography variant="h6">Already Commited</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.user_filled}
                  </Typography>
                  <Typography variant="h6">Remaining</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.max - this.state.pre_sale.user_filled}{' '}
                    BNB
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <Typography variant="p">
                    {this.state.pre_sale.filled_total} out of{' '}
                    {this.state.pre_sale.total} filled.
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={
                      (this.state.pre_sale.filled_total * 100) /
                      this.state.pre_sale.total
                    }
                  />
                  <br></br>
                  <Typography variant="p" className={classes.text}>
                    In initial sale, a single user can buy upto a maximum of{' '}
                    {this.state.pre_sale.max} BNB, starting from{' '}
                    {this.state.pre_sale.min} BNB
                  </Typography>
                  <br></br>
                  <Button
                    className={classes.button}
                    size="large"
                    color="primary"
                    disabled
                    //onClick={handleBuy}
                  >
                    Buy
                  </Button>
                </CardActionArea>
              </Card>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt=""
                  image={puppy}
                  title=""
                />
                <CardContent>
                  <Typography variant="h4">Private Sale</Typography>
                  <Typography variant="small">(Not started yet!)</Typography>
                  <br></br>
                  <Typography variant="p">
                    Min: {this.state.private_sale.min}
                  </Typography>
                  <br></br>
                  <Typography variant="p">
                    Max: {this.state.private_sale.max}
                  </Typography>
                  <Typography variant="h6">Already Commited</Typography>
                  <Typography variant="p">
                    {this.state.private_sale.user_filled}
                  </Typography>
                  <Typography variant="h6">Remaining</Typography>
                  <Typography variant="p">
                    {this.state.private_sale.max -
                      this.state.private_sale.user_filled}{' '}
                    BNB
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <Typography variant="p">
                    {this.state.private_sale.filled_total} out of{' '}
                    {this.state.private_sale.total} filled.
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={(0 * 100) / this.state.private_sale.total}
                  />
                  <br></br>
                  <Typography variant="small" className={classes.text}>
                    In initial sale, a single user can buy upto a maximum of{' '}
                    {this.state.private_sale.max} BNB, starting from{' '}
                    {this.state.private_sale.min} BNB
                  </Typography>
                  <br></br>
                  <Button
                    className={classes.button}
                    size="large"
                    color="primary"
                    //onClick={handleBuy}
                    disabled
                  >
                    Buy
                  </Button>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(useStyles, {withTheme: true})(Sales);
