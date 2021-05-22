import {ethers} from 'ethers';
import {minterAddress, puppyAddress} from '../constants/constants';

const puppyABI = require('../abis/bep20.json');
const minterABI = require('../abis/minter.json');
const dataseed = new ethers.providers.JsonRpcBatchProvider(
  'https://bsc-dataseed.binance.org/'
);

function toAddress(address) {
  return ethers.utils.getAddress(address);
}

async function connect() {
  if (window.provider == undefined && window.ethereum != null) {
    var data = await window.ethereum.send('eth_requestAccounts');
    //console.log(window.wallet);
    handleAccountsChanged(data.result);
  }
}

async function ensureConnection() {
  var con = localStorage.getItem('connected');
  if (con == 'true' && window.currentAccount == ethers.constants.AddressZero) {
    if (localStorage.connection == 'metamask') {
      await window.wallet.connect();
    } else if (localStorage.connection == 'wc') {
      await window.wallet.connect('walletconnect');
    }
  }
}

async function signMessage(message) {
  const sig = await window.provider.getSigner().signMessage(message);
  //console.log(sig);
  return sig;
}
function recoverSign(message, sig) {
  const recoveredAddress = ethers.utils.verifyMessage(message, sig);
  //console.log(recoveredAddress);
  return recoveredAddress;
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    window.currentAccount = ethers.constants.AddressZero;
    // MetaMask is locked or the user has not connected any accounts
    //console.log('Please connect to MetaMask.');
  } else {
    window.currentAccount = toAddress(accounts[0]);
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
    // Do any other work!
  }
}

async function checkBalance(account) {
  try {
    const balance = await dataseed.getBalance(account);
    return balance;
  } catch (e) {
    return 0;
  }
}

async function puppyBalance(account) {
  var level = 0;
  try {
    const contract = new ethers.Contract(puppyAddress, puppyABI, dataseed);
    var balance = await contract.balanceOf(account);
    balance = Number(balance) / 10 ** 18;

    if (balance > 50000) {
      level = 6;
    } else if (balance > 10000) {
      level = 5;
    } else if (balance > 5000) {
      level = 4;
    } else if (balance > 1000) {
      level = 3;
    } else if (balance > 500) {
      level = 2;
    } else if (balance > 200) {
      level = 1;
    }
    return [balance, level];
  } catch (e) {
    //console.log(e);
    return [0, 0];
  }
}

async function aquiredNFTs(account) {
  const claimed = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  };
  try {
    const minter = new ethers.Contract(minterAddress, minterABI, dataseed);
    for (var i = 1; i < 7; i++) {
      const claim = await minter.claimed(i, account);
      claimed[`${i}`] = claim;
    }
  } catch (e) {}
  return claimed;
}

async function mint(tokenId) {
  const signer = window.provider.getSigner();
  const minter = new ethers.Contract(minterAddress, minterABI, signer);
  const tx = await minter.mintLevel(tokenId, ethers.constants.HashZero, {
    gasLimit: 30000,
  });
  //console.log(tx.hash);
  return tx.hash;
}

async function waitForTx(tx) {
  const result = await window.provider.waitForTransaction(tx);
  return result.status;
}

if (window.ethereum) {
  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });
  window.ethereum.on('networkChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });
}

export {
  mint,
  connect,
  checkBalance,
  puppyBalance,
  aquiredNFTs,
  waitForTx,
  toAddress,
  signMessage,
  recoverSign,
  ensureConnection,
};
