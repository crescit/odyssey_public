import React, { useContext } from 'react';
import { ProductConsumer, ProductContext } from '../../../context'
import { get } from 'lodash';
import CartList from '../../atoms/cart/CartList';
import MoreFromThisShop from '../../atoms/products/MoreFromThisShop';
import Loading from '../../atoms/common/Loading';
import { H4, H7 } from '../../../library/atoms'
import { Divider, List } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { BtnSecondaryMd } from '../../../library/atoms/buttons';

const useStyles = makeStyles({
  root: {
    width: '100%',
    padding: 'var(--spc-1) 0', 
  }
});

const CartPage = () => {
  const classes = useStyles();
  const context = useContext(ProductContext);
  const { openCart, cart, loadingCart, loadingCartItem, merchantIdForCheckout } = context;
  const cartItem = cart && cart.find(item => item.company_id === merchantIdForCheckout);
  const merchantName = get(cartItem, 'merchant', 'shop');
  const onCartPage = true
  const noRadioBtn = false;

  return (
    <ProductConsumer>
      {(value = {}) => {
        // const { cart, loadingCart, loadingCartItem, merchantIdForCheckout } = value;
        // const cartItem = cart && cart.find(item => item.company_id === merchantIdForCheckout);
        
        return (
          <>
            {loadingCart || loadingCartItem ? <div className={'m-t6 p-t6'}><Loading /></div> 
            : 
            (<>
              <H4 style={{ textAlign: 'left'}} >
                Shopping Cart
              </H4>
              {cart && cart[0] ? (
                <>
                <List classes={{root: classes.root}}>
                  <CartList 
                    value={value} 
                    onCartPage={onCartPage}
                    noRadioBtn={noRadioBtn}
                  />
                </List>
                <Divider />
                <MoreFromThisShop 
                  companyId={merchantIdForCheckout} 
                  merchantName={merchantName} 
                  selectedShop={true}
                />
                </>
              ): 
                <H7 className={'m-t6 p-t6'} >
                  Your cart is empty.
                </H7>
              }
            </>)}
          </>
        )
      }}
    </ProductConsumer>
  );
};

export default CartPage;