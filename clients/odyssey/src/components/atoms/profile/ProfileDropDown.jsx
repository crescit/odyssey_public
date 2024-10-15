import React, { useState } from 'react'
import { useAuth0 } from '../../../react-auth0-spa';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import withWidth from '@material-ui/core/withWidth';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import IconButton from '@material-ui/core/IconButton';
import { useStyles } from './ProfileDropDown.styled'

const ProfileDropDown = ({ style }) => {
  const history = useHistory();
  const classes = useStyles();
  const props = useAuth0();
  const {
    user,
    logout,
  } = props;
  // const authContext = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToProfile = () => {
    handleClose();
    history.push("/profile");
  };
  const redirectToBusiness = () => {
    handleClose();
    history.push("businessprofile");
  };

  const redirectToOrders = () => {
    handleClose();
    history.push("/orders");
  };

  return (
    <div id="odyssey-menu-button" style={{ display: 'flex'}}>
      <IconButton aria-controls="simple-menu" aria-haspopup="true"
        style={style}
        size="small"
        // classes={{ text: classes.capName, label: classes.styleFont }}
        classes={{ label: classes.styleFont }}
        onClick={handleClick}
      >
        <AccountCircleIcon className={classes.acct} />
        <Hidden xsDown>
          {(user.given_name)}
          <ArrowDropDownIcon style={{ fontSize: '30px'}} />
        </Hidden>
      </IconButton>
      <Menu
        id="simple-menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* TODO - COMPLETE THE MENU LIST BELOW */}
        {/* <MenuItem className={classes.menuItem} onClick={redirectToProfile}>My Profile</MenuItem>
        <MenuItem className={classes.menuItem} onClick={redirectToBusiness}>Business Profile</MenuItem>
        <MenuItem className={classes.menuItem} onClick={redirectToOrders}>Orders</MenuItem> */}
        <MenuItem className={classes.menuItem} onClick={() => logout({ returnTo: process.env.REACT_APP_HOST_URL })}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

ProfileDropDown.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(ProfileDropDown);