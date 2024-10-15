import styled from 'styled-components';
import Card from '@material-ui/core/Card';

export const CardStyling = styled.div`
  display: grid;
  text-align: left;
  padding-left: 10px;
`;

export const SpacedCardContent = styled.div`
  padding: 40px;
`;

export const FloatingCard = styled(Card)`
  text-align: center;
  :hover {
    cursor: pointer;
    box-shadow: 10px 10px 5px #aaaaaa;
  }
`;
