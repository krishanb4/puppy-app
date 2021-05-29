import one from '../images/collectibles/1_blured.jpg';
import two from '../images/collectibles/2_blured.jpg';
import three from '../images/collectibles/3_blured.jpg';
import seven from '../images/collectibles/4.jpg';
import five from '../images/collectibles/5_blured.jpg';

const loyaltyCollectibles = {
  1: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV',
    attributes: [
      {
        display_type: 'date',
        trait_type: 'birthday',
        value: Date.now(),
      },
    ],
  },
  2: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV',
  },
  3: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV',
  },
  4: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV',
  },
  5: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmVxtQTuo1ycSfhKQA5kgqxyrV68mbbEgYhgerAcjugwRV',
  },
  6: {
    name: 'Monaliza',
    description: 'A famous art',
    image:
      'https://gateway.pinata.cloud/ipfs/QmbrHNccNLcq8RqLvSuLPCazcojWW3aRjKVhPgYi6JysgL',
  },
};
const collectibles = [
  {
    name: 'Skippy',
    id: 7,
    description:
      'This is Skippy.  A friend of our Puppy, representing a rare  NFT brings out by our platform. Skippy is a entry level NFT and will be bringing more exciting NFTs soon on our Marketplace. Be ready !!!',
    image:
      'https://gateway.pinata.cloud/ipfs/QmSkSxa8NNL9ZYaE5Wg2GZ2UjV7SuJbusd2ussrbKCwcwA/Skippy/Skippy.jpg',
    thumbnail:
      'https://gateway.pinata.cloud/ipfs/QmSkSxa8NNL9ZYaE5Wg2GZ2UjV7SuJbusd2ussrbKCwcwA/Skippy/Skippy_thumbnail.jpg',
    rarity: 'medium',
    birthday: 0,
    category: 'puppies',
    total: 1000,
    initial_sale: 500,
    initial_price: 0.01,
  },
];
const minterAddress = '0x107Bf7396D978c2f61556fd2fdabd99fbB36F462';
const storageAddress = '0x4795a7D2Fd2FcCeBab292606c3C49F3fC51Ce7Bd';
const puppyAddress = '0x7C075eDddbcF23e53E561e5AeA8C32067d5adb2d';
const collectionAddress = '0xFde8fF79709017140e7b35f514b8475a81535e39';
const nftSaleAddress = '0x0d60EB76EDEc69dbD951b71Ba25a8255E7AF3Fb1';

export {
  loyaltyCollectibles,
  minterAddress,
  storageAddress,
  puppyAddress,
  collectionAddress,
  nftSaleAddress,
  collectibles,
};
