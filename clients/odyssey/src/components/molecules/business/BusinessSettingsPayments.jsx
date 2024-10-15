import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { ApiUtil } from '../../../util/ApiUtil';
import { ActiveH6 } from './BusinessOrderDetails.styled';
import { BtnPrimaryMd } from '../../../library/atoms/buttons/BtnPrimaryMd';
import Loading from '../../atoms/common/Loading';
import { apiURL } from '../../../common/constants';
import { useAuth0 } from '../../../react-auth0-spa';
import { PG } from '../../../library/atoms/PG'

const BusinessSettingsPayments = () => {
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;

  const [user, setUser] = useState(null);

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error authenticating user')
    }
  }

  const handleGetAcctInfo = async() => {
    try {
      const {token, claim} = await getToken();
      let res = null;
      if (claim) res = await ApiUtil.get(apiURL + '/stripe/acctinfo/user', false, null, token);
      setUser(res.data);
    } catch(err) {
      console.error(err);
    }
  }

  const handleStripeLink = async() => {
    try {
      const {token, claim} = await getToken();
      let res = null;
      if (claim) res = await ApiUtil.post(apiURL + '/stripe/onboardstripeacctlink', null, token);
    } catch(err) {
      console.error('error establishing stripe link')
    }
  }

  const handleCreateConnectedAcct = async() => {
    try {
      const {token, claim} = await getToken();
      const email = {"email": user.email};
      let res = null;
      if (claim) res = await ApiUtil.post(apiURL + '/stripe/user', email, token);
    } catch(err) {
      console.error('error creating stripe account')
    }
  }

  useEffect(() => {
    handleGetAcctInfo();
  }, [])

  return !user ? <Loading/> : (
    <Grid container className="p-t3">
      <ActiveH6>Payments</ActiveH6>
      {user && !user.charges_enabled && !user.payouts_enabled && <ActiveH6>Set up or link your Stripe account so you’ll get paid.</ActiveH6>}
      {user && user.charges_enabled && user.payouts_enabled ? 
        <PG className="font-bold disabled">
          Stripe payment setup complete. If you would like to update your account go to <a href="https://www.stripe.com">stripe.com</a>
        </PG>
        : 
        <BtnPrimaryMd onClick={() => {
          user && !user.tos_acceptance ? handleCreateConnectedAcct() : handleStripeLink()
        }}>
          {user && !user.tos_acceptance ? 'Complete Stripe Account' : 'Update Stripe Account'}
        </BtnPrimaryMd>
      }
    </Grid>
  )
};

export default BusinessSettingsPayments;