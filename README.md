# STRIPES Resource Sharing Platform

Copyright (C) 2015-2022 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## Build UI for slnptest_one or two tenants:

Install dependencies:
```
yarn install
```

Build webpack
```
yarn build
```

Build module descriptors
```
./node_modules/.bin/stripes mod descriptor stripes.config.js --output ./ModuleDescriptors
```

## Backend modules
The SLNP test environment uses custom branches for the following backend modules:

| module name | version | image | 
| --- | --- | --- |
| mod-rs | mod-rs-2.17.0-SLNP.001 | ghcr.io/openlibraryenvironment/mod-rs:SLNP_INTEGRATION_2 |
| mod-directory | mod-directory-2.10.1 | ghcr.io/openlibraryenvironment/mod-directory:main | 
| mod-circulation | mod-circulation-24.1.2 | ghcr.io/indexdata/mod-circulation:circ-2141-deploy |
| mod-circulation-storage | mod-circulation-storage-17.1.8 | ghcr.io/indexdata/mod-circulation-storage:circ-2141-deploy |

Directory and RS descriptors are in the BackendModuleDescriptors directory


