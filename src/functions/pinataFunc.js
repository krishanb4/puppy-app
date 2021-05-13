const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(
  'fcebc7750ffb180096f2',
  'e5f7b75d4870a713863320ea1e6560ceb0d2bfc8873e7cb7633232c874e58739'
);
const collectibles = require('../constants/constants').loyaltyCollectibles;

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

export {generateItem};
