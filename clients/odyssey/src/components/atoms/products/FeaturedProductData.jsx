const desk = 'http://images.odysseycommerce.com/desk.webp'

export const productData = [
  {
    id: 0,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 1',
    price: 9.99,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 1,
    name: 'Blanket',
    img: desk,
    store: 'Local Furniture Shop 2',
    price: 99.99,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 2,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 3',
    price: 999.99,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 3,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 4',
    price: 9999.99,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 4,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 5',
    price: 100.0,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 5,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 6',
    price: 1.24,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 6,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 7',
    price: 1.37,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 7,
    name: 'Desk',
    img: desk,
    store: 'Local Furniture Shop 8', // '' for now
    price: 1337.42,
    merchant: 'BeWellBoutique',
    desc:
      'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
    inCart: false, // default = false
    count: 0,
    total: 0, // default = 0
  },
];

export const detailProduct = {
  id: 0,
  vids: [0],
  name: 'Desk',
  img: desk,
  store: 'Local Furniture Shop 1',
  price: 9.99,
  merchant: 'BeWellBoutique',
  desc:
    'This sturdy desk is built to outlast years of coffee and hard work. You get a generous work surface and a clever solution to keep cords in place underneath.',
  inCart: false,
  count: 0,
  total: 0,
};

export const prodDataSampleFromDB = [
    {
        "id": 5,
        "vids": [10,11,12,13,14],
        "name": "Super Bloom Rose Oil Treatment",
        "variant_titles": [
            "Red Rose Petals",
            "Pink Rose Petals",
            "Yellow Orange Rose Petals",
            "Ivory Pink Peony Petals",
            "Purple Viola whole flowers - Rose Oil"
        ],
        "company_id": 0,
        "category": "Body Spray",
        "desc": "", 
        "price": -0.0001,
        "prices": [25,23.95,18,2,225],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4RR.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4RR.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4RP.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /78463_Super_Bloom_Rose_Pathed_050417_copy.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /71qhIsRc-9L._AC_SL1000.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /06245A__Ivory_Pink_Fd_Peony_Petals__30_Cups.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /s-l1600.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "super-bloom-rose-body-spray",
        "inCart": false
    },
    {
        "id": 52,
        "vids": [63],
        "name": "Hand Sanitizer and Body Spray 2oz.",
        "variant_titles": [
            "2 oz."
        ],
        "company_id": 0,
        "category": "Body Spray",
        "desc": "",
        "price": -0.0001,
        "prices": [
            7.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDS-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDS-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "body-spray-2-oz",
        "inCart": false
    },
    {
        "id": 30,
        "vids": [
            41
        ],
        "name": "Bulgarian Lavender Walnut Scrub 8 oz.",
        "variant_titles": [
            "Default"
        ],
        "company_id": 0,
        "category": "Walnut Scrub",
        "desc": "",
        "price": -0.0001,
        "prices": [
            17.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSL.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSL.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "bulgarian-lavender-walnut-scrub-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 13,
        "vids": [
            22
        ],
        "name": "Sport Naturals Walnut Scrub 1 oz.",
        "variant_titles": [
            "Original Fresh Walnut Scrub Shower Gel 1 oz."
        ],
        "company_id": 0,
        "category": "Walnut Scrub",
        "desc": "",
        "price": -0.0001,
        "prices": [
            3.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSM-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSM-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "original-fresh-walnut-scrub-shower-gel-1-oz",
        "inCart": false
    },
    {
        "id": 40,
        "vids": [
            51
        ],
        "name": "Deodorizor Air Freshener 16-Pack",
        "variant_titles": [
            "Deodorizor Air Freshener 16-Pack"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            13.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /pillowpak_front-2-small_1024x1024_1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /pillowpak_front-2-small_1024x1024_1.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR-1_b2384c93-5d08-4a7f-b6fa-5197c75a5309.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "deodorizor-air-freshener-16-pack",
        "inCart": false
    },
    {
        "id": 4,
        "vids": [
            6,
            7,
            8,
            9
        ],
        "name": "Super Bloom Bulgarian Lavender Oil Treatment",
        "variant_titles": [
            "Purple",
            "Yellow Orange",
            "Orange Maroon",
            "Mix Flower Petals"
        ],
        "company_id": 0,
        "category": "Body Spray",
        "desc": "",
        "price": -0.0001,
        "prices": [
            25,
            25,
            25,
            25
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Super_Bloom_Lavender.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Super_Bloom_Lavender.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4LP.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4LL.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4LOM.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SBO4LYO.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /78463_Super_Bloom_Lavender_Pathed_050417_copy.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "super-bloom-bulgarian-lavender-oil-treatment",
        "inCart": false
    },
    {
        "id": 3,
        "vids": [
            4,
            5
        ],
        "name": "Sport Naturals Bath Bomb",
        "variant_titles": [
            "Single",
            "10 Pack"
        ],
        "company_id": 0,
        "category": "",
        "desc": "",
        "price": -0.0001,
        "prices": [
            5,
            85
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /green_bath_bomb.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /green_bath_bomb.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DSC_0631.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "sport-naturals-bath-bomb",
        "inCart": false
    },
    {
        "id": 36,
        "vids": [
            47
        ],
        "name": "Pink Grapefruit Shower Gel 8 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            14.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGPG.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGPG.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "pink-grapefruit-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 44,
        "vids": [
            55
        ],
        "name": "Crushables™ Air Fresheners Botanical Blend",
        "variant_titles": [
            "Crushables™ Air Fresheners Botanical Blend"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            9.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-BOT.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-BOT.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-BOT.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "crushables-air-fresheners-botanical-blend",
        "inCart": false
    },
    {
        "id": 58,
        "vids": [
            69
        ],
        "name": "Sport Naturals Shower Gel 8 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            14.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWG8.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWG8.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 47,
        "vids": [
            58
        ],
        "name": "Crushables™ Air Fresheners Anti-Stress",
        "variant_titles": [
            "Crushables™ Air Fresheners Anti-Stress"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            3.25
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Anti-Stress.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Anti-Stress.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "copy-of-crushables-air-fresheners-anti-stress",
        "inCart": false
    },
    {
        "id": 48,
        "vids": [
            59
        ],
        "name": "Crushables™ Air Fresheners Lavender",
        "variant_titles": [
            "Crushables™ Air Fresheners Lavender"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            3.25
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Lavender.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Lavender.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "crushables-air-fresheners-lavender",
        "inCart": false
    },
    {
        "id": 22,
        "vids": [
            33
        ],
        "name": "Strawberry Body Butter 6 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Body Butter",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Strawberry-Body-Butter.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Strawberry-Body-Butter.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "strawberry-body-butter-coming-soon-please-sign-up-on-our-newsletter",
        "inCart": false
    },
    {
        "id": 7,
        "vids": [
            16
        ],
        "name": "Pink Grapefruit Glow Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            42.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Pink_Grapefruit_Glow_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Pink_Grapefruit_Glow_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "pink-grapefruit-glow-set",
        "inCart": false
    },
    {
        "id": 10,
        "vids": [
            19
        ],
        "name": "Sport Naturals Super Ultimate Energize Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            77.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Super_Ultimate_Energize_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Super_Ultimate_Energize_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "sport-naturals-super-ultimate-energize-set",
        "inCart": false
    },
    {
        "id": 37,
        "vids": [
            48
        ],
        "name": "Botanical Blend Shower Gel 8 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            14.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGB.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGB.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "botanical-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 27,
        "vids": [
            38
        ],
        "name": "Anti-Stress Lotion 8 oz.",
        "variant_titles": [
            "Default"
        ],
        "company_id": 0,
        "category": "Lotion",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLAS.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLAS.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "anti-stress-lotion-8-oz",
        "inCart": false
    },
    {
        "id": 54,
        "vids": [
            65
        ],
        "name": "Body Wipes Canister - 210 sheets (bulk)",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Wipes",
        "desc": "",
        "price": -0.0001,
        "prices": [
            34.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDC-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDC-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "hand-body-wipes-canister",
        "inCart": false
    },
    {
        "id": 28,
        "vids": [
            39
        ],
        "name": "Pink Grapefruit Lotion 8 oz.",
        "variant_titles": [
            "Grapefruit Lotion 8 oz."
        ],
        "company_id": 0,
        "category": "Lotion",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLPG.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLPG.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "pink-grapefruit-lotion-8-oz",
        "inCart": false
    },
    {
        "id": 39,
        "vids": [
            50
        ],
        "name": "Deodorizor Air Freshener Display",
        "variant_titles": [
            "Deodorizor Air Freshener Display"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            99
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR_POS.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR_POS.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /pillowpak_front-2-small_c5c155eb-d74b-4fdc-8916-b968bdc0d9fa.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR-1_589c0a5f-77bc-4853-ab3c-cfb1571b8e76.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "deodorizor-air-freshener-display",
        "inCart": false
    },
    {
        "id": 25,
        "vids": [
            36
        ],
        "name": "Lip Balm",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Lip Balm",
        "desc": "",
        "price": -0.0001,
        "prices": [
            3.45
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /LPB-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /LPB-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "lip-balm",
        "inCart": false
    },
    {
        "id": 8,
        "vids": [
            17
        ],
        "name": "Botanical Blend Healthy Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            42.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Botanical_Blend_Healthy_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Botanical_Blend_Healthy_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "botanical-blend-healthy-set",
        "inCart": false
    },
    {
        "id": 16,
        "vids": [
            25
        ],
        "name": "Soap Bar 6 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Soap Bar",
        "desc": "",
        "price": -0.0001,
        "prices": [
            6.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SNL-6.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SNL-6.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "soap-bar-6-oz",
        "inCart": false
    },
    {
        "id": 26,
        "vids": [
            37
        ],
        "name": "Bulgarian Lavender Lotion 8 oz.",
        "variant_titles": [
            "Default"
        ],
        "company_id": 0,
        "category": "Lotion",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLL.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLL.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "bulgarian-lavender-lotion-8-oz",
        "inCart": false
    },
    {
        "id": 31,
        "vids": [
            42
        ],
        "name": "Anti-Stress Walnut Scrub 8 oz.",
        "variant_titles": [
            "Default"
        ],
        "company_id": 0,
        "category": "Walnut Scrub",
        "desc": "",
        "price": -0.0001,
        "prices": [
            17.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSAS.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /WNSAS.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "anti-stress-walnut-scrub-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 41,
        "vids": [
            52
        ],
        "name": "Deodorizor Air Freshener Singles",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            1
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /DZR-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "deodorizor-air-fresheners",
        "inCart": false
    },
    {
        "id": 18,
        "vids": [
            27
        ],
        "name": "After Shave Balm 100 mL",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "After Shave Balm",
        "desc": "",
        "price": -0.0001,
        "prices": [
            19.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /ASB_100mL.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /ASB_100mL.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "after-shave-balm-100-ml",
        "inCart": false
    },
    {
        "id": 51,
        "vids": [
            62
        ],
        "name": "Sport Naturals Body Spray Refill 8oz.",
        "variant_titles": [
            "8 oz. Refill"
        ],
        "company_id": 0,
        "category": "Body Spray",
        "desc": "",
        "price": -0.0001,
        "prices": [
            15.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDS-8.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDS-8.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "body-spray-refill-8oz",
        "inCart": false
    },
    {
        "id": 19,
        "vids": [
            28
        ],
        "name": "Shower Gel Gallon - (Bulk) 128 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            75
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGG.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGG.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "shower-gel-gallon-128-oz",
        "inCart": false
    },
    {
        "id": 14,
        "vids": [
            23
        ],
        "name": "Pumpkin Sea Salt Scrub",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.99
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Pumpkin_Sea_Salt_Scrub_6_oz.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Pumpkin_Sea_Salt_Scrub_6_oz.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Pumpkin_Sea_Salt_Scrub_6_oz_closeup.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "pumpkin-sea-salt-scrub",
        "inCart": false
    },
    {
        "id": 1,
        "vids": [
            1
        ],
        "name": "Super Body Care Hygiene Kit",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Travel Kits",
        "desc": "",
        "price": -0.0001,
        "prices": [
            29
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /EtsyItemListingPhoto.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /EtsyItemListingPhoto.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDL8-1_43fa4c03-9832-483e-9ec1-daf37180cfb6.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /LPB-1_c2c1069d-e2af-4b46-b989-fb2e0f910676.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDS-1_7380ba9e-6888-4006-8884-f57802a4fb39.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDW-PK_fac10c61-3c74-4851-932c-8e8717d65e73.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "super-body-care-hygiene-kit",
        "inCart": false
    },
    {
        "id": 21,
        "vids": [
            32
        ],
        "name": "Aroma-Classic™ Diffuser Vaporizor",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Diffuser",
        "desc": "",
        "price": -0.0001,
        "prices": [
            38
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /aroma-classic-diffuser.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /aroma-classic-diffuser.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "aroma-classic-diffuser",
        "inCart": false
    },
    {
        "id": 53,
        "vids": [
            64
        ],
        "name": "Sport Naturals Walnut Scrub 8 oz.",
        "variant_titles": [
            "Original Fresh Walnut Scrub Shower Gel 8 oz."
        ],
        "company_id": 0,
        "category": "Walnut Scrub",
        "desc": "",
        "price": -0.0001,
        "prices": [
            17.95
        ],
        "total": 0,
        "img": "https://images.odysseycommerce.com/Super Body Care /WalnutScrub1Oz.png",
        "images": [
            "https://images.odysseycommerce.com/Super Body Care /WalnutScrub1Oz.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "walnut-scrub-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 20,
        "vids": [
            29,
            30,
            31
        ],
        "name": "Loofah Soap Bar 4 oz.",
        "variant_titles": [
            "Single",
            "12-Pack",
            "x2 Loofah Bar 4 oz"
        ],
        "company_id": 0,
        "category": "Soap Bar",
        "desc": "",
        "price": -0.0001,
        "prices": [
            4.5,
            46,
            8.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Soap-4oz.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Soap-4oz.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Soap-4oz-12pk.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /loofah.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "loofah-soap-bar-4-oz",
        "inCart": false
    },
    {
        "id": 46,
        "vids": [
            57
        ],
        "name": "Crushables™ Air Fresheners Pink Grapefruit",
        "variant_titles": [
            "Crushables™ Air Fresheners Anti-Stress"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            9.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-PG.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-PG.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-PG.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "crushables-air-fresheners-anti-stress",
        "inCart": false
    },
    {
        "id": 45,
        "vids": [
            56
        ],
        "name": "Crushables™ Air Fresheners French Lavender",
        "variant_titles": [
            "Crushables™ Air Fresheners Anti-Stress"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            9.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-LAV.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side_DZR-LAV.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Box-Side-LAV.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "crushables-air-fresheners-french-lavender",
        "inCart": false
    },
    {
        "id": 38,
        "vids": [
            49
        ],
        "name": "Sport Naturals Shower Gel 2 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            4.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWG2.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWG2.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "original-fresh-shower-gel-2-oz",
        "inCart": false
    },
    {
        "id": 11,
        "vids": [
            20
        ],
        "name": "Sport Naturals Ultimate Energize Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            54.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Ultimate_Energize_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Ultimate_Energize_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "sport-naturals-ultimate-energize-set",
        "inCart": false
    },
    {
        "id": 23,
        "vids": [
            34
        ],
        "name": "Gift Set - Strawberry Sugar Scrub & Body Butter",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "",
        "desc": "",
        "price": -0.0001,
        "prices": [
            19.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /strawberry-basket.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /strawberry-basket.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Strawberry-GiftSet.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "gift-set-strawberry-sugar-scrub-body-butter",
        "inCart": false
    },
    {
        "id": 35,
        "vids": [
            46
        ],
        "name": "Anti-Stress Shower Gel 8 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Shower Gel",
        "desc": "",
        "price": -0.0001,
        "prices": [
            14.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGAS.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /SWGAS.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "anti-stress-shower-gel-8-oz",
        "inCart": false
    },
    {
        "id": 2,
        "vids": [
            2,
            3
        ],
        "name": "Butterfly Pea Aphrodisiac Bath Bomb",
        "variant_titles": [
            "Single",
            "10 Pack"
        ],
        "company_id": 0,
        "category": "",
        "desc": "This bath bomb is THE BOMB!",
        "price": -0.0001,
        "prices": [
            5.99,
            50
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /butterfly-peas-5184951_960_720.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /butterfly-peas-5184951_960_720.png",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /butterfly-pea-1181056_960_720.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "butterfly-pea-aphrodisiac-bath-bomb",
        "inCart": false
    },
    {
        "id": 24,
        "vids": [
            35
        ],
        "name": "Strawberry Sugar Scrub 6 oz.",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Scrubs",
        "desc": "",
        "price": -0.0001,
        "prices": [
            6.99
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Strawberry-Sugar-Scrub.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Strawberry-Sugar-Scrub.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "strawberry-sugar-scrub-available-soon-sign-up-on-our-newsletter",
        "inCart": false
    },
    {
        "id": 49,
        "vids": [
            60
        ],
        "name": "Crushables™ Air Fresheners Pink Grapefruit",
        "variant_titles": [
            "Crushables™ Air Fresheners Pink Grapefruit"
        ],
        "company_id": 0,
        "category": "Air Fresheners",
        "desc": "",
        "price": -0.0001,
        "prices": [
            3.25
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Grapefruit.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Crushables-Grapefruit.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "crushables-air-fresheners-pink-grapefruit",
        "inCart": false
    },
    {
        "id": 15,
        "vids": [
            24
        ],
        "name": "Super Body Care Travel Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Travel Kits",
        "desc": "",
        "price": -0.0001,
        "prices": [
            14.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Samples.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Samples.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "super-body-care-travel-set",
        "inCart": false
    },
    {
        "id": 6,
        "vids": [
            15
        ],
        "name": "Bulgarian Lavender Dreamy Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            42.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Bulgarian_Lavendar_Dreamy_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Bulgarian_Lavendar_Dreamy_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "bulgarian-lavender-dreamy-set",
        "inCart": false
    },
    {
        "id": 57,
        "vids": [
            68
        ],
        "name": "Sport Naturals Lotion 8 oz.",
        "variant_titles": [
            "Original Fresh Lotion 8 oz."
        ],
        "company_id": 0,
        "category": "Lotion",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDL8-1.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDL8-1.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "body-lotion-8-oz",
        "inCart": false
    },
    {
        "id": 29,
        "vids": [
            40
        ],
        "name": "Botanical Blend Lotion 8 oz.",
        "variant_titles": [
            "Original Fresh Lotion 8 oz."
        ],
        "company_id": 0,
        "category": "Lotion",
        "desc": "",
        "price": -0.0001,
        "prices": [
            12.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLB.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /BDLB.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "botanical-blend-lotion-8-oz",
        "inCart": false
    },
    {
        "id": 42,
        "vids": [
            53
        ],
        "name": "Trifecta Anti-Aging Serum",
        "variant_titles": [
            "Trifecta Anti-Aging Serum"
        ],
        "company_id": 0,
        "category": "Serum",
        "desc": "",
        "price": -0.0001,
        "prices": [
            19.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /trifectablack1.jpg",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /trifectablack1.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Trifecta5.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Trifecta3.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Trifecta2.jpg",
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /crueltyfree.jpg"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "alpha-hydroxy-acid-serum-5",
        "inCart": false
    },
    {
        "id": 12,
        "vids": [
            21
        ],
        "name": "Sport Naturals Energize Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            42.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Sport_Naturals_Energize_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Sport_Naturals_Energize_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "sport-naturals-energize-set",
        "inCart": false
    },
    {
        "id": 9,
        "vids": [
            18
        ],
        "name": "Anti-Stress Calm Set",
        "variant_titles": [
            "Default Title"
        ],
        "company_id": 0,
        "category": "Gift Sets",
        "desc": "",
        "price": -0.0001,
        "prices": [
            42.95
        ],
        "total": 0,
        "img": "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Anti-Stress_Calm_Set.png",
        "images": [
            "https://s3.us-west-1.amazonaws.com/images.odysseycommerce/Super Body Care /Anti-Stress_Calm_Set.png"
        ],
        "store": "",
        "merchant": "Super Body Care",
        "count": 0,
        "handle": "anti-stress-calm-set",
        "inCart": false
}
]