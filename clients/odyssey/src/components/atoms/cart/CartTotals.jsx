import React from 'react';
import { formatCurrency } from '../../../common/helperFunctions';
import { H6 } from '../../../library/atoms'

const CartTotals = ({ value }) => {
  const { cartSubTotal, cartFees, cartTotal } = value;
  return (
    <div className={'m-x2 m-b2'} style={{marginTop: 'auto'}} >
      <H6 className={'disp-inline'} >Subtotal</H6>
      <H6 className={'disp-inline'} style={{ float: 'right'}} >
        {formatCurrency(cartSubTotal)}
      </H6>
      {/* <p>Fees: {formatCurrency(cartFees)}</p> */}
      {/* <h2>Total: {formatCurrency(cartTotal)}</h2> */}
    </div>
  );
};

export default CartTotals;
