from flask import Flask, jsonify, request, _request_ctx_stack
from flask_cors import cross_origin
from flask_apscheduler import APScheduler
from dotenv import load_dotenv
from functools import wraps
import shopify_scraper
import email_helpers
import os
import http.client
import json
import http.client
import wget
import boto3
from boto3.s3.transfer import S3Transfer
from six.moves.urllib.request import urlopen
from jose import jwt
import requests
# ----------------- BEGIN SERVER CONFIG --------------------------------

load_dotenv()

AUTH0_DOMAIN = os.environ.get("AUTH0_DOMAIN")
API_AUDIENCE = os.environ.get("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()
app.config['CORS_ORIGINS'] =  ["http://localhost:5000", "http://localhost:3000", "http://localhost:8000", "https://www.odysseycommerce.com", "https://odysseycommerce.com", "http://localhost"]

# AUTH0 Error handler
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

# AUTH0 Error handler
@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

# ----------------- END SERVER CONFIG ----------------------------------

# ----------------- BEGIN HELPERS --------------------------------------

# AUTH0 Format error response and append status code
def get_token_auth_header():
    """Obtains the Access Token from the Authorization Header
    """
    auth = request.headers.get("Authorization", None)
    if not auth:
        raise AuthError({"code": "authorization_header_missing",
                        "description":
                            "Authorization header is expected"}, 401)
    app.logger.debug(auth)
    parts = auth.split()
    if parts[0].lower() != "bearer":
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must start with"
                            " Bearer"}, 401)
    elif len(parts) == 1:
        raise AuthError({"code": "invalid_header",
                        "description": "Token not found"}, 401)
    elif len(parts) > 2:
        raise AuthError({"code": "invalid_header",
                        "description":
                            "Authorization header must be"
                            " Bearer token"}, 401)

    token = parts[1]
    return token

# AUTH0 checks JWT for validity
def requires_auth(f):
    """Determines if the Access Token is valid
    """
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jwks = {"keys":[{"alg":"RS256","kty":"RSA","use":"sig","n":"yNLtYRyNi4CtlHXtJDl1DKgn3ZIrSOxeH-mVCMRxwfOQTZErJfjY5QjxfLerLX9ZD03zAx2r8vMXL7oxWondYe7G1YC-Br_WCjKdLHYCnHvY7QAnKFI_nhwQvWJ-RqaSd1J7BtYm9hV0CgL_HzUWEsGfsy0dK_DkLG69Z2CWk2ysDCahG_sLgd0MXBJfWqZrAJri9DVV5O2XS4--6-eNjIM9mT1TvY3YFKHSXb2MbQQDcUCcjYaBESUBbAthxo8lVwnNwmO54vmMP25u5-I_sj1g4iVHqfDvXWfMtqF40kjvyyzfW1_qiTe6a1S-oYRX9xmcK-wG_vN6ZjbhyVBtwQ","e":"AQAB","kid":"vkVZ7P3ilmItD-ytCdHLs","x5t":"JCFjc39aYWkMVOn1aEyPGj1BFSs","x5c":["MIIDDTCCAfWgAwIBAgIJBIoBmtL6iIapMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGW9keXNzZXljb21tZXJjZS5hdXRoMC5jb20wHhcNMjAwNTA2MDEwOTQ2WhcNMzQwMTEzMDEwOTQ2WjAkMSIwIAYDVQQDExlvZHlzc2V5Y29tbWVyY2UuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyNLtYRyNi4CtlHXtJDl1DKgn3ZIrSOxeH+mVCMRxwfOQTZErJfjY5QjxfLerLX9ZD03zAx2r8vMXL7oxWondYe7G1YC+Br/WCjKdLHYCnHvY7QAnKFI/nhwQvWJ+RqaSd1J7BtYm9hV0CgL/HzUWEsGfsy0dK/DkLG69Z2CWk2ysDCahG/sLgd0MXBJfWqZrAJri9DVV5O2XS4++6+eNjIM9mT1TvY3YFKHSXb2MbQQDcUCcjYaBESUBbAthxo8lVwnNwmO54vmMP25u5+I/sj1g4iVHqfDvXWfMtqF40kjvyyzfW1/qiTe6a1S+oYRX9xmcK+wG/vN6ZjbhyVBtwQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBR7NL2HkZ1gPpH7jOToSIoJYmfD8TAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAEZfkzjnZfWwxdcGoVdQWGrxqpo6l/mQDzbFdDjuPpfW2dO92lqG9QbZenb1JKySWmrYAiVjjuszahG8T0V0VAVIfJBAgW5pBMrm2BQJxkMnHLRRDpoCC16BxC9VYftPUw+AYvZ1aEFabPHG1ds+MKj9xBbe9dIq3/P0CYS0ULWKp1FLPnhWETIET5vXXQ8+v6tCw3r/MyhoE8haiyGYIx2crBLN56l8zpkp5dV5e3deFbAduGUvUyaqsp7nNXUbSE1SPpUe0fL4pZvEqbcjvIVpA5v33Ns/SAk8RcIfC7GYn1l3ZP8QdxnGXJWtjymfuY/Fv30RyA3TAqBnXQs5w0c="]},{"alg":"RS256","kty":"RSA","use":"sig","n":"vxlfuAVPg7fnzTiZrGu2i0MrNmjCrADbQiBYDs0mG-7nFAPyv2UAuQ_ALP8aWRgURW_eR-Z5b3bYVXVOeT_0II9CkldqY5P6a-X12yZ1ZMlBJPQU1_Z9DLRVUUChAFuud3kyy7vHV335RuDUk7ZEUa8ZmxGALQfrzTgcI5xmbJvoN5dk9fX0bc9B7sM3C8wQQTIeiCvsymt-1WeY8z5pQe7NhwfeUAhIqqe9K2IyiFPRjrdDzgcxvbeakrZTcyJzPjP-mx2iKNIxyvrDUurwaNCJprh6Tp8kKHE5pIxxjwbw00IJJxdgaV55JECBCyalRVcS7-TvFFWc7Yfydu_GAQ","e":"AQAB","kid":"uDgZbAButDpzr_dBj-3wK","x5t":"DA_TWvluKyrGiPuCLuZuxr7EACI","x5c":["MIIDDTCCAfWgAwIBAgIJMTc5fkPj8p8JMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGW9keXNzZXljb21tZXJjZS5hdXRoMC5jb20wHhcNMjAwNTA2MDEwOTQ2WhcNMzQwMTEzMDEwOTQ2WjAkMSIwIAYDVQQDExlvZHlzc2V5Y29tbWVyY2UuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvxlfuAVPg7fnzTiZrGu2i0MrNmjCrADbQiBYDs0mG+7nFAPyv2UAuQ/ALP8aWRgURW/eR+Z5b3bYVXVOeT/0II9CkldqY5P6a+X12yZ1ZMlBJPQU1/Z9DLRVUUChAFuud3kyy7vHV335RuDUk7ZEUa8ZmxGALQfrzTgcI5xmbJvoN5dk9fX0bc9B7sM3C8wQQTIeiCvsymt+1WeY8z5pQe7NhwfeUAhIqqe9K2IyiFPRjrdDzgcxvbeakrZTcyJzPjP+mx2iKNIxyvrDUurwaNCJprh6Tp8kKHE5pIxxjwbw00IJJxdgaV55JECBCyalRVcS7+TvFFWc7Yfydu/GAQIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBQjikWeuwbdAIbd97AAkXp0R+P7DDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBADOIUJPFUbZeg4LhYgH7SL1GEDG9Cpd34Hq4Gg4c162Y860hPvOQocEmVJ8RADThmI2vsb1CEtlsnKcTUyyZaFUizj2qeDVgCQyF31Wtwfs/9Ue76f4PWcODP5LGAQ5Hx7dUxthBWFMp+nMSuiqDtTZ2S8l3LvAtwOGxBmt+l2pkHiewnOYxzvkcbgYDcFZmsbVKdrsWac0G6fFfEbcwtiP6A2YiT+AU7hmm4MZEvpyGlrj1+PptKl9/vF4meyfpcJ5vzBpyx6LSZtL623nR2SQJU6OpXRHX7qO7ZOQeOiDz8N+2YbgGukiapNz6TUaxb+/32MPGEiaNUQhWNpufGRI="]}]}
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        app.logger.debug(unverified_header)
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer="https://"+AUTH0_DOMAIN+"/"
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({"code": "token_expired",
                                "description": "token is expired"}, 401)
            except jwt.JWTClaimsError:
                raise AuthError({"code": "invalid_claims",
                                "description":
                                    "incorrect claims,"
                                    "please check the audience and issuer"}, 401)
            except Exception:
                raise AuthError({"code": "invalid_header",
                                "description":
                                    "Unable to parse authentication"
                                    " token."}, 401)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)
        raise AuthError({"code": "invalid_header",
                        "description": "Unable to find appropriate key"}, 401)
    return decorated

# API-GW gets the url for the webhook 
def get_api_gateway_url():
    api_gw_endpoint = "localhost:8080"
    if "ODYSSEY_API_GW_ENDPOINT" in os.environ:
        api_gw_endpoint = os.environ.get("ODYSSEY_API_GW_ENDPOINT")
    return api_gw_endpoint

def get_api_gateway_port():
    api_gw_port = "443"
    return api_gw_port  

# AUTH0 gets the bearer token so the call is secure 
def getAuth0AuthToken():
    conn = http.client.HTTPSConnection("odysseycommerce.auth0.com")
    payload = {
        "audience": os.environ.get("AUTH0_AUDIENCE"),
        "client_id": os.environ.get("AUTH0_CLIENT_ID"),
        "client_secret": os.environ.get("AUTH0_CLIENT_SECRET"),
        "grant_type": "client_credentials"
    }
    headers = { 'content-type': "application/json" }
    conn.request("POST", "/oauth/token", json.dumps(payload), headers)
    res = conn.getresponse()
    data = res.read()
    return data.decode("utf-8")

# API-GW makes an authorized call to api-gateway with scraped JSON
def call_shopify_data_endpoint(data, email, name):
    # conn = http.client.HTTPSConnection(get_api_gateway_url(), get_api_gateway_port())
    token = json.loads(getAuth0AuthToken())
    bearerString = "Bearer " + token.get('access_token')
    headers = { 'authorization': bearerString }
    payload = {
        "products": data,
        "email": email,
        "name": name
    }
    #conn.request("POST", "/shopify-product-data", json.dumps(payload), headers)
    #res = conn.getresponse()
    #data = res.read()

    requests.post(get_api_gateway_url() + "/shopify-product-data", data=json.dumps(payload), headers=headers)
    
    return data.decode("utf-8")

# AWS takes an asset and uploads it to S3 returns the url of the asset
def upload_image_to_s3(file_path, file_name, biz_name):
    bucket = os.environ.get("S3_BUCKET")
    key = biz_name + "/" + file_name
    credentials = {
        'aws_access_key_id': os.environ.get("S3_KEY"),
        'aws_secret_access_key': os.environ.get("S3_SECRET")
    }
    client = boto3.client('s3', 'us-west-1', **credentials)
    transfer = S3Transfer(client)
    transfer.upload_file(file_path, bucket, key, extra_args={'ACL': 'public-read'})
    return '%s/%s/%s' % (client.meta.endpoint_url, bucket, key)

# AWS takes in a S3 url and replaces it with the odysseycommerce images domain
def processS3URL(url):
    # TODO update this to handle the case where we have multiple buckets
    # https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super%20Body%20Care%20/green_bath_bomb.jpg
    # https://images.odysseycommerce.com/Super%20Body%20Care%20/green_bath_bomb.jpg
    return url.replace("https://s3.us-west-1.amazonaws.com/images.odysseycommerce/", "https://images.odysseycommerce.com/")
    
# SCRAPER takes in a URL and downloads an image at the asset
def download_shopify_image(url, type, name):
    fileName = ""
    returnURL = ""

    if isinstance(url, str):
        split = []
        if type == "product":
            split = url.split('products/')
        else: 
            app.logger.info(url)
            split = url.split('variants/')
        if len(split) >= 2:
            fileName = split[1].split("?v")[0]
            app.logger.info(fileName)
        filePath = os.environ.get("IMAGE_DIRECTORY") + "/" + fileName
        # download file 
        wget.download(url, filePath)
        # upload to s3 and get url for asset on s3, returnURL has s3 url, replace that with images.odysseycommerce
        returnURL = processS3URL(upload_image_to_s3(filePath, fileName, name))

        # delete file
        os.remove(filePath)

    return returnURL

# AWS takes in an array and uploads each asset in the array to s3 and returns its URL
def scrape_and_change_image_urls(data, email, name):
    if data and not data['success']:
        return None
    for product in data:
        for image in product['images']:
            image['src'] = download_shopify_image(image['src'], 'product', name)
    for product in data: 
        for variant in product['variants']:
            if(variant['featured_image'] is not None): 
                variant['featured_image'] = download_shopify_image(variant['featured_image'], 'variant', name)
    call_shopify_data_endpoint(data, email, name)

# SCRAPER waits for the scraper and then sends that data to api-gateway 
def start_scraper_job_on_url(url, email, name):
    response = shopify_scraper.scrape_all_products(url)
    if(response == None or len(response) == 0):
        # raise Exception("No products found in the response.")
        # deciding to just return instead of adding an exception to allow the call to fail silently / allow businesses to onboard with no products
        return None
    app.apscheduler.add_job(func=scrape_and_change_image_urls, trigger='date', args=[response, email, name], id="response[0].id")

# ----------------- END HELPERS --------------------------------------

# ----------------- BEGIN ENDPOINTS ----------------------------------
api_v1_cors_config = {
  "origins": ["http://localhost:5000", "http://localhost:3000", "http://localhost:8000", "https://www.odysseycommerce.com", "http://www.odysseycommerce.com"]
}

# endpoint which takes the url and starts the scraper
@app.route('/scrape', methods=['POST', 'OPTIONS'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def run_scraper_on_url():
    body = json.loads(request.data)
    url = body.get("URL")
    email = body.get("email")
    name = body.get("name")
    try:
        app.apscheduler.add_job(func=start_scraper_job_on_url, trigger='date', args=[url, email, name], id=url)
        app.logger.info('started scraping job on %s', url)
        return 'SUCCESS'
    except:
        return 'INTERNAL ERROR', 500

# endpoint which starts a job to upload a logo for a company to S3 and calls api-gw to store results in postgres
@app.route('/logo/upload', methods=['POST', 'OPTIONS'])
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def upload_logo_to_s3():
    file = request.files['image']
    email = request.form['email']
    name = request.form['name']
    filePath = os.environ.get("UPLOAD_DIRECTORY") + "/" + file.filename
    file.save(filePath)
    url = upload_image_to_s3(filePath, file.filename, name)
    link = processS3URL(url)
    #conn = http.client.HTTPSConnection(get_api_gateway_url(), get_api_gateway_port())
    token = json.loads(getAuth0AuthToken())
    bearerString = "Bearer " + token.get('access_token')
    headers = { 'authorization': bearerString }
    payload = {
        "link": link,
        "email": email,
        "name": name
    }
    #conn.request("POST", "/company/logo", json.dumps(payload), headers)
    #res = conn.getresponse()
    #data = res.read()
    requests.post(get_api_gateway_url() + "/company/logo", data=json.dumps(payload), headers=headers)
    os.remove(filePath)
    return link

# endpoint which starts a job to upload a product image for a company to S3 and calls api-gw to store results in postgres
@app.route('/product/upload', methods=['POST', 'OPTIONS'])
@cross_origin(headers=["Content-Type", "Authorization"],resources={"*": api_v1_cors_config})
@requires_auth
def upload_product_img_to_s3():
    file = request.files['image']
    pid = request.form['pid']
    name = request.form['name']
    postMethod = request.form['postMethod']
    filePath = os.environ.get("UPLOAD_DIRECTORY") + "/" + file.filename
    file.save(filePath)
    url = upload_image_to_s3(filePath, file.filename, name)
    link = processS3URL(url)
    # conn = http.client.HTTPSConnection(get_api_gateway_url(), get_api_gateway_port())
    token = json.loads(getAuth0AuthToken())
    bearerString = "Bearer " + token.get('access_token')
    headers = { 'authorization': bearerString }
    payload = {
        "link": link,
        "pid": pid
    }
    if postMethod == 'append': 
        # conn.request("PATCH", "/product/img", json.dumps(payload), headers)
        requests.patch(get_api_gateway_url() + "/product/img", data=json.dumps(payload), headers=headers)
    else:
        # conn.request("POST", "/product/img", json.dumps(payload), headers)
        requests.post(get_api_gateway_url() + "/product/img", data=json.dumps(payload), headers=headers)
    # res = conn.getresponse()
    # data = res.read()
    os.remove(filePath)
    return link

#endpoint which takes in a users information and relevant data for the email
@app.route('/email', methods=['POST', 'OPTIONS'])
@cross_origin(headers=["Content-Type", "Authorization"],resources={"*": api_v1_cors_config})
@requires_auth
def send_email_to_user():
    body = json.loads(request.data)
    email_template = body.get("template")
    template_dict = {
        "test_email": email_helpers.send_test_email
    }
    template_dict[email_template](body)
    return "SUCCESS"


# ----------------- END ENDPOINTS ----------------------------------

# ----------------- RUN SERVER -------------------------------------
if __name__ == '__main__':
    if os.environ.get('IS_PRODUCTION_ENV') == True:
        app.run(host='0.0.0.0')
    else:
        app.logger.info("RUNNING SCRAPER IN DEVELOPER MODE")
        app.run(debug=True, host='0.0.0.0', port=5001)