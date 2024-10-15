import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';

export const Section = styled.section`
display: flex;
flex-wrap: wrap;
justify-content: space-between;
align-items: flex-start;
`;

// Description
export const Description = styled.div`
text-align: left;
width:35%;
max-width: 425px;
min-width: var(--width-mobile);
`;


export const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

// export const useStyles = makeStyles((theme) => ({
//     button: {
//       '& > *': {
//         margin: theme.spacing(1),
//       },
//     },
//     buttonpress: {
//       fontWeight: 'bold',
//       fontSize: 15,
//       paddingTop: 10,
//       paddingBottom: 10,
//       paddingLeft: 40,
//       paddingRight: 40,
//       backgroundColor: '#669999',
//       color: '#ffffff',
//       '&:hover': {
//           backgroundColor: '#0033cc'
//       }
//     },
//   }));