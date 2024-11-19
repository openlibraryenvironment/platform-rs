# Installation and configuration instructions for ReShare 1.18

## Directory

### General configuration

We recommend that every campus in FOLIO with its own ISIL is represented as a separate __Institution__ in the directory and every pick-up location is specified as a __Unit__. 

When the institution acts as a supplier, it's important that the `FOLIO location filter` and the `LMS location code` are specified. 

When the institution acts as a requester, it's important that the `Institutional patron ID` is specified.

For the units representing physical pick-up locations on the requester, it's important that the `LMS location code` is specified.

### How the entries are used

* when the tenant acts as a supplier:
    * __supplier directory entry__ is looked up by the supplier’s ISIL (`SigelGB`) and two fields are important when creating the FOLIO request via NCIP `RequestItem`:
        * `FOLIO location filter` -> used to ensure that the request will page items in the specified location only
        * `LMS location code` -> used for the pickup location in the FOLIO request. This should be a special __ILL Office__ service point without any physical FOLIO locations assigned. It will ensure the requested items are always marked `In transit` in the supplier’s FOLIO system.
    * __requester directory entry__ is looked up by the requester’s ISIL (`SigelNB`) and one field is important when creating the FOLIO request via NCIP `RequestItem`:
        * `Institutional patron ID` -> the barcode of the institutional user that will be used in the FOLIO request
* when the tenant acts as a requester:
    * __directory entry for the physical pick-up location__ on the requester side (as selected by patron) is looked up by name (`AusgabeOrt`) and not by ISIL and one field is important to create the temporary item and request in the requester’s FOLIO system via NCIP `AcceptItem`:
        * `LMS location code` -> should be a FOLIO service point code of the actual physical pick-up location

### Service Account
     
For all directory entries representing requesting and supplying institutions, the __Service Account__ (ISO18626 endpoint) must be configured to point at the local SLNP gateway. __NOTE:__ Once available, create a Service Account with the function `SLNP gateway`. It will be used automatically for all directory entries that have no Service Accounts assigned. It's the preferred way to configure Service Accounts for the ZFL tenants.

## Edge gateway

The SLNP gateway is installed with a helm [chart](https://github.com/indexdata/edge-slnp/pkgs/container/charts%2Fedge-slnp) and configured via ENV variables.

The relevant config is:

```
ILL_ADDR: <address of the ReShare ISO18626 endpoint, e.g http://mod-rs-2-18-2:8080/rs/externalApi/iso18626>
OKAPI_TENANT: <name of the ReShare/FOLIO tenant>
SLNP_ADDR: <ZFL address>
REC_ID_PREFIX: <appends a prefix to the TitelId, should be set to the main ISIL symbol of the tenant (e.g 'DE-91.1')
AGENCY_TYPE: <optional, must match the Authority setting for Directory entries, default is 'ISIL'>
```

## Front end
Front-end modules are described in package.json. Modules specific to reshare are scoped with the "projectreshare" scope and can be run alongside a FOLIO platform. If using a custom package.json, be sure the versions match what is specified in the package.json in this repository.

Configure stripes.config.js. Add required FOLIO and ReShare frontend modules to `modules` section. Add `sharedIndex` and `patronURL` details to `reshare` section. `patronURL` is required to enable the Requesting User section.
```
module.exports = {
  okapi: { 'url':'https://my-okapi.myorg.tld', 'tenant':'tenantid' },
  config: {
    showHomeLink: true,
    welcomeMessage: 'ui-rs.front.welcome',
    platformName: 'ReShare',
    platformDescription: 'ReShare platform',
    hasAllPerms: false,
    reshare: {
      sharedIndex: {
        type: 'vufind',
        ui: 'https://vufind.myorg.ltd',
        query: 'https://vufind.myorg.ltd',
      },
      patronURL: '/users?qindex=barcode&query={patronid}',
    },
    showDevInfo: true,
    staleBundleWarning: { path: '/index.html', header: 'last-modified', interval: 5 },
  },
  modules: {
    '@folio/users': {},
    '@folio/checkin' : {},
    '@folio/checkout' : {},
    '@folio/circulation' : {},
    '@folio/circulation-log' : {},
    '@folio/requests': {},
    '@folio/developer': {},
    '@folio/inventory': {},
    "@folio/tenant-settings": {},
    '@projectreshare/directory': {},
    '@projectreshare/request': {},
    '@projectreshare/rs': {},
    '@projectreshare/supply': {},
  },
  branding: {
    style: {},
    logo: {
      src: './tenant-assets/reshare-logo.png',
      alt: 'Opentown Libraries',
    },
    favicon: {
      src: './tenant-assets/reshare-favicon.jpg',
    },
  },
};
```

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
ReShare-specific Module descriptors have been included in the [ModuleDescriptors](ModuleDescriptors/) directory on this branch.

## ReShare backend modules
mod-rs and mod-directory are ReShare's unique backend modules. 1.18 release-specific versions are described in [reshare-install.json](reshare-install.json).

| module name | version | image | 
| --- | --- | --- |
| mod-rs | mod-rs-{version} | ghcr.io/openlibraryenvironment/mod-rs:{version} |
| mod-directory | mod-directory-{version} | ghcr.io/openlibraryenvironment/mod-directory:{version} | 

## FOLIO backend modules
Currently, it's necessary to run custom versions of `mod-circulation` and `mod-circulation-storage` modules which include extensions required for the ZFL integration. 1.18 release-specific versions are described in [folio-overrides.json](folio-overrides.json). 
The module descriptors use a `-RESHARE` designator in the module ID to help identify these custom versions at runtime. The module descriptors
with modified IDs are available in the [ModuleDescriptors](ModuleDescriptors/) directory for convenience. 

| module name             | version                                | image                                                      | 
|-------------------------|----------------------------------------|------------------------------------------------------------|
| mod-circulation         | mod-circulation-{version}-RESHARE         | ghcr.io/indexdata/mod-circulation:{version}-RESHARE         |
| mod-circulation-storage | mod-circulation-storage-{version}-RESHARE | ghcr.io/indexdata/mod-circulation-storage:{version}-RESHARE |

## Backend module environment variables.
Both mod-rs and mod-directory need access to a module database, okapi, and to a kafka instance. Use the following environment variables for both modules:
| Variable | Description |
| ------- | ------  |
|  DB_DATABASE | name of database (e.g. "reshare_modules") |
|  DB_HOST |  database hostname (e.g.) postgres.reshare-dev.indexdata.com |
| DB_USERNAME | database user username |
| DB_PASSWORD | database user password |
| DB_PORT | Postgres port (e.g. 5432) |
| OKAPI_SERVICE_HOST | hostname of okapi service (e.g. "okapi"), do not include scheme or port. |
| OKAPI_SERVICE_PORT | port of okapi service (e.g. 9130)
| EVENTS_PUBLISHER_BOOTSTRAP_SERVERS | kafka hostname and port. (e.g. kafka-reshare:9092) |
| EVENTS_CONSUMER_BOOTSTRAP_SERVERS | kafka hostname and port. (e.g. kafka-reshare:9092) |


## NCIP integration with FOLIO
The latest `edge-ncip` and `mod-ncip` modules are required in the FOLIO system to allow communication with ReShare. These modules are not available in the Poppy release so use the versions specified in [folio-overrides.json](folio-overrides.json)

| module name   | version         | image                    | 
|---------------|-----------------|--------------------------|
| edge-ncip     | edge-ncip-1.9.2 | folioorg/edge-ncip:1.9.2 |
| mod-ncip      | mod-ncip-1.15.5 | folioorg/mod-ncip:1.15.5 |

NCIP settings are configured via mod-configuration. You can retrieve them via `/configurations/entries?query=module=NCIP&limit=1000`

General configuration instructions for NCIP are in the [edge-ncip](https://github.com/folio-org/edge-ncip) repository and specific tenant configuration instructions are in the [mod-ncip](https://github.com/folio-org/mod-ncip).

These settings should be set for a specific `agencyId`/`configName` used in the ReShare config, for example `RESHARE`.

Specific description for each of the settings: 

1. `instance.type.name` - must be defined under _Settings > Inventory > Instances > Resource Types_. Used during `AcceptItem` when creating the instance record.
2. `instance.source` - any text value, used during `AcceptItem` when creating the instance record. Use `RESHARE`
3. `item.material.type.name` - must be defined under _Settings > Inventory > Items > Material Types_. Used during `AcceptItem` when creating the item record.
4. `item.perm.loan.type.name` - must be defined under _Settings > Inventory > Items > Loan Types_. Used during `AcceptItem` when creating the item record.
5. `item.status.name` - Used during `AcceptItem` when creating the item record. Can be one of the available values: _Available, Awaiting pickup, Awaiting delivery, Checked out, In transit, Missing, Paged, On order, In process, Declared lost, Claimed returned, Withdrawn, Lost and paid, Aged to lost_. Use `Available`.
6. `item.perm.location.code` - Used during `AcceptItem` when creating the item record. Must be defined under _Settings > Tenant > Locations_
7. `holdings.perm.location.code` - Used during `AcceptItem` when creating the holding record. Must be defined under _Settings > Tenant > Locations_
8. `instance.custom.identifier.name` - Used during `AcceptItem` when creating the instance record. Must be defined under _Settings -> Inventory -> Instances -> Resource Identifier Types_. You might want to use the `Other standard identifier` value.
9. `checkout.service.point.code` - Service point code used during `CheckOutItem` and as default during `RequestItem`. Must be defined under _Settings > Tenant > Service points_. We recommend you create e.g. `ILL Office` service point and use that.
10. `checkin.service.point.code` - Service point code used during `CheckInItem`. Must be defined under _Settings > Tenant > Service points_. We recommend you create e.g. `ILL Office` service point and use that.
11. `response.includes.physical.address` -  Boolean value to include address. Optional, defaults to false. Used during `LookupUser` response.
12. `user.priv.ok.status` - Status code used during `LookupUser`. Optional, defaults to _ACTIVE_, can take any text value. Keep the default.
13. `user.priv.blocked.status` - Status code used during `LookupUser`. Optional, defaults to _BLOCKED_, can take any text value. Keep the default.
14. `holdings.source.name` - Holdings source name used during `AcceptItem`. Must be defined under _Settings > Inventory > Holdings sources_. Optional, defaults to _FOLIO_. Use `RESHARE`.
15. `user.email.type` - Optional, defaults to "electronic mail address". Used during `LookupUser` response. Keep the default
16. `cancel.request.reason.name` - Reason for request cancellation if an item with a different barcode is checked out.  Used during `CancelRequestItem`. Must be defined under _Settings > Circulation > Request cancellation reasons_
17. `cancel.request.reason.patron.name` - Reason for request cancellation when a patron did not check out the item. Used during `DeleteItem` if there's an open request. Must be defined under _Settings > Circulation > Request cancellation reasons_
18. `request.note.name` - Note type name used during `RequetItem` and `AcceptItem` if notes are enabled. The default value is _ILL note_. Must be defined under `/note-types`. There is no Settings UI for this so it must be sent by POST:
```
    {
            "name": "ILL note",
            "usage": {
                "isAssigned": false
            }
    }
```
19. `request.note.enabled` - Controls if request notes should be added during `RequestItem` and `AcceptItem`. Boolean, defaults to _false_. We recommend this is enabled.
20. `item.soft.delete` - Used during `DeleteItem`. Suppresses rather than deletes the item record. Boolean, defaults to `true`. Keep the default.

Here is an example JSON of these entries which you need to POST to the endpoint `/configurations/entries`:
```
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "instance.source",
    "enabled": true,
    "value": "RESHARE"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "user.priv.ok.status",
    "enabled": true,
    "value": "OK"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "item.material.type.name",
    "enabled": true,
    "value": "text"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "user.priv.blocked.status",
    "enabled": true,
    "value": "DO NOT LOAN"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "item.status.name",
    "enabled": true,
    "value": "Available"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "item.perm.loan.type.name",
    "enabled": true,
    "value": "Can circulate"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "instance.type.name",
    "enabled": true,
    "value": "text"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "holdings.source.name",
    "enabled": true,
    "value": "FOLIO"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "instance.custom.identifier.name",
    "enabled": true,
    "value": "Other standard identifier"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "holdings.perm.location.code",
    "enabled": true,
    "value": "ms/ml/ll/main"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "item.perm.location.code",
    "enabled": true,
    "value": "ms/ml/ll/main"
}
{
    "module": "NCIP",
    "configName": "reshare"
    "code": "cancel.request.reason.patron.name",
    "enabled": true,
    "value": "Item not picked by patron"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "cancel.request.reason.name",
    "enabled": true,
    "value": "Different Item Checkout"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "request.note.enabled",
    "enabled": true,
    "value": "true"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "item.soft.delete",
    "enabled": true,
    "value": "true"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "checkin.service.point.code",
    "enabled": true,
    "value": "reshare_service"
}
{
    "module": "NCIP",
    "configName": "reshare",
    "code": "checkout.service.point.code",
    "enabled": true,
    "value": "reshare_service"
}
```

### Institutional user for NCIP connection
Create an institutional user that will be used to send requests from ReShare to the FOLIO NCIP module. This user must have these permissions:
```
accounts.item.post
automated-patron-blocks.collection.get
circulation.loans.add-info.post
circulation.requests.collection.get
circulation.requests.item.get
circulation.requests.item.put
circulation-storage.cancellation-reasons.collection.get
circulation-storage.circulation-rules.get
feefines.collection.get
inventory.instances.item.delete
inventory.instances.collection.get
inventory.items.collection.get
inventory.items.item.put
inventory.items.item.delete
inventory-storage.items.collection.get
manualblocks.collection.get
ncip.all
note.types.collection.get
notes.domain.all
owners.collection.get
ui-circulation.settings.lost-item-fees-policies
ui-circulation.settings.overdue-fines-policies
```


### ReShare NCIP configuration
The following configuration is required to enable ReShare to communicate with FOLIO via NCIP.

#### Connection settings
Specify the NCIP connection settings in ReShare. This can be done in _Settings -> Resource Sharing -> Local NCIP settings_: 
* NCIP from agency -> set this to the agencyId you used in the mod-ncip config (aka `configName`) in this example it's `reshare` 
* NCIP to agency -> this can be left unset to use the same value as for _from Agency_
* NCIP server address -> Insert NCIP server address with API key. It should be in the format `{host}/ncip/{api_key}`, e.g `http://mod-ncip:8080/ncip/eKLJGLKG`
* Use Title type for Request Item -> "Yes" to use title-level page requests

#### Enable NCIP for requests
With NCIP connection settings configured, you can enable NCIP for specific methods. 
That can be done in _Settings -> Resource Sharing -> Host LMS integration settings_:
* Host LMS integration -> You need to select `FOLIO` as the integration 
* Change settings for each method to `NCIP`

#### Other NCIP-related settings 
Other NCIP-related settings can be adjusted to specific needs. 
These can be found in the section _Settings -> Resource Sharing_. 
Review them if you need some specific configuration.

#### NCIP-related directory settings
Some NCIP settings are fetched from supplying directory entries. These settings are:

* `LMS location code` -> service point code which is used in the NCIP calls as the pickup location (for AcceptItem on the requester and RequestItem on the supplier side). E.g when a special _ILL Office_ service point, without any locations assigned, is used, it will ensure that items are always set to `In transit`.
* `Institutional patron ID` -> user barcode used to check out items on the supplier side
* `FOLIO location filter` -> it is the Institution/Campus/Library/Location code used to filter items when creating title-level requests on the supplier side (for RequestItem)

#### NCIP-related fee configuration for automatic fees 
There is an option to add automatic fees on the requester in Settings -> Resource Sharing -> Automatic fees.

If that option is enabled, you must configure predefined fees in FOLIO. It can be done
by adding fee owner `Reshare-ILL` in _Settings -> Fee/fine: Owners_ 

When Fee Owner is added, you need to add a fee for each patron group type: 
* staff
* faculty
* undergrad
* graduate

## Other ReShare settings

You can query all settings with ``/rs/settings/appSettings?filters=hidden==true&offset=0&max=1000``

## SLNP state model settings
The system has default State Model settings that must be updated after deployment. 

Query the `/rs/settings/appSettings?filters=hidden==true%26%26key=={SETTING_KEY}` endpoint to find the default value and UUID for each setting (replace `{SETTING_KEY}` placeholder with the name of the setting). 
Copy the response, change the value and `PUT` it to the `/rs/settings/appSettings/{SETTING_UUID}` endpoint to update.

| Setting key                           | Setting value              |
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

This setting manages auto-responder actions specific to the requester's side. Depending on the selected option, the request will transition as follows:

- **On: Available**
  - **Status Transition**: `SLNP_REQUESTER_DOCUMENT_AVAILABLE`
  - **Description**: When enabled, this option triggers a status change indicating the requested document is available for the requester.

- **On: Supplied**
  - **Status Transition**: `SLNP_REQUESTER_DOCUMENT_SUPPLIED`
  - **Description**: When this option is active, it signifies that the requested document has been fully supplied.

### Auto Responder Status

This setting is pertinent to loan-type requests. It controls the messaging to the requester based on the current configuration:

- **On: Loaned and Cannot Supply**
  - **Behavior**: Sends a "Loaned" message to the requester if the item is paged successfully or "Unfilled" otherwise. Additionally, upon sending the "Loaned" or "Unfilled" message, the request status transitions to `SLNP_REQUESTER_SHIPPED` or `SLNP_REQUESTER_UNFILLED`.

### Copy Auto Responder Status

This option is used for copy-type requests and influences the sending of loan-related messages:

- **On: Loaned and Cannot Supply**
  - **Behavior**: automatically dispatches a "Loaned" message to the requester when the request is received.
  - 
## Custom ISO18626 Settings

The Custom ISO18626 Settings section allows for the customization of ISO 18626 interoperability settings through specific options and identifiers. 

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

## Disable all staff notice policies (optional)
Notice policies can be retrieved from the `/rs/noticePolicies` API. To set them as inactive, set the "active" property to False. 
There is an included script to do this in the `scripts` directory. Replace admin_username, admin_password, okapi_url, and tenant_id with appropriate
values for the tenant you wish to disable notices for. Example invocation and output:
```
$ ./scripts/disable_notices.py -u admin_username -p admin_password -o okapi_url -t tenant_id
Updating notice policy with id 2245cfc6-66ac-41c4-8594-cc2bfe8592fd
Result: policy with id 2245cfc6-66ac-41c4-8594-cc2bfe8592fd has active set to False
Updating notice policy with id 6b7d0824-322d-4642-abba-a12a1274a83a
Result: policy with id 6b7d0824-322d-4642-abba-a12a1274a83a has active set to False
Updating notice policy with id 8ec3d1b6-30bb-4261-bcce-d5286641d51a
Result: policy with id 8ec3d1b6-30bb-4261-bcce-d5286641d51a has active set to False
``` 

## Feature flags
The following feature flags can be previewed by sending a **GET** request to: /rs/settings/appSettings?filters=section%3D%3DfeatureFlags&filters=hidden%3Dtrue&sort=key%3D%3Dasc&perPage=100

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
        "value": "true",
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
    },
    {
        "vocab": "featureFlag",
        "section": "featureFlags",
        "hidden": true,
        "value": "true",
        "settingType": "String",
        "key": "relax-manged-edit.feature_flag"
    }
]
```
The following feature flags can be modified by sending them as a **PUT** request to: /rs/settings/appSettings/{id} - in this case: **2c91253992580561019266d3145b0030**

```
{
    "id": "2c91253992580561019266d3145b0030",
    "vocab": "featureFlag",
    "section": "featureFlags",
    "hidden": true,
    "value": "true",
    "settingType": "String",
    "key": "relax-manged-edit.feature_flag"
}
```

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
      "value": "true",
      "settingType": "String",
      "key": "state_action_config.combine_fill_and_ship.feature_flag"
  }
```






