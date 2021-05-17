import './App.css';
import './css/Profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Features from './Features';
import Home from './pages/Home';
import GenericNotFound from './pages/GenericNotFound';
import Profile from './pages/Profile';
import Navigation from './MainNav';
import {HashRouter, Switch, Route} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {getProvider} from './functions/ethFunc';
import {ethers} from 'ethers';

function App() {
  useEffect(async function () {
    await window.wallet.connect();

    if (window.wallet.status !== 'connected') {
      //await window.wallet.connect('walletconnect');
      if (
        window.wallet.status !== 'connected' &&
        typeof window.ethereum == 'undefined'
      ) {
        window.provider = new ethers.providers.JsonRpcBatchProvider(
          "'https://data-seed-prebsc-1-s1.binance.org:8545'"
        );
      }
    }
    if (window.wallet.status === 'connected') {
      window.provider = new ethers.providers.Web3Provider(
        window.wallet.ethereum
      );
    }
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
            <Features />
          </Route>
          <Route path="/loyalty">
            <Features />
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
