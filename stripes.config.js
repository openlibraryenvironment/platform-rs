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
      showRefresh: true,
      sharedIndex: {
        type: 'vufind',
        ui: 'https://cardinal.reshare-dev.indexdata.com',
        query: 'https://cardinal.reshare-dev.indexdata.com',
      }
      //sharedIndex: {
      //  type: 'metaproxy',
      //  ui: 'https://vufind.reshare-dev.indexdata.com/east',
      //  query: 'http://z3950-test.librariesaustralia.nla.gov.au:210/Bibliographic',
      //}
    },
    showDevInfo: true,
    staleBundleWarning: { path: '/index.html', header: 'last-modified', interval: 5 },
  },
  modules: {
    '@folio/users': {},
    '@folio/developer': {},
    "@folio/tenant-settings": {},
    '@projectreshare/directory': {},
    //"@projectreshare/plugin-rs-siquery-vufind": {},
    "@projectreshare/plugin-rs-siquery-metaproxy": {},
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
