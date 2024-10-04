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

| module name   | version              | image                                               | 
|---------------|----------------------|-----------------------------------------------------|
| mod-rs        | mod-rs-2.18.0        | ghcr.io/openlibraryenvironment/mod-rs:2.18.0        |
| mod-directory | mod-directory-2.11.0 | ghcr.io/openlibraryenvironment/mod-directory:2.11.0 | 

#FOLIO backend modules
Currently, its necessary to run forks of mod-circulation and mod-circualtion stroage. Those modules are descrbed here and in folio-overrides.json. 
Using a different version name in the module descriptor will help identify the running version of the circulation modules as a fork. Module Descriptors
with modified IDs are available in the ModuleDescriptors directory for convenience. 

| module name             | version                                | image                                                      | 
|-------------------------|----------------------------------------|------------------------------------------------------------|
| mod-circulation         | mod-circulation-24.1.2-RESHARE         | ghcr.io/indexdata/mod-circulation:circ-2141-deploy         |
| mod-circulation-storage | mod-circulation-storage-17.1.9-RESHARE | ghcr.io/indexdata/mod-circulation-storage:circ-2141-deploy |

## NCIP integration with FOLIO
Edge ncip is required on the FOLIO system that will be communicating with reshare. Use the following versions for ncip:

| module name   | version         | image                    | 
|---------------|-----------------|--------------------------|
| edge-ncip     | edge-ncip-1.9.2 | folioorg/edge-ncip:1.9.2 |
| mod-ncip      | mod-ncip-1.15.1 | folioorg/mod-ncip:1.15.1 | 
General configuration instructions for NCIP are in the [edge-ncip](https://github.com/folio-org/edge-ncip) repository and specific tenant configuration instructions are in the [mod-ncip](https://github.com/folio-org/mod-ncip).

### ReShare specific ncip configurations
The following confugrations are required to enable ncip to communicate with ReShare.

#### Technical user for connection
You need to create technical user which will be used to send request to NCIP module. This user must have these rights:
```
ui-users.settings.owners
ui-checkout.viewFeeFines
circulation-storage.circulation-rules.get
ui-users.manual_charge
inventory-storage.items.collection.get
ui-inventory.all-permissions.TEMPORARY
manualblocks.collection.get
ncip.all
ui-notes.item.create
automated-patron-blocks.collection.get
patron-pin.validate
ui-requests.edit
login-saml.configuration.put
login-saml.configuration.get
ui-circulation.settings.cancellation-reasons
ui-circulation.settings.lost-item-fees-policies
ui-circulation.settings.overdue-fines-policies
ui-circulation.settings.staff-slips
ui-developer.settings.configuration
ui-notes.settings.edit
ui-notes.settings.view
ui-users.settings.owners.all
circulation.loans.add-info.post
```

#### Connection settings
You need to specify connection settings.
That can be done in Settings -> Resource Sharing -> Local NCIP settings: 
* NCIP from agency -> Insert agency directory slug 
* NCIP to agency -> Insert agency directory slug
* NCIP server address -> Insert NCIP server address with API key. It should be in format `{host}/ncip/{api_key}`

#### Enable NCIP for requests
When you have NCIP connection settings you can enable NCIP for specific methods. 
That can be done in Settings -> Resource Sharing -> Host LMS integration settings:
* Host LMS integration -> You need to select `FOLIO` as integration 
* Then you can change settings for each method to `NCIP`

#### Other NCIP related settings 
There are other NCIP related setting which can be adjusted to specific needs. 
These can be found in section Settings -> Resource Sharing. 
You should go over them if you need some specific configuration.

#### NCIP related directory settings
Some NCIP settings are fetch from supplying directory entry. These settings are:
* LMS location code -> Service point slug which is used in NCIP calls
* Institutional patron ID -> User barcode used to check out items on supplier side
* FOLIO location filter -> It is Institution/Campus/Library/Location code used to filter items when creating item request on supplier side

## SLNP state model settings
State model settings should be configured by posting to "/rs/stateModel/import".

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

## Auto Responder Settings

The Auto Responder Settings section allows administrators to configure automated responses for different types of document requests. Below are the detailed options available within this section:

### Auto Responder Requester Non-Returnable

This setting manages auto responder actions specific to the requester's side. Depending on the selected option, the request will transition as follows:

- **On: Available**
  - **Status Transition**: `SLNP_REQUESTER_DOCUMENT_AVAILABLE`
  - **Description**: When enabled, this option triggers a status change indicating the requested document is available for the requester.

- **On: Supplied**
  - **Status Transition**: `SLNP_REQUESTER_DOCUMENT_SUPPLIED`
  - **Description**: When this option is active, it signifies that the requested document has been fully supplied.

### Auto Responder Status

This setting is pertinent to loan-type requests. It controls the messaging to the requester based on the current configuration:

- **On: Will Supply and Cannot Supply**
  - **Behavior**: Sends a "Loaned" message to the requester if this option is enabled. Additionally, upon sending the "Loaned" message, the request status transitions to `SLNP_REQUESTER_SHIPPED`. Note that if other setting values are activated, this response is suppressed.

### Copy Auto Responder Status

This option is used for copy-type requests and influences the sending of loan-related messages:

- **On: Loaned and Cannot Supply**
  - **Behavior**: Dispatches a "Loaned" message to the requester under conditions defined by this setting. As with the previous setting, other enabled settings may prevent this auto response.

## Custom ISO18626 Settings

The Custom ISO18626 Settings section allows for the customization of ISO 18626 interoperability settings through specific options and identifiers. Follow the instructions below to properly configure these settings.

## ISO18626 Custom Options

This setting includes a dropdown menu that allows you to select specific custom identifiers for configuring ISO 18626 settings.

- **Dropdown Option: Custom Identifiers**
  - **Functionality**: Selecting "Custom Identifiers" from the dropdown enables further customization options within this section.

### Adding Custom ISO18626 Settings

When the "Custom Identifiers" option is selected, you will be prompted to add specific custom settings. Follow the steps below:

1. **Set Value**: Enter `ZFL` as the value for the custom ISO 18626 setting.
2. **Save**: Ensure to save your settings after entering the value to apply the changes.

## State/Action Configuration

The State/Action Configuration section is designed to streamline specific actions within the system, particularly for SLNP Returnable Requester. This section details the available settings and their impact on the workflow.

## Combine Requester Actions

This setting pertains to the SLNP Returnable Requester category and offers the ability to unify certain actions, enhancing process efficiency.

- **Setting Name**: Combine Requester Actions 'Mark Returned by Patron' and 'Mark Return Shipped'
  - **Configuration Option**: 
    - **Yes**: When set to "Yes," the actions 'Mark Returned by Patron' and 'Mark Return Shipped' are combined into a single action. This effectively reduces the steps needed in processing, thereby improving workflow efficiency.

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
