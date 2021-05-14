import {ethers} from 'ethers';
import {minterAddress, puppyAddress} from '../constants/constants';

const puppyABI = require('../abis/bep20.json');
const minterABI = require('../abis/minter.json');

async function connect() {
  if (window.provider == undefined && window.ethereum != null) {
    var data = await window.ethereum.send('eth_requestAccounts');

    handleAccountsChanged(data.result);
  }
}

function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // MetaMask is locked or the user has not connected any accounts
    console.log('Please connect to MetaMask.');
  } else {
    window.currentAccount = accounts[0];
    window.provider = new ethers.providers.Web3Provider(window.ethereum);
    // Do any other work!
  }
}

async function checkBalance(account) {
  try {
    const balance = await window.provider.getBalance(account);
    return balance;
  } catch (e) {
    return 0;
  }
}

async function puppyBalance(account) {
  var level = 0;
  try {
    const contract = new ethers.Contract(
      puppyAddress,
      puppyABI,
      window.provider
    );
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
    } else if (balance > 100) {
      level = 1;
    }
    return [balance, level];
  } catch (e) {
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
    const minter = new ethers.Contract(
      minterAddress,
      minterABI,
      window.provider
    );
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
  console.log(tx.hash);
  return tx.hash;
}

async function waitForTx(tx) {
  const result = await window.provider.waitForTransaction(tx);
  return result.status;
}

if (typeof window.ethereum != 'undefined') {
  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });
  window.ethereum.on('networkChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    window.location.reload();
  });
}
export {mint, connect, checkBalance, puppyBalance, aquiredNFTs, waitForTx};
