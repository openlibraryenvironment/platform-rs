module.exports = {
  okapi: { 'url':'http://localhost:9130', 'tenant':'diku' },
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
    hasAllPerms: true
  },
  modules: {
    '@folio/users': {},
    '@folio/request': {},
    '@folio/supply': {},
    '@folio/rs': {},
    '@folio/directory': {},
    '@folio/developer': {},
    '@folio/box': {},
    "@folio/consortia": {},
    "@folio/receive": {},
    "@folio/send": {},
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
