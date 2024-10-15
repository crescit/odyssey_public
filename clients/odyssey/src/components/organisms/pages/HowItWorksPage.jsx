import React from 'react';
import { Link } from 'react-router-dom';
import { B1, B1ULink, H5 } from '../../../library/atoms';
import { BtnPrimaryMd } from '../../../library/atoms/buttons';
import Grid from '@material-ui/core/Grid';
import {
  CategoryDiv,
  GetStartedDiv,
  SubStartedDiv,
  ValuePropDiv,
  PricingDiv,
  Heading2,
  Heading3,
  Heading5,
  Heading8,
} from './HowItWorksPage.styled';
const megaphone = 'https://images.odysseycommerce.com/howitworks/Megaphone.jpg';
const users = 'https://images.odysseycommerce.com/howitworks/Users.jpg';
const currencycircledollar =
  'https://images.odysseycommerce.com/howitworks/CurrencyCircleDollar.jpg';
const handshake = 'https://images.odysseycommerce.com/howitworks/Handshake.jpg';
const magnifyingglass =
  'https://images.odysseycommerce.com/howitworks/MagnifyingGlass.jpg';
const storefront =
  'https://images.odysseycommerce.com/howitworks/Storefront.jpg';
const truck = 'https://images.odysseycommerce.com/howitworks/Truck.jpg';
const frame811603 =
  'https://images.odysseycommerce.com/howitworks/Frame 811603 1.jpg';
const shopifyonboardingpage24 =
  'https://images.odysseycommerce.com/howitworks/Shopify Onboarding Page 24 (1) 1.jpg';
const shopifyonboardingpage26 =
  'https://images.odysseycommerce.com/howitworks/Shopify Onboarding Page 26 (1) 1.jpg';
const orders = 'https://images.odysseycommerce.com/howitworks/Orders 1.jpg';
const plus = 'https://images.odysseycommerce.com/howitworks/Vector.jpg';

const HowItWorksPage = () => {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div>
        <Heading2 style={{ marginBottom: 48, marginTop: 128 }}>
          Buying and selling locally made easy
        </Heading2>
        <Heading5 style={{ marginBottom: 48, maxWidth: 825 }}>
          OdysseyCommerce is a marketplace connecting local businesses to people
          looking to purchase locally owned, high-quality items and who believe
          in supporting these businesses missions, values, and stories.
        </Heading5>
        <Link to='/onboardingprocess'>
          <BtnPrimaryMd style={{ marginBottom: 104 }}>
            Create Your Store
          </BtnPrimaryMd>
        </Link>
      </div>
      <Heading3 style={{ marginBottom: 56 }}>
        Why sell on OdysseyCommerce?
      </Heading3>
      <CategoryDiv
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: 0,
          marginBottom: 123,
        }}
      >
        <Grid container spacing={2} justify='center' alignItems='center'>
          <Grid sm={12} md={2}>
            <ValuePropDiv>
              <img
                src={megaphone}
                alt='megaphone'
                style={{ height: 64, width: 64 }}
              />
              <Heading8>Increase Brand Awareness</Heading8>
            </ValuePropDiv>
          </Grid>
          <Grid sm={12} md={2}>
            <ValuePropDiv>
              <img src={users} alt='users' style={{ height: 64, width: 64 }} />
              <Heading8>Find New Customers</Heading8>
            </ValuePropDiv>
          </Grid>
          <Grid sm={12} md={2}>
            <ValuePropDiv>
              <img
                src={currencycircledollar}
                alt='currencycircledollar'
                style={{ height: 64, width: 64 }}
              />
              <Heading8>No Cost to Signup</Heading8>
            </ValuePropDiv>
          </Grid>
          <Grid sm={12} md={2}>
            <ValuePropDiv>
              <img
                src={handshake}
                alt='handshake'
                style={{ height: 64, width: 64 }}
              />
              <Heading8 style={{ width: 223 }}>
                Onboard Your Business Effortlessly
              </Heading8>
            </ValuePropDiv>
          </Grid>
          <Grid sm={12} md={2}>
            <ValuePropDiv>
              <img
                src={magnifyingglass}
                alt='magnifyingglass'
                style={{ height: 64, width: 64 }}
              />
              <Heading8>Increase Your Discoverability</Heading8>
            </ValuePropDiv>
          </Grid>
        </Grid>
      </CategoryDiv>

      <Heading3>How much we charge per order?</Heading3>
      <CategoryDiv>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Grid sm={12} md={4}>
            <ValuePropDiv
              style={{ marginTop: 48, marginBottom: 104, width: 301 }}
            >
              <Heading8>2.9% + 30c</Heading8>
              <Heading8>Stripe's payment processing fee</Heading8>
            </ValuePropDiv>
          </Grid>
          <Grid sm={12} md={4}>
            <img
              src={plus}
              alt='plus'
              style={{
                marginTop: 56,
                marginBottom: 120,
                marginRight: 24,
                marginLeft: 24,
              }}
            />
          </Grid>
          <Grid sm={12} md={4}>
            <ValuePropDiv
              style={{ marginTop: 48, marginBottom: 104, width: 345 }}
            >
              <Heading8>3% order total</Heading8>
              <Heading8>Transaction fee for OdysseyCommerce</Heading8>
            </ValuePropDiv>
          </Grid>
        </Grid>
      </CategoryDiv>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 0,
        }}
      >
        <Heading3>How to fulfill your order?</Heading3>
        <CategoryDiv style={{ marginTop: 48 }}>
          <Grid container spacing={2} justify='center' alignItems='center'>
            <Grid sm={12} md={6}>
              <ValuePropDiv>
                <img
                  src={storefront}
                  alt='storefront'
                  style={{ height: 64, width: 64 }}
                />
                <Heading8>Schedule for pickup</Heading8>
              </ValuePropDiv>
            </Grid>
            <Grid sm={12} md={6}>
              <ValuePropDiv>
                <img
                  src={truck}
                  alt='truck'
                  style={{ height: 64, width: 64 }}
                />
                <Heading8 style={{ width: 223 }}>Shipping coming soon</Heading8>
              </ValuePropDiv>
            </Grid>
          </Grid>
        </CategoryDiv>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Heading3 style={{ marginBottom: 56, marginTop: 104 }}>
          Get started now
        </Heading3>
        <GetStartedDiv>
          <SubStartedDiv>
            <H5 style={{ marginBottom: 9 }}>Create an account</H5>
            <Link to='/onboardingprocess'>
              <B1ULink>Sign Up Now</B1ULink>
            </Link>
          </SubStartedDiv>
          <img
            src={frame811603}
            alt='frame811603'
            style={{ position: 'static' }}
          />
        </GetStartedDiv>
        <GetStartedDiv>
          <img
            src={shopifyonboardingpage24}
            alt='shopifyonboardingpage24'
            style={{ position: 'static' }}
          />
          <SubStartedDiv>
            <H5 style={{ marginBottom: 8 }}>Onboard your business</H5>
            <B1>Add your business information in less than 5 minutes</B1>
          </SubStartedDiv>
        </GetStartedDiv>
        <GetStartedDiv>
          <SubStartedDiv>
            <H5>Setup payments and you are all set!</H5>
          </SubStartedDiv>
          <img
            src={shopifyonboardingpage26}
            alt='shopifyonboardingpage26'
            style={{ position: 'static' }}
          />
        </GetStartedDiv>
        <GetStartedDiv>
          <img src={orders} alt='orders' style={{ position: 'static' }} />
          <SubStartedDiv>
            <H5 style={{ marginBottom: 8 }}>
              Manage everything from your merchant console
            </H5>
            <B1>Orders, store, product information all in one place</B1>
          </SubStartedDiv>
        </GetStartedDiv>
      </div>
      <Link to='/onboardingprocess'>
        <BtnPrimaryMd style={{ marginBottom: 104 }}>
          Create Your Store
        </BtnPrimaryMd>
      </Link>
    </div>
  );
};

export default HowItWorksPage;
