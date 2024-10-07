module.exports = {
  okapi: { 'url':'https://slnp-3-okapi.reshare-dev.indexdata.com', 'tenant':'slnptest_three' },
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
      }
    },
    showDevInfo: true,
    staleBundleWarning: { path: '/index.html', header: 'last-modified', interval: 5 },
  },
  modules: {
    '@folio/users': {},
    '@folio/checkin' : {},
    '@folio/checkout' : {},
    '@folio/circulation' : {},
    '@folio/circulation-log' : {},
    '@folio/requests': {},
    '@folio/developer': {},
    '@folio/inventory': {},
    "@folio/tenant-settings": {},
    '@projectreshare/directory': {},
    '@projectreshare/request': {},
    '@projectreshare/rs': {},
    '@projectreshare/supply': {},
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
