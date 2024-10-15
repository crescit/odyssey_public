import React, { useState, useContext, useEffect } from 'react';
import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context.js'
import CheckoutForm from '../../organisms/checkout/CheckoutForm';
import Loading from '../../../components/atoms/common/Loading';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { StripePublishableKey } from '../../../common/constants';

import { H4 } from '../../../library/atoms';
import { apiURL } from '../../../common/constants';

const Payment = ({ step, setStep, billingDetails, setBillingDetails, paymentInfo, setPaymentInfo }) => {
  const context = useContext(ProductContext);
  const merchantIdForCheckout = context.merchantIdForCheckout;
  // const [loading, setLoading] = useState(true);
  const [stripePromise, setStripePromise] = useState(null);
  const authContext = useAuth0();
  const { getTokenSilently, getIdTokenClaims } = authContext;
  
  useEffect(() => {
    window.scrollTo(0,0);
    initiateStripe(StripePublishableKey);
  // eslint-disable-next-line
  }, [])
  
  const initiateStripe = async(key) => {
    const data = await getMerchantStripeAcct();
    const ConnectedStripeAcct = data ? data : '';
    const stripe = await loadStripe(key, {
      stripeAccount: ConnectedStripeAcct
    });
    setStripePromise(stripe);
    // setLoading(false);
  }

  const getMerchantStripeAcct = async() => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if(claim){
      const res =  await ApiUtil.get(apiURL + '/stripe/acctinfo/company', false, merchantIdForCheckout, token);
      const { data } = res;
      return data;
    }
    return null
  }

  return (
    <>
    { stripePromise === null ? <Loading/> :
    <div style={{ width: '100%', maxWidth: 732, margin: '0 auto', textAlign: 'left' }} >
        <H4 >Payment</H4>
        <Elements stripe={stripePromise} style={{ margin: '0 auto' }} >
          <CheckoutForm 
            step={step}  setStep={setStep} 
            merchantIdForCheckout={merchantIdForCheckout}
            billingDetails={billingDetails} 
            setBillingDetails={setBillingDetails}
            paymentInfo={paymentInfo} setPaymentInfo={setPaymentInfo}
          />
        </Elements>
    </div>
    }
    </>
  );
};

export default Payment;
