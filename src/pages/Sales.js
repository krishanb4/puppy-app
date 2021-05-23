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

import puppy from '../images/puppy.png';
import back from '../images/back.png';

////////////////////custom functions////////////////
import {checkBalance, ensureConnection} from '../functions/ethFunc';

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
    borderRadius: 50,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    marginRight: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    alignItems: 'left',
  },
  media: {
    width: '50%',
    margin: 'auto',
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
        total: 1500,
        filled_total: 500,
        remaining_total: 0,
        user_filled: 0,
        user_remaining: 0,
      },
      user_balance: 0,
    };
  }

  async componentDidMount() {
    await ensureConnection();
    var balance = await checkBalance(window.currentAccount);
    this.setState({
      user_balance: Number(Number(balance) / 10 ** 18).toFixed(4),
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  component="img"
                  alt=""
                  image={puppy}
                  title=""
                />
                <CardContent>
                  <Typography variant="h4" className={classes.text}>
                    Pre Sale
                  </Typography>
                  <Typography variant="h6">BNB Balance</Typography>
                  <Typography variant="p">{this.state.user_balance}</Typography>
                  <Typography variant="h6">Already Commited</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.user_filled}
                  </Typography>
                  <Typography variant="h6">Remaining</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.user_remaining}
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

                  <Button
                    className={classes.button}
                    size="large"
                    color="primary"
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
                  <Typography variant="h6">BNB Balance</Typography>
                  <Typography variant="p">{this.state.user_balance}</Typography>
                  <Typography variant="h6">Already Commited</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.user_filled}
                  </Typography>
                  <Typography variant="h6">Remaining</Typography>
                  <Typography variant="p">
                    {this.state.pre_sale.user_remaining}
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <Typography variant="p">
                    {0} out of {0} filled.
                  </Typography>
                  <BorderLinearProgress
                    variant="determinate"
                    value={(0 * 100) / this.state.pre_sale.total}
                  />
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
