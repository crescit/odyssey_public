import React from 'react';
import styled from 'styled-components';

const StatusBadge = styled.div`
  border-radius: 8px;
  padding: 4px 12px;
  width: fit-content;
  font-weight: normal;
`;

const SB = ({ children, style, className }) => (
  <StatusBadge style={style} className={className}>
    {children}
  </StatusBadge>
);


export default SB;