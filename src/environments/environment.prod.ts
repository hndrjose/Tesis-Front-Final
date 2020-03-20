const hostnameOrigin = location.origin;
const hostnameArray = hostnameOrigin.split(':');
const hostname = hostnameArray[1].replace('//', '');

export const environment = {
  production: true,
  url: `http://35.225.0.241:3000`
};
