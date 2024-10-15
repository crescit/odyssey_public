import React, { useContext } from 'react';
import { ProductContext } from '../../../context';
import { Link } from 'react-router-dom'
import get from 'lodash/get';
import { defaultShopImg } from '../../../common/constants';
import { B1, B1ULink } from '../../../library/atoms';
import { RowFlexSec, MerchantImg } from './CartMerchantTitle.styled';

const CartMerchantTitle = ({ item, companyId, titleNotLinked }) => {
  const context = useContext(ProductContext);

  return (
      <RowFlexSec className={'m-t2 m-b2'} >
        <MerchantImg 
          src={get(item, 'merchant_img', defaultShopImg)}
          alt={`${get(item, 'merchant', 'shop')} logo`}
        />
        {titleNotLinked ? (
          <B1 className={'m-y0 m-x1'} >{get(item, 'merchant', '')}</B1>
          ) : (
            <B1ULink 
              className={'m-y0 m-x1'}
              onClick={() => context.openCart(false)}
              >
              <Link to={`/store/${companyId}/${get(item, 'merchant', 'shop')}`} style={{ textDecoration: 'none'}} >
                {get(item, 'merchant', '')}
              </Link>
            </B1ULink>
          )}
      </RowFlexSec>
  );
};

export default CartMerchantTitle;
