import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { Popup } from 'react-leaflet';

import { B1 } from '../../../library/atoms/B1';
import { B2 } from '../../../library/atoms/B2';
import { H6U } from '../../../library/atoms/H6U';

const StyledPopUp = styled(Popup)`
  width: 100%;
  height: auto;

  .leaflet-popup-content > * {
    width: auto;
    margin: 0;
    padding: 0;
  }

  .leaflet-popup-content-wrapper {
    width: auto !important;
    margin: 0 !important;
    padding: 0 !important;

    .leaflet-popup-content {
      width: auto !important;
      margin: 0 !important;
      padding: 0 !important;
      line-height: 0.7;
    }
  }

  a {
    right: -185px !important;
  }
`;

const PopUpImg = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  min-height: 180px;
  min-width: 270px;
  height: 180px;
  width: 270px;
  max-height: 180px;
  max-width: 270px;
  position: relative;
  right: 80px;
  border-bottom: 1px solid var(--border);
`;

const TextBackground = styled.div`
  right: 80px;
  text-align: left;
  width: 270px !important;
  position: relative;
  background: white;
  padding-left: var(--spc-1) !important;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const StoreName = styled(H6U)`
  margin: 0 !important;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-top: var(--spc-1) !important;
`;

const StoreCategory = styled(B1)`
  margin: 0 !important;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-top: var(--spc-1) !important;
  padding-bottom: var(--spc-2) !important;
`;


const StorePopUp = ({ address = {}}) => {

  let {
    img,
    name,
    category,
    distance
  } = address;
  img = img.replace(/['"]+/g, '');
  name = name.replace(/['"]+/g, '');
  category = category.replace(/['"]+/g, '');  
  return(
      <StyledPopUp>
        <PopUpImg src={img} alt={`${name} storefront`}></PopUpImg>
        <TextBackground>
          <StoreName>{name}</StoreName>
          <StoreCategory>{category}</StoreCategory>
          <B2 className="m-tauto p-b2">Approx. {distance} miles from you</B2>
        </TextBackground>
      </StyledPopUp>
  )
};

export default StorePopUp;