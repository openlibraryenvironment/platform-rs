# ReShare Module Release Procedure
This document describes the reshare module release procedure for developers. The process is the same on both backend and front-end modules.

## Overview
ReShare releases are tracked on a branch using the naming convention "release-1.19.x" Where 1.19 are the major and minor versions, and x means that patches are all committed to this branch. Releases are based on tags with the full version such as "v1.19.5". The procedure is to commit to the release branch, tag the commit you would like to release, and then use GitHub's release feature to create the release. CI will publish the aftifacts in the appropriate place.

## Example, release ui-rs
This example illustrates releasing ui-rs 1.19.5 with changes from master.

### Preperation
Make sure all the changes you would like to release are on the appropriate release branch. In this case, I am pulling everyhting from master, but you may be committing directly to the release branch or cherry picking:
```
git checkout release-1.19.x
git pull origin master
```
Check the module's release history and make sure the version number on the release branch represents the next appropriate release number (https://github.com/openlibraryenvironment/ui-rs/releases). In this case, I will set the release number in ui-rs's package.json file to 1.19.5 as the previous release is 1.19.4.

At this point, its a good idea to push the release branch back to git and verify that the changes pass CI.

Finally, make sure the master branch version is ahead of the release. In this situation I need to update it to 1.19.6 since we're releasing the latest changes on master. This may not always be the case.

### Tagging and publishing the release
After the build of the release branch passes. Tag it with the appropriate release version and push the tag:
```
git tag v1.19.5
git push --tags
```
This will trigger another build in CI. It should pass as well.

To release the moudle, use GitHub's release management feature: https://github.com/openlibraryenvironment/ui-rs/releases

1. Click draft a new release
2. Choose the tag you just created. For preivous tag, select the appropriate value (1.19.4 in this case).
3. Use the generate release notes feature to create a list of commits since the last release (optional)
4. Enter the tag name (v1.19.5 in this case) for the release name.
5. Leave "Set as the latest release" checked if this is indeed the latest. You may want to un-select this option if you are releasing a patch to an older release branch.
6. Click publish release--this will trigger a relase job in the repo's actoins tab: https://github.com/openlibraryenvironment/ui-rs/actions. Keep an eye on that to make sure it passes.

## Notes
* UI modules are published to npmjs: under the @projectreshare scope: https://www.npmjs.com/package/@projectreshare/rs
* Backend modules are published to GitHub packages: https://github.com/orgs/openlibraryenvironment/packages
