
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context';
import { ApiUtil } from '../../../util/ApiUtil';
import { scraperURL, apiURL } from '../../../common/constants';
import { uploadImg } from '../../../common/helperFunctions';
import Loading from '../../atoms/common/Loading';
import ShopifyBusinessInfo from './ShopifyBusinessInfo';
import ShopifyBusinessAddress from './ShopifyBusinessAddress';
import ShopifyBusinessHours from './ShopifyBusinessHours';
import { BtnPrimaryMd, BtnSecondaryMd } from '../../../library/atoms/buttons'
import { OnboardForm } from './OnboardingForm.styled';
import { DivFormSection, Line } from '../pages/ShopifyOnboardingPage.styled';

const OnboardingForm = ({ company = null, setCompanyID, companyID = 0, isSettingsForm = false }) => {
  const authContext = useAuth0();
  const { getTokenSilently, getIdTokenClaims, user } = authContext;
  const history = useHistory();
  const context = useContext(ProductContext);
  // const updateOnboardStep = context.updateOnboardStep;
  // {"img":"https://images.odysseycommerce.com/Super Body Care /Blank_Facebook_Page_Cover_300x300.webp}

  let initialMeta = {name: '', url: '', email:'', category:'', desc:'', logo: null , numLocations: 0, address: '', address2: '', city: '', state: '', zipCode: '', phone: '', timeZone: '', hours: [{ order: 0, day: '', from: '', to: ''}] };
  if(company){ initialMeta = company; }
  const [meta, setMeta] = useState(initialMeta);
  const [logo, setLogo] = useState();
  const [addrValidError, setAddrValidError] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO NEED TO POST FORM DATA; need to figure out how post data works with scrapper
  const callPostShopifyBusiness = async () => {
    const metadata = meta ? meta : null;
    const name = get(metadata,'name','');
    let output = '';
    // upload logo
    const formData = new FormData();
    formData.append("email", user.email);
    if(logo){
      formData.append("name", name);
      formData.append("image", logo);
    }

    const uploadLogo = async (logo, token, claim) => {
      const headers = { 
        'Content-Type': 'multipart/form-data'
      };
      if(claim){
        await ApiUtil.post(scraperURL + '/logo/upload', formData, token, headers)
        .then(res => {
          const logoUrl = get(res, 'data');
          output = logoUrl;
          return logoUrl;
        })
        .catch(err => console.error(err));
      }
      return output;
    };

    const postBusinessData = async (meta, token, claim) => {
      const metaJson = JSON.stringify(meta);
      const URL = meta && meta.url ? meta.url : '';
      const email = user && user.email ? user.email : '';
      const name = meta && meta.name ? meta.name : '';
      const data = { URL, email, name, metadata: metaJson };
      let newCompID;
      if (claim) {
        await ApiUtil.post(apiURL + '/shopify-business', data, token)
        .then(res => {
          newCompID =  res && res.data ? res.data : 0;
        })
        .catch(err => console.error(err));
      }
      return newCompID;
    }

    const postBusinessAddr = async (meta, token, claim) => {
      let validOutput = false;
      if(claim){
        const standardAddr = {
          street1: get(meta, 'address', ''),
          street2: get(meta, 'address2', ''),
          city: get(meta, 'city', ''),
          state: get(meta, 'state', ''),
          zip: get(meta, 'zipCode', ''),
          phone: get(meta, 'phone', ''),
          latitude: 0,
          longitude: 0
        }
        await ApiUtil.post(apiURL + '/geolocation/user-address', standardAddr , token)
        .then(res => {
          const { data } = res;
          if(!data.latitude && !data.longitude){
            alert('not valid address')
            setAddrValidError(true)
          } else {
            validOutput = true;
            setAddrValidError(false)
          }
        })
        .catch(err => {
          console.error(err);
          setAddrValidError(true);
        });
      }
      return validOutput;
    }

    if (!metadata) {
      console.error('meta...', meta, 'addrValid', addrValidError)
      alert('Something went wrong. Please verify form and try again.');
      return 'NO';
    } else {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      // const name = meta && meta.name ? meta.name : '';
      const callPostBusinessData = await postBusinessData(meta, token, claim);
      // const callUploadLogo = await uploadLogo(logo, token, claim);
      const callUploadLogo = await uploadImg('/logo/upload', formData, token, claim);
      const callAddrVerif = await postBusinessAddr(meta, token, claim)
      Promise.all([callPostBusinessData, callUploadLogo, callAddrVerif]).then(res => {
        const newCompID =  res && res.length >= 1 ? res[0] : companyID;
        setCompanyID(newCompID);
        if (newCompID && res[2]) { updateOnboardStep(2, token, claim) }
        setLoading(false)
      })
      .catch(err => { console.error(err); setLoading(false) });
    }
  };

  const updateOnboardStep = async(stepNum, token, claim) => {
    const data = { onboard_step: stepNum };
    if (claim) {
      ApiUtil.patch(apiURL + '/user', data, token)
      .then(context.updateOnboardStep(stepNum))
      .catch((err) => console.error(err));
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  }

  const handleSubmmit = (e) => {
    setLoading(true);
    setAddrValidError(false);
    if(e.preventDefault){
      e.preventDefault();
    }
    callPostShopifyBusiness();
    // setCompanyID(1);   //!!! for demo purpose
    // addUserCompanyIDUpdateOnboardStep(1, 2)  //!!! for demo purpose
  }

  return (
    <>
      <OnboardForm id='OnboardingForm'
        onSubmit={handleSubmmit}
      >
        <ShopifyBusinessInfo 
          style={{ 
            width: `${isSettingsForm ? '100%' : null }`,
            maxWidth: `${isSettingsForm ? '100%' : null }`,
          }}
          setMeta={setMeta} meta={meta} setLogo={setLogo} user={user}/>
        <Line /> 
        <ShopifyBusinessAddress
          style={{ 
            width: `${isSettingsForm ? '100%' : null }`,
            maxWidth: `${isSettingsForm ? '100%' : null }`,
          }}
          setMeta={setMeta} meta={meta} />
        {addrValidError && <p style={{color: 'red'}}>Error Validating Address</p>}
        <Line />
        <ShopifyBusinessHours 
          style={{ 
            width: `${isSettingsForm ? '100%' : null }`,
            maxWidth: `${isSettingsForm ? '100%' : null }`,
          }}
          setMeta={setMeta} meta={meta} />
        <Line />
        <DivFormSection style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
          <BtnSecondaryMd onClick={(e) => handleCancel(e)}>
            Cancel
          </BtnSecondaryMd>
          <BtnPrimaryMd type='submit'>
            {loading ? <Loading/> : 'Save and continue'}
          </BtnPrimaryMd>
        </DivFormSection>
      </OnboardForm>
    </>
  );
};

export default OnboardingForm;
