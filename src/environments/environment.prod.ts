const hostnameOrigin = location.origin;
const hostnameArray = hostnameOrigin.split(':');
const hostname = hostnameArray[1].replace('//', '');

export const environment = {
  production: true,
  url: `https://crucial-accord-261801.appspot.com`
};
