import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../../components/atoms/common/Loading';
import { ProductContext } from '../../../context';
import { B1Link, H5 } from '../../../library/atoms';
import SingleStoreProducts from '../stores/SingleStoreProducts';
import { Section } from './MoreFromThisShop.styled';

const MoreFromThisShop = ({companyId, merchantName, selectedShop}) => {
  const context = useContext(ProductContext);
  const [loading, setLoading] = useState(true);

  const awaitStore = async(companyID) => {
    if (companyID) {
      await context.setDetailStore(companyID)
      await context.searchProductsById(companyID)
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    awaitStore(companyId)
  // eslint-disable-next-line
  }, [companyId])

  return (
    <>
      <Section className={'m-t4 m-b2'}>
        <H5>{`More from ${selectedShop ? 'selected' : 'this'} shop`}</H5>
        <Link to={`/store/${companyId}/${merchantName}`} style={{ textDecoration: 'none'}} >
          <B1Link>
            View more <span className={'material-icons'}>east</span>
          </B1Link>
        </Link>
      </Section>
      <Section>
        { loading ? <Loading/> :
          <SingleStoreProducts numItemsToShow={6} />
        }
      </Section>
    </>
  );
}

export default MoreFromThisShop;