module.exports = {
  okapi: { 'url':'https://thenewschool-okapi.reshare.indexdata.com', 'tenant':'new_school' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    sharedIndexUI: 'https://palci-si.reshare.indexdata.com',
    sharedIndexWS: 'https://palci-si-okapi.reshare.indexdata.com',
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
      src: './tenant-assets/new-school-logo.png',
      alt: 'The New School',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.jpg',
    },
  },
};
