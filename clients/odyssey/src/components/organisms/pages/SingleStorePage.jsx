import React, { useState, useContext, useEffect } from 'react';
import SingleStoreHeader from '../../atoms/stores/SingleStoreHeader';
import SingleStoreProducts from '../../atoms/stores/SingleStoreProducts';
import Loading from '../../../components/atoms/common/Loading';
import { ProductContext } from '../../../context';

const SingleStorePage = (props) => {
  const { match } = props;
  const context = useContext(ProductContext);
  const { 
    detailStore, 
    setDetailStore, 
    updateSearch,
    searchProductsById 
  } = context;
  const [loading, setLoading] = useState(true);
  
  const awaitStore = async(companyID) => {
    if (detailStore.id !== parseInt(companyID)) {
      await setDetailStore(companyID);
    }
    await searchProductsById(companyID);
    setLoading(false);
  };

  useEffect(() => {
    updateSearch('');
    setLoading(true);
    // if(search === '') {
      const { params = {}} = match;
      const { id } = params;
      awaitStore(id)
    // }
  // eslint-disable-next-line
  }, [match.params.id])

  return (
    <div>
      {
        loading  ? 
        <Loading /> :
        <div>
          <SingleStoreHeader />
          <SingleStoreProducts />
        </div>
      }
    </div>
  );
};

export default SingleStorePage;
