#!/bin/bash
# usage: ./compress.sh DIRECTORY
find $1 -type f -exec gzip "{}" \; -exec mv "{}.gz" "{}" \;
