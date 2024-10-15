import React from 'react';
import { useStyles } from './OrderDetails.styled';
import Grid from '@material-ui/core/Grid';
import { OrderDetailsArray } from '../../atoms/products/OrderDetailsArray';
import { formatCurrency } from '../../../common/helperFunctions';

function OrderDetails() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={1} className={classes.order}>
          <Grid item xs={3}>
            {OrderDetailsArray.map((receipt, idx) => {
              return <h3 key={receipt.orderDate + idx}>Order Date: {receipt.orderDate}</h3>;
            })}
          </Grid>
          <Grid item xs={3}>
            {OrderDetailsArray.map((receipt, idx) => {
              return <h3 key={receipt.orderDate + idx}>Order Number: {receipt.orderNumber}</h3>;
            })}
          </Grid>
          <Grid item xs={3}>
            {OrderDetailsArray.map((receipt, idx) => {
              return <h3 key={receipt.orderDate + idx}>Payment Method: {receipt.paymentMethod}</h3>;
            })}
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.shop}>
          <Grid item xs={12} md={6}>
            {OrderDetailsArray.map((receipt, idx) => {
              return (
                <div key={receipt.shop + idx}>
                  <h2 style={{ marginBottom: 0, fontSize: 25 }}>
                    {receipt.shop}
                  </h2>
                  <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: 17 }}>
                    {receipt.address}
                  </h3>
                  <h3 style={{ marginTop: 0, marginBottom: 50, fontSize: 17 }}>
                    {receipt.city}, {receipt.state} {receipt.zip}
                  </h3>
                </div>
              );
            })}
          </Grid>
          <Grid item xs={6}>
            {OrderDetailsArray.map((receipt, idx) => {
              return (
                <div key={receipt.orderDate + idx}>
                  <h2 style={{ marginBottom: 0, fontSize: 25 }}>
                    Order will be Ready
                  </h2>
                  <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: 17 }}>
                    {receipt.pickupDate}
                  </h3>
                  <h3 style={{ marginTop: 0, marginBottom: 0, fontSize: 17 }}>
                    at {receipt.pickupTime}
                  </h3>
                </div>
              );
            })}
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.product}>
          <Grid item xs={2}>
            {OrderDetailsArray.map((receipt, idx) => {
              return (
                <div key={receipt.orderDate + idx}>
                  <img
                    src={receipt.img}
                    alt='product'
                    className={classes.img}
                  />
                </div>
              );
            })}
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'left', marginLeft: 10 }}>
            {OrderDetailsArray.map((receipt, idx) => {
              return (
                <div key={receipt.orderDate + idx}>
                  <h3 style={{ fontSize: 22, marginBottom: 0, marginTop: 0 }}>
                    {receipt.item}
                  </h3>
                  <p style={{ fontSize: 17, marginTop: 0, marginBottom: 0 }}>
                    Quantity: {receipt.quantity}
                  </p>
                  <p style={{ fontSize: 17, marginTop: 0 }}>
                    Price: {formatCurrency(receipt.price)}
                  </p>
                </div>
              );
            })}
          </Grid>
          <Grid item xs={12} md={6} style={{ textAlign: 'right' }}>
            {OrderDetailsArray.map((receipt, idx) => {
              return (
                <div key={receipt.orderDate + idx}>
                  <h2 style={{ marginTop: 0, marginBottom: 0 }}>
                    Show of Support
                  </h2>
                  <p style={{ marginTop: 0, marginBottom: 0, fontSize: 15 }}>
                    Subtotal: {formatCurrency(receipt.subtotal)}
                  </p>
                  <p style={{ marginTop: 0, marginBottom: 0, fontSize: 15 }}>
                    Fees: {formatCurrency(receipt.fees)}
                  </p>
                  <p style={{ marginTop: 0, fontWeight: 'bold', fontSize: 15 }}>
                    Total: {formatCurrency(receipt.total)}
                  </p>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default OrderDetails;
