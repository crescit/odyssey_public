import styled from 'styled-components'
import { BtnPrimaryMd } from '../../../library/atoms/buttons'

export const Wrapper = styled.div`
  display: inline-flex;
  height: auto;
  margin-top: 0px;
  // width: 100%;
  width: 50%;
  vertical-align: top;
  min-width: var(--width-mobile);

  ${props => props.addCSS}
`;

export const Container = styled.div`
  height: fit-content;
  width: 100%;
  max-width: 422px;
  padding: 24px 16px;
  margin-left: auto;
  border: solid 1px var(--border);
  border-radius: 4px;
  background-color: white;
  z-index: 10;
`;

export const LineItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 8px 0;
`;

export const Total = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 16px 0 0;
`;

export const BtnProceedToNext = styled(BtnPrimaryMd)`
  width: 100%;
  margin: var(--spc-3) 0 0;
`;