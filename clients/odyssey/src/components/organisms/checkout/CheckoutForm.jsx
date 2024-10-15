import React, { useState, useEffect } from 'react';
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';

import { H6 } from '../../../library/atoms'
import { BtnPrimaryMd } from '../../../library/atoms/buttons'
import { states, apiURL } from '../../../common/constants'
import { PascalCase } from '../../../common/helperFunctions'
import { get } from 'lodash';
import './CheckoutForm.css';

const cardElementStyle = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#ef6c0080',
      color: '#1c130c',
      fontWeight: 500,
      fontFamily: 'Lato, Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#ef6c0080',
      },
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#87bbfd',
    },
  },
};

const CardField = ({onChange}) => (
  <div className="CardFormRow">
    <CardElement options={cardElementStyle} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  additionalClassname = '',
  type,
  pattern,
  placeholder,
  required,
  defaultValue,
  autoComplete,
  minLength,
  maxLength,
  value,
  onKeyPress,
  onChange,
}) => (
  <div className={`FormRow ${additionalClassname}`}>
    <label htmlFor={id} className={`FormRowLabel ${additionalClassname}`}>
      {label}
    </label>
    <input
      className={`FormRowInput ${additionalClassname}`}
      id={id}
      type={type}
      pattern={pattern}
      placeholder={placeholder}
      required={required}
      defaultValue={defaultValue}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      value={value}
      onKeyDown={onKeyPress}
      onChange={onChange}
    />
  </div>
);

const StateField = ({
  label,
  id,
  additionalClassname = '',
  type,
  placeholder,
  required,
  defaultValue,
  autoComplete,
  minLength,
  maxLength,
  value,
  onChange,
}) => (
  <div className={`FormRow ${additionalClassname}`}>
    <label htmlFor={id} className={`FormRowLabel ${additionalClassname}`}>
      {label}
    </label>
    <select
      className={`FormRowInput ${additionalClassname}`}
      id={id}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
    >
      {states.map(state => {
        return (
          <option value={value} key={state.code} >
            {state.code}
          </option>
        )
      })}
    </select>
  </div>
);

const SubmitButton = ({processing, error, children, disabled }) => (
  <BtnPrimaryMd
    className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
    type="submit"
    disabled={processing || disabled}
    // onClick={onClick}
  >
    {processing ? 'Processing...' : children}
  </BtnPrimaryMd>
);

const ErrorMessage = ({children}) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

// ******** CheckoutForm **********************************************
const CheckoutForm = (props) => {
  const authContext = useAuth0();
  const stripe = useStripe();
  const elements = useElements();
  const { getTokenSilently, getIdTokenClaims } = authContext;
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const { 
    setStep, merchantIdForCheckout,
    billingDetails, setBillingDetails, 
    paymentInfo, setPaymentInfo 
  } = props;

  useEffect(() => {
    createStripeCheckoutSession(); 
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      setDisabled(true);
    }
    return () => reset();
  // eslint-disable-next-line
  }, [])
  
  const handleZipInput = (e) => {
    const re =  /\d/i;
    if (!re.test(e.key) && e.keyCode !== 8 && e.keyCode !== 9) {
      e.preventDefault();
    }
  }
    
  const createStripeCheckoutSession = async() => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if(claim){
      const res = await ApiUtil.post(apiURL + '/stripe/payment-intent', { company_id: merchantIdForCheckout }, token)
      setData(res);
      if (res && res.data && res.data.client_secret) return setClientSecret(res.data.client_secret)
    }
  }

  // TODO getPaymentMethod in progress
  const getPaymentMethod = async(pmid) => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if(claim){
      const res = await ApiUtil.get(apiURL + '/stripe/payment-methods', false, pmid, token)
//  console.log('payment method return...', res)
    }
  }

  const reset = () => {
    setError(null);
    setProcessing(false);
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    
    if (error) {
      elements.getElement('card').focus();
      return;
    }
    
    if (cardComplete) { 
      setProcessing(true);
    }
    
    const cardElement = elements.getElement(CardElement);
    // const payload = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    //   billing_details: billingDetails,
    // })

    // for reference: billingDetails = {
    //   name: '',
    //   email: '',
    //   phone: '',
    //   address: { 
    //     line1: '',
    //     line2: '',
    //     city: '',
    //     state: '',
    //     postal_code: '',
    // }
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: billingDetails,
      }
    })
    
    if (payload.error) {
      console.error("payload...", payload)
      setError(payload.error);
      setProcessing(false);
    } else {
      console.log("Success payload...", payload)
      const pmid = get(payload, 'paymentIntent.payment_method','');
      setPaymentInfo({...paymentInfo, id: pmid});
      // getPaymentMethod(pmid); // TODO in progress
      setProcessing(false);
      setStep(4);
    }

  };

  // return paymentMethod ? (
  //   <>
  //   <div className="Result">
  //     <div className="ResultTitle" role="alert">
  //       Payment successful
  //     </div>
  //     <div className="ResultMessage">
  //       <p>Thank you for shopping with us.</p>
  //       <p>Confirmation Number: {paymentMethod.id}</p>
  //     </div>
  //     <ResetButton onClick={reset} />
  //   </div>
  //   </>
  // ) : (
  return (
    <form className="Form" onSubmit={handleSubmit}>
      <H6 className="HeadingText" >Billing information</H6>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="First Last Name"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({...billingDetails, name: PascalCase(e.target.value)});
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({...billingDetails, email: e.target.value});
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          pattern="^[(]?[0-9]{3}[)]?[-\.\s]?[0-9]{3}[-\.\s]?[0-9]{4}$"
          placeholder="415-555-1234"
          maxLength="10"
          maxLength="14"
          // required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({...billingDetails, phone: e.target.value});
          }}
        />
        <Field
          label="Address"
          id="address"
          type="text"
          placeholder="235 Odyssey Ave Suite 3500"
          required
          autoComplete="text"
          value={billingDetails.address.line1}
          onChange={(e) => {
            setBillingDetails({...billingDetails, 
              address: {...billingDetails.address, line1: PascalCase(e.target.value)}
            });
          }}
        />
        <Field
          label="City"
          id="city"
          type="text"
          placeholder="San Francisco"
          required
          autoComplete="text"
          value={billingDetails.address.city}
          onChange={(e) => {
            setBillingDetails({...billingDetails, 
              address: {...billingDetails.address, city: PascalCase(e.target.value)}
            });
          }}
        />
        <div className="stateZip">
          <StateField
            label="State"
            id="state"
            additionalClassname="state"
            // type="text"
            placeholder="CA"
            required
            autoComplete="text"
            minLength="2"
            maxLength="2"
            value={billingDetails.address.state}
            onChange={(e) => {
              setBillingDetails({...billingDetails, 
                address: {...billingDetails.address, state: e.target.value}
              });
            }}
          />
          <Field
            label="Zip"
            id="zipCode"
            additionalClassname="zipCode"
            type="text"
            placeholder="94111"
            required
            autoComplete="text"
            maxLength="5"
            value={billingDetails.address.zip}
            onKeyPress={(e) => handleZipInput(e)}
            onChange={(e) => {
              setBillingDetails({...billingDetails, 
                address: {...billingDetails.address, postal_code: e.target.value}
              });
            }}
          />
        </div>
        
      </fieldset>
      <H6 className="HeadingText" >Payment information</H6>
      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={disabled} >
        Pay
      </SubmitButton>
    </form>
  );
};

export default CheckoutForm;