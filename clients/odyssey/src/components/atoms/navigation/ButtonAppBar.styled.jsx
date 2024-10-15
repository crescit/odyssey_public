import styled from 'styled-components'; 
import Toolbar from '@material-ui/core/Toolbar';
import { navNarrowWidth, searchBarWrapBP } from '../../../style_constants/navigationbar';

import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const Logo = styled.img`
  width: 50px;
  height: 50px;
  flex: 1;
  object-fit: contain;
  margin-left: -11px;
`;

export const StyledToolBar = styled(Toolbar)`
  .root {
    background-color: transparent;
    padding-left: 0;
  }
`;

export const FixedWrapper = styled.div`
  z-index: 5; 
`;

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'space-around',
      flexGrow: 1,
      position: 'fixed',
      overflow: 'hidden',
      // height: 80,
      width: `calc(100% - ${navNarrowWidth})`,
      zIndex: 15,
      marginLeft: navNarrowWidth,
      paddingRight: 'var(--pageSpacingRight)',
      backgroundColor: '#ffffff !important',
      [theme.breakpoints.down('sm')]: {
        width: `calc(100% - var(--pageSpacingRight))`,
        marginLeft: 24,
      },
      [theme.breakpoints.down(searchBarWrapBP)]: {
        width: '100%',
        marginLeft: 0,
        flexWrap: 'wrap',
        paddingBottom: 16,
        borderBottom: 'solid 0.5px var(--border)',
      },
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '70%',
      [theme.breakpoints.down(searchBarWrapBP)]: {
        width: '100%',
      },
    },
    loginNCart: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    logoLink: {
      display: 'flex',
      textDecoration: 'none !important',
      [theme.breakpoints.down(searchBarWrapBP)]: {
        order: 3,
      },
    },
    cartBtn: {
      padding: 0,
      marginLeft: 12,
    },
    cartLink: {
      color: 'var(--body)',
      height: 24,
    },
    span: {
      background: 'var(--primary)',
      color: 'var(--light-text)',
      padding: '3px 1px 1px 1px',
      fontSize: 10,
      borderRadius: 50,
      textAlign: 'center',
      width: 16,
      height: 16,
      position: 'absolute',
      marginTop: -6,
      marginLeft: -9,
    },
    logo: {
      color: 'var(--primary)',
      fontFamily: 'var(--font)',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 34,
      display: 'flex',
      alignItems: 'center',
    }

  }));
