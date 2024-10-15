import React from 'react';
import { useStyles } from '../common/Browse.styled';
import LowestPrice from '../common/LowestPrice';
import { defaultNoImg } from '../../../common/constants';
import { ProductConsumer } from '../../../context';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { B1 } from '../../../library/atoms/B1';
import { B2 } from '../../../library/atoms/B2';

const prodImg = {
  width: '100%', 
  height: 203, 
  borderRadius: 8, 
  objectPosition: 'center',
  objectFit: 'contain',
}

const ProductBrowse = ({ product }) => {
  /* eslint-disable no-unused-vars */
  const { id, company_id, name, img, store, prices, desc, merchant } = product;
  const classes = useStyles();

  return (
    <ProductConsumer>
      {(value = {}) => (
        <div onClick={() => value.handleProductDetails(id)}>
          <Link to={`/product/${id}/${merchant}/${company_id}`} style={{ textDecoration: 'none' }}>
            <img
              src={img ? img : defaultNoImg}
              alt={desc}
              style={prodImg}
            />
            <div style={{ color: 'var(--title)', textAlign: 'left' }}>
              <B1>{name}</B1>
              <B2 style={{ color: 'var(--body)'}}>{merchant}</B2>
              <B1><LowestPrice prices={prices}/></B1>
            </div>
          </Link>
        </div>
      )}
    </ProductConsumer>
  );
};

ProductBrowse.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    store: PropTypes.string,
    price: PropTypes.number,
    desc: PropTypes.string,
    merchant: PropTypes.string,
  }).isRequired,
};

export default ProductBrowse;
