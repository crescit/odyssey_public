import React from 'react';
import Grid from '@material-ui/core/Grid';
import ProductBrowse from '../../atoms/products/ProductBrowse';
import { ProductConsumer } from '../../../context';

const SingleStoreProducts = ({numItemsToShow = 0 }) => {
  return (
      <Grid container spacing={3}>
        <ProductConsumer>
          {(value = {}) => {
            let filteredProducts = value.products.filter((product) => {
              return (
                product.name
                  .toLowerCase()
                  .indexOf(value.search.toLowerCase().trim()) !== -1
              );
            });
            numItemsToShow = numItemsToShow ? numItemsToShow : filteredProducts.length;
          // eslint-disable-next-line
            return filteredProducts.map((product, idx) => {
              if (idx < numItemsToShow ) {
                return (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={2}
                    key={`${product.name}-${product.store}-${idx}`}
                  >
                    <ProductBrowse product={product} key={product.id} />
                  </Grid>
                );
              }
            });
          }}
        </ProductConsumer>
      </Grid>
  );
}

export default SingleStoreProducts;

