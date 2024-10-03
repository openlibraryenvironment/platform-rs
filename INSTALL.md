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

## ReShare backend modules
mod-rs and mod-directory are ReShare's unique backend modules. Versions are described here and in reshare-install.json.
table below.

| module name | version | image | 
| --- | --- | --- |
| mod-rs | mod-rs-2.18.0 | ghcr.io/openlibraryenvironment/mod-rs:2.18.0 |
| mod-directory | mod-directory-2.11.0 | ghcr.io/openlibraryenvironment/mod-directory:2.11.0 | 

#FOLIO backend modules
Currently, its necessary to run forks of mod-circulation and mod-circualtion stroage. Those modules are descrbed here and in folio-overrides.json. 
Using a different version name in the module descriptor will help identify the running version of the circulation modules as a fork. Module Descriptors
with modified IDs are available in the ModuleDescriptors directory for convenience. 
| module name | version | image | 
| --- | --- | --- |
| mod-circulation | mod-circulation-24.1.2-RESHARE | ghcr.io/indexdata/mod-circulation:circ-2141-deploy |
| mod-circulation-storage | mod-circulation-storage-17.1.9-RESHARE | ghcr.io/indexdata/mod-circulation-storage:circ-2141-deploy |

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

## SLNP state model settings

| Setting                               | State model                |
| ---                                   | ---                        |
| requester_returnables_state_model     | SLNPRequester              |
| requester_non_returnables_state_model | SLNPNonReturnableRequester |
| responder_returnables_state_model     | SLNPResponder              |
| responder_non_returnables_state_model | SLNPNonReturnableResponder |

```
{
        "value": "SLNPNonReturnableRequester",
        "section": "state_model",
        "hidden": true,
        "settingType": "String",
        "key": "requester_non_returnables_state_model"
    },
    {
        "value": "SLNPRequester",
        "section": "state_model",
        "hidden": true,
        "settingType": "String",
        "key": "requester_returnables_state_model"
    },
    {
        "value": "SLNPNonReturnableResponder",
        "section": "state_model",
        "hidden": true,
        "settingType": "String",
        "key": "responder_non_returnables_state_model"
    },
    {
        "value": "SLNPResponder",
        "section": "state_model",
        "hidden": true,
        "settingType": "String",
        "key": "responder_returnables_state_model"
    }
```

## Feature flags
The following feature flags should be set by sending them as a post request to /rs/settings/appSettings:

### Note: 
- The "value" field determines the visibility of the section.
  - If "value" is set to null or true, the section is visible.
  - If "value" is set to "false", the section is disabled.
- The "key" field serves as the representation of the section.

- To hide a specific record when the section is expanded, the "key" is structured as follows: section.key.feature_flag.
  For example, in:
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

```
[
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "state_action_config.combine_fill_and_ship.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "sharedIndex.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "chat.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "fileStorage.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "voyagerSettings.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "patronStore.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "wmsSettings.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "Routing.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "z3950.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "hostLMSItemLoanPolicies.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "hostLMSLocations.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "hostLMSPatronProfiles.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "noticePolicies.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "automaticFees.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "pullslipTemplates.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "hostLMSShelvingLocations.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "notices.feature_flag"
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "false",
        "settingType": "String",
        "key": "pullslipNotifications.feature_flag"
    }
]
```
