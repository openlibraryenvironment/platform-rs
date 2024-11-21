# ReShare QA Environments

QA and shared testing are performed on a shared reshare install
known as the "Cardinal Consortium" comprising three pairs of ReShare tenants. 
Each pair of tenants is capable of running different versions of the ReShare
software. All tenants are able to borrow and lend to one another.

## Cardinal Consortium Tenants (Updated 11/12/24)

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

### OpenURL Listener
All tenants on the cardinal consortium share a single instance of the openurl listener. It is deployed from the master branch on commit.

## SLNP Project
The SLNP environment does not share a directory with ReShare and comprises four tenants, slnptest_one, slnptest_two, and slnptest_three and slnptest_four.
### Release Candidate QA
* SLNP One UI: https://slnp-one.reshare-dev.indexdata.com/ (tracks 1.18.x release candidate branches)
* SLNP Two UI: https://slnp-two.reshare-dev.indexdata.com/ (tracks 1.18.x release candidate branches)
* CI:
  * mod-rs: to deploy the latest version of mod-rs, manually run the deploy action from the ci-slnp branch: https://github.com/openlibraryenvironment/mod-rs/actions/workflows/deploy.yml
  * mod-directory: to deploy the latest version of mod-directory, manually run the deploy action from the main branch: https://github.com/openlibraryenvironment/mod-directory/actions/workflows/deploy.yml
  * UI modules: To deploy the latest of all UI modules, manually run the deploy action from the release-1.18.x branch of platform-rs: https://github.com/openlibraryenvironment/platform-rs/actions/workflows/deploy.yml
### Reference environment for released code
* SLNP Three UI: https://slnp-one.reshare-dev.indexdata.com/ (runs 1.18 releases only)
* SLNP Four UI: https://slnp-two.reshare-dev.indexdata.com/ (runs 1.18.releases only)

