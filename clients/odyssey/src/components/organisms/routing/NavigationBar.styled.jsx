import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
// import { makeStyles } from '@material-ui/core/styles';
import { navNarrowWidth } from '../../../style_constants/navigationbar';

const drawerWidth = 118;
export const StyledDrawer = styled(Drawer).attrs({
  classes: {
    paper: 'paper',
    root: 'root',
  },
})`
  div {
    background-color: var(--primary);
    .root {
      display: flex;
    }
    width: ${({ open }) => {
      return open ? drawerWidth + 'px' : navNarrowWidth;
    }};
  }
`;

// export const materialStyles = makeStyles((theme) => {
//   return {
//     root: {
//       display: 'flex',
//       height: '100vh',
//     },
//     appBar: {
//       zIndex: theme.zIndex.drawer + 1,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//     },
//     appBarShift: {
//       marginLeft: drawerWidth,
//       width: `calc(100% - ${drawerWidth}px)`,
//       transition: theme.transitions.create(['width', 'margin'], {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     menuButton: {
//       marginRight: 36,
//     },
//     hide: {
//       display: 'none',
//     },
//     drawer: {
//       width: drawerWidth,
//       flexShrink: 0,
//       whiteSpace: 'nowrap',
//     },
//     drawerOpen: {
//       width: drawerWidth,
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//     },
//     drawerClose: {
//       transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen,
//       }),
//       overflowX: 'hidden',
//       width: theme.spacing(7) + 1,
//       [theme.breakpoints.up('sm')]: {
//         width: theme.spacing(9) + 1,
//       },
//     },
//     toolbar: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'flex-end',
//       padding: theme.spacing(0, 1),
//       // necessary for content to be below app bar
//       ...theme.mixins.toolbar,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//   };
// });
