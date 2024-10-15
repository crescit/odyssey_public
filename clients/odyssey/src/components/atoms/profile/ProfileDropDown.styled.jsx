import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#49433f',
    },
  },
});

export const useStyles = makeStyles((theme) => ({
  styleFont: {
    fontFamily: 'var(--font)',
    color: 'var(--body)',
  },
  acct: {
    fontFamily: 'var(--font)',
    color: 'var(--body)',
    marginRight: 10,
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    }
  },
  menuItem: {
    '&:hover': {
      textDecorationLine: 'underline',
      textDecorationColor: 'var(--p-dark)',
      textDecorationThickness: '2px',
    }
  },
  capName: {
    textTransform: 'capitalize',
  },
}))