import React from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import { Divider, ListItem, ListItemText } from '@material-ui/core';
import { formatCurrency } from '../../../common/helperFunctions';
import { defaultNoImg } from '../../../common/constants';
import { BT16, S2 } from '../../../library/atoms';
import './CartItem.css'

/* 
* "step" tracks the progress of checkout process
* step 1: Start of the checckout process - Pick up / delivery info page
* step 2: Review items to be purchase
* step 3: Gathering payment information/making purchase
* step 4: Confirmation page after purchase have been processed
*/
const CartItem = ({ item, value, step, inDrawer, onCartPage, lastItem }) => {
  const authContext = useAuth0();
  const { getTokenSilently, getIdTokenClaims } = authContext;
  const { vid, name, variant_title, img, price, count, prod_vids } = item;
  const { updateCartItemCount, removeItem } = value;
  const displayVariant = prod_vids && prod_vids.length > 1 ? variant_title : '';

  const updateItemQty = async(func, newCount = 0) => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if (claim && newCount) func(vid, parseInt(newCount), token);
    if (claim && !newCount) await func(vid, token);
  }

  return (
    <>
      <ListItem 
        key={item.id + '-' + item.vid}
        className={'list-item'}
      >

        <div className={`prod-img ${onCartPage ? 'm-l3' : ''}`} >
          <img src={img ? img : defaultNoImg} alt={`${name} main`} 
            className={'prod-img'} 
          />
        </div>
        <div className={`desc-wrapper`} >
          <ListItemText
            className={`list-item-text ${inDrawer ? 'in-cart-drawer' : ''}`}
            primary={name}
            secondary={displayVariant}
          />
          {step !== 4 &&
            <BT16 className={'item-remove'}
              onClick={() => updateItemQty(removeItem)} 
            >
              Remove
            </BT16>
          }
          <div className={`qty-price-wrapper ${inDrawer ? 'in-cart-drawer' : ''}`} >
            {step !== 4 ?
            <>
              <label htmlFor='item-qty' />
              <input
                name='item-qty' id='item-qty'
                className={'qty'}
                type={'number'}
                // min={1}
                value={count}
                onChange={(e) => updateItemQty(updateCartItemCount, e.target.value)}
                >
              </input>
            </>
            :
            <S2>Qty:{count}</S2>
            }
            
            <S2 className={'price'} >
              {formatCurrency(price)}
            </S2>
          </div>
        </div>
      </ListItem>
      {inDrawer && !lastItem ? <Divider style={{marginTop: 10, marginBottom: 10}} /> : null}
    </>
  );
};

export default CartItem;
