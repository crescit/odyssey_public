import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    float: 'left',
    paddingLeft: 20,
    position: 'absolute',
  },
  subHeader: {
    textAlign: 'center',
    color: '#212121',
  },
  gridList: {
    width: 550,
    height: 500,
  },
}));
