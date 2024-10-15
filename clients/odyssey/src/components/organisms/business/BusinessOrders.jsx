import React, { Fragment, useEffect, useState } from 'react';

import { ApiUtil } from '../../../util/ApiUtil';
import { apiURL } from '../../../common/constants';
import { useAuth0 } from '../../../react-auth0-spa';
import Loading from '../../atoms/common/Loading';
import BusinessOrderRow from '../../molecules/business/BusinessOrderRow';
import BusinessOrderTabRow from '../../molecules/business/BusinessOrderTabRow';
import BusinessOrderDetails from '../../molecules/business/BusinessOrderDetails';

import { H5 } from '../../../library/atoms/H5';

const BusinessOrders = ({ company }) => {
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;

  const [order, setOrder] = useState(null);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState(null);

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  }

  const getOrders = async() => {
    setLoading(true)
    const { token, claim } = await getToken();
    if(claim){
      let params;
      if(selected && tabs[selected] && tabs[selected].status ){ params = { status: tabs[selected].status } }
      const res = await ApiUtil.get(apiURL + '/orders', false, null, token, 0, 0, params);
      if(res && res.data){
        setOrders(res.data);
      }
      if(res && !res.data){ setOrders([]) }
      setLoading(false);
    }
  };

  // gets the initial orders
  useEffect(() => {
    if(company && company.id){
      getOrders();
    }
  }, [company])

  // fetches orders with each selection of filter
  useEffect(() => {
    if(company && company.id){
      getOrders();
    }
  }, [selected])

  const tabs = [
    { name: 'All', status: null },
    { name: 'Open', status: 'NEW'},
    { name: 'Ready for Pickup', status: 'PICKUP_READY'},
    { name: 'Fulfilled', status: 'PAID' },
    { name: 'Cancelled', status: 'RETURNED' },
  ];

  const orderColumns = {
    idHeader: 'Order',
    createdHeader: 'Date',
    customer: 'Customer',
    totalHeader: 'Total',
    countHeader: 'Items',
    statusHeader: 'Status'
  };

  const statusToText = {
    'NEW': { label: 'Open', color: '#8CD97E', textColor: 'var(--text-green)' },
    'PICKUP_READY': { label: 'Ready for Pickup', color: '#F2B41D' },
    'PAID': { label: 'Fulfilled', color: 'var(--border)' },
    'RETURNED': { label: 'Cancelled', color: 'var(--danger-red)', textColor: 'var(--text-red)' }
  };

  return !order ? (
    <div className="text-left p-l2">
      <H5 className="p-b3">Orders</H5>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border)'}}>
        <BusinessOrderTabRow tabs={tabs} selected={selected} setSelected={setSelected}/>
      </div>
      <BusinessOrderRow order={orderColumns} colorDict={statusToText} setOrder={(o) => setOrder(o)} idx={-1}/>
      <>{loading && <Loading position={false}/>}</>
      <>{!loading && orders && orders.map((order,idx) => <BusinessOrderRow key={order.id + idx} order={order} idx={idx} colorDict={statusToText} setOrder={(o) => setOrder(o)}/>)}</>
    </div>
  ) : <BusinessOrderDetails o={order} setOrder={(o) =>setOrder(o)} getOrders={getOrders} colorDict={statusToText} tabs={tabs}/>;
};

export default BusinessOrders;