module.exports = {
  //okapi: { 'url':'https://okapi-reshare.apps.k-int.com', 'tenant':'reshare' },
  okapi: { 'url':'https://north-okapi.folio-dev.indexdata.com', 'tenant':'reshare_north' },
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
        type: 'folio',
        ui: 'https://si-cardinal.reshare-dev.indexdata.com',
        ws: 'https://si-cardinal-okapi.folio-dev.indexdata.com',
        query: 'rs/sharedIndexQuery',
      }
    },
    showDevInfo: true,
  },
  modules: {
    '@folio/users': {},
    '@folio/developer': {},
    "@folio/tenant-settings": {},
    '@reshare/directory': {},
    "@reshare/plugin-rs-siquery-folio": {},
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
