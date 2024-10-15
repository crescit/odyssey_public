import React from 'react';
import { ProductConsumer } from '../../../context';
import { formatPhone } from '../../../common/helperFunctions';
import { defaultShopImg } from '../../../common/constants';
import { useStyles } from './SingleStoreHeader.styled';
import { H2 } from '../../../library/atoms/H2';
import { B1 } from '../../../library/atoms/B1';
import Grid from '@material-ui/core/Grid';

const SingleStore = ({ store }) => {
  const classes = useStyles();
  return (
    <>
      <ProductConsumer>
        {(value = {}) => {
          const {
            img,
            name,
            city,
            state,
            zipCode,
            address,
            phone,
          } = value.detailStore;
          return (
            <section className={classes.section}>
              <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
              >
                <img
                  src={img ? img : defaultShopImg}
                  alt={name + 'logo'}
                  className={classes.image}
                />
                <H2 className={classes.name}>{name}</H2>
              </Grid>
              <Grid
                container
                direction='column'
                justifyContent='flex-end'
                alignItems='flex-end'
              >
                <div className={classes.address}>
                  <B1 className={classes.sub}>{formatPhone(phone)}</B1>
                  <B1 className={classes.sub}>{address}</B1>
                  <B1 className={classes.sub}>{city}</B1>
                  <div className={classes.statezip}>
                    <B1 className={classes.sub}>{state} </B1>
                    <B1 className={classes.sub}>{zipCode}</B1>
                  </div>
                </div>
              </Grid>
            </section>
          );
        }}
      </ProductConsumer>
    </>
  );
};

export default SingleStore;
