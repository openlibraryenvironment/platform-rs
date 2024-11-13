#!/usr/bin/python3

# use this script to disable all staff notice
# policies in /rs/noticePolicies.
# disable_notices.py -u admin_username -p admin_password -o okapi_url -t tenant_id

import argparse
import json
import sys
import urllib.request


def main():
    # parse arguments
    args = parse_command_line_args()
    okapi_url = args.okapi_url
    username = args.username
    password = args.password
    tenant = args.tenant
    # login to okapi
    token = get_token(username, password, tenant, okapi_url)

    # get notice policies
    r = okapi_get(okapi_url + 
                  '/rs/noticePolicies',
                  tenant=tenant,
                  token=token)
    notice_policies = json.loads(r)

    for policy in notice_policies:
        # set policy to inactinve
        policy['active'] = False
        # put the policy back in there
        payload = json.dumps(policy).encode('UTF-8')
        print("Updating notice policy with id {}".format(policy['id']))
        response_data = okapi_post_put(okapi_url + '/rs/noticePolicies/' + policy['id'],
                           payload, tenant, token, return_headers=False, method='PUT')
        print("Result: policy with id {} has active set to {}".format(policy['id'], str(policy['active'])))

# functions used in main() are defined here
def parse_command_line_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--username', help='tenant admin user', required=True)
    parser.add_argument('-p', '--password', help='tenant password', required=True)
    parser.add_argument('-t', '--tenant', help='okapi tenant')
    parser.add_argument('-o', '--okapi-url', help='okapi url', required=True)

    args = parser.parse_args()

    return args

# Generic GET request for Okapi
def okapi_get(url, tenant, token):
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

# Generic POST/PUT request for Okapi
def okapi_post_put(url, payload, tenant, token='', return_headers=False, method='POST'):
    headers = {
        'X-Okapi-Tenant': tenant,
        'X-Okapi-Token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    req = urllib.request.Request(url, data=payload, headers=headers, method=method)
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

def get_token(username, password, tenant, okapi_url):
    headers = {
        'X-Okapi-Tenant': tenant,
    }
    payload = json.dumps({
        'username': username,
        'password': password
    }).encode('UTF-8')
    r = okapi_post_put(okapi_url + '/authn/login', payload, tenant, return_headers=True)
    return r['x-okapi-token']

if __name__ == "__main__":
    main()
