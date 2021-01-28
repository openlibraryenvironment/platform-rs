module.exports = {
  okapi: { 'url':'https://seton-hall-okapi.reshare.indexdata.com', 'tenant':'seton_hall' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    sharedIndexUI: 'https://palci-si.reshare.indexdata.com',
    sharedIndexWS: 'https://palci-si-okapi.reshare.indexdata.com',
    showDevInfo: true,
    languages: ['en'],
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
      src: './tenant-assets/seton-hall-logo.png',
      alt: 'Seton Hall University',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.jpg',
    },
  },
};
