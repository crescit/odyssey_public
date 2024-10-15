import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from '../common/SearchBar';
import { ProductConsumer, ProductContext } from '../../../context';
import CartDrawer from '../cart/CartDrawer';
import LoginButton from '../../atoms/common/LoginButton';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ThemeProvider } from '@material-ui/core/styles';
import { Logo, FixedWrapper, useStyles, theme, StyledToolBar } from './ButtonAppBar.styled';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { unAuthPaths } from '../../../util/tools';

// const logo = 'http://images.odysseycommerce.com/logo.jpg';
const logo = 'http://images.odysseycommerce.com/WhiteLogoOrange.jpg';

const ButtonAppBar = (props) => {
  const [path, setPath] = useState(null);
  const classes = useStyles();
  let location = useLocation();
  useEffect(() => {
    setPath(location.pathname)
  }, [location]);
  const [curLoc, setCurLoc] = useState(location.pathname);
  const isCurrentlyInCheckout = location.pathname.includes('/checkout');
  const [inCheckout, setInCheckout] = useState(isCurrentlyInCheckout);
  const { 
    getTokenSilently, 
    getIdTokenClaims, 
    isAuthenticated = false 
  } = useAuth0();
  const context = useContext(ProductContext);
  const { setCart } = context;

  const getUserCartData = async() => {
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if (claim) setCart(token);
  }
  if (curLoc !== location.pathname) {
    setCurLoc(location.pathname);
    setInCheckout(isCurrentlyInCheckout);
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserCartData()
    }
  // eslint-disable-next-line
  }, [isAuthenticated])


  return !unAuthPaths.has(path) ? (
    <FixedWrapper >
        <ThemeProvider theme={theme}>
          <AppBar position='static'>
            <StyledToolBar className={classes.root} >
              <Link to='/' className={classes.logoLink} >
                <Typography variant='h6' ></Typography>
                <Logo src={logo} alt='logo' />
                <div className={classes.logo}>OdysseyCommerce</div>
              </Link>

              <div className={classes.wrapper} >
                {path !== '/login' && <SearchBar />}

                <div className={classes.loginNCart} >
                  {path !== '/login' && <LoginButton/>}
                  {/* {auth && ( */}
                    {path !== '/login' && <div>
                      <ProductConsumer>
                        {(value = {}) => {
                          const { cart, openCart, shoppingCartOpen } = value;
                          const cartItemCount = cart.length? cart.reduce((acc, item) => acc += item.count, 0) : 0;
                          return (
                            <>
                            {/* <Link to='/cart' style={inCheckout ? {pointerEvents: 'none'} : null} > */}
                            <IconButton
                              color='inherit'
                              // disabled={inCheckout}
                              className={classes.cartBtn}
                            >
                            <Link to='/cart' className={classes.cartLink} >
                                <ShoppingCartIcon />
                                <span className={classes.span}>{cartItemCount}</span>
                            </Link>
                            </IconButton>
                            <CartDrawer open={shoppingCartOpen} onClose={openCart} />
                            </>
                          );
                        }}
                      </ProductConsumer>
                    </div>}
                  {/* )} */}
                </div>

              </div>
            </StyledToolBar>
          </AppBar>
        </ThemeProvider>
    </FixedWrapper>
  ) : null;
};

export default ButtonAppBar;
