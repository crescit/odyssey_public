import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';
import { primaryColor } from '../../../style_constants/colors'

export const Backdrop = styled.div`
  width: 100%;
  margin-top: 5%;
  min-height: 100%;
  // position: fixed;
  // top: 10;
  // bottom: 10;
  vertical-align: middle;
  text-align: center;
`;

export const PositionedDiv = styled.div`
  position: relative;
  margin: 0 auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
`;

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
