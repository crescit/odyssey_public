import React, { useEffect } from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import { formatCurrency, parseDate } from '../../../common/helperFunctions';
import StatusBadge from '../../atoms/stores/StatusBadge';

const Div = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  font-size: 16px;
  color: var(--label);
  cursor: pointer;

  &:hover {
    background-color: var(--orange-bg);
  }
  &.header:hover {
    background-color: white;
  }
  &.header {
    cursor: default;
  }
  &.active {
    color: var(--label-active);
    font-weight: bold;
  }
`;
const BusinessOrderRow = ({ order, colorDict = {}, setOrder, idx = -1 }) => {
  const hasProductLength = order && !order.countHeader && order.products;
  // request a weekday along with a long date
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  };

  return (
    /* removing click handler for first row so header row doesn\'t fire */
    <Div
      className={`p-y2 p-l1 ${order && order.status == 'NEW' ? 'active' : ''} ${
        idx == -1 ? 'header' : ''
      }`}
      onClick={() => (idx !== -1 ? setOrder(order) : null)}
    >
      <Grid container>
        <Grid item md={1} lg={1}>
          {order && !order.idHeader && order.id && '#'}
          {order && !order.idHeader && order.id}
          {order && order.idHeader}
        </Grid>

        <Grid item md={3} lg={3}>
          {order && order.createdHeader}
          {order &&
            !order.createdHeader &&
            new Date(order.created).toLocaleString('en-EN', options)}
        </Grid>

        <Grid item md={2} lg={2}>
          {order && order.customer}
        </Grid>

        <Grid item md={2} lg={2}>
          {order && order.totalHeader && order.totalHeader}
          {order &&
            !order.totalHeader &&
            formatCurrency(Number.parseInt(order.total, 10) / 100)}
        </Grid>

        <Grid item md={2} lg={2}>
          {order && order.countHeader}
          {hasProductLength && order.products.length}
          {order && !order.countHeader && ' item'}
          {hasProductLength && order.products.length > 1 ? 's' : null}
        </Grid>

        <Grid item md={2} lg={2}>
          {order && order.statusHeader}
          <StatusBadge
            style={{
              backgroundColor: get(colorDict, `${order.status}.color`, ''),
              color: get(colorDict, `${order.status}.textColor`, 'inherit'),
            }}
          >
            {order && get(colorDict, `${order.status}.label`, '')}
          </StatusBadge>
        </Grid>
      </Grid>
    </Div>
  );
};

export default BusinessOrderRow;
