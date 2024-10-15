import styled from 'styled-components';

export const BtnSecondaryMd = styled.button`
  cursor: pointer;
  height: 48px;
  background-color: #FFFFFF;
  border: 2px solid var(--primary);
  border-radius: 8px;
  text-align: center;
  padding: 0 16px;
  color: var(--primary);
  font: 600 var(--lgmid-size) var(--font);
  font-style: normal;
  letter-spacing: 1.25px;
  outline: none;
  transition: 0.2s all;

  .loading-circle { width: 24px !important; height: auto !important; color: var(--p-light); position: relative; top: 20px; }

  :hover:enabled {
    border: 2px solid var(--p-dark);
    color: var(--p-dark);
  };
  :focus {
    // box-shadow: var(--p-lighter) 0px 0px 0px, var(--p-lighter) 0px 5px 0px 0px;
    box-shadow: var(--p-lighter) 0px 0px 0px 5px;
  };
  :active {
    transform: scale(0.96);
    border: 2px solid var(--p-dark);
    color: var(--p-dark);
  };
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
