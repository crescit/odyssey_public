import { makeStyles } from '@material-ui/core/styles';
// import styled from 'styled-components';

export const styleConstants = {
  drawerPaper: {
    width: 440,
  },
  button: {
    padding: '10px',
    fontSize: '40px',
    fontWeight: 'bold',
    position: 'fixed',
    bottom: 0,
    width: 400,
    left: 950,
  },
  list: {
    padding: '0 var(--spc-2)',
    paddingBottom: 170,
  },
  wrapper: {
    position: 'fixed',
    width: 440,
    padding: '20px 0',
    bottom: 0,
    backgroundColor: 'var(--input-bkgrd)',
  },
};

export const useStyles = makeStyles((theme) => (styleConstants));
