import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  box: {
    marginTop: '10vh',
  },
  button: {
    display: 'block',
    backgroundColor: '#0033cc',
    width: 130,
    color: 'white',
    fontWeight: 'bold',
    margin: '15px auto',
    '&:hover': {
      color: 'black',
      backgroundColor: 'green'
    }
  }
}));

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#669999',
    },
  },
});