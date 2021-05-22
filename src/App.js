import './css/App.css';
import './css/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Features from './pages/Features';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import GenericNotFound from './pages/GenericNotFound';
import Profile from './pages/Profile';
import Loyalty from './pages/Loyalty';
import CollectiblePage from './pages/Components/Collectible/CollectiblePage';
import Navigation from './MainNav';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getProvider} from './functions/ethFunc';
import {ethers} from 'ethers';

function App() {
  useEffect(async function () {
    var con = localStorage.getItem('connected');
    if (con == 'true') {
      if (localStorage.connection == 'metamask') {
        await window.wallet.connect();
      } else if (localStorage.connection == 'wc') {
        await window.wallet.connect('walletconnect');
      }
    }
    if (window.wallet.status === 'connected') {
      window.provider = new ethers.providers.Web3Provider(
        window.wallet.ethereum
      );
    } else {
      window.provider = new ethers.providers.JsonRpcBatchProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545'
      );
    }
    window.currentAccount =
      window.wallet.account || ethers.constants.AddressZero;
  });
  return (
    <HashRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/nft">
            <Marketplace />
          </Route>
          <Route path="/col/:col">
            <CollectiblePage />
          </Route>
          <Route path="/loyality">
            <Loyalty />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route>
            <GenericNotFound />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
