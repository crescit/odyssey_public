
import React from 'react';
import { ApiUtil } from './util/ApiUtil';
import { ApplicationFee, defaultReturnLimit, apiURL } from './common/constants' 
import {
  detailProduct,
  // prodDataSampleFromDB,
  // productData,
} from './components/atoms/products/FeaturedProductData';
import {
  detailStore,
  //storeData,
} from './components/atoms/stores/FeaturedBusinessData';
// import { testCartData } from './test_data/testCartData';
// import { testProdData } from './test_data/testProd';

const get = require('lodash/get')
const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends React.Component {
  state = {
    products: [],
    stores: [],
    categories: [],
    cart: [],
    cartSubTotal: 0,
    cartFees: 0,
    cartTotal: 0,
    detailProduct: detailProduct,
    detailStore: detailStore,
    hasMoreData: {forProd: 0, forStore: 0, forCategory: 0},
    loadingCart: false,
    loadingCartItem: false,
    loadingProd: false,
    loadingStore: false,
    location: '',
    loginUser: 'Guest',
    merchantIdForCheckout: 0,
    modalOpen: false,
    modalProduct: detailProduct,
    onboardStep: 0, // 0) shopping cart, 1) form, 2) Stripe connect, 3) review data, 4) completed
    order: [],
    prodStartIdx: 0,
    search: '',
    shoppingCartOpen: false,
    storeStartIdx: 0
  };

  setDetailStore = async (company_id) => {
      const { data } = await ApiUtil.get(apiURL + "/companies", true, company_id);
      const storeData = data && Array.isArray(data.stores) ? data.stores : [];
      this.setState({ detailStore: get(storeData, '0', {})})
      return get(storeData, '0', {})
  }
  
  setDetailProduct = async (pid) => {
      const { data } = await ApiUtil.get(apiURL + "/product", true, pid);
      const prodData = data && Array.isArray(data.products) ? data.products : [];
      this.setState({ detailProduct: get(prodData, '0', {})})
  }
  
  setProducts = async (productData, moreData = 0, limit = defaultReturnLimit) => {
    moreData = !moreData ? 0 : moreData;
    limit = !limit ? defaultReturnLimit : limit;
    this.setLoading('loadingProd', true)
    try {
      if (productData === 'getall') {
        productData = [];
        const { data } = await ApiUtil.get(apiURL + '/getall/products', true, null, null, limit);
        productData = data && Array.isArray(data.products) ? data.products : [];
        moreData = data && data.hasMoreData === 1 ? 1 : 0;
      } else if (typeof(productData) !== 'object' || !productData ) {
        productData = [];
      }
    } catch(err) {
      console.error(err);
    };    
    this.setState(
      () => {return { 
        products: productData,
        hasMoreData: {...this.state.hasMoreData, forProd: moreData }
      }},
    );
    this.setLoading('loadingProd', false)
  };

  setStores = async(storeData, moreData = 0, limit = defaultReturnLimit) => {
    moreData = !moreData ? 0 : moreData;
    limit = !limit ? defaultReturnLimit : limit;
    this.setLoading('loadingStore', true)
    try {
      if (storeData === 'getall') {
        storeData = [];
        const { data } = await ApiUtil.get(apiURL + '/getall/companies');
        storeData = data && Array.isArray(data.stores) ? data.stores : [];
        moreData = data && data.hasMoreData === 1 ? 1 : 0;
      } else if (typeof(storeData) !== 'object' || !storeData ) {
        storeData = []
      }
    } catch(err) {
      console.error(err);
    };

    this.setState(
      () => {return { 
        stores: storeData,
        hasMoreData: {...this.state.hasMoreData, forStore: moreData }
      }}
    );
    this.setLoading('loadingStore', false)
  };

  // TODO NEED to revisit setCategories
  setCategories = (categoryData) => {
    let tempCategories = [];
    if (categoryData) {
      tempCategories = [];
      categoryData.forEach((item) => {
        const singleCategory = { ...item };
        tempCategories = [...tempCategories, singleCategory];
      });
    }
    this.setState(() => {
      return { categories: tempCategories };
    });
  };

  setCart = async(token) => {
    this.setLoading('loadingCart', true)
    // let tempCart = testCartData;
    let tempCart = [];
    try {
      const { data = [] } = await ApiUtil.get(apiURL + '/cart/user', false, null, token);
      tempCart = Array.isArray(data) ? data: [];
    } catch(err) {
      console.error(err);
    }

    this.setState(
      () => {
        return {cart: tempCart};
      },
      () => {
        this.addTotals();
      }
    );
    this.setLoading('loadingCart', false)
  }

  setLoading = (key, bool) => {
    this.setState({[key]: bool})
  }

  setMerchantIdForCheckout = (company_id) => {
    company_id = parseInt(company_id, 10);
    if (get(this, 'state.cart[0].company_id', false)) {
      const foundMerchant = this.state.cart.find(item => item.company_id === company_id)
      if (foundMerchant) this.setState({ merchantIdForCheckout: foundMerchant.company_id })
    } else {
      this.setState({ merchantIdForCheckout: 0 })
    }
  }

  setOnboardStep = async(token) => {
    let tempStep = 1;
    try {
      const res = await ApiUtil.get(apiURL + '/user', false, null, token);
      tempStep = get(res, 'data.onboard_step', 1);
    } catch(err) {
      console.error(err);
    }
    this.updateOnboardStep(tempStep);
  }

  setOrderFromCart = (company_id) => {
    if (!company_id) this.setState({ order: [] })
    if (!get(this, 'state.cart[0].company_id', false)) return
    const tempOrder = this.state.cart.filter(item => 
      item.company_id === company_id
    )
    this.setState({ order: tempOrder })
  }

  fetchMoreProdData = async(searchTerm, offset) => {
    this.setLoading('loadingProd', true)
    offset = offset >= 0 ? offset : 0;
    const { data } = await ApiUtil.get(apiURL + '/search/products?searchterm=' + searchTerm, true, null, null, defaultReturnLimit, offset );
    const moreProdData = data && Array.isArray(data.products) ? data.products : [];
    const moreData = data && data.hasMoreData === 1 ? 1 : 0;
    let tempData = [...this.state.products].concat(moreProdData);
    this.setState({ products: tempData, hasMoreData: {...this.state.hasMoreData, forProd: moreData} });
    this.setLoading('loadingProd', false)
  }

  fetchMoreStoreData = async(searchTerm, offset) => {
    this.setLoading('loadingStore', true)
    offset = offset >= 0 ? offset : 0;
    const { data } = await ApiUtil.get(apiURL + '/search/companies?searchterm=' + searchTerm, true, null, null, defaultReturnLimit, offset );
    const moreStoreData = data && Array.isArray(data.stores) ? data.stores : [];
    const moreData = data && data.hasMoreData === 1 ? 1 : 0;
    let tempData = [...this.state.stores].concat(moreStoreData);
    this.setState({ stores: tempData, hasMoreData: {...this.state.hasMoreData, forStore: moreData} });
    this.setLoading('loadingStore', false)
  }

  getItemByPID = (pid) => {
    const product = this.state.products.find((item) => item.id === pid);
    return product;
  };

  getCartItemByVID = (vid) => {
    const prodVariant = this.state.cart.find((item) => item.vid === vid);
    return prodVariant;
  };

  getStore = (id) => {
    const store = this.state.stores.find((store) => store.id === id);
    if(!store){
      return this.setDetailStore(id)
    }
    return store;
  };

  addToCart = async(pid, vid, token) => {
    this.setLoading('loadingCartItem', true)
    // if item is in the cart already, then update cart instead of add
    const prodVariant = this.getCartItemByVID(vid);
    if (prodVariant) {
      const newCount = prodVariant.count + 1;
      return this.updateCartItemCount(vid, newCount, token);
    } 
    
    const tempCart = [...this.state.cart];
    const product = this.state.detailProduct;
    if (pid !== product.id) {
      this.setLoading('loadingCartItem', false)
      return console.error('Product not found!')
    }; 
    const vidIdx = product.vids.indexOf(vid);
    if (vidIdx === -1 || vidIdx === undefined) {
      this.setLoading('loadingCartItem', false)
      return console.error('Variant not found in the product!')
    };

    const selectedProdVariant = {...product};
    const propNotNeededInCartProd = ['inCart', 'handle', 'prices', 'store', 'variant_titles', 'vids']
    for (let prop of propNotNeededInCartProd) {
      delete selectedProdVariant[prop]
    }
    selectedProdVariant.count = 1;

    selectedProdVariant.vid = vid;
    selectedProdVariant.variant_title = product.variant_titles[vidIdx];
    const price = product.prices[vidIdx];
    selectedProdVariant.price = price;
    selectedProdVariant.total = price * selectedProdVariant.count;
    selectedProdVariant.prod_vids = product.vids;
    selectedProdVariant.added = new Date();

    const foundCompany = tempCart.find(item => item.company_id === product.company_id);
    selectedProdVariant.merchant_img = get(foundCompany, 'merchant_img', null);

    const data = { vid: vid, quantity: selectedProdVariant.count}
    try { 
      ApiUtil.post(apiURL + '/cart', data, token)
      if (!foundCompany) {
        const company = await ApiUtil.get(apiURL + '/companies', true, product.company_id)
        selectedProdVariant.merchant_img = get(company, 'data.stores[0].img', null);
      }
    } catch(err) {
      console.error(err)
    }

    this.setState(
      () => {
        return {
          cart: [...this.state.cart, selectedProdVariant],
          detailProduct: { ...product },
        };
      },
      () => {
        this.addTotals();
      },
    );
    this.setLoading('loadingCartItem', false)
  };

  handleProductDetails = (id) => {
    const product = this.getItemByPID(id);
    this.setState({ detailProduct: product });
  };

  handleStoreDetails = (id) => {
    const store = this.getStore(id);
    this.setState({ detailStore: store });
  };

  openCart = (bool) => {
    let newState = !this.state.shoppingCartOpen;
    if (typeof bool === 'boolean') newState = bool;
    this.setState({
      shoppingCartOpen: newState,
    });
  };
  
  openProductModal = (id) => {
    const product = this.getItemByPID(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  openStoreModal = (id) => {
    const store = this.getItemByPID(id);
    this.setState(() => {
      return { modalStore: store, modalOpen: true };
    });
  };

  resetMerchantIdForCheckout = (tempCart) => {
    let merchantIds = [...tempCart];
    merchantIds = merchantIds.map((item) => item.company_id);
    const merchantStillInCart = merchantIds.includes(this.state.merchantIdForCheckout);
    if (merchantStillInCart) return
    const updatedId = merchantIds[0] || 0;
    this.setState({ merchantIdForCheckout: updatedId });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  updateCartItemCount = (vid, newCount, token) => {
    if (Array.isArray(vid)) {
      this.setLoading('loadingCartItem', false)
      return console.warn('incorrect format');
    }
    const tempCart = [...this.state.cart];
    const product = tempCart.find(item => item.vid === vid);
    if (!product) {
      this.setLoading('loadingCartItem', false)
      return console.warn('item not found in cart.');
    }
    newCount = parseInt(newCount, 10);

    if (!newCount || newCount < 1) {
      this.setLoading('loadingCartItem', false)
      return;
    } else {
      product.count = newCount;
      const data = {vid: vid, quantity: product.count}
      product.total = product.count * product.price;
      try {
        ApiUtil.patch(apiURL + '/cart', data, token)
      } catch(err) {
        console.error(err)
      }
      this.setState(
        () => {
          return {cart: [...tempCart]};
        },
        () => {
          this.addTotals();
        }
      );
    }
    this.setLoading('loadingCartItem', false)
  };

  updateLocation = (event) => {
    this.setState({ location: event.target.value });
  };

  updateLoginUser = (name) => {
    this.setState({ loginUser: name });
  };
  
  updateOnboardStep = (num) => {
    this.setState({ onboardStep: num });
  };  
  
  updateProducts = (updatedProducts) => {
    this.setState({products: updatedProducts})
  };

  updateProdStartIdx = (value) => {
    this.setState({ prodStartIdx: value });
  };
  
  updateStoreStartIdx = (value) => {
    this.setState({ storeStartIdx: value });
  };
  
  updateSearch = (event) => {
    const searchTerm = event.target ? event.target.value : '';
    this.setState({ search: searchTerm });
  };

  searchProducts = async(event) => {
    this.setLoading('loadingProd', true)
    const searchTerm = event.target ? event.target.value : event;
    const { data } = await ApiUtil.get(apiURL + '/search/products?searchterm=' + searchTerm);
    const prodData = data && Array.isArray(data.products) ? data.products : [];
    const moreData = data && data.hasMoreData === 1 ? 1 : 0;
    this.setProducts(prodData, moreData);
    this.setLoading('loadingProd', false)
  }

  searchProductsById = async(comp_id) => {
    // const prodData = testProdData;
    // const { data } = await ApiUtil.get(apiURL + `/products/${comp_id}`, true, null, null, 0, 0, disableDefaults);
    const { data } = await ApiUtil.get(apiURL + `/products/${comp_id}`, true, null, null, 0, 0);
    const prodData = data && Array.isArray(data.products) ? data.products : [];
    this.setProducts(prodData);
  }

  searchCategories = async(event) => {
    const searchTerm = event.target ? event.target.value : event;
    const { data } = await ApiUtil.get(apiURL + '/search/categories?searchterm=' + searchTerm);
    const categoryData = data && Array.isArray(data.categories) ? data.categories : [];
    this.setCategories(categoryData);
  }

  searchStores = async(event) => {
    this.setLoading('loadingStore', true)
    const searchTerm = event && event.target ? event.target.value : event;
    const { data } = await ApiUtil.get(apiURL + '/search/companies?searchterm=' + searchTerm);
    const storeData = data && Array.isArray(data.stores) ? data.stores : [];
    const moreData = data && data.hasMoreData === 1 ? 1 : 0;
    this.setStores(storeData, moreData);
    this.setLoading('loadingStore', false)
  }

  searchProductsCategoriesStores = async(event) => {
    this.searchProducts(event);
    this.searchStores(event);
  }

  searchLocation = async(event) => {
    // console.error("location event...", event)
    return;
  }

  removeItem = async(vid, token) => {
    if (Array.isArray(vid)) return console.error('incorrect format');
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter((item) => item.vid !== vid);
    
    try {
      const data = {vid: vid, quantity: 1}
      ApiUtil.delete(apiURL + '/cart/user', token, data)
      // vid = parseInt(vid, 10)
      // ApiUtil.delete(apiURL + `/cart/user/${vid}`, token)
      this.resetMerchantIdForCheckout(tempCart)
    } catch(err) {
      console.error(err)
    }

    this.setState(
      () => {
        return {cart: [...tempCart]};
      },
      () => {
        this.addTotals();
      }
    );
  };

  deleteProduct = async(pid, cid, token) => {
    await ApiUtil.delete(apiURL + `/shopify-business/products/${pid}/${cid}`, token);
    const tempProds = this.state.products.filter(prod => prod.id !== pid);
    this.setState({products: [...tempProds]});
  }

  deleteVariant = async(vid, pid, cid, token) => {
    vid = parseInt(vid, 10)
    const tempProds = [...this.state.products];
    const idx = tempProds.findIndex(prod => prod.id === pid);
    const prod = tempProds[idx];
    if (prod && prod.vid) {
      prod.vids = prod.vids.filter(v => v !== vid)
    }

    const res = await ApiUtil.delete(apiURL + `/shopify-business/variant/${vid}/${cid}`, token)
    this.setState({products: [...tempProds]});
    return res
  };

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempFees = subTotal * ApplicationFee * 0.01;
    const fees = parseFloat(tempFees.toFixed(2));
    const total = subTotal + fees;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartFees: fees,
        cartTotal: total,
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          setProducts: this.setProducts,
          setDetailProduct: this.setDetailProduct,
          setStores: this.setStores,
          setDetailStore: this.setDetailStore,
          setCategories: this.setCategories,
          setCart: this.setCart,
          setOnboardStep: this.setOnboardStep,
          setOrderFromCart: this.setOrderFromCart,
          setMerchantIdForCheckout: this.setMerchantIdForCheckout,
          fetchMoreProdData: this.fetchMoreProdData,
          handleProductDetails: this.handleProductDetails,
          handleStoreDetails: this.handleStoreDetails,
          closeModal: this.closeModal,
          openCart: this.openCart,
          addToCart: this.addToCart,
          increment: this.increment,
          decrement: this.decrement,
          deleteProduct: this.deleteProduct,
          deleteVariant: this.deleteVariant,
          removeItem: this.removeItem,
          openProductModal: this.openProductModal,
          openStoreModal: this.openStoreModal,
          searchProducts: this.searchProducts,
          searchCategories: this.searchCategories,
          searchStores: this.searchStores,
          searchProductsById: this.searchProductsById,
          searchProductsCategoriesStores: this.searchProductsCategoriesStores,
          searchLocation: this.searchLocation,
          updateCartItemCount: this.updateCartItemCount,
          updateLocation: this.updateLocation,
          updateOnboardStep: this.updateOnboardStep,
          updateProducts: this.updateProducts,
          updateProdStartIdx: this.updateProdStartIdx,
          updateSearch: this.updateSearch,
          updateStoreStartIdx: this.updateStoreStartIdx,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductContext, ProductProvider, ProductConsumer };
