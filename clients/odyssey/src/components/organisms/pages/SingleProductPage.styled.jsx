import { makeStyles } from '@material-ui/core/styles';


export const useStyles = makeStyles((theme) => ({
    button: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    buttonpress: {
      fontWeight: 'bold',
      fontSize: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 40,
      paddingRight: 40,
      backgroundColor: '#669999',
      color: '#ffffff',
      '&:hover': {
          backgroundColor: '#0033cc'
      }
    },
  }));