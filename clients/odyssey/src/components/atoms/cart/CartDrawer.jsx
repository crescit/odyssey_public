import React from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../../../context";
import CartList from "./CartList";
import CartTotals from "./CartTotals";
import Loading from "../common/Loading";
import { H5, H7 } from "../../../library/atoms";
import { BtnPrimaryMd } from "../../../library/atoms/buttons";
import { Drawer, Box, List } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles } from "./CartDrawer.styled";

const CartDrawer = ({ open, onClose }) => {
  const classes = useStyles();
  const inDrawer = true;
  const styleLoading = {
    position: 'fixed', 
    marginTop: 0, 
    width: 440, 
    minHeight: 'unset', 
    height: '100%', 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    zIndex: 5
  };

  const handleCheckout = (e) => {
    onClose();
  }

  return (
    <Drawer
      variant={"temporary"}
      open={open}
      onClose={onClose}
      anchor={"right"}
      classes={{ paper: classes.drawerPaper }}
    >
      <ProductConsumer>
        {(value = {}) => {
          const cart = value && value.cart ? value.cart : [];
          const itemCnt = cart.length? cart.reduce((acc, item) => acc += item.count, 0) : 0;
          return value && value.loadingCart ? <div className={'m-t6 p-t6'} ><Loading /></div> 
          : 
          (
            <>
            {value && value.loadingCartItem && <Loading style={styleLoading} />}
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="flex-start"
              position="relative"
              height="100%"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                className="p-t2 p-x2 p-b0"
              >
                <H7>
                  Cart
                  <H5 className={'disp-inline m-l1'} style={{ fontWeight: 300 }} >
                    {itemCnt} {itemCnt > 1 ? `Items` : `Item`}
                  </H5>
                </H7>
                <CloseIcon onClick={onClose} cursor="pointer" />
              </Box>
              { itemCnt ? (
                <>
                  <List className={classes.list}>
                    <CartList 
                      value={value} 
                      inDrawer={inDrawer}
                    />
                  </List>
                  <div className={classes.wrapper}>
                  <CartTotals value={value} />
                  <Link to="/cart" onClick={handleCheckout}>
                    <BtnPrimaryMd 
                      style={{ width: 'calc(100% - var(--spc-4))' }}
                      className={'m-x2'}
                    >
                      Checkout
                    </BtnPrimaryMd>
                  </Link>
                  </div>
                </>
              ) : (
                <Box
                  display="flex"
                  height="25vh"
                  justifyContent="center"
                  alignItems="center"
                  marginBottom="60vh"
                >
                  <H7>
                    Your cart is empty.
                  </H7>
                </Box>
              )}
            </Box>
          </>
          );
        }}
      </ProductConsumer>
    </Drawer>
  );
};

CartDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default CartDrawer;
