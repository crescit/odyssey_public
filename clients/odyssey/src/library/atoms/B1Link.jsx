import styled from 'styled-components';

export const B1Link = styled.div`
  cursor: pointer;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0.5px;
  line-height: 24px;
  padding-bottom: 2px;
  
  :hover:enabled {
    text-decoration: underline;
  };
  :active {
    transform: scale(0.96);
    text-decoration: underline;
  };
  :disabled {
    opacity: 0.5;
  }
`;
