import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

////////////////images/////////////////
import one from '../../../images/collectibles/1.jpg';
import {functions} from 'lodash-es';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 300,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
});

export default function ImgMediaCard(props) {
  const handleBuy = function () {};

  const handleView = function () {};

  const classes = useStyles();
  const collectible = props.collectible;
  return (
    <div display="flex">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt=""
            image={collectible.image}
            title=""
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textSecondary"
            >
              {collectible.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {collectible.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleBuy} disabled>
            Buy
          </Button>
          <Button size="small" color="primary" onClick={handleBuy} disabled>
            Sell
          </Button>
          <Button size="small" color="primary" onClick={handleView} disabled>
            View
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
