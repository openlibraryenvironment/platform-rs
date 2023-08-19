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
    '@folio/developer': {},
    "@folio/tenant-settings": {},
    '@reshare/directory': {},
    "@reshare/plugin-rs-siquery-vufind": {},
    '@reshare/request': {},
    '@reshare/rs': {},
    '@reshare/supply': {},
    "@reshare/update": {},
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
