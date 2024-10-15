import React from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ProductConsumer } from '../../../context';
import { defaultShopImg } from '../../../common/constants';
import { B1 } from '../../../library/atoms/B1';
import { B2 } from '../../../library/atoms/B2';

const StoreBrowse = ({ store, isMap = false }) => {
  const { id, name, img, category, zip = null, address = null, state = null, phone = null, distance = null } = store;
  return (
    <ProductConsumer>
      {(value = {}) => (
        <div 
        onClick={() => value.handleStoreDetails(id)} 
        className={isMap ? 'p-y2 m-x2' : null}
        style={{ borderBottom: isMap ? '1px solid var(--border)' : null, textAlign: isMap ? 'left' : null, whiteSpace: isMap ? 'nowrap' : null }}
        >
          <Link to={`/store/${id}/${name}`} style={{ textDecoration: 'none', display: isMap ? 'flex' : null }}>
            <img
              className={!isMap ? 'disp-flex' : null}
              src={img ? img : defaultShopImg}
              alt={`${name} front`}
              style={{ 
                width: '100%', height: 206,
                maxWidth: 336, 
                borderRadius: 8, 
                objectPosition: 'center',
                objectFit: 'cover'
              }}
            />
            <div 
              className={isMap ? 'm-l2' : null}
              style={{ color: 'var(--title)', textAlign: 'left', display: isMap ? 'flex' : null, flexDirection: isMap ? 'column' : null, verticalAlign: isMap ? 'top' :  null , position: isMap ? 'relative' :  null, width: isMap ? '35%' : null}}>
              {isMap && <B2><LocationOnIcon style={{ width: '14px', height: '20px', color: 'var(--label-active)', position: 'relative', top: '5px'}}/>Approx. {distance} miles from you</B2>}
              <B1>{name}</B1>
              <B2>{category}</B2>

              {
                isMap && (
                <div style={{ color: 'var(--title)', textAlign: 'left', display: 'inline-block', verticalAlign: 'bottom', marginTop: 'auto' }}>
                  <B2>{phone}</B2>
                  <B2>{address}</B2>
                  <B2>{state} {zip}</B2>
                </div>
              )}
            </div>
          </Link>
        </div>
      )}
    </ProductConsumer>
  );
};

StoreBrowse.propTypes = {
  store: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name: PropTypes.string,
    img: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zipCode: PropTypes.string,
    address: PropTypes.string,
    desc: PropTypes.string,
    distance: PropTypes.number
  }).isRequired,
};

export default StoreBrowse;
