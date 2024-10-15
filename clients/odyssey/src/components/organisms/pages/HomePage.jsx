import React, { useEffect, useContext, useReducer } from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductConsumer, ProductContext } from '../../../context';
import { defaultReturnLimit } from '../../../common/constants';
import ProductBrowse from '../../atoms/products/ProductBrowse';
import StoreBrowse from '../../atoms/stores/StoreBrowse';
import Loading from '../../atoms/common/Loading';
import { B1, B1Link, H4, H5 } from '../../../library/atoms';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const HomePage = () => {
  const context = useContext(ProductContext);
  const { user } = useAuth0();
  const {
    search,
    updateSearch,
    loadingProd,
    loadingStore,
    products,
    setProducts,
    stores,
    setStores,
    prodStartIdx,
    updateProdStartIdx,
    storeStartIdx,
    updateStoreStartIdx,
    hasMoreData,
    fetchMoreProdData,
    fetchMoreStoreData,
  } = context;
  const numOfProducts = products.length;
  const numOfStores = stores.length;

  const calcLimit = (startIdx) => {
    return (
      parseInt(
        Math.ceil((startIdx + 12) / defaultReturnLimit) * defaultReturnLimit
      ) || defaultReturnLimit
    );
  };

  const awaitSetFunc = async (func, search, limit) => {
    await func(search, null, limit);
  };

  useEffect(() => {
    updateSearch('');
    // if (search === '') {
    if (!loadingProd) {
      const limit = calcLimit(prodStartIdx);
      awaitSetFunc(setProducts, 'getall', limit);
    }
    if (!loadingStore) {
      const limit = calcLimit(storeStartIdx);
      awaitSetFunc(setStores, 'getall', limit);
    }
    // }
    // eslint-disable-next-line
  }, []);

  const handleNextPrevView = async (section, direction) => {
    if (direction !== 1 && direction !== -1) {
      console.error('direction must be 1 or -1');
      return;
    }

    if (section === 'prod') {
      const newIndex = prodStartIdx + 12 * direction;
      if (newIndex + hasMoreData.forProd > numOfProducts) {
        await fetchMoreProdData(search, numOfProducts);
        return updateProdStartIdx(newIndex);
      }
      if (newIndex >= 0 && newIndex < numOfProducts) {
        return updateProdStartIdx(newIndex);
      }
    }
    if (section === 'store') {
      const newIndex = storeStartIdx + 12 * direction;
      if (newIndex + hasMoreData.forStore > numOfStores) {
        await fetchMoreStoreData(search, numOfStores);
        return updateStoreStartIdx(newIndex);
      }
      if (newIndex >= 0 && newIndex < numOfStores) {
        return updateStoreStartIdx(newIndex);
      }
    }
    return;
  };

  return (
    <>
      <H4 style={{ textAlign: 'left' }}>{`Welcome${
        user && user.given_name ? ', ' + user.given_name : ''
      }!`}</H4>
      <div
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 16,
        }}
      >
        <H5 style={{ textAlign: 'left', marginTop: 12, marginBottom: 8 }}>
          Products
        </H5>
        <div>
          {prodStartIdx !== 0 ? (
            <B1Link
              style={{ display: 'inline' }}
              onClick={() => handleNextPrevView('prod', -1)}
            >
              <span className={'material-icons'}>west</span> Previous
            </B1Link>
          ) : null}
          {prodStartIdx + 12 < numOfProducts + hasMoreData.forProd ? (
            <B1Link
              style={{ display: 'inline', marginLeft: 16 }}
              onClick={() => handleNextPrevView('prod', 1)}
            >
              View more <span className={'material-icons'}>east</span>
            </B1Link>
          ) : null}
        </div>
      </div>
      <Grid container spacing={2}>
        <ProductConsumer>
          {(value = {}) => {
            if (loadingProd) {
              return <Loading />;
            } else if (value && value.products && !value.products.length) {
              return (
                <B1 style={{ marginLeft: 8, marginTop: 24, marginBottom: 24 }}>
                  No products were found
                </B1>
              );
            } else if (value && value.products) {
              /* // !!! Following filter is mainly for using test data */
              // let filteredProducts = value.products.filter((product) => {
              //   if (product === null) return []
              //   return (
              //     product.name
              //       .toLowerCase()
              //       // .indexOf(value.search.toLowerCase()) !== -1
              //   );
              // });
              return value.products
                .slice(prodStartIdx, prodStartIdx + 12)
                .map((product, idx) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      md={4}
                      lg={2}
                      key={`${product.name}-${product.store}-${idx}`}
                      style={{ marginBottom: 20 }}
                    >
                      <ProductBrowse product={product} key={product.id} />
                    </Grid>
                  );
                });
            }
          }}
        </ProductConsumer>
      </Grid>
      <div
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 16,
        }}
      >
        <H5 style={{ textAlign: 'left', marginTop: 20, marginBottom: 8 }}>
          Stores
        </H5>
        <div>
          {prodStartIdx + 12 < numOfProducts + hasMoreData.forProd ? (
            <Link to='stores' style={{ textDecoration: 'none' }}>
              <B1Link style={{ display: 'inline', marginLeft: 16 }}>
                View more <span className={'material-icons'}>east</span>
              </B1Link>
            </Link>
          ) : null}
        </div>
      </div>
      <Grid container spacing={2}>
        <ProductConsumer>
          {(value = {}) => {
            if (loadingStore) {
              return <Loading />;
            } else if (value && value.stores && !value.stores.length) {
              return (
                <B1 style={{ marginLeft: 8, marginTop: 24, marginBottom: 24 }}>
                  No stores were found
                </B1>
              );
            } else if (value && value.stores) {
              // let filteredStores = value.stores.filter((store) => {
              //   return (
              //     store.name
              //       .toLowerCase()
              //       // .indexOf(value.search.toLowerCase()) !== -1
              //   );
              // });
              return value.stores.slice(0, 8).map((store, idx) => {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={3}
                    key={`${store.name}-${store.idx}`}
                  >
                    <StoreBrowse store={store} key={store.id} />
                  </Grid>
                );
              });
            }
          }}
        </ProductConsumer>
      </Grid>
    </>
  );
};

export default HomePage;
