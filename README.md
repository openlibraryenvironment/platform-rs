# STRIPES Resource Sharing platform

Copyright (C) 2015-2022 The Open Library Foundation

This software is distributed under the terms of the Apache License,
Version 2.0. See the file "[LICENSE](LICENSE)" for more information.

## TL;DR

    curl -s "https://raw.githubusercontent.com/openlibraryenvironment/platform-rs/master/helper_scripts/setup" | bash
    cd rs_ui/platform-rs
    yarn config set @folio:registry https://repository.folio.org/repository/npm-folio/
    yarn config set @reshare:registry https://nexus.libsdev.k-int.com/repository/libsdev-npm-group
    yarn install
    stripes serve ./stripes.config.js

## Introduction

This is the Resource Sharing Stripes "platform". It consists simply of an
NPM [`package.json`](https://docs.npmjs.com/files/package.json) that
specifies the version of `@folio/stripes` and of any Stripes
modules you wish to make available as part of the Resource Sharing platform
to generate client bundles along with a utility for generating
module descriptors for each Stripes module.

Please see the
[quick start guide](https://github.com/folio-org/stripes-core/blob/master/doc/quick-start.md)
for more information.

The `stripes.config.js` is a configuration for a specific tenant. In
general, a platform supports multiple tenants, each of which may
include a different set of the available modules.  You can copy the
`stripes.config.js` file to be your `stripes.config.js.local`
configuration file.

## Installation

Install platform dependencies
```
$ yarn config set @folio:registry https://repository.folio.org/repository/npm-folio/
$ yarn config set @reshare:registry https://nexus.libsdev.k-int.com/repository/libsdev-npm-group
$ yarn install
```

## Build and serve

To build and serve `platform-rs` in isolation for development purposes, run the "start" package script.
```
$ yarn start
```

The default configuration assumes an Okapi instance is running on http://localhost:9130 with tenant "diku".  The options `--okapi` and `--tenant` can be provided to match your environment.
```
$ yarn start --okapi http://localhost:9130 --tenant diku
```

To build a `platform-rs` bundle for production, modify `stripes.config.js` with your Okapi and tenant, then run the "build" script, passing it the name of the desired directory to place build artifacts.
```
$ yarn build ./output
```

See the [build](https://github.com/folio-org/stripes-cli/blob/master/doc/commands.md#build-command) and [serve](https://github.com/folio-org/stripes-cli/blob/master/doc/commands.md#serve-command) command reference in `stripes-cli` for a list of available options.

## Tests

### End-to-end tests

Full system integration tests require a running Okapi appropriately configured as a reshare system.  The default configuration expects Okapi running on http://localhost:9130 with tenant "diku".  To build and run integration tests for `platform-rs` with these defaults, invoke `cypress run` via the `cypress` yarn script.
```
$ yarn cypress run
```

To view and interact with tests while they are run:
```
$ yarn cypress open
```

To run a specific test use `--spec`.
```
$ yarn cypress run --spec cypress/integration/visit-apps.js
```

To run the tests against another system, copy `cypress.json` and modify to suit then indicate the alternative configuration via `--config-file`
```
$ yarn cypress run --config-file cypress.json.local
```

## Additional information

See project [PR](https://openlibraryfoundation.atlassian.net/browse/PR)
at the [Open Library Foundation issue tracker](https://openlibraryfoundation.atlassian.net/).

Other [ReShare](https://projectreshare.org) documentation is in [the project's Confluence wiki](https://openlibraryfoundation.atlassian.net/wiki/spaces/PR)


