import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {borders} from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import {ethers} from 'ethers';
import {useWallet, UseWalletProvider} from 'use-wallet';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 30,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  items: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    marginTop: 5,
  },
  menu: {
    background: 'transparent',
  },
});

function ConnectButton() {
  const classes = useStyles();
  const wallet = useWallet();
  window.wallet = wallet;
  const blockNumber = wallet.getBlockNumber();
  window.currentAccount = window.wallet.account || ethers.constants.AddressZero;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      {wallet.status === 'connected' ? (
        <Button
          className={classes.root}
          aria-haspopup="true"
          onClick={() => {
            wallet.reset();
            localStorage.setItem('connected', false);
            if (localStorage.getItem('connection') == 'wc') {
              //localStorage.removeItem('walletconnect');
            }
            window.location.reload();
          }}
          variant="outlined"
          color="primary"
        >
          Disconnect
        </Button>
      ) : (
        <div>
          <Box borderRadius="50%">
            <Button
              className={classes.root}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              variant="outlined"
              color="primary"
            >
              Connect
            </Button>
          </Box>

          <Menu
            className={classes.menu}
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              className={classes.items}
              onClick={async function () {
                await wallet.connect();
                localStorage.setItem('connected', true);
                localStorage.setItem('connection', 'metamask');
                window.location.reload();
              }}
            >
              Metamask
            </MenuItem>
            <MenuItem
              className={classes.items}
              onClick={async function () {
                await wallet.connect();
                localStorage.setItem('connected', true);
                localStorage.setItem('connection', 'metamask');
                window.location.reload();
              }}
            >
              Trust Wallet
            </MenuItem>
            <MenuItem
              className={classes.items}
              onClick={async function () {
                await wallet.connect();
                localStorage.setItem('connected', true);
                localStorage.setItem('connection', 'metamask');
                window.location.reload();
              }}
            >
              Safepal Wallet
            </MenuItem>
            <MenuItem
              className={classes.items}
              onClick={async function () {
                await wallet.connect('walletconnect');
                localStorage.setItem('connected', true);
                localStorage.setItem('connection', 'wc');
                window.location.reload();
              }}
            >
              Wallet Connect
            </MenuItem>
          </Menu>
        </div>
      )}
    </Box>
  );
}

export default () => (
  <UseWalletProvider
    chainId={56}
    connectors={{
      // This is how connectors get configured
      portis: {dAppId: 'my-dapp-id-123-xyz'},
      walletconnect: {
        rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      },
    }}
  >
    <ConnectButton />
  </UseWalletProvider>
);
