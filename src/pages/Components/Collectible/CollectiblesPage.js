import Collectible from './CollectibleCard';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  card: {
    maxWidth: 345,
    minWidth: 300,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
}));

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };
  const collectibles = props.collectibles;
  const length = collectibles.length;
  const rows = [];
  const remainder = length % 4;
  const rowCount = (length - remainder) / 4;
  if (props.loaded) {
    for (var i = 0; i < length; i++) {
      //for (var j = 0; j < 4; j++) {
      rows.push(
        <Grid key={i} item>
          <Collectible collectible={collectibles[i]} />
        </Grid>
      );
      //}
      //rows.push({columns}</React.Fragment>);
    }
  } else {
    for (var i = 0; i < 8; i++) {
      rows.push(
        <Grid key={i} item>
          <Card className={classes.card}>
            <CardContent>
              <Skeleton variant="rect" width={300} height={400} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
            </CardContent>
          </Card>
        </Grid>
      );
    }
  }

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={spacing}>
          {rows}
        </Grid>
      </Grid>
    </Grid>
  );
}
