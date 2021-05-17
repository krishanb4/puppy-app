import {getProfileFromPinata} from './pinataFunc';
const axios = require('axios');
async function getProfile(address) {
  const profileHash = await getProfileFromPinata(address);
  console.log(profileHash);
  var res = await axios.get('https://ipfs.io/ipfs/' + profileHash);
  var profile = res.data;
  profile.address = address;
  return profile;
}

export {getProfile};
