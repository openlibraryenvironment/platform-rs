#!/usr/bin/python3

import argparse
import glob
import json
import sys
import urllib.request
import uuid

# plan is to do something like this https://stackoverflow.com/questions/72177570/how-to-pass-github-secrets-as-value-in-json-file

# main logic for this script goes here, functions used are defined below
def main():
    args = parse_command_line_args()
    okapi_url = args.okapi_url
    foaf_url = args.foaf_url
    credentials_file = args.credentials

    # read credentials
    with open(credentials_file, 'r') as f:
        credentials = json.load(f)

    # do refresh for each tenant in creds
    for tenant in credentials['tenants']:
        # log in
        print("Getting token for {}".format(tenant['tenant']))
        token = get_token(tenant['username'], tenant['password'], okapi_url, tenant['tenant'])
        # make foaf request
        
        print("Making FOAF request for {}".format(tenant['tenant']))
        r = okapi_get(okapi_url + '/directory/api/addFriend?friendUrl=' + foaf_url,
                      tenant=tenant['tenant'], token=token)
        print(r)



# functions used in main() are defined here
def parse_command_line_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-c', '--credentials', help='credeatial config', required=True)
    parser.add_argument('-o', '--okapi-url', help='okapi url',
                        default='https://okapi-reshare-1.folio-dev-us-east-1-1.folio-dev.indexdata.com', required=False)
    parser.add_argument('-f', '--foaf-url', help='foaf url',
                        default='https://raw.githubusercontent.com/openlibraryenvironment/mod-directory/refs/heads/master/seed_data/cardinal/cardinal_local_management.json')

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

def get_token(username, password, okapi_url, tenant='supertenant'):

    payload = json.dumps({
        'username': username,
        'password': password
    }).encode('UTF-8')
    r = okapi_post(okapi_url + '/authn/login', payload, tenant=tenant, return_headers=True)
    return r['x-okapi-token']

if __name__ == "__main__":
    main()
