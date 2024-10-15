import React from 'react';
import styled from 'styled-components';
import { H6, H7 } from '../../../library/atoms';

const MenuLinkBG = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 0;
  margin: 12px 0;

  h6 { 
    margin: 0px 16px;
    margin-right: auto; 
  }
  
  &.active { 
    * {
      color: var(--primary); 
      font-weight: 600;
    } 
    .v-line {
      border: solid 2px var(--primary);
      border-radius: 8px;
      background-color: var(--primary);
    }
  }

  ${props => props.active}
`;
const ConsoleMenuLink = ({ label, icon, onClick, route, page}) => {
  const active = route === page ? 'active' : '';
  return(
    <MenuLinkBG className={`text-left ${active}`} onClick={() => onClick()} role="link">
     {icon}
     <H6>{label}</H6>
     <div className={'v-line'}></div>
    </MenuLinkBG>
  )
};

export default ConsoleMenuLink;