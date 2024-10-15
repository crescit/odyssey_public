export const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
export const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
export const auth0Audience = process.env.REACT_APP_AUTH0_AUDIENCE;
export const apiURL = process.env.REACT_APP_API_URL;
export const scraperURL = process.env.REACT_APP_SCRAPER_URL;
export const StripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_TEST_KEY;

export const ConnectedStripeAcct = `` 

export const ApplicationFee = process.env.REACT_APP_STRIPE_APPLICATION_FEE;
export const defaultReturnLimit = 48; // multiple of 12
export const defaultShopImg = 'http://images.odysseycommerce.com/images/defaultShop.jpg';
export const defaultNoImg = 'http://images.odysseycommerce.com/images/noImage.png';

export const states = [
  {code: '', name: 'Select your state'},
  {code: 'AL', name: 'Alabama'},
  {code: 'AK', name: 'Alaska'},
  {code: 'AZ', name: 'Arizona'},
  {code: 'AR', name: 'Arkansas'},
  {code: 'CA', name: 'California'},
  {code: 'CO', name: 'Colorado'},
  {code: 'CT', name: 'Connecticut'},
  {code: 'DE', name: 'Delaware'},
  {code: 'DC', name: 'District Of Columbia'},
  {code: 'FL', name: 'Florida'},
  {code: 'GA', name: 'Georgia'},
  {code: 'HI', name: 'Hawaii'},
  {code: 'ID', name: 'Idaho'},
  {code: 'IL', name: 'Illinois'},
  {code: 'IN', name: 'Indiana'},
  {code: 'IA', name: 'Iowa'},
  {code: 'KS', name: 'Kansas'},
  {code: 'KY', name: 'Kentucky'},
  {code: 'LA', name: 'Louisiana'},
  {code: 'ME', name: 'Maine'},
  {code: 'MD', name: 'Maryland'},
  {code: 'MA', name: 'Massachusetts'},
  {code: 'MI', name: 'Michigan'},
  {code: 'MN', name: 'Minnesota'},
  {code: 'MS', name: 'Mississippi'},
  {code: 'MO', name: 'Missouri'},
  {code: 'MT', name: 'Montana'},
  {code: 'NE', name: 'Nebraska'},
  {code: 'NV', name: 'Nevada'},
  {code: 'NH', name: 'New Hampshire'},
  {code: 'NJ', name: 'New Jersey'},
  {code: 'NM', name: 'New Mexico'},
  {code: 'NY', name: 'New York'},
  {code: 'NC', name: 'North Carolina'},
  {code: 'ND', name: 'North Dakota'},
  {code: 'OH', name: 'Ohio'},
  {code: 'OK', name: 'Oklahoma'},
  {code: 'OR', name: 'Oregon'},
  {code: 'PA', name: 'Pennsylvania'},
  {code: 'RI', name: 'Rhode Island'},
  {code: 'SC', name: 'South Carolina'},
  {code: 'SD', name: 'South Dakota'},
  {code: 'TN', name: 'Tennessee'},
  {code: 'TX', name: 'Texas'},
  {code: 'UT', name: 'Utah'},
  {code: 'VT', name: 'Vermont'},
  {code: 'VA', name: 'Virginia'},
  {code: 'WA', name: 'Washington'},
  {code: 'WV', name: 'West Virginia'},
  {code: 'WI', name: 'Wisconsin'},
  {code: 'WY', name: 'Wyoming'},
];

export const timeZones = [
  { id: '0', gmt:'', text: 'Select your time zone', useDaylight: '0', value:''},
  {id: '1', gmt: 'GMT-10:00', useDaylight: '0', value: '-10', text: '(GMT-10:00) Hawaii'},
  {id: '2', gmt: 'GMT-09:00', useDaylight: '1', value: '-9', text: '(GMT-09:00) Alaska'},
  {id: '3', gmt: 'GMT-08:00', useDaylight: '1', value: '-8', text: '(GMT-08:00) Pacific Time (US & Canada)'},
  {id: '4', gmt: 'GMT-07:00', useDaylight: '0', value: '-7', text: '(GMT-07:00) Arizona'},
  {id: '5', gmt: 'GMT-07:00', useDaylight: '1', value: '-7', text: '(GMT-07:00) Mountain Time (US & Canada)'},
  {id: '6', gmt: 'GMT-06:00', useDaylight: '1', value: '-6', text: '(GMT-06:00) Central Time (US & Canada)'},
  {id: '7', gmt: 'GMT-05:00', useDaylight: '1', value: '-5', text: '(GMT-05:00) Eastern Time (US & Canada)'},
];

export const daysOfTheWeek = [ {abbr: '', name: 'days of the week', order: 0},
  {abbr: 'M-F', name: 'Mon-Fri', order: -1},
  {abbr: 'M-Su', name: 'Mon-Sun', order: -1},
  {abbr: 'S-Su', name: 'Sat-Sun', order: -1},
  {abbr: 'Mon', name: 'Monday', order: 1},
  {abbr: 'Tue', name: 'Tuesday', order: 2},
  {abbr: 'Wed', name: 'Wednesday', order: 3},
  {abbr: 'Thu', name: 'Thursday', order: 4},
  {abbr: 'Fri', name: 'Friday', order: 5},
  {abbr: 'Sat', name: 'Saturday', order: 6},
  {abbr: 'Sun', name: 'Sunday', order: 7},
];

export const dayRank = { 
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
  'Mon-Fri': -1,
  'Mon-Sun': -1,
  'Sat-Sun': -1,
}

export const busiCategories = ['Select a category',
  'Appliances and Electronics',
  'Art',
  'Auto Parts and Accessories',
  'Books',
  'Camera and Photography',
  `Children's and Infant's Clothing`,
  'Clothing Accessories',
  'Computers',
  'Cosmetic and Beauty',
  'Family Clothing',
  'Floor Coverings',
  'Furniture',
  'Hardware',
  'Hobby, Toy, and Game',
  'Home Centers',
  'Jewelry',
  'Luggage',
  `Men's Clothing`,
  'Musical Instrument',
  'Nursery and Garden',
  'Optical Goods',
  'Other Apparel',
  'Other Building Materials',
  'Other General Merchandise',
  'Other Health and Personal Care',
  'Other Home Furnishings',
  'Other Miscellaneous Retail',
  'Outdoor Power Equipment',
  'Paint and Wall Paper',
  'Pet and Pet Supply',
  'Record, Tape, and CD',
  'Sewing and Needlecraft',
  'Shoes',
  'Sporting Goods',
  `Women's Clothing`,
];

const today = new Date(Date.now()).toISOString();

export const emptyProduct = {
  id: 0, // PID
  vids: [], // int; from variant
  name: '',  // title for POST
  variant_titles: [], // string; from variant
  company_id: 0, 
  merchant: '', 
  category: '', 
  desc: '',  // description for POST
  price: 0, 
  prices: [], // float; from variant
  total: 0, 
  img: '', 
  images: [], // string
  store: '', 
  vendor: '', 
  count: 0, // inventory for POST
  handle: ' ', 
  inCart: false, 
}

export const emptyVariant = {
    "vid": '0-0', // MUST set the default as 0-0  
    "id": 0, // pid << needed for post 
    "title": '', // << needed for post
    "options": '',  // << needed for post
    "option1": '', 
    "option2": '',
    "option3": '',
    "requires_shipping": true, // << needed for post
    "taxable": true, // << needed for post
    "featured_image": '', // << needed for post
    "available": true, // << needed for post
    "price": '0.00', // << needed for post
    "grams": 0, // << needed for post
    "compare_at_price": '', // << needed for post
    "position": 1, // << needed for post; = last vari +1
    "product_id": '',
    "created_at": today,
    "updated_at": today,
    "sku": '', // << needed for post
    "inventory_quantity": 0, // << needed for post
    "barcode": '' // << needed for post
}