import React , { useContext, useState, useEffect, useRef }from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context';
import Loading from '../../../components/atoms/common/Loading';
import ProgressHeading from '../../atoms/common/ProgressHeading';
import OnboardingForm from '../onboarding/OnboardingForm';
import StripeAcctLink from '../onboarding/StripeAcctLink';
import ReviewStoreData from '../onboarding/ReviewStoreProd';
import { progressSteps, stepHeadingText, stepSubheadingText } from '../onboarding/ShopifyOnboardingText'
import {
  Heading,
  Divheading,
  Subheading,
  Div,
} from './ShopifyOnboardingPage.styled';

const ShopifyOnboarding = () => {
  const mountedRef = useRef(true);
  const context = useContext(ProductContext);
  const { getIdTokenClaims, getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [companyID, setCompanyID] = useState();
  const onboardStep = context.onboardStep > 4 ? 5 : context.onboardStep; // 1,2,2.1,2.2,3,4 ; 4 = all completed
  const mainStep = parseInt(onboardStep)
  const subStep = parseInt((onboardStep % 1)*10)

  window.scrollTo(0, 0); 

  useEffect(() => {
    const getOnboardStepFromDb = async() => {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      if (!mountedRef.current) return null
      if (claim) await context.setOnboardStep(token);
      setLoading(false);
    }
    
    getOnboardStepFromDb()

    return () => {
      mountedRef.current = false
    }

  // eslint-disable-next-line
  }, []);

  return (
    <Div>
      <Divheading>
        <ProgressHeading step={mainStep} progressSteps={progressSteps} />
        <Heading>{stepHeadingText[mainStep]}</Heading>
        <Subheading>
          {mainStep === 2 ? stepSubheadingText[mainStep][subStep]
            : stepSubheadingText[mainStep]}
        </Subheading>
      </Divheading>
      {loading || mainStep < 1 ? (<Loading/>) : (
        <>
        {mainStep === 1 ?
          (<OnboardingForm setCompanyID={setCompanyID} companyID={companyID}/>) : null 
        }
        {mainStep === 2 ?
          (<StripeAcctLink onboardStep={onboardStep} />) : null 
        }
        {mainStep === 3 ?
          (<ReviewStoreData setCompanyID={setCompanyID} companyID={companyID} />) : null 
        }
        </>
      )}
    </Div>
  );
};

export default ShopifyOnboarding;
