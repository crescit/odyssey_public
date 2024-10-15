import React from 'react';
import { BtnSecondaryMd } from './BtnSecondaryMd';

export const Log = (props) => {
  const {print} = props;
  return (
    <BtnSecondaryMd onClick={() => console.log('-LOG->', ...print)} >LOG</BtnSecondaryMd>
  )
}
