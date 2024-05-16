module.exports = {
  //okapi: { 'url':'http://localhost:9130', 'tenant':'diku' },
  okapi: { 'url':'https://east-okapi.folio-dev.indexdata.com', 'tenant':'reshare_east' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    reshare: {
      sharedIndex: {
        type: 'vufind',
        ui: 'https://vufind.reshare-dev.indexdata.com/east',
        query: 'https://vufind.reshare-dev.indexdata.com/east',
      },
      patronURL: '/users?qindex=barcode&query={patronid}',    
    },
    showDevInfo: true,
    staleBundleWarning: { path: '/index.html', header: 'last-modified', interval: 5 },
  },
  modules: {
    '@folio/users': {},
    '@folio/circulation': {},
    '@folio/developer': {},
    '@folio/inventory': {},
    "@folio/tenant-settings": {},
    '@projectreshare/directory': {},
    "@projectreshare/plugin-rs-siquery-vufind": {},
    '@projectreshare/request': {},
    '@projectreshare/rs': {},
    '@projectreshare/supply': {},
    "@projectreshare/update": {},
  },
  branding: {
    style: {},
    logo: {
      src: './tenant-assets/reshare-logo.png',
      alt: 'Opentown Libraries',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.jpg',
    },
  },
};
