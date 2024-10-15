import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth0 } from '../../../react-auth0-spa';
import { H5 } from '../../../library/atoms/H5';
import { PG } from '../../../library/atoms/PG';
import {
  PaperCenterer,
  DialogAlignment,
  IconStyling,
} from './LoginPage.styled';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ApiUtil } from '../../../util/ApiUtil';
import FirstLoginButton from '../../atoms/navigation/FirstLoginButton';
import { apiURL } from '../../../common/constants';
import Grid from '@material-ui/core/Grid';

/**
 * Page that is redirected to on auth0 login, on login it fires
 * the endpoint which creates a user with the information contained in
 */
const LoginPage = () => {
  const authContext = useAuth0();
  const history = useHistory();
  const { getIdTokenClaims, getTokenSilently, user } = authContext;
  useEffect(() => {
    if (user && user['https://odysseycommerce.com/isBusiness'] !== undefined) {
      if (!user['https://odysseycommerce.com/isBusiness']) {
        history.push('/');
      } else {
        history.push('businesscenter/orders');
      }
    }
  });

  const callPostUser = async (isBusiness) => {
    if (!isBusiness) {
      history.push('/');
    } else {
      history.push('onboardingprocess');
    }
    const userData = { ...user, isBusiness };
    const token = await getTokenSilently();
    getIdTokenClaims()
      .then(ApiUtil.post(apiURL + '/user', userData, token))
      .catch((err) => console.error(err));
  };

  return (
    <>
      {user &&
      user['https://odysseycommerce.com/isBusiness'] !== undefined &&
      false ? (
        <div className='size-auto'>
          If you were not automatically redirected to the main page, please
          click on Home.
        </div>
      ) : (
        <PaperCenterer>
          <div>
            <PG className='p-t1 font-bold'>
              Hi{user && ' '}
              {user && user.given_name}!
            </PG>
            <PG className='font-bold'>Welcome to OdysseyCommerce!</PG>
            <H5 className='font-light p-y1'>
              We are on a mission to support local business!
            </H5>
            <PG>Do you have a business to onboard?</PG>
            <DialogAlignment>
              <Grid container spacing={2} className={'flx-row'}>
                <Grid item xs={12} lg={6} className={'flx-col'}>
                  <FirstLoginButton
                    icon={<StoreIcon style={IconStyling} />}
                    header={'Yes, I have a business to onboard.'}
                    onClick={() => callPostUser(true)}
                  />
                </Grid>
                <Grid item xs={12} lg={6} className={'flx-col'}>
                  <FirstLoginButton
                    icon={<ShoppingCartIcon style={IconStyling} />}
                    header={"No, I'm here to shop."}
                    onClick={() => callPostUser(false)}
                  />
                </Grid>
              </Grid>
            </DialogAlignment>
          </div>
        </PaperCenterer>
      )}
    </>
  );
};

export default LoginPage;
