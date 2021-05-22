import Collectible from './CollectibleCard';

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

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
}));

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const collectibles = require('../../../constants/constants').collectibles;
  const length = collectibles.length;

  const rows = [];
  const remainder = length % 4;
  const rowCount = (length - remainder) / 4;
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
