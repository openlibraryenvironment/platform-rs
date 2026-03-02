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
    aboutInstallDate: "2026-02-25T22:16-05:00",
    aboutInstallVersion: "Sunflower on Okapi CSP 5",
  },
  modules: {
    '@folio/users': {},
    '@folio/checkin' : {},
    '@folio/checkout' : {},
    '@folio/circulation' : {},
    '@folio/circulation-log' : {},
    '@folio/requests': {},
    '@folio/inventory': {},
    '@folio/developer': {},
    '@folio/service-interaction': {},
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
