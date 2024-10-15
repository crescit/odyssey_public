import React, { Fragment } from 'react';
import { Backdrop, PositionedDiv, theme } from './Loading.styled';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ThemeProvider } from '@material-ui/core/styles';

const Loading = ({ position = true, style }) => (
  <Fragment>
    <ThemeProvider theme={theme}>
    <Backdrop style={style} >
      {position ? 
      <PositionedDiv>
        <CircularProgress className="loading-circle"/>
      </PositionedDiv>
      : <CircularProgress/>
      }
    </Backdrop>
    </ThemeProvider>
  </Fragment>
);

export default Loading;
