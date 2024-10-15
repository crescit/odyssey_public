import styled from 'styled-components';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { B1Link } from '../../../library/atoms/B1Link';
import { BtnPrimaryMd } from '../../../library/atoms/buttons/BtnPrimaryMd';
import { H6 } from '../../../library/atoms/H6';
import { PG } from '../../../library/atoms/PG';

export const ActiveH6 = styled(H6)`
  color: var(--label-active);
  width: 100%;
  padding-bottom: var(--spc-2);
`;

export const Background = styled.div`
  width: 100%;
  height: 100%;
`;

export const Button = styled(BtnPrimaryMd)`
  line-height: 32px;
  &.open {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Chevron = styled(ArrowDropDownIcon)`
  position: relative;
  top: 6px;
`;

export const Date = styled(PG)`
  display: inline-flex;
  position: relative;
  top: -3px;
  margin-left: 16px;
`;

export const DetailsContent = styled.div`
  width: 100%;
  height: auto;
  border: 1px solid var(--border);
  border-top: none; 
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;

  .border-left { border-left: 1px solid var(--border); }
`;

export const DetailsHeader = styled.div`
  width: 100%;
  height: 90px;
  border: 1px solid var(--border);
  border-bottom: none; 
  background: var(--orange-bg);
  border-top-right-radius: 8px;
  border-top-left-radius: 8px; 
`;

export const StatusOption = styled.div`
  &:hover { background: var(--orange-bg); }
  background: #fff;
  position: relative;
  top: 16px; // half of line-height 
  z-index: 2;
  color: var(--label-active);
  border: 1px solid var(--border);
`;

export const StyledB1 = styled(B1Link)`
  :hover { text-decoration: underline; };
  :active { transform: none; };

  & > svg {
    position: relative;
    top: 6px;
    margin-right: var(--spc-half);
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  width: 100%;
  padding: var(--spc-1);
  &:hover, &:active { background-color: var(--input-bkgrd); }
`;

export const StyledSelect = styled(Select)`
  background-color: var(--primary) !important;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  color: white;
  & > div { font-size: 1rem; }
  &:after, &:before { content: none; }
  & > input { background-color: var(--primary) !important; }
  & > svg { right: 10px; top: 12px; color: white; }
`;

export const TotalSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;