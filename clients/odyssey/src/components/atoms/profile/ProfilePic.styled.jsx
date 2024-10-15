import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      justifyContent: 'center',

      '& > *': {
        margin: theme.spacing(1),
        height: 100,
        width: 100,
      },
    },
  })); 