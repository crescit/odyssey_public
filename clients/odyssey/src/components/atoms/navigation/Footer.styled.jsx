import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';

export const useStyles = makeStyles({
  container: {
    width: '101vw',
    backgroundColor: 'white',
    color: '#F5F5F5',
    marginTop: 20,
    zIndex: '1',
  },
  icon: {
    width: 24,
    color: '#1C130C',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    position: 'static',
    justifyContent: 'space-between',
  },
  subdiv: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 0,
    marginRight: 0,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    color: '#000000',
    marginTop: 24,
    marginBottom: 16,
  },
  subtitle: {
    color: '#000000',
    textAlign: 'left',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  headings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bottom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'static',
    marginTop: 24,
    marginBottom: 32,
  },
  link: {
    display: 'flex',
    textDecoration: 'none !important',
  },
});

export const SocialIcons = styled.div`
  transition: transform 250ms;
  display: inline-block;
  &:hover {
    transform: translateY(-2px);
  }
`;

export const Line = styled.hr`
  border: 1px solid #bdb4ad;
  height: 0px;
  positon: static;
  flex: none;
  flex-grow: 0;
`;
