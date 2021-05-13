import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
import Web3Modal from "web3modal";
import getNodeUrl from "../getRpc";

const POLLING_INTERVAL = 12000;
const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);

let provider = null;
let web3 = null;
let accounts = null;

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
            rpc: {
                [chainId]: rpcUrl,
            },
            bridge: "https://bridge.walletconnect.org",
            qrcode: true,
            pollingInterval: POLLING_INTERVAL,
        },
    },
};

async function init() {
    if (!provider) {
        const web3Modal = new Web3Modal({
            cacheProvider: true, // optional
            providerOptions, // required
        });
        web3 = await connect(web3Modal);
    }

    if (!accounts) {
        accounts = await web3.eth.getAccounts();
        console.log(`Wallet address: ${accounts[0].toLowerCase()}`);
    }

    return accounts[0].toLowerCase();
}

async function connect(web3Modal) {
    provider = await web3Modal.connect();
    return new Web3(provider);
}

export default init;