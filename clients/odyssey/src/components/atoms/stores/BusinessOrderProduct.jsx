import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { formatCurrency } from '../../../common/helperFunctions';
import { PG } from '../../../library/atoms/PG';

const Img = styled.img`
  width: 108px;
  height: 108px;
`;
const BusinessOrderProduct = ({ product = {} }) => (
  <div className="p-r2" >
    <Grid container className="p-y3" style={{ borderBottom: '1px solid var(--border)'}}>
      <Grid item md={8} lg={8}>
        <Grid container>

          <Grid item md={5} lg={5}>
            {product && <Img src={product.img}/>}
          </Grid>

          <Grid item md={7} lg={7}>
            <PG>{product && product.name}</PG>
            {/* TODO get all product information including SKU*/}
          </Grid>

        </Grid>
      </Grid>

      <Grid item md={2} lg={2}>
        <PG className="font-bold">Qty: {product && product.count}</PG>
      </Grid>

      <Grid item md={2} lg={2}>
        <PG className="font-bold">Qty: {product && product.total && formatCurrency(product.total)}</PG>
      </Grid>
    </Grid>
  </div>
);

export default BusinessOrderProduct;