import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { navPageSpacing } from '../../../style_constants/navigationbar';

const SpacedDiv = styled.div`
  padding-top: 100px;
  padding-left: ${navPageSpacing};
  padding-right: 20px;
`;

const PageSpacer = ({ children }) => {
  const { location = {} } = useHistory();
  const { pathname = '' } = location;
  return <SpacedDiv id={pathname != '/login' ? "page-content-spacer" : ''}>{children}</SpacedDiv>;
};

export default PageSpacer;

