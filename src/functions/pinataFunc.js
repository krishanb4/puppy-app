const pinataSDK = require('@pinata/sdk');
const recoverSign = require('./ethFunc').recoverSign;
const fs = require('fs');

const sc = 'fcebc7750ffb180096f2';
const k = 'e5f7b75d4870a713863320ea1e6560ceb0d2bfc8873e7cb7633232c874e58739';

const pinata = pinataSDK(sc, k);
const collectibles = require('../constants/constants').loyaltyCollectibles;

console.log(pinata);
async function generateItem(id, name, description, external_url, address) {
  const body = {
    description: collectibles[`${id}`].description,
    external_url: 'https://puppy.finance/nft/multi/' + id,
    image: collectibles[`${id}`].image,
    name: collectibles[`${id}`].name,
    tokenId: id,
    level: id,
    attributes: [
      {
        display_type: 'date',
        trait_type: 'birthday',
        value: Date.now(),
      },
    ],
  };

  const options = {
    pinataMetadata: {
      name: `${id}:${address}`,
      keyvalues: {
        name: `${id}:${address}`,
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const data = await pinata.pinJSONToIPFS(body, options);
  return data;
}

async function updateProfile(name, description, pro_pic, signature) {
  var address = recoverSign('I want to update my profile.', signature);
  const body = {
    name: name,
    description: description,
    pro_pic: pro_pic,
  };

  const options = {
    pinataMetadata: {
      name: `$${address}`,
      keyvalues: {
        address: `${address}`,
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  const data = await pinata.pinJSONToIPFS(body, options);
  return data;
}

async function uploadImage(file, address) {
  console.log(file);
  var f = null;
  const options = {
    pinataMetadata: {
      name: '',
      keyvalues: {},
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };
  var res = await pinata.pinFileToIPFS(f, options);
  return 'https://ipfs.io/ipfs/' + res.IpfsHash;
}

async function getProfileFromPinata(address) {
  const metadataFilter = {
    name: address,
    keyvalues: {
      address: {
        value: address,
        op: 'eq',
      },
    },
  };

  const filters = {
    status: 'pinned',
    pageLimit: 10,
    pageOffset: 0,
    metadata: metadataFilter,
  };
  var res = await pinata.pinList(filters);
  try {
    return res.rows[0].ipfs_pin_hash;
  } catch (e) {
    return 'QmdPFpBcqrbuQTiLVxLEUXCZhJFS8i1RaCQeNrPkn6pPYi';
  }
}

async function getAll(address) {
  const metadataFilter = {
    keyvalues: {},
  };

  const filters = {
    status: 'pinned',
    pageLimit: 10,
    pageOffset: 0,
    metadata: metadataFilter,
  };
  var res = await pinata.pinList(filters);
  console.log(res);

  for (var i = 0; i < 10; i++) {
    await pinata.unpin(res.rows[i].ipfs_pin_hash);
  }
  if (res.count - 10 > 0) {
    await getAll();
  }
}

export {generateItem, updateProfile, getProfileFromPinata, uploadImage};
