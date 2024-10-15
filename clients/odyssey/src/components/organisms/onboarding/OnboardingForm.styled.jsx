import styled from 'styled-components';

//OnboardingForm
export const OnboardForm = styled.form`
  width: 100%;
  margin: 40 auto 0;
`;

//ShopifyBusinessInfo
export const DivWithSubdesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  flex-grow: 0;
`;

export const Subdescription = styled.p`
  text-align: start;
  font-style: normal;
  font-weight: normal;
  font-size: var(--sml-size);
  line-height: 16px;
  letter-spacing: 0.25px;
  width: 165px;
  color: var(--body);
  margin: 0;
`;

//ShopifyBusinessAddress
export const AddressFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0px;
  width: 75%;
  flex: none;
  flex-grow: 0;
  margin: 0;
`;

export const StateZipPhoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0px;
  box-sizing: border-box;
  width: 45%;
  min-width: 240px;
  margin: 0;
`;
