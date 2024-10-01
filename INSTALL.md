# Installation instructions for ReShare 1.18 RC1

## Front end
Front end modules are described in package.json. Modules specific to reshare are scoped wiht the "projectreshare" scope, and can be run alongside a FOLIO platform.

Install dependencies:
```
yarn install
```

Build webpack
```
yarn build --tenant tenantid --okapi https://my-okapi.myorg.tld
```

Build or pull module descriptors (optional)
build:
```
./node_modules/.bin/stripes mod descriptor stripes.config.js --output ./ModuleDescriptors
```
pull:
```
cat > /tmp/pull.json <<END
{"urls" : [ "https://registry.reshare-dev.indexdata.com" ]}
END

curl -w '\n' -X POST -d@/tmp/pull.json http://localhost:9130/_/proxy/pull/modules
```
ReShare specific Module descriptors have been included in the MoudleDescriptors directory on this branch.

## Backend modules
mod-rs and mod-directory are ReShare's unique backend modules. Versions are described here and in reshare-install.json. Additionally,
Forks of mod-circulation and mod-circulation-storage are currently required for SLNP integration. Use the version numbers and images in the
table below.

| module name | version | image | 
| --- | --- | --- |
| mod-rs | mod-rs-2.18.0 | ghcr.io/openlibraryenvironment/mod-rs:2.18.0 |
| mod-directory | mod-directory-2.11.0 | ghcr.io/openlibraryenvironment/mod-directory:2.11.0 | 
| mod-circulation | mod-circulation-24.1.2 | ghcr.io/indexdata/mod-circulation:circ-2141-deploy |
| mod-circulation-storage | mod-circulation-storage-17.1.8 | ghcr.io/indexdata/mod-circulation-storage:circ-2141-deploy |

## NCIP integration with FOLIO
Edge ncip is required on the FOLIO system that will be communicating with reshare. Use the following versions for ncip:
| module name | version | image | 
| --- | --- | --- |
| edge-ncip | edge-ncip-1.9.2 | folioorg/edge-ncip:1.9.2 |
| mod-ncip | mod-ncip-1.14.5 | folioorg/mod-ncip:1.14.5 | 
General configuration instructions for NCIP are in the [edge-ncip](https://github.com/folio-org/edge-ncip) repository.

### ReShare specific ncip configurations
The following confugrations are required to enable ncip to communicate with ReShare

...

## Feature flags
The following feature flags should be set by sending them as a post request to /rs/settings/appSettings:
```
{
  "vocab": "featureFlag",
  "section": "featureFlags",
  "hidden": true,
  "value": "true",
  "settingType": "String",
  "key": "feature_flag_automatic_fees"
}
```
```
{
  "vocab": "featureFlag",
  "section": "featureFlags",
  "hidden": true,
  "value": "false",
  "settingType": "String",
  "key": "state_action_config.combine_fill_and_ship.feature_flag"
}
```
