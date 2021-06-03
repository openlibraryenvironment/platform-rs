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
        type: 'folio',
        ui: 'https://si-cardinal.reshare-dev.indexdata.com',
        ws: 'https://si-cardinal-okapi.folio-dev.indexdata.com',
        query: 'rs/sharedIndexQuery',
      }
    },
    showDevInfo: true,
    languages: ['en'],
    suppressIntlErrors: true,
  },
  modules: {
    '@folio/users': {},
    '@folio/developer': {},
    "@folio/tenant-settings": {},
    '@reshare/directory': {},
    "@reshare/plugin-rs-siquery-folio": {},
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


// stripes serve --devtool eval-source-map stripes.config.js
module.exports.config.showDevInfo = true;
module.exports.config.platformName = 'Mike ReShare';
module.exports.okapi =
// { 'url':'https://okapi-reshare.apps.k-int.com', 'tenant':'reshare' } // admin/rE0gNx7m2o
// { 'url':'http://demo.reshare-dev.indexdata.com:9130', 'tenant':'reshare' } // reshare_admin/admin
// { 'url':'http://reshare.reshare-dev.indexdata.com:9130', 'tenant':'millersville' } // millersville_admin/admin1350
// { 'url':'http://reshare.reshare-dev.indexdata.com:9130', 'tenant':'temple' } // temple_admin/admin1325
// { 'url':'http://localhost:9130', 'tenant':'diku' }
   { 'url':'https://east-okapi.folio-dev.indexdata.com', 'tenant':'reshare_east' } // east_admin/east5231
// { 'url':'https://west-okapi.folio-dev.indexdata.com', 'tenant':'reshare_west' } // west_admin/west5231
;
