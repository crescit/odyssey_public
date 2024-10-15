import React from 'react';
// import { useHistory } from 'react-router-dom';
import { numOfLocations } from './ShopifyOnboardingText';
import { states } from '../../../common/constants'
import { AddressFieldWrapper, StateZipPhoneWrapper } from './OnboardingForm.styled';
import {
  DivFormSection,
  Field,
  FieldInput,
  FieldWrapper,
  InputList,
  Subfield,
} from '../pages/ShopifyOnboardingPage.styled';

const ShopifyBusinessAddress = ({meta, setMeta, style}) => {
  // const history = useHistory();
  const setMetaDataFor = (value, key) => {
    setMeta(prevState => ({ ...prevState, [key]: value }));
  }

  return (
    <DivFormSection style={style}>
      <FieldWrapper>
        <Field htmlFor='num-locations' >How many physical store locations do you have?</Field>
        <InputList 
          name='num-locations' id='num-locations'
          defaultValue={meta && meta.num_locations}
          onChange={(e) => setMetaDataFor(e.target.value, 'numLocations')}
          required>
          {numOfLocations.map((num) => {
            return (
              <option value={num} key={num}>{num}</option>
            )
          })}
        </InputList>
      </FieldWrapper>
      <FieldWrapper style={{ alignItems: 'flex-start' }} >
        <Field style={{ marginTop: 5 }}>Business Address</Field>
        <AddressFieldWrapper>
          <Subfield htmlFor='address'>Address line 1</Subfield>
          <FieldInput 
            type='text' 
            name='address' id='address' 
            placeholder='123 Odyessey Ave'
            onChange={(e) => setMetaDataFor(e.target.value, 'address')}
            defaultValue={meta && meta.address}
            style={{ width: '100%', marginBottom: 16 }}
            required
          ></FieldInput>
          <Subfield htmlFor='address2'>Address line 2 (optional)</Subfield>
          <FieldInput 
            type='text' 
            name='address2' id='address2' 
            placeholder='Suite 800'
            onChange={(e) => setMetaDataFor(e.target.value, 'address2')}
            defaultValue={meta && meta.address2}
            style={{ width: '100%', marginBottom: 16 }}
          ></FieldInput>
          <Subfield htmlFor='city'>City</Subfield>
          <FieldInput 
            type='text' 
            name='city' id='city' 
            placeholder='San Francisco'
            defaultValue={meta && meta.city}
            onChange={(e) => setMetaDataFor(e.target.value, 'city')}
            style={{ width: '100%', marginBottom: 16 }}
          ></FieldInput>

          <FieldWrapper style={{ marginTop: 0, marginBottom: 14 }} >
            <StateZipPhoneWrapper style={{ width: '45%', marginBottom: 16 }} >
              <Subfield htmlFor='state' style={{ textAlign: 'left' }}>State</Subfield>
              <InputList 
                name='state' id='state'
                style={{ width: '100%' }}
                defaultValue={meta && meta.state}
                onChange={(e) => setMetaDataFor(e.target.value, 'state')}
                required>
                {states.map(state => {
                  return (
                    <option value={state.code} key={state.code} >
                      {state.name}
                    </option>
                  )
                })}
              </InputList>
            </StateZipPhoneWrapper>
            <StateZipPhoneWrapper style={{ width: '45%', marginBottom: 16 }} >
              <Subfield htmlFor='zip' style={{ textAlign: 'left' }}>ZIP code</Subfield>
              <FieldInput 
                type='text' 
                name='zipCode' id='zip' 
                placeholder='94105'
                onChange={(e) => setMetaDataFor(e.target.value, 'zipCode')}
                defaultValue={meta && meta.zipCode}
                style={{ width: '100%' }}
                required
              ></FieldInput>
            </StateZipPhoneWrapper>
            <StateZipPhoneWrapper style={{ width: '45%', marginBottom: 0 }} >
              <Subfield htmlFor='phone' style={{ textAlign: 'left' }}>Phone number</Subfield>
              <FieldInput  
                type='tel'
                name='phone' id='phone' 
                pattern='^[(]?[0-9]{3}[)]?[-\.\s]?[0-9]{3}[-\.\s]?[0-9]{4}$'
                maxLength='10'
                maxLength='14'
                placeholder='415-555-1234'
                onChange={(e) => setMetaDataFor(e.target.value, 'phone')}
                style={{ width: '100%' }}
                defaultValue={meta && meta.phone}
                required
              ></FieldInput>
            </StateZipPhoneWrapper>
          </FieldWrapper>
        </AddressFieldWrapper>
      </FieldWrapper>
    </DivFormSection>
  );
};

export default ShopifyBusinessAddress;
