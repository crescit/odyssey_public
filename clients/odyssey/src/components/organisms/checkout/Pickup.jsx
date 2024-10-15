import React from 'react';
import { defaultShopImg } from '../../../common/constants';
import PhoneAddress from './PhoneAddress';
import DateTimePicker from './DateTimePicker';

import { B1, H4 } from '../../../library/atoms';
import { BtnPrimaryMd } from '../../../library/atoms/buttons';
import {
  PickupSection, SectionWrapper,
  MerchantImg,
} from './Pickup.styled';

const get = require('lodash/get');

const Pickup = ({ step, setStep, merchant, dateTime, setDateTime }) => {
  return (
    <PickupSection>
      <SectionWrapper style={{ margin: '18px 0 24px'}} >
        <H4>Choose pickup time</H4>
      </SectionWrapper>

      <SectionWrapper style={{ margin: '24px 0 0' }} >
        <MerchantImg 
          src={get(merchant, 'img', defaultShopImg)}
          alt={`${get(merchant, 'name', 'shop')} logo`}
        />
        <B1 style={{ margin: '0 8px'}} >{get(merchant, 'name', 'Somthing went wrong.  Please try again.')}</B1>
      </SectionWrapper>

      <SectionWrapper style={{ margin: '0 0 24px' }} >
        <PhoneAddress location={merchant} />
        <div style={{ marginLeft: 'auto'}} >
          <DateTimePicker dateTime={dateTime} setDateTime={setDateTime} />
        </div>
      </SectionWrapper>

      <BtnPrimaryMd
        style={{ float: 'right' }}
        onClick={() => setStep(2)}
      >
        Proceed to Order Review
      </BtnPrimaryMd>
    </PickupSection>
  );
};

export default Pickup;
