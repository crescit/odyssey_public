import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  section: {
    textAlign: 'left',
    marginBottom: 'var(--spc-4)',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  name: {
    marginBottom: 0,
    marginRight: 'auto',
    color: 'black',
    display: 'inline',
    verticalAlign: 'middle',
  },
  address: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sub: {
    marginBottom: 0,
    marginLeft: 8,
    color: 'var(--title)',
  },
  statezip: {
    display: 'flex',
  },
  image: {
    width: 124,
    height: 124,
    marginRight: 40,
    objectPosition: 'center',
    objectFit: 'contain',
  },
}));
