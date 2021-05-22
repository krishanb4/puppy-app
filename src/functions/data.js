import {getProfileFromPinata} from './pinataFunc';
const axios = require('axios');
async function getProfile(address) {
  const profileHash = await getProfileFromPinata(address);
  //console.log(profileHash);
  var res = await axios.get('https://ipfs.io/ipfs/' + profileHash);
  var profile = res.data;
  profile.address = address;
  profile.claims = getToClaimed(address);
  return profile;
}

function getToClaimed(address) {
  var dataJson = [
    {address: '0x7D6af54879d42382C4a8bA0736f9f191021C582A', claims: 100},
    {address: '0xEE964346D152059D738C46cE6E651aEF8A2019EA', claims: 50},
  ];
  var userData = dataJson.filter(function (element) {
    if (address == element.address) return true;
  });
  try {
    return userData[0].claims;
  } catch (e) {
    return 0;
  }
}

export {getProfile};
