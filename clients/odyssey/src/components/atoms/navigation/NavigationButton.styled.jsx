import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavigationButtonText = styled.p`
  color: white;
`;

export const NavigationButtonLink = styled(Link)`
  text-decoration: none;
  svg {
    color: var(--light-text);
  }
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const StyledButton = styled.div`
  display: flex;
  padding: 20px 9px;
  margin-bottom: 30px;
  flex: 1;
  svg {
    display: flex;
    color: var(--light-text);
    width: 30px;
  }
  p {
    display: flex;
    color: var(--light-text);
    font-family: 'lato';
    align-items: center;
    margin: 0 0 0 9px;
  }
  :hover {
    p {
      color: var(--light-text);
    }
    svg {
      color: var(--light-text);
    }
    background-color: var(--p-dark);
    -webkit-transition: background-color 250ms ease-out;
    -moz-transition: background-color 250ms ease-out;
    -o-transition: background-color 250ms ease-out;
    transition: background-color 250ms ease-out;
  }
  :active {
    -webkit-transition: background-color 250ms ease-out;
    -moz-transition: background-color 250ms ease-out;
    -o-transition: background-color 250ms ease-out;
    transition: background-color 250ms ease-out;
  }
`;
