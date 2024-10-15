import styled from 'styled-components';

export const BtnText = styled.button`
  cursor: pointer;
  text-align: center;
  border-radius: 8px;
  padding: 3px 3px;
  color: var(--primary);
  font: 700 var(--lgmid-size) var(--font);
  font-style: normal;
  letter-spacing: 1.25px;
  line-height: var(--lgmid-size);
  background-color: white;
  border: none;
  outline: none;

  :hover:enabled {
    color: var(--p-dark);
  };
  :focus {
    color: var(--primary);
    background-color: var(--p-lighter);
    // box-shadow: var(--p-lighter) 0px 3px 3px, var(--p-lighter) 0px 0px 0px 0px;
    box-shadow: var(--p-lighter) 0px 0px 0px 5px;
  };
  :active {
    transform: scale(0.96);
  };
  :disabled {
    opacity: 0.5;
  }
  
  &.selected {
    color: var(--primary);
    background-color: var(--p-lighter);
    text-decoration: underline;
  }
`;
