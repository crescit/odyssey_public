import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductConsumer, ProductContext } from '../../../context';
import { PascalCase } from '../../../common/helperFunctions';
import CartList from '../../atoms/cart/CartList';
import PhoneAddress from './PhoneAddress';
import PickupTime from './PickupTime';
import PaymentInfo from './PaymentInfo';
import OrderSummary from './OrderSummary';
import { H4, H5, H6 } from '../../../library/atoms';
import { BtnPrimaryMd, Log } from '../../../library/atoms/buttons';

import {
  ReviewOrderSec, RowFlexSec, 
  ColFlexSec, TopSec,
  InfoBlock,
} from './ReviewOrder.styled'
const get = require('lodash/get');

const ReviewOrder = (props) => {
  const history = useHistory();
  const context = useContext(ProductContext);
  const authContext = useAuth0();
  const { getTokenSilently, getIdTokenClaims, user } = authContext;
  const { 
    step, setStep, merchant, 
    dateTime, setDateTime, process, 
    billingDetails, setBillingDetails,
    paymentInfo, setPaymentInfo
  } = props
  const { 
    cart, removeItem, setOrderFromCart,
    merchantIdForCheckout, setMerchantIdForCheckout,
    order,
  } = context;
  let headerText = 'Review your order', orderNumText, orderConfirmText;
  const inPostPmt = step === 4 || process === 'postPmt' ? true : false;
  if (inPostPmt) {
    const orderNum = get(paymentInfo, 'id', 'TBD');
    const userName = PascalCase(get(user, 'given_name', ''))
    headerText = 'Thank you' + (userName ? ', '+userName : '') + '!';
    orderNumText = `Your order has been placed!`;
    orderConfirmText = `Order confirmation number ${orderNum} and receipt will be sent to ${user.email}`;
  };

  const formattedBilling = {
    name: get(billingDetails, 'name', 'Firstname Lastname'),
    email: get(billingDetails, 'email', 'some@email.com'),
    phone: get(billingDetails, 'phone', '415-555-1234'),
    address: get(billingDetails, 'address.line1', '234 1st Ave'),
    address2: get(billingDetails, 'address.line2', 'Suite 200'),
    city: get(billingDetails, 'address.city', 'San Francisco'),
    state: get(billingDetails, 'address.state', 'CA'),
    zipCode: get(billingDetails, 'address.postal_code', '94111'),
  };

  const removeBoughtItemsFromCart = async(merchantId) => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    setOrderFromCart(merchantId);
    if(claim) {
      for (let item of cart) {
        if (item.company_id === merchantId) {
          await removeItem(item.vid, token)
        }
      }
    }
  };

  const reset = () => {
    setMerchantIdForCheckout(0);
    setOrderFromCart(0);
    setPaymentInfo({id: '', last4: '', type: ''})
    setBillingDetails({
      name: '',
      email: '',
      phone: '',
      address: { 
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
      },
    })
  };

  useEffect(() => {
    window.scrollTo(0,0);
  // !!! need to get card info 
    setPaymentInfo({...paymentInfo, type: '', last4: ''});

    if (step === 4 && merchant) {
      removeBoughtItemsFromCart(merchantIdForCheckout)
      return () => {
        reset();
      }
    }
  // eslint-disable-next-line
  }, [])

  return (
    <ReviewOrderSec>
      <ColFlexSec>
        <H4>{headerText}</H4>
        {inPostPmt && 
        <>
          <H5 className={'m-t4 m-x0 m-b2'} >{orderNumText}</H5>
          <H6>{orderConfirmText}</H6>
        </>
        }
      </ColFlexSec>

      <TopSec>
        <RowFlexSec style={{ justifyContent: 'flex-end' }} >
          <InfoBlock>
            {inPostPmt && 
              <H5 className={'m-t2'}>Pickup Information</H5>
            }
            <PhoneAddress location={merchant} addressText={'Pickup address'}/>
            <PickupTime dateTime={dateTime} setDateTime={setDateTime} step={step} />
          </InfoBlock>
          {inPostPmt &&
          <InfoBlock style={{ margin: '0 auto 0 0'}} >
            <H5 className={'m-t2'}>Payment Information</H5>
            <PaymentInfo paymentInfo={paymentInfo} />
            <PhoneAddress location={formattedBilling} addressText={'Billing address'}/>
          </InfoBlock>
          }

          <OrderSummary 
            merchantId={get(merchant, 'id', 0)} 
            merchantName={get(merchant, 'name', 'Somthing went wrong.  Please try again later.')} 
            step={step} setStep={setStep} 
          />

        </RowFlexSec>
      
        <RowFlexSec className={'m-t3 m-b2'} >
          <ProductConsumer>
            {(value = {}) => {
              return (
                <CartList value={value} step={step} noRadioBtn={true} titleNotLinked={true} />
              );
            }}
          </ProductConsumer>
        </RowFlexSec>  
        
        {step === 4 && 
        <>
          <BtnPrimaryMd
            onClick={() => history.push('/')}
          >
            Continue Shopping
          </BtnPrimaryMd>
        </>
        }

      </TopSec>
      
    </ReviewOrderSec>
  );
};

export default ReviewOrder;
