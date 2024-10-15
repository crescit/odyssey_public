import React from 'react';
import MoreFromThisShop from './MoreFromThisShop';

// TODO need to build "may also like" algorithm in the backend; this is temporary holder
const MayAlsoLike = ({companyId, merchantName}) => {
  return (
    <MoreFromThisShop
      companyId={companyId}
      merchantName={merchantName}
    />
  );
};

export default MayAlsoLike;