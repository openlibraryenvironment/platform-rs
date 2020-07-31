module.exports = {
  okapi: { 'url':'https://temple-okapi.folio-dev.indexdata.com', 'tenant':'temple' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    sharedIndexUI: 'https://palci-si.reshare-dev.indexdata.com',
    sharedIndexWS: 'https://palci-si-okapi.folio-dev.indexdata.com',
    showDevInfo: true,
  },
  modules: {
    '@folio/users': {},
    '@folio/directory': {},
    '@folio/rs': {},
    '@folio/request': {},
    '@folio/request': {},
    '@folio/supply': {},
    '@folio/developer': {},
    "@folio/update": {},
    "@folio/tenant-settings": {},
  },
  branding: {
    logo: {
      src: './tenant-assets/temple.svg',
      alt: 'Temple University',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.png',
    },
  },
};
