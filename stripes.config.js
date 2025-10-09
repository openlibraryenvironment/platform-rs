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
      //sharedIndex: {
      //  type: 'vufind',
      //  ui: 'https://vufind.reshare-dev.indexdata.com/east',
      //  query: 'https://vufind.reshare-dev.indexdata.com/east',
      //}
      sharedIndex: {
        type: 'metaproxy',
        ui: 'https://vufind.reshare-dev.indexdata.com/east',
        query: 'http://z3950-test.librariesaustralia.nla.gov.au:210/Bibliographic',
      }
    },
    disableStrictMode: true,
    suppressIntlErrors: true,
    showDevInfo: true,
    staleBundleWarning: { path: '/index.html', header: 'last-modified', interval: 5 },
    aboutInstallDate: "2025-10-09T22:16-05:00",
    aboutInstallVersion: "Ramsons CSP 4",
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
