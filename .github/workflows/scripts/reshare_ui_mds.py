#!/usr/bin/python3

import argparse
import glob
import json
import re
import sys
import urllib.request
import uuid

RESHARE_MODULES = [
    "reshare_rs",
    "reshare_directory",
    "reshare_request",
    "reshare_supply",
    "reshare_update"
]

TENANTS = [
    "reshare_east",
    "reshare_west",
]

# main logic for this script goes here, functions used are defined below
def main():
    # parse arguments
    args = parse_command_line_args()
    okapi_url = args.okapi_url
    username = args.username
    password = args.password
    # login to okapi
    token = get_token(username, password, okapi_url)

    # get currently enabled module versions
    disable_versions = []
    for module in RESHARE_MODULES:
        r = okapi_get(okapi_url + 
                      '/_/proxy/tenants/{}/modules?filter={}'.format(TENANTS[0], module), 
                      token=token)
        if (len(json.loads(r)) > 0):
            disable_versions.append({
                "id" : json.loads(r)[0]['id'],
                "action" : "disable"
            })
    # disable for both tenants
    print("Disable current reshare UI modules")
    for tenant in TENANTS:
        r = okapi_post(okapi_url + '/_/proxy/tenants/{}/install'.format(tenant),
            payload=json.dumps(disable_versions).encode('UTF-8'),
            tenant='supertenant',
            token=token
        )

    # post mods
    print("enable modules")
    enable = []
    rs_glob = glob.glob("./reshare*.json")
    for md_file in rs_glob:
        with open(md_file) as fh:
            md = json.load(fh)
            md['id'] = md['id'] + '-dev'
            print("deleting {}".format(md['id']))
            try:
                r = okapi_delete(okapi_url + '/_/proxy/modules/' + md['id'],
                    tenant='supertenant',
                    token=token
                )
                print(r)
            except:
                print("could not find {}".format(md["id"]))
            print("post new md")
            r = okapi_post(okapi_url + '/_/proxy/modules',
                payload=json.dumps(md).encode('UTF-8'),
                tenant='supertenant',
                token=token
            )
            enable.append({"id": md['id'], "action": "enable"})
            print(r)
    
    # enable modules for tenants
    for tenant in TENANTS:
        r = okapi_post(okapi_url + '/_/proxy/tenants/{}/install'.format(tenant),
            payload=json.dumps(enable).encode('UTF-8'),
            tenant='supertenant',
            token=token
        )
        print(r)

# functions used in main() are defined here
def parse_command_line_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--username', help='okapi super user username', required=True)
    parser.add_argument('-p', '--password', help='okapi super user password', required=True)
    parser.add_argument('-o', '--okapi-url', help='okapi url',
                        default='https://okapi-reshare-1.folio-dev-us-east-1-1.folio-dev.indexdata.com', required=False)

    args = parser.parse_args()

    return args

# Generic GET request for Okapi
def okapi_get(url, tenant=None, token=None):
    tenant = tenant or 'supertenant'
    headers = {
        'X-Okapi-Tenant': tenant,
        'X-Okapi-Token' : token,
        'Accept': 'application/json'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        r = urllib.request.urlopen(req)
        response_data = r.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        sys.exit(
            ' - '.join([
                'ERROR', 'GET', e.url,
                str(e.status), str(e.read())
            ]))
    return response_data

# Generic POST request for Okapi
def okapi_post(url, payload, tenant='supertenant', token='', return_headers=False):
    tenant = tenant or 'supertenant'
    headers = {
        'X-Okapi-Tenant': tenant,
        'X-Okapi-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    req = urllib.request.Request(url, data=payload, headers=headers)
    try:
        resp = urllib.request.urlopen(req)
        if return_headers == True:
            response_data = dict(resp.info())
        else:
            response_data =  resp.read().decode('utf-8')
    except urllib.error.HTTPError as e:
        sys.exit(' - '.join([
                'ERROR', 'POST', e.url,
                str(e.status), str(e.read().decode('utf-8'))
            ]))
    return response_data

# Generic DELETE request for Okapi
def okapi_delete(url, tenant='supertenant', token='', return_headers=False):
    tenant = tenant or 'supertenant'
    headers = {
        'X-Okapi-Tenant': tenant,
        'X-Okapi-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    req = urllib.request.Request(url, headers=headers, method='DELETE')
    with urllib.request.urlopen(req) as resp:
        resp_code = resp.getcode()
        return(resp_code)

def get_token(username, password, okapi_url):
    payload = json.dumps({
        'username': username,
        'password': password
    }).encode('UTF-8')
    r = okapi_post(okapi_url + '/authn/login', payload, return_headers=True)
    return r['x-okapi-token']

if __name__ == "__main__":
    main()
