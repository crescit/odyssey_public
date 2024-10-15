import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    padding: 10,
  },
  title: {
    textAlign: 'center',
  },
}));

export const Modal = styled.div`
top: 0;
left: 0;
right: 0;
margin-top: 100px;
justify-content: center;
position: fixed;
display: flex;
`