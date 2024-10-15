import styled from 'styled-components';

export const BT16 = styled.button`
  cursor: pointer;
  text-align: center;
  border-radius: 8px;
  padding: 8px;
  color: var(--title);
  font: 700 var(--lgmid-size) var(--font);
  font-style: normal;
  letter-spacing: 1.25px;
  line-height: var(--lgmid-size);
  background-color: white;
  border: none;
  outline: none;

  :hover:enabled {
    background-color: #F6F2EE;
    // text-decoration: underline;
  };
  :focus {
    background-color: #F6F2EE;
  };
  :active {
    background-color: #E5DFDA;
    transform: scale(0.96);
  };
  :disabled {
    opacity: 0.5;
  }
  
  &.selected {
    background-color: #E5DFDA;
    text-decoration: underline;
  }
`;
