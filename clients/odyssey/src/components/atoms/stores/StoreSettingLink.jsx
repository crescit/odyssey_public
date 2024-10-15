import React from 'react';

import { H6 } from '../../../library/atoms/H6';
import { S1 } from '../../../library/atoms/S1';

const StoreSettingLink = ({ icon, header = '', info }) => {
  return (
    <div className='disp-flex'>
      {icon}
      <div className='m-l1' style={{ cursor: 'pointer' }}>
        <H6>{header}</H6>
        <S1>{info}</S1>
      </div>
    </div>
  );
};

export default StoreSettingLink;
