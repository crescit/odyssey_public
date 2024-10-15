
import axios from 'axios'; 
import { defaultReturnLimit } from '../common/constants'

// * This wrapper DOES NOT include calling useAuth0 hook; Must provide token
export class ApiUtil {
  /** POST
  * @param {string} url REQUIRED; url path i.e. '/user', '/order', '/shopify-business', '/shopify-product-data'
  * @param {Object} data REQUIRED; ex. { ...user, isBusiness: true}
  * @param {Object} token REQUIRED; obtained using getTokenSilently() via useAuth0 hook
  * @param {Object} additionalHeaders OPTIONAL, default = {}
  */
  static post = async (url, data, token, additionalHeaders = {}) => {
      const result = await axios({
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          ...additionalHeaders
        },
        url,
        data,
        baseURL: '/'
      });
      return result
  }
  
  /** PATCH
  * @param {string} url REQUIRED; url path i.e. '/order/:id', '/cart/user/:id', '/shopify-business/variant/:id'
  * @param {Object} data REQUIRED; ex. {CustomerID: 1234, VID: 5678, Quantity: 2}
  * @param {Object} token REQUIRED; obtained using getTokenSilently() via useAuth0 hook
  */
  static patch = async (url, data, token) => {
      const result = await axios({
        method: 'patch',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: url,
        data,
        baseURL: '/'
      });
      return result
  }
  
  /** GET
  * @param {string} url REQUIRED; endpoint path; "/order", "/orders/company", "/products"
  * @param {boolean} publicApi OPTIONAL, deafult = true; when token/auth is not needed
  * @param {string} id OPTIONAL, deafult = null; corresponding ids for above urls: orderID, companyID, and companyID
  * @param {Object} token OPTIONAL, deafult = null; obtained using getTokenSilently() via useAuth0 hook
  * @param {number} limit OPTIONAL, deafult = 48; limits number of return records; set limit to 0 to return all records; limits should be multiple of 12 (=number of items per page)
  * @param {number} offset OPTIONAL, deafult = 0; offset provides next group of records
  * @param {number} disableDefaults OPTIONAL, deafult = false; disableDefaults disables the addition of limit and offset on the call
  * @param {number} params OPTIONAL, mainly for order status
  */
  static get = async (url, publicApi = true, id = null, token = null, limit = defaultReturnLimit, offset = 0, params) => {
    let finalUrl = url + '/' + id;
    finalUrl = finalUrl.split('/null')[0]; // valid for public and private Api
    const query = url.includes('?searchterm=') ? '&' : '?';
    limit = limit || 0;  // limit needs to be a positive integer
    offset = offset || 0; // offset needs to be a positive integer
    finalUrl += query + "limit=" + limit + "&offset=" + offset // set limit=0 to return all records

    const result = await axios({
      method: 'get',
      headers:  publicApi ? null : {
        Authorization: `Bearer ${token}`,
      },
      url: finalUrl,
      params,
      baseURL: '/'
    });
    return result
  }
  
  /** DELETE via post
  * @param {string} url REQUIRED; endpoint path; "/shopify-business/variant/:id", "/shopify-business/products/:id", "/cart/user/:id"
  * @param {Object} token REQUIRED; obtained using getTokenSilently() via useAuth0 hook
  * @param {Object} data REQUIRED only for Image; additional data needed to delete image within the array of images in the Product "images" field
  */
  static delete = async (url, token, data = '') => {
      const result = await axios({
        // method: 'delete',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
          // 'X-HTTP-Method-Override': 'DELETE',
        },
        url: url,
        data, // mainly for deleteing image within Product "images" field
        baseURL: '/'
      });
      return result
  }

}
