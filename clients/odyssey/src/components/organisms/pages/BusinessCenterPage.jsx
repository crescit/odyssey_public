import React from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import BusinessConsole from '../business/BusinessConsole'; 
import ShopifyOnboarding from '../pages/ShopifyOnboardingPage';

const BusinessCenterPage = () => {
  const authContext = useAuth0();
  const { user } = authContext;

  return (
    <>
      { user && user['https://odysseycommerce.com/businessName'] ? <BusinessConsole/> : <ShopifyOnboarding /> }
    </>
  );
}

export default BusinessCenterPage;
