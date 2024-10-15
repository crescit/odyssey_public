
import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import Loading from '../../../components/atoms/common/Loading';
import { BtnPrimaryMd, BtnSecondaryMd } from '../../../library/atoms/buttons';
import { StripeSection, Section, BtnWrap } from './StripeAcctLink.styled';
import { apiURL } from '../../../common/constants';

const StripAcctLink = ({ onboardStep }) => {
  const history = useHistory();
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently, user } = authContext;
  const [hasStripeAcctInfo, setHasStripeAcctInfo] = useState(null);
  const [stripeSetupCompleted, setStripeSetupCompleted] = useState(false);
  const [completeLater, setCompleteLater] = useState(false);
  const [loading, setLoading] = useState(true);
  const context = useContext(ProductContext);
  const updateOnboardStep = context.updateOnboardStep;

  useEffect(() => {
    async function getAcctInfo() {
      const res = await handleGetAcctInfo();
      setHasStripeAcctInfo(res);
      const setupCompleted = res && res.charges_enabled && res.details_submitted;

      setStripeSetupCompleted(setupCompleted);
      if (setupCompleted && onboardStep >= 2) {
        updateAndPatchUserOnboardStep(2.2);
      }; 

      if (!setupCompleted && res && onboardStep >= 2) {
        updateAndPatchUserOnboardStep(2.1);
      };

      if (!setupCompleted && !res) {
        updateAndPatchUserOnboardStep(2);
      };
      setLoading(false);
    }

    if (!hasStripeAcctInfo) {
      getAcctInfo();
    } else {
      setLoading(false);
    };

    if (onboardStep < 2.2) {
      setCompleteLater(false)
    } else {
      setCompleteLater(true)
    }
  }, [hasStripeAcctInfo]); // eslint-disable-line react-hooks/exhaustive-deps 

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const handleGetAcctInfo = async() => {
    try {
      const {token, claim} = await getToken();
      let res = null;
      if (claim) res = await ApiUtil.get(apiURL + '/stripe/acctinfo/user', false, null, token);
      return res.data || null;
    } catch(err) {
      console.error(err);
    }
  }

  const handleStripeLink = async() => {
    try {
      const {token, claim} = await getToken();
      let res = null;
      if (claim) res = await ApiUtil.post(apiURL + '/stripe/onboardstripeacctlink', null, token);
      window.location.assign(res.data.acctlink.url || '/businesscenter');
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const handleCreateConnectedAcct = async() => {
    try {
      const {token, claim} = await getToken();
      const email = {"email": user.email};
      let res = null;
      if (claim) res = await ApiUtil.post(apiURL + '/stripe/user', email, token);
      window.location.assign(res.data.acctlink.url || '/businesscenter');
    } catch(err) {
      simpleErrHandle(err);
    }
  }

  const updateAndPatchUserOnboardStep = async(stepNum) => {
    const {token, claim} = await getToken();
    const data = { onboard_step: stepNum };
    if (claim) {
      ApiUtil.patch(apiURL + '/user', data, token)
      .then(updateOnboardStep(stepNum))
      .catch((err) => console.error(err));
    }
  }

  const handleCancel = () => {
    history.goBack();
  }

  const handleLinkLater = () => {
    setCompleteLater(true);
  }

  const handleSaveContinue = () => {
    updateAndPatchUserOnboardStep(3);
  }

  const simpleErrHandle = (err) => {
    // TODO build a better error message modal
    alert('Something went wrong. Please try again later and make sure you are login.');
    console.erroor(err);
  }

  return (
    <>
      <StripeSection >
        <Section style={{ justifyContent: 'center' }}>
          {loading? (
          <Loading />
          ) : (
            <>
              { onboardStep === 2 ?
                (
                  <BtnPrimaryMd  
                    onClick={handleCreateConnectedAcct}
                  >Onboard Stripe account
                  </BtnPrimaryMd> 
                ) : ( onboardStep === 2.1 ? (
                    <BtnWrap>
                      <BtnPrimaryMd 
                        style={{ width: 60}}
                        disabled={completeLater} 
                        onClick={handleStripeLink} 
                      >Yes
                      </BtnPrimaryMd> 
                      <BtnSecondaryMd 
                        style={{ width: 60}}
                        disabled={completeLater} 
                        onClick={handleLinkLater}
                      >No
                      </BtnSecondaryMd> 
                    </BtnWrap>
                  ) : null
                )
              }
            </>
          )}
        </Section>
        <Section style={{ justifyContent: 'space-between', marginTop: 32 }}>
          <BtnSecondaryMd onClick={handleCancel}>
            Cancel
          </BtnSecondaryMd>
          <BtnPrimaryMd disabled={!completeLater && !stripeSetupCompleted } onClick={handleSaveContinue}> 
            Save and continue
          </BtnPrimaryMd>
        </Section>
      </StripeSection>
    </>
  );
};

export default StripAcctLink;
