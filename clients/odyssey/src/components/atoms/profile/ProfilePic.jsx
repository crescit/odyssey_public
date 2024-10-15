import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './ProfilePic.styled';
const zuck = 'http://images.odysseycommerce.com/zuck.jpg';

const ProfilePic = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar src={zuck} alt='Mark Zuckerberg' />
    </div>
  );
};

export default ProfilePic;