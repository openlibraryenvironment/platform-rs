module.exports = {
  okapi: { 'url':'http://localhost:9130', 'tenant':'diku' },
  // okapi: { 'url':'https://folio-snapshot-okapi.aws.indexdata.com', 'tenant':'diku' },
  // okapi: { 'url':'https://okapi-reshare.apps.k-int.com', 'tenant':'reshare' },
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
    hasAllPerms: true,
    sharedIndexUI: 'http://shared-index.reshare-dev.indexdata.com',
    sharedIndexWS: 'http://shared-index.reshare-dev.indexdata.com:9130',
    showDevInfo: false,
  },
  modules: {
    '@folio/users': {},
    '@folio/directory': {},
    '@folio/request': {},
    '@folio/supply': {},
    '@folio/rs': {},
    '@folio/developer': {},
    '@folio/box': {},
    "@folio/consortia": {},
    "@folio/scan": {},
    "@folio/shipping": {},
    "@folio/si": {},
    "@folio/unbox": {},
  },
  branding: {
    logo: {
      src: './tenant-assets/opentown-libraries-logo.png',
      alt: 'Opentown Libraries',
    },
    favicon: {
      src: './tenant-assets/opentown-libraries-favicon.png',
    },
  },
};


module.exports.config.showDevInfo = true;
// module.exports.config.logCategories = 'substitute';
if (false) {
  module.exports.config.platformName = 'Mike ReShare';
  module.exports.okapi =
  // { 'url':'https://okapi-reshare.apps.k-int.com', 'tenant':'reshare' }
  // { 'url':'http://demo.reshare-dev.indexdata.com:9130', 'tenant':'reshare' } // reshare_admin/admin
  { 'url':'http://reshare.reshare-dev.indexdata.com:9130', 'tenant':'millersville' } // millersville_admin/admin1350
  // { 'url':'http://localhost:9130', 'tenant':'diku' }
  ;
} else {
  module.exports.config.welcomeMessage = 'ui-courses.front.welcome',
  module.exports.config.platformName = 'Mike CR';
  module.exports.modules['@folio/courses'] = {};
  module.exports.modules['@folio/inventory'] = {};
  'directory,request,supply,rs,box,consortia,scan,shipping,si,unbox'
    .split(',')
    .forEach(name => {
      delete module.exports.modules[`@folio/${name}`];
    });
  module.exports.okapi =
     { 'url':'https://okapi-flo.folio-dev.indexdata.com', 'tenant':'sim_daisy' }
  // { 'url':'https://folio-snapshot-okapi.aws.indexdata.com', 'tenant':'diku' }
  // { 'url':'http://shared-index.reshare-dev.indexdata.com:9130', 'tenant':'diku' }
  ;
}
