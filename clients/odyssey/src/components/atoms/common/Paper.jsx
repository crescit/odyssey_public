import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      padding: '15px'
    },
  },
}));

const StyledPaper = ({ id, children, elevation = 3, onClick}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper id={id} elevation={elevation} onClick={onClick}>
        {children}
      </Paper>
    </div>
  );
}

export default StyledPaper; 