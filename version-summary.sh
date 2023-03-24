#!/bin/sh
echo 'ReShare ' `cat package.json | jq -r .version`
echo --------------------------------------------------------------------------------
cat reshare-install.json | jq -r '.[].id'
cat package.json | jq -r '.dependencies | to_entries[] | "\(.key) \(.value)"' | grep @reshare
echo
