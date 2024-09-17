# ReShare QA Environments

QA and shared testing are performed on a shared reshare install
known as the "Cardinal Consortium" comprising three pairs of ReShare tenants. 
Each pair of tenants is capable of running different versions of the ReShare
software. All tenants are able to borrow and lend to one another.

## Cardinal Consortium Tenants (Updated 09/17/24)

### East/West (Master)
The east west tenants run the master branch of the ReShare modules.
* East UI: https://east.reshare-dev.indexdata.com/
* West UI: https://west.reshare-dev.indexdata.com/
* CI:
  * mod-rs: to deploy the latest version of mod-rs, manually run the deploy action from the master branch: https://github.com/openlibraryenvironment/mod-rs/actions/workflows/deploy.yml
  * mod-directory: to deploy the latest version of mod-directory, manually run the deploy action from the main branch: https://github.com/openlibraryenvironment/mod-directory/actions/workflows/deploy.yml
  * UI modules: To deploy the latest of all UI modules, manually run the deploy action from the master branch of platform-rs: https://github.com/openlibraryenvironment/platform-rs/actions/workflows/deploy.yml

### North/South (1.16)
The North and South tenants are currently running the release branches for ReShare 1.16
* North UI: https://north.reshare-dev.indexdata.com/
* South UI: https://south.reshare-dev.indexdata.com/
* CI:
  * mod-rs: to deploy the latest version of mod-rs, manually run the deploy action from the release-2.16.x branch: https://github.com/openlibraryenvironment/mod-rs/actions/workflows/deploy.yml
  * UI modules: To deploy the latest of all UI modules, manually run the deploy action from the release-1.16.x branch of platform-rs: https://github.com/openlibraryenvironment/platform-rs/actions/workflows/deploy.yml

### Back/Forth (1.17)
The North and South tenants are currently running the release branches for ReShare 1.17
* North UI: https://north.reshare-dev.indexdata.com/
* South UI: https://south.reshare-dev.indexdata.com/
* CI:
  * mod-rs: to deploy the latest version of mod-rs, manually run the deploy action from the release-2.17.x branch: https://github.com/openlibraryenvironment/mod-rs/actions/workflows/deploy.yml
  * UI modules: To deploy the latest of all UI modules, manually run the deploy action from the release-1.17.x branch of platform-rs: https://github.com/openlibraryenvironment/platform-rs/actions/workflows/deploy.yml

## SLNP Project
The SLNP environment does not share a directory with ReShare and comprises two tenatns, slnptest_one, and slnptest_two
* SLNP One UI: https://slnp-one.reshare-dev.indexdata.com/
* SLNP Two UI: https://slnp-two.reshare-dev.indexdata.com/
* CI:
  * mod-rs: to deploy the latest version of mod-rs, manually run the deploy action from the SLNP_INTEGRATION_2 branch: https://github.com/openlibraryenvironment/mod-rs/actions/workflows/deploy.yml
  * mod-directory: to deploy the latest version of mod-directory, manually run the deploy action from the main branch: https://github.com/openlibraryenvironment/mod-directory/actions/workflows/deploy.yml
  * UI modules: To deploy the latest of all UI modules, manually run the deploy action from the ci-slnp branch of platform-rs: https://github.com/openlibraryenvironment/platform-rs/actions/workflows/deploy.yml