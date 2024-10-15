import React from 'react';
import OrderDetails from '../../atoms/products/OrderDetails';

const OrdersPage = () => (
  <>
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
      <h1>Orders</h1>
      <OrderDetails />
    </div>
  </>
);

export default OrdersPage;
