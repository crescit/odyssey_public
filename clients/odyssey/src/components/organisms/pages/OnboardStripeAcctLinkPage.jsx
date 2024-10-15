import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../../../react-auth0-spa';
import { ApiUtil } from '../../../util/ApiUtil';
import Loading from '../../../components/atoms/common/Loading';
import { Box, Button } from '@material-ui/core';
import { H2 } from '../../../library/atoms/H2';
import { H3 } from '../../../library/atoms/H3';
import { useStyles } from './OnboardStripeAcctLinkPage.styled';
import { apiURL } from '../../../common/constants';

const OnboardStripeAcctLinkPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently, user } = authContext;
  const [stripeAcctInfo, setStripeAcctInfo] = useState("waiting");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAcctInfo() {
      const res = await handleGetAcctInfo();
      setStripeAcctInfo(res); // TODO potential infinite loop
      setLoading(false);
    }
    if (!stripeAcctInfo || stripeAcctInfo === "waiting") {
      getAcctInfo();
    } else {
      setLoading(false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      await getIdTokenClaims();
      return token;
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const handleGetAcctInfo = async() => {
    try {
      const token = await getToken();
      const res = await ApiUtil.get(apiURL + '/stripe/acctinfo/user', false, null, token);
      return res.data;
    } catch(err) {
      console.error(err);
    }
  }

  const handleOnboard = async() => {
    try {
      const token = await getToken();
      const res = await ApiUtil.post(apiURL + '/stripe/onboardstripeacctlink', null, token);
      window.location.assign(res.data.acctlink.url);
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const handleCreateConnectedAcct = async() => {
    try {
      const token = await getToken();
      const email = {"email": user.email};
      const res = await ApiUtil.post(apiURL + '/stripe/user', email, token);
      window.location.assign(res.data.acctlink.url);
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const handleCancel = () => {
    history.push('/profile');
  }

  const simpleErrHandle = (err) => {
    // TODO build a better error message modal
    alert('Something went wrong. Please try again later and make sure you are login.');
    console.error(err);
  }

  return loading? (
    <Loading />
    ) : (
      <Box className={classes.box}>
        <H2>Link Stripe Account</H2>
        { stripeAcctInfo === undefined ?
          (
            <Button className={classes.button} 
            onClick={handleCreateConnectedAcct}
            >Connect or Create Stripe Account
            </Button> 
          ) : ( stripeAcctInfo.charges_enabled && stripeAcctInfo.details_submitted ? (
              <H3>Account already linked!</H3>
            ) : (
              <Button className={classes.button} 
              onClick={handleOnboard}
              >Link
              </Button> 
            )
          )
        }
        <Button className={classes.button} 
        onClick={handleCancel}
        >Cancel
        </Button> 
      </Box>
  )
}

export default OnboardStripeAcctLinkPage;