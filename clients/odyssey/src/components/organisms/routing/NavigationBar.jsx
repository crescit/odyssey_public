import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ReceiptIcon from '@material-ui/icons/Receipt';
import StoreIcon from '@material-ui/icons/Store';

import NavigationButton from '../../atoms/navigation/NavigationButton';
import { navNarrowWidth } from '../../../style_constants/navigationbar';

const drawerWidth = 118;
const menuIconPosition = {
  display: 'flex', 
  justifyContent: 'flex-start', 
  height: '68px',
  position: 'fixed', 
  zIndex: 1200
};
const closeIconPosition = {
  display: 'flex', 
  justifyContent: 'flex-start',
  height: '68px',
  position: 'static', 
};

const MiniDrawer = () => {
  const [path, setPath] = useState(null);
  const [open, setOpen] = useState(false);
  let location = useLocation();
  const theme = useTheme();
  
  const StyledDrawer = styled(Drawer).attrs({
    classes: {
      paper: 'paper',
      root: 'root',
    },
  })`
    div {
      background-color: var(--primary);
      .root {
        display: flex;
        z-index: 10;
      };
      width: ${({ open }) => {
        return open ? drawerWidth + 'px' : navNarrowWidth;
      }};
    }
`;

  const navListItems = [
    {to: '/', icon: <HomeIcon />, text: 'Home'},
    {to: '/stores', icon: <StoreIcon />, text: 'Stores'},
    // {to: '/orders', icon: <ReceiptIcon />, text: 'Orders'},
    {to: '/businesscenter/orders', icon: <BusinessCenterIcon />, text: 'Console'},
  ];

  const handleDrawerOpen = (isTouch) => {
    if (isTouch && open) {
      return setOpen(false);
    }
    setOpen(true);
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const NavList = (
    <List>
      {navListItems.map(nav => 
        <NavigationButton
          key={nav.text}
          to={nav.to}
          icon={nav.icon}
          open={open}
          text={nav.text}
          handleDrawerClose={handleDrawerClose}
        />
      )}
    </List>
  );
  
  useEffect(() => {
    setPath(location.pathname)
  }, [location]);
  
  return path != '/login' ? (
    <div style={{position: 'relative'}} >
      <CssBaseline />
      <Hidden smDown >
        <StyledDrawer
          variant='permanent'
          className={'open'}
          onMouseEnter={handleDrawerOpen}
          onTouchStart={() => handleDrawerOpen(true)}
          onMouseLeave={handleDrawerClose}
          open={open}
        >
          {NavList}
        </StyledDrawer>
      </Hidden>

      <Hidden mdUp >
        <div style={menuIconPosition} >
          <IconButton 
            aria-label="Open drawer"
            // edge="start"
            onClick={handleDrawerOpen} 
          >
            <MenuIcon/>
          </IconButton>
        </div>
        <StyledDrawer
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          className={'open'}            
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div style={closeIconPosition} >
            <IconButton 
              aria-label="Close drawer"
              // edge="start"
              onClick={handleDrawerClose} 
            >
              <CloseIcon/>
            </IconButton>
          </div>
          {NavList}
        </StyledDrawer>
      </Hidden>

    </div>
  ) : null;
}

MiniDrawer.propTypes = {
  width: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs']).isRequired,
};

export default withWidth()(MiniDrawer);