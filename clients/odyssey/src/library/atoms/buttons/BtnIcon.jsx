import styled from 'styled-components';

export const BtnIcon = styled.button`
  display: flex;
  justify-content: center;
  align-items: center
  cursor: pointer;
  background-color: transparent;
  text-align: center;
  border-radius: 8px;
  padding: 1px;
  color: var(--title);
  border: none;
  outline: none;
  transition: 0.2s all;
  
  :hover:enabled {
    background-color: var(--p-lighter);
  };
  :focus {
    background-color: var(--p-lighter);
    // box-shadow: var(--p-lighter) 0px 0px 0px 2px;
  };
  :active {
    transform: scale(0.96);
    background-color: var(--p-light);
  };
  :disabled {
    opacity: 0.5;
  }
`;
