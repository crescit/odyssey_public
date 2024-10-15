import os
import requests
import json
import logging
import argparse
import sys
import io
import csv
from tqdm import tqdm
from datetime import datetime
from urllib.parse import urlparse
from shopify_utils import format_url, save_to_file, range_arg
from shopify_utils import copy_namespace, is_file_empty, dummy_context_mgr

class Arguments(object):
    url = ""
    output_type = ""
    return_type = ""
    collections = False
    dest_path = ""
    file_path = ""
    page_range = None

    def __init__(self, url, output_type, return_type):
        self.url = url
        self.output_type = output_type
        self.return_type = return_type


def extract(endpoint, agg_key, page_range=None):
    r_list = list(range(page_range[0], page_range[1]+1)) if page_range else []
    page = 1
    agg_data = []

    while True:
        page_endpoint = endpoint + f'?page={str(page)}'
        response = requests.get(page_endpoint, timeout=(
            int(os.environ.get('REQUEST_TIMEOUT', 0)) or 10))
        response.raise_for_status()
        if response.url != page_endpoint:  # to handle potential redirects
            p_endpoint = urlparse(response.url)  # parsed URL
            endpoint = p_endpoint.scheme + '://' + p_endpoint.netloc + p_endpoint.path
        if not response.headers['Content-Type'] == 'application/json; charset=utf-8':
            # raise Exception('Incorrect response content type')
            print("NO PRODUCTS FOUND FOR " + endpoint)
            return None
        data = response.json()
        page_has_products = agg_key in data and len(
            data[agg_key]) > 0

        page_in_range = page in r_list or page_range is None

        # break loop if empty or want first page
        if not page_has_products or not page_in_range:
            break
        agg_data += data[agg_key]
        page += 1
    return agg_data


def extract_url(args):
    p = format_url(args.url, scheme='https', return_type='parse_result')

    formatted_url = p.geturl()
    agg_key = 'products'
    if args.collections:
        agg_key = 'collections'
    fp = os.path.join(
        args.dest_path, f'{p.netloc}.{agg_key}.{args.output_type}')

    if args.file_path:
        fp = os.path.join(
            args.dest_path, f'{args.file_path}.{args.output_type}')

    endpoint = f'{formatted_url}/{agg_key}.json'
    ret = {
        'endpoint_attempted': endpoint,
        'collected_at': str(datetime.now()),
        'success': False,
        'error': ''
    }
    try:
        data = extract(endpoint, agg_key, args.page_range)

    except requests.exceptions.HTTPError as err:
        print(err, 'HTTP')
        ret['error'] = str(err)
    except json.decoder.JSONDecodeError as err:
        print(err, 'JSON')
        ret['error'] = str(err)
    except Exception as err:
        print(err, 'EXCEPTION')
        ret['error'] = str(err)
    else:
        ret['success'] = True
        ret[agg_key] = data
        return data

    if ret['success']:
        ret['file_path'] = str(fp)
        # save_to_file(fp, data, args.output_type)
    return ret


def scrape_all_products(url):
    if url == None:
        return None
    args = Arguments(url, "json", "json")
    return extract_url(args)


class CsvFormatter(logging.Formatter):
    def __init__(self):
        super().__init__()
        self.output = io.StringIO()
        self.writer = csv.writer(self.output, quoting=csv.QUOTE_ALL)

    def format(self, record):
        self.writer.writerow([record.levelname, record.msg] +
                             list(map(lambda x: str(x), record.args)))
        data = self.output.getvalue()
        self.output.truncate(0)
        self.output.seek(0)
        return data.strip()


def parse_args(argv=sys.argv[1:]):
    # shared args
    # dest_path, output_type, page_range, collections
    parent_parser = argparse.ArgumentParser(add_help=False)

    parent_parser.add_argument('-d', '--dest_path', type=str,
                               help="""Destination folder for extracted files. 
                               Defaults to current directory './'""",
                               default='./')
    parent_parser.add_argument('-o', '--output_type', type=str,
                               help="""Output file type ('json')""",
                               default='json')
    parent_parser.add_argument('-p', '--page_range',
                               action=range_arg(), nargs='+',
                               help="""Page range as tuple to extract. 
                               There are 30 items per page. If not provided, 
                               all pages with products will be taken.""")
    parent_parser.add_argument('-c', '--collections', action='store_true',
                               help="""If true, extracts '/collections.json' 
                               instead of '/products.json'""")

    parser = argparse.ArgumentParser(add_help=False)
    subparsers = parser.add_subparsers(dest="subparser_name")

    # for url subcommand
    url_parser = subparsers.add_parser('url', parents=[parent_parser])
    url_parser.add_argument('url', type=str,
                            help="""URL to extract. An attempt will be made to 
                            fix inproperly formatted URLs.""")
    url_parser.add_argument('-f', '--file_path', type=str,
                            help="""File path to write. Defaults to 
                            '[dest_path]/[url].products' or 
                            '[dest_path]/[url].collections'""")

    return parser.parse_args(args=argv)


if __name__ == "__main__":
    args = parse_args(sys.argv[1:])
 #   if args.subparser_name == 'url':
 #       extract_url(args)
