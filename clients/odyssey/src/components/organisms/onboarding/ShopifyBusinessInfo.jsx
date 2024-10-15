import React from 'react';
import { busiCategories } from '../../../common/constants'
import { DivWithSubdesc, Subdescription } from './OnboardingForm.styled'; 
import {
  DivFormSection,
  Field,
  FieldInput,
  FieldWrapper,
  InputFile,
  InputList,
  InputTextbox,
} from '../pages/ShopifyOnboardingPage.styled'; 

const ShopifyBusinessInfo = ({ meta = {}, setMeta, setLogo, style, user }) => {
  const setMetaDataFor = (value, key) => {
    if (key === 'logo') {
      setLogo(value)
    } else {
      setMeta(prevState => ({ ...prevState, [key]: value }));
    }
  }

  return (
    <DivFormSection id="shopify-business-section" style={style}>
      <FieldWrapper>
        <Field htmlFor='name'>Business name</Field>
        <FieldInput
          type='text'
          name='name' id='name'
          onChange={(e) => setMetaDataFor(e.target.value, 'name')}
          defaultValue={meta && meta.name}
          required
        ></FieldInput>
      </FieldWrapper>
      <FieldWrapper>
        <Field htmlFor='url'>Shopify store URL</Field>
        <FieldInput
          type='text'
          name='url' id='url'
          placeholder='https://www.business.com'
          onChange={(e) => setMetaDataFor(e.target.value, 'url')}
          defaultValue={meta && meta.url}
          required
        ></FieldInput>
      </FieldWrapper>
      <FieldWrapper>
        <Field htmlFor='email'>Business email</Field>
        <FieldInput type='email' name='email' id='email'
          placeholder='email@yourbusiness.com'
          onChange={(e) => setMetaDataFor(e.target.value, 'email')}
          defaultValue={user && user.email}
          disabled={true}
          required
        ></FieldInput>
      </FieldWrapper>
      <FieldWrapper>
        <Field htmlFor='category'>Business category</Field>
        <InputList name='category' id='category'
          onChange={(e) => setMetaDataFor(e.target.value, 'category')}
          defaultValue={meta && meta.category}
          required>
          { busiCategories.map(cat => <option defaultValue='' value={cat.toLowerCase()} key={cat}>{cat}</option>) }
        </InputList>
      </FieldWrapper>
      <FieldWrapper style={{ marginTop: 24 }} >
        <DivWithSubdesc>
          <Field htmlFor='description' style={{ marginTop: 5 }}>Business description</Field>
          <Subdescription >
            A brief overview about your business. This will appear on your
            store page.
          </Subdescription>
        </DivWithSubdesc>
        <InputTextbox
          type='text'
          name='description' id='description'
          onChange={(e) => setMetaDataFor(e.target.value, 'desc')}
          defaultValue={meta && meta.desc}
          required
        ></InputTextbox>
      </FieldWrapper>
      <FieldWrapper style={{ margin: '30px 0', alignItems: 'flex-start' }} >
        <DivWithSubdesc>
          <Field htmlFor='logo' style={{ marginTop: 5 }}>Business logo</Field>
          <Subdescription>
            The image will be used for your store page.
          </Subdescription>
        </DivWithSubdesc>
        <div style={{ width: '75%', minWidth: 240 }} >
          <InputFile
            accept=".jpeg,.jpg,.webp,.png,.svg"
            type='file'
            name='logo' id='logo'
            style={{ width: 250 }}
            onChange={(e) => setMetaDataFor(e.target.files[0], 'logo')}
            // onChange={(e) => { setMetaDataFor(e.target.files[0], 'logo'); setLogo(e.target.files[0]); }}
            required={!meta || !meta.img}
          />
        </div>
      </FieldWrapper>
    </DivFormSection>
  );
};

export default ShopifyBusinessInfo;
