// import React from 'react'
import styled, { css } from 'styled-components';

import { H5, B1, B2, S1, S2 } from '../../../library/atoms';

export const DetailHeader = styled(S2)`
  display: inline-block;
  font-weight: 700;
  ${props => props.moreStyle};
`;
export const DetailDesc = styled(B2)`
  color: var(--body);
  padding-top: var(--spc-half);
  ${props => props.moreStyle};
`;
export const DetailInfo = styled(B1)`
  ${props => props.color};
  ${props => props.moreStyle};
`;

export const styleDescInput = css`
  min-height: 290px !important;
  align-items: flex-start !important;
`;

export const EditArea = styled.textarea`
  ${props => props.color};
  ${props => props.moreStyle};
`;

export const styleInput = {
  display: 'flex',
  alignItems: 'center',
  margin: 0,
  border: 'solid 1px',
  borderRadius: 4,
  minHeight: 44,
  width: '100%',
  padding: '9px 12px',
  fontFamily: 'var(--font)',
  fontSize: 'var(--lgmid-size)',
  letterSpacing: 0.5,
  lineHeight: '24px',
};

export const PhotoGridWrapper = styled.div`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  // grid-auto-rows: minmax(120px, 1fr);
  grid-auto-rows: 120px;
  gap: 16px;
  margin-bottom: var(--spc-2);
`;

export const stylePhotoBox = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
  borderRadius: 4,
  fontFamily: 'var(--font)',
  fontSize: 'var(--lgmid-size)',
  letterSpacing: 0.5,
  overflow: 'hidden',
};

export const PhotoBox = styled.div`
  ${props => props.moreStyle};
  ${props => props.color};
  ${props => props.boxSize};
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const PhotoMsg = styled(H5)`
  display: inline-block;
  font-weight: 700;
  background-color: var(--p-lighter);
  padding: 15px;
  margin: 0 auto;
  position: absolute;
  top: 15%;
  left: 15%;
  right: 15%;
  z-index: 10;
  text-align: center;
  ${props => props.moreStyle};
`;

export const styleImgBorder = {
  border: 'solid 1px',
}
export const styleAddPhoto = {
  backgroundColor: 'white',
  border: 'dashed 1px',
}

export const AddPhoto = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  ${props => props.cursor};
`;

export const styleRemoveIcon = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: 0,
}

export const styleBigBox = css`
  grid-column: 1 / 3;
  grid-row: 1 /3 ;
`;

export const AddPhotoText = styled(S1)`
  font-weight: 700;
`;

export const UploadImg = styled.input`
  opacity: 0;
  position: absolute;
  ${props => props.cursor};
`;