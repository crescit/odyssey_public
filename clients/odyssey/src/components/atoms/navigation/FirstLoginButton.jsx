import React from 'react';
import styled from 'styled-components';
import { PG } from '../../../library/atoms/PG';

const ButtonBackground = styled.div`
  border: 1px solid var(--border);
  border-radius: 4px;
  &:hover {
    background: var(--primary);
    color: white;
    .icon { svg { color: white !important; }}
  }

  .first-login-button-pg { height: 32px; }
`;

const FirstLoginButton = (props) => {
  const { icon, header, onClick } = props;
  return (
    <ButtonBackground className="disp-flex p-y3 p-x2 m-2" onClick={() => onClick()} style={{ justifyContent: 'center' }}>
      <div className="icon" style={{ width: '100%'}}>{ icon && icon }</div>
      <PG className={"first-login-button-pg"}>{ header && header }</PG>
    </ButtonBackground>
  )
}

export default FirstLoginButton;