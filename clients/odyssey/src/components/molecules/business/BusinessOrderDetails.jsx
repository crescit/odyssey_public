import React, { useEffect, useRef, useState } from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Grid from '@material-ui/core/Grid';

import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import { Background, Button, Chevron, Date, DetailsContent, DetailsHeader, StatusOption, StyledB1, StyledSelect, StyledMenuItem, TotalSection } from './BusinessOrderDetails.styled';
import { H5 } from '../../../library/atoms/H5';
import { PG } from '../../../library/atoms/PG';
import StatusBadge from '../../atoms/stores/StatusBadge';
import BusinessOrderProduct from '../../atoms/stores/BusinessOrderProduct';
import { formatCurrency, parseDate } from '../../../common/helperFunctions';
import { apiURL } from '../../../common/constants';

const BusinessOrderDetails = ({ o = {}, setOrder = () => {}, colorDict = {}, tabs = [], getOrders = () => {}}) => {
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  
  const [order, setOrderState] = useState(null);
  const [label, setLabel] = useState(null);
  const [statusOpen, setStatusOpen] = useState(false);
  const statusButton = useRef(null);
  const hasWidth = statusButton && statusButton.current && statusButton.current.clientWidth;

  // init label
  useEffect(() => {
    const l = o && o.status && colorDict[o.status];
    setOrderState(o);
    setLabel(l);
  }, [order,label])
  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  }

  const callStatusApi = async (e) => {
    const status = e.target.value;
    const { token, claim } = await getToken();
    if(claim){
      await ApiUtil.patch(apiURL + `/order/${order && order.id}/${status}`, {}, token)
      let clone = order;
      clone.status = status;
      setOrder(clone)
      setOrderState(clone)
      setLabel(clone && clone.status && colorDict[clone.status])
      getOrders()
    }
    setStatusOpen(false);
  }

  const popOver = { 
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    getContentAnchorEl: null
  };
  const options = {  year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' };

  return(
    <Background className="p-x2">
      <StyledB1 className="text-left" onClick={() => setOrder(null)} style={{ zIndex: '2' }}>
        <ChevronLeftIcon/>
        Orders
      </StyledB1>

      <DetailsHeader className="m-t2">
        <Grid container className="p-x2 p-t1">

          <Grid item md={6} lg={6}>
            <H5 className="text-left">
              {order && '#' + order.id}
              <Date className="disp-inline">{order && !order.createdHeader && new window.Date(order.created).toLocaleString('en-EN', options)}</Date>  
            </H5>
            <StatusBadge className="m-t1" style={{ backgroundColor: label && label.color}}>
              {order && label && label.label}
            </StatusBadge>
          </Grid>

          <Grid item md={6} lg={6} className="text-right m-yauto">
            <StyledSelect
              ref={statusButton}
              id="simple-select-variant"
              MenuProps={ popOver }
              onChange={callStatusApi}
              renderValue={() => <>Change order status</>}
              value={'Change order status'}
            >
              {tabs.slice(2).map((stat,idx) => <StyledMenuItem style={{ width: `${hasWidth}px` }} className="menu-item" key={stat.name + idx} value={stat.status}>{stat.name}</StyledMenuItem>)}
            </StyledSelect>
          </Grid>

        </Grid>
      </DetailsHeader>

      <DetailsContent>
        <Grid container className="p-2 text-left">

          <Grid item md={7} lg={7}>
            <PG className="font-bold p-b1">Pickup on</PG>
            <PG>{order && !order.createdHeader && new window.Date(order.created).toLocaleString('en-EN', options)}</PG>
            <>
              {order && order.products && order.products.map((prod, idx) => <BusinessOrderProduct product={prod} key={prod.name + idx}/>)}
            </>

            <TotalSection className="text-right p-2">
              <PG className="font-bold">Subtotal <span className="m-lauto">{order && formatCurrency(Number.parseInt(order.total, 10) / 100)}</span></PG>
              <PG className="font-bold p-t1">Total <span className="m-lauto">
                {order && 
                  formatCurrency(
                  (Number.parseInt(order.total, 10) / 100) + 
                  ((Number.parseInt(order.total, 10) / 100) * 0.03 ) +
                  ((Number.parseInt(order.total, 10) / 100) * 0.029 + .3 )
                )}</span></PG>
            </TotalSection>
          </Grid>

          <Grid item md={5} lg={5} className="border-left p-x2">
            <PG className="font-bold">Customer</PG>
            <PG className="p-b2">{order && order.customer}</PG>
            <PG className="font-bold p-b1">Contact Information</PG>
            <PG className="p-b2">{order && order.customer_email}</PG>
          </Grid>

        </Grid>
      </DetailsContent> 
    </Background>
  );
};

export default BusinessOrderDetails;