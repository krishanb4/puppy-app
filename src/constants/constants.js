import one from '../images/collectibles/1_blured.jpg';
import two from '../images/collectibles/2_blured.jpg';
import three from '../images/collectibles/3_blured.jpg';
import four from '../images/collectibles/4.jpg';
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
    name: 'Will be revealed!',
    description: 'Will be revealed!',
    image: one,
    attributes: [
      {
        display_type: 'date',
        trait_type: 'birthday',
        value: Date.now(),
      },
    ],
  },
  {
    name: 'Will be revealed!',
    description: 'Will be revealed!',
    image: two,
  },
  {
    name: 'Will be revealed!',
    description: 'Will be revealed!',
    image: three,
  },
  {
    name: 'Poodle',
    description: 'Will be revealed!',
    image: four,
  },
  {
    name: 'Will be revealed!',
    description: 'Will be revealed!',
    image: five,
  },
];
const minterAddress = '0x812541A20DF9AE20cF2930F418C8B486edbF368e';
const puppyAddress = '0x7C075eDddbcF23e53E561e5AeA8C32067d5adb2d';

export {loyaltyCollectibles, minterAddress, puppyAddress, collectibles};
