import styled from 'styled-components';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';


export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7b6f65',
    },
  },
});

export const SearchBarText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  // width: calc(100% - 500px);
  width: 60%;
  max-width: 780px;
  min-width: 229px;
  height: 48px;
  margin-top: var(--spc-1);
  margin-bottom: var(--spc-1);
  border: solid 1px #BDB4AD;
  border-radius: 8px;
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 32,
      width: '70% !important',
    },
  },
}));
