import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useParams} from 'react-router-dom';

////////////////images/////////////////
import {functions} from 'lodash-es';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 300,
  },
});

export default function ImgMediaCard() {
  let {col} = useParams();
  //console.log(col);
  const handleBuy = function () {};

  const handleView = function () {};

  const classes = useStyles();
  const collectibles = require('../../../constants/constants').collectibles;
  const collectible = collectibles[col];
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt=""
          height="400"
          width="300"
          image={collectible.image}
          title=""
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {collectible.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {collectible.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleBuy}>
          Buy
        </Button>
        <Button size="small" color="primary" onClick={handleView}>
          View
        </Button>
      </CardActions>
    </Card>
  );
}
