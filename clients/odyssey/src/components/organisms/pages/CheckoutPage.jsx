import React, { useState, useContext, useEffect } from 'react';
import { ApiUtil } from '../../../util/ApiUtil';
import { ProductContext } from '../../../context';

import Loading from '../../../components/atoms/common/Loading';
import ProgressHeading from '../../atoms/common/ProgressHeading';
import Pickup from '../checkout/Pickup';
import ReviewOrder from '../checkout/ReviewOrder';
import Payment from '../checkout/Payment';
import { testComp3 } from '../../../test_data/testCompanyData'
import { apiURL } from '../../../common/constants';

import { Divheading, Div } from './CheckoutPage.styled';

const get = require('lodash/get')
const progressSteps = ['Pickup Time', 'Order Review', 'Payment']

const CheckoutPage = () => {
  const context = useContext(ProductContext);
  const { cart, merchantIdForCheckout, setMerchantIdForCheckout } = context;
  const merchantID = merchantIdForCheckout;
  const dt = new Date();
  dt.setHours(dt.getHours() + 2);
  const [loading, setLoading] = useState(true); // default to true
  const [merchant, setMerchant] = useState(null); // default to null
  const [step, setStep] = useState(1); // default to 1 
  const [dateTime, setDateTime] = useState(dt)
  const [paymentInfo, setPaymentInfo] = useState({id: '', last4: '', type: ''})
  const [billingDetails, setBillingDetails] = useState({
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
  });

  let companyIds = Array.isArray(cart) ? cart.map((item) => item.company_id) : [0];
  companyIds = new Set(companyIds);
  companyIds = [...companyIds].sort();

  const getMerchantData = async(id) => {
    const { data } = await ApiUtil.get(apiURL + "/companies", true, id);
    const merchantData = data && Array.isArray(data.stores) ? data.stores : [];
    setMerchant(get(merchantData, '0', {}))
    setLoading(false);
  }

  useEffect(() => {
    if (!merchantID && companyIds[0] !== undefined) {
      setMerchantIdForCheckout(companyIds[0]);
    } else if (merchantID && step !== 4) {
      getMerchantData(merchantID)
    } 
  // eslint-disable-next-line
  }, [cart, merchantID])
  // }, [merchantID])

  /* 
  * "step" tracks the progress of checkout process
  * step 1: Start of the checckout process - Pick up / delivery info page
  * step 2: Review items to be purchase
  * step 3: Gathering payment information/making purchase
  * step 4: Confirmation page after purchase have been processed
  */
  return (
    <>
    <Div>
      <Divheading>
        <ProgressHeading step={step} progressSteps={progressSteps} />
      </Divheading>
      {loading ? (<Loading/>) : (
        <>
        {step === 1 && merchant ?
          (<Pickup
            step={step} setStep={setStep} 
            dateTime={dateTime} setDateTime={setDateTime}
            merchant={merchant} 
          />) : null 
        }
        {step === 2 && merchant ?
          (<ReviewOrder process={'prePmt'}
            step={step}  setStep={setStep} 
            dateTime={dateTime} setDateTime={setDateTime}
            merchant={merchant} 
            billingDetails={billingDetails} 
            setBillingDetails={setBillingDetails}
            paymentInfo={paymentInfo} 
            setPaymentInfo={setPaymentInfo}
          />) : null 
        }
        {step === 3 ?
          (<Payment 
            step={step}  setStep={setStep} 
            billingDetails={billingDetails} 
            setBillingDetails={setBillingDetails}
            paymentInfo={paymentInfo} 
            setPaymentInfo={setPaymentInfo}
          />) : null 
        }
        {step === 4 ?
          (<ReviewOrder process={'postPmt'}
            step={step}  setStep={setStep} 
            dateTime={dateTime} setDateTime={setDateTime}
            merchant={merchant} 
            billingDetails={billingDetails} 
            setBillingDetails={setBillingDetails}
            paymentInfo={paymentInfo} 
            setPaymentInfo={setPaymentInfo}
          />) : null 
        }
        </>
      )}
    </Div>
    </>
  );
};

export default CheckoutPage;
