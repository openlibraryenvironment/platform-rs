module.exports = {
  // okapi: { 'url':'http://localhost:9130', 'tenant':'diku' },
  // okapi: { 'url':'https://folio-snapshot-okapi.aws.indexdata.com', 'tenant':'diku' },
  okapi: { 'url':'https://okapi-reshare.apps.k-int.com', 'tenant':'reshare' },
  // okapi: { 'url':'https://east-okapi.folio-dev.indexdata.com', 'tenant':'reshare_east' },
  // okapi: { 'url':'https://west-okapi.folio-dev.indexdata.com', 'tenant':'reshare_west' },
  config: {
    // autoLogin: { username: 'diku_admin', password: 'admin' }
    // logCategories: 'core,redux,connect,connect-fetch,substitute,path,mpath,mquery,action,event,perm,interface,xhr'
    // logPrefix: 'stripes'
    // logTimestamp: false
    // showPerms: false
    showHomeLink: true,
    // listInvisiblePerms: false
    // disableAuth: false
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    sharedIndexUI: 'https://si-cardinal.reshare-dev.indexdata.com',
    sharedIndexWS: 'https://si-cardinal-okapi.folio-dev.indexdata.com',
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
      src: './tenant-assets/reshare-logo.png',
      alt: 'Opentown Libraries',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.jpg',
    },
  },
};
