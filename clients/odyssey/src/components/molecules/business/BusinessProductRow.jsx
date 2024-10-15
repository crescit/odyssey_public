import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';
import { get } from 'lodash';

import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context';
import Loading from '../../atoms/common/Loading';
import LowestPrice from '../../atoms/common/LowestPrice';
import DeleteListingModal from '../../atoms/business/DeleteListingModal';
import ProdVariantSec from '../../atoms/business/ProdVariantSec';
import BusinessProductDetailSection from '../../atoms/business/BusinessProductDetailSection';
import { BtnSecondaryMd } from '../../../library/atoms/buttons';
import { B1 } from '../../../library/atoms';
import { defaultNoImg } from '../../../common/constants';

const Section = styled.section`
  border-top: 0.5px solid var(--border);

  &.no-line {
    border-top: none;
  }

  &.expand {
    background-color: var(--element-bkgrd);
  }
`;

const ProdImg = styled.img`
  width: 72px;
  height: 72px;
  object-fit: contain;
`;

const loadingBackdrop = {
  position: 'absolute',
  height: '100%',
  width: 'calc(100% - var(--spc-4))',
  margin: '0 var(--spc-2)',
  backgroundColor: 'lightgrey',
  opacity: 0.5,
  zIndex: 3,
};

const BusinessProductRow = ({
  prod,
  addProd,
  setAddProd,
  newProdId,
  noline = false,
}) => {
  const authContext = useAuth0();
  const context = useContext(ProductContext);
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const { deleteProduct, deleteVariant } = context;
  const [loading, setLoading] = useState(false);
  const [expand, setExpand] = useState(get(prod, 'id', -1) === newProdId);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState({ ...prod });
  const useStyle = makeStyles({
    arrow: {
      margin: 'var(--spc-2)',
      transition: 'all 0.3s ease-in-out',
      transform: `${expand && 'rotate(90deg)'}`,
      cursor: 'pointer',
    },
    editSection: {
      position: 'relative',
      height: `auto`,
      overflowY: `${expand ? 'auto' : 'hidden'}`,
      flexWrap: 'nowrap',
      transition: 'all 0.3s ease-in-out',
      marginTop: `${expand ? 'var(--spc-2)' : '0'}`,
      maxHeight: `${expand ? '10000px' : '0'}`,
    },
  });
  const classes = useStyle();

  const getToken = async () => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return { token, claim };
    } catch (err) {
      console.error('error with auth');
    }
  };

  const confirmDelete = async () => {
    setLoading(true);
    const pid = (product && product.id) || 0;
    const cid = (product && product.company_id) || 0;
    const { token, claim } = await getToken();
    if (claim) {
      setOpenModal(false);
      await deleteProduct(pid, cid, token);
    }
    // setLoading(false);
  };

  const handleArrowClick = () => {
    setExpand(!expand);
    // TODO cancel edit when close
  };

  const handleDeleteProduct = async () => {
    setOpenModal(true);
  };

  useEffect(() => {
    addProd && setExpand(true);
    // eslint-disable-next-line
  }, [addProd]);

  return (
    <Section className={`p-y1 ${noline && 'no-line'} ${expand && 'expand'}`}>
      <Grid container alignItems='center' spacing={2}>
        <Grid
          item
          md={2}
          lg={2}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {product && product.imgHeader}
          {product && !product.imgHeader && (
            <>
              <ArrowForwardIosIcon
                classes={{ root: classes.arrow }}
                onClick={handleArrowClick}
              />
              <ProdImg
                src={
                  get(product, 'img', '') === '' ? defaultNoImg : product.img
                }
                alt={product.name + ' image'}
              />
            </>
          )}
        </Grid>

        <Grid item md={3} lg={3}>
          <div style={{ fontWeight: '600' }}>
            {product && product.titleHeader}
          </div>
          {product && !product.titleHeader && <B1>{product.name}</B1>}
        </Grid>

        <Grid item md={3} lg={3}>
          <div style={{ fontWeight: '600' }}>
            {product && product.categoryHeader}
          </div>
          {product && !product.titleHeader && <B1>{product.category}</B1>}
        </Grid>

        <Grid item md={2} lg={2}>
          <div style={{ fontWeight: '600' }}>
            {product && product.inventoryHeader}
          </div>
          {product && !product.titleHeader && <B1>{product.count}</B1>}
        </Grid>

        <Grid item md={2} lg={2}>
          <div style={{ fontWeight: '600' }}>
            {product && product.priceHeader}
          </div>
          {product && !product.titleHeader && (
            <B1>
              <LowestPrice prices={product.prices} />
            </B1>
          )}
        </Grid>
      </Grid>

      <Grid
        container
        direction='column'
        classes={{ root: classes.editSection }}
      >
        <BusinessProductDetailSection
          product={product}
          setProduct={setProduct}
          cid={product && product.company_id}
          pid={product && product.id}
          expand={expand}
          newProdId={newProdId}
        />

        <ProdVariantSec
          id='product-variant-section'
          pid={product && product.id}
          cid={product && product.company_id}
          expand={expand}
          deleteVariant={deleteVariant}
        />

        {loading && (
          <Loading
            style={{
              position: 'absolute',
              minHeight: 'auto',
              marginTop: '28%',
            }}
          />
        )}
        {loading && <div style={loadingBackdrop}></div>}

        <BtnSecondaryMd
          onClick={handleDeleteProduct}
          style={{ width: 'fit-content', height: 48 }}
          className={'m-t2 m-b1 m-l2'}
        >
          {loading ? (
            <Loading position={true} style={{ width: 157 }} />
          ) : (
            'Delete product'
          )}
        </BtnSecondaryMd>
        <DeleteListingModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          confirmDelete={confirmDelete}
          modalHeader={'Confirm Delete Listing'}
          modalTitle={'Are you sure you want to delete the product'}
          modalMsgBold={`${product && product.name}?`}
          modalMsg={`You can't undo this action.`}
        />
      </Grid>
    </Section>
  );
};

export default BusinessProductRow;
