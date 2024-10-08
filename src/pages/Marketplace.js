import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CollectiblePage from './Components/Collectible/CollectiblesPage';

//////////////Custom Functions//////////////////////
import {ensureConnection} from '../functions/ethFunc';
import {collectibles} from '../constants/constants';

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    await ensureConnection();
  }
  render() {
    let active = 0;
    return (
      <Container>
        <CollectiblePage collectibles={collectibles}></CollectiblePage>
      </Container>
    );
  }
}

export default Marketplace;
