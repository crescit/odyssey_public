import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../../../context'
import ProductDetail from '../../atoms/products/ProductDetail'
import MoreFromThisShop from '../../atoms/products/MoreFromThisShop';
// import MayAlsoLike from '../../atoms/products/MayAlsoLike';


const SingleProductPage = (props) => {
  const { match } = props;
  const { params = {} } = match;
  const { pid, merchant_name = '', company_id = -1 } = params;
  const context = useContext(ProductContext);
  
  useEffect(() => {
    if (context.search !== '') {
      context.updateSearch('');
    }
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <ProductDetail props={props} pid={pid} />
      <MoreFromThisShop
        companyId={company_id}
        merchantName={merchant_name}
      />
      {/* // TODO May Also Like algorithm */}
      {/* <MayAlsoLike
        companyId={company_id}
        merchantName={merchant_name}
      /> */}
    </>
  );
};

export default SingleProductPage;
