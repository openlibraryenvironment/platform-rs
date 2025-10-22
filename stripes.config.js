module.exports = {
  okapi: { 'url':'https://slnp-3-okapi.reshare-dev.indexdata.com', 'tenant':'slnptest_three' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    aboutInstallDate: "2025-06-04T13:53-05:00",
    hasAllPerms: false,
    reshare: {
      sharedIndex: {
        type: 'vufind',
        ui: 'https://cardinal.reshare-dev.indexdata.com',
        query: 'https://cardinal.reshare-dev.indexdata.com',
      },
      patronURL: '/users?qindex=barcode&query={patronid}',
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
