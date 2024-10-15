import styled from 'styled-components';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { primaryColor, pDark } from '../../../style_constants/colors'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: pDark,
    },
  },
  typography: {
    fontFamily: [
      'var(--font)',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const useStyles = makeStyles((theme) => ({
  divider: {
    width: '60%',
    maxWidth: 750,
    [theme.breakpoints.down(930)]: {
      width: '100%',
      maxWidth: 'none',
    }
  },
  frmCntrlLabel: {
    display: 'flex',
    width: 'fit-content',
    marginRight: 'auto',
  },
  inCartDrawer: {
    width: '100%',
  }
}))

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  width: 100%;
  // max-width: 1300px;
`;

export const ItemWrapper = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 750px;
  margin-right: auto;

  ${props => props.addCSS}
`;

export const SummWrapper = styled.div`
  height: 150px;
  margin-top: -50px;
  width: 35%;
  min-width: var(--width-mobile);

  @media (max-width: 930px) {
    height: auto;
    margin-top: var(--spc-2);
    margin-bottom: var(--spc-3);
  }
  ${props => props.addCSS}
`;