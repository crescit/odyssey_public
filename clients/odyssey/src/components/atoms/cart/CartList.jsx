import React, { useEffect, useContext, useState, Fragment } from 'react';
import { ProductContext } from '../../../context';
import { get } from 'lodash';
import CartMerchantTitle from './CartMerchantTitle';
import CartItem from './CartItem';
import OrderSummary from '../../organisms/checkout/OrderSummary';

import Divider from "@material-ui/core/Divider";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme, useStyles, ItemWrapper, Wrapper, SummWrapper } from './CartList.styled';
import { css } from 'styled-components';

const onCartPgStyle = css`
  width: 60%;

  @media (max-width: 1010px) {
    width: 50%;
  }
  @media (max-width: 930px) {
    width: 100%;
    max-width: none;
  }
`;
const lastOne = css`
  height: auto;
  margin-bottom: var(--spc-3);
`;

/** 
* @property {object} value REQUIRED
* @property {number} step OPTIONAL, default = 0; onboarding step
* @property {boolean} inDrawer OPTIONAL; component will be used in the cart drawer
* @property {boolean} onCartPage OPTIONAL; component will be used on the cart page
* @property {boolean} noRadioBtn OPTIONAL: no radio buttons will be shown next to the merchant
* @property {boolean} titleNotLinked OPTIONAL; listed merchants will not be linked to store page. Mainly use during the checkout process.
*/
const CartList = ({ value, ...props }) => {
  const { cart, order } = value;
  const { 
    step = 0,
    inDrawer,
    onCartPage,
    titleNotLinked,
    orderConfirm,
  } = props;
  let {noRadioBtn} = props;
  const context = useContext(ProductContext);
  const [loading, setLoading] = useState(false)
  const { merchantIdForCheckout, setMerchantIdForCheckout } = context;
  const classes = useStyles();

  let items = Array.isArray(cart) ? cart : [];
  let companyIds = [0];

  const itemsFromOrder = () => {
    if (Array.isArray(order) && order.length >= 1 && order[0].company_id) {
      companyIds = [order[0].company_id];
      items = order;
    }
  }

  if (step === 2) {
    companyIds = merchantIdForCheckout ? [merchantIdForCheckout] : [0];
  } 
  else if (step === 4) {
    itemsFromOrder();
  }
  else {
    let onlyIds = items.map((item) => item.company_id);
    onlyIds = new Set(onlyIds);
    companyIds = [...onlyIds].sort();
    if (inDrawer) noRadioBtn = companyIds.length === 1
  }

  const handleChange = (event) => {
    const id = get(event, 'target.value', 0);
    setMerchantIdForCheckout(id);
  };

  useEffect(() => {
    if (!merchantIdForCheckout && companyIds[0]) {
      setMerchantIdForCheckout(companyIds[0]);
    }
  // eslint-disable-next-line
  },[cart])

  return (
    <ThemeProvider theme={theme} >
      <FormControl style={{ width: '100%' }}>
        <RadioGroup 
          aria-label="merchant" name="merchant" 
          value={merchantIdForCheckout} 
          onChange={handleChange}>
          {/* eslint-disable-next-line */}
          {companyIds.map((companyId, idx) => {
          // {!loading && companyIds.map((companyId, idx) => {
            const item = items.find(item => item.company_id === companyId)
            const merchantId = item && item.company_id ? item.company_id : 0 ;
            const merchantName = item && item.merchant ? item.merchant : 'Somthing went wrong.  Please try again later.';

            return (
              <Fragment key={idx + '-' + companyId} >
                {idx && !inDrawer ? 
                  <Divider 
                    classes={onCartPage ? {root: classes.divider} : null} 
                    // style={onCartPage ? {width: '60%'} : null}
                  /> 
                  : null
                }
                {noRadioBtn?  
                  <CartMerchantTitle 
                    item={item} 
                    companyId={companyId}
                    titleNotLinked={titleNotLinked}
                  /> 
                  : 
                  <FormControlLabel 
                    value={companyId} 
                    control={<Radio />} 
                    classes={{root: classes.frmCntrlLabel}}
                    label={
                      <CartMerchantTitle 
                        item={item} 
                        companyId={companyId}
                        titleNotLinked={titleNotLinked}
                      />
                    }
                  />
                }
                <Wrapper >
                  <ItemWrapper addCSS={onCartPage ? onCartPgStyle : ''} >
                  {items && items.map((item, i) => {
                    if (item.company_id === companyId) {
                      return  <CartItem 
                                key={i + '-' + item.id + '-' + item.vid} 
                                item={item} value={value} step={step} 
                                inDrawer={inDrawer} 
                                onCartPage={onCartPage}
                                lastItem={i === items.length - 1 && idx === companyIds.length - 1}
                      />
                    }
                    return null
                  })
                  }
                  </ItemWrapper>

                {onCartPage && merchantId === merchantIdForCheckout? 
                  <SummWrapper addCSS={idx === companyIds.length - 1 ? lastOne : ''}>
                    <OrderSummary 
                      merchantId={merchantId} 
                      merchantName={merchantName}
                      step={0} 
                    />
                  </SummWrapper>
                  : null
                }
                </Wrapper>
              </Fragment>
            )
          })
          }
        </RadioGroup>
      </FormControl>
    </ThemeProvider>
  );
};

export default CartList;
