import React, { useState, useContext, useEffect } from 'react';
// import Grid from '@material-ui/core/Grid';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { get } from 'lodash';

import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context';
import { busiCategories, emptyProduct, emptyVariant, apiURL } from '../../../common/constants'
import BusinessProductDetailSection from '../../atoms/business/BusinessProductDetailSection';
import AlertModal from '../../atoms/common/AlertModal';
import { H5 } from '../../../library/atoms';

const Section = styled.section`
  position: relative;
  height: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  transition: all 0.3s ease-in-out;
  margin-top: -11px;
  padding-top: 0;

  &.no-line {
    border-bottom: none;
  }
`;

const styleHeader = {
  margin: '36px auto 24px var(--spc-2)',
}

const BusinessAddProduct = ({ cid, merchant, addProd, setAddProd, awaitStoreProd, setNewProdId, noline = false }) => {
  const authContext = useAuth0();
  const context = useContext(ProductContext);
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const { products, updateProducts } = context;
  const [expand, setExpand] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [product, setProduct] = useState({...emptyProduct});
  const [newProdCreated, setNewProdCreated] = useState(false);
  const [allowAddPhoto, setAllowAddPhoto] = useState(false);

  const styleAddSec = {
    // marginTop: `${expand ? 'var(--spc-2)' : '0'}`,
    marginTop: 0,
    marginBottom: `${expand ? 'var(--spc-4)' : '0'}`,
    maxHeight: `${expand ? '10000px' : '0'}`,
    paddingBottom: `${expand ? (addProd ? 'var(--spc-4)' : 'var(--spc-1)'): '0'}`,
    borderBottom: `${expand ? '2px solid var(--border)' : 'none'}`,
    backgroundColor: 'var(--element-bkgrd)',
  }

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  }

  // initial creation of new prod and corresponding variants
  const createProdAndVariant = async(e) => {
    // product
    if (product.id) return
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const desc = formData.get('desc') || ' ';
    const vendor = formData.get('vendor') || ' ';
    const category = busiCategories[formData.get('category')];
    // category = category === 'Select a category' ? ' ' : category;
    const company_id = cid
    
    const newProd = {
      ...product,
      name,
      category,
      desc,
      vendor,
      company_id,
      merchant,
    };
    
    // variants
    const variations = formData.getAll('title');
    const prices = formData.getAll('price');
    const quantities= formData.getAll('qty');
    const skus = formData.getAll('sku');
    const barcodes = formData.getAll('barcode');

    const { token, claim } = await getToken();
    if (claim) {
      // adding fields specific for POST product
      newProd.title = newProd.name; 
      newProd.description = newProd.desc; 
      newProd.inventory = newProd.count; 
      const res = await ApiUtil.post(apiURL + '/product', newProd, token);
      const newPid = get(res, 'data.pid', 0);
      newProd.id = newPid;

      const promises = [];
      for (let i = 0; i < variations.length; i++) {
        const newVari = {
          ...emptyVariant,
          pid: newPid,
          title: variations[i],
          price: prices[i],
          inventory_quantity: parseInt(quantities[i]),
          sku: skus[i],
          barcode: barcodes[i],
          position: i + 1,
          options: [],
        };
        newProd.variant_titles.push(variations[i]);
        newProd.prices.push(prices[i]);
        const promise = await ApiUtil.post(apiURL + '/variant', newVari, token)
        promises.push(promise)
      }

      const results = await Promise.allSettled(promises);
      results.forEach((res, i) => {
        newProd.vids.push(get(res, 'value.data.vid', 0));
      })
      // TODO expand the detail on the new prod created
      setProduct(newProd);
      setNewProdId(newPid);
      const tempProds = [newProd, ...products];
      updateProducts(tempProds);
      // await awaitStoreProd(cid);
      setAddProd(false);
      setOpenModal(true);
      setExpand(false);
      setNewProdCreated(true)
      setAllowAddPhoto(true)
    }
    setProduct({...newProd, edited: false})
  };

  useEffect(() => {
    if (addProd) {
      setExpand(true);
      setProduct({...emptyProduct, company_id: cid});
      setNewProdCreated(false);
      setAllowAddPhoto(false);
    }
  // eslint-disable-next-line
  }, [addProd])

  return (
    <Section style={styleAddSec} >
      <H5 style={styleHeader} >Add new product</H5>
      <BusinessProductDetailSection 
        product={product} 
        setProduct={setProduct} 
        cid={cid} pid={product.id} 
        expand={expand} 
        setExpand={setExpand} 
        addProd={addProd} 
        setAddProd={setAddProd} 
        createProdAndVariant={createProdAndVariant}
        newProdCreated={newProdCreated}
        allowAddPhoto={allowAddPhoto}
      />

      <AlertModal 
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        modalHeader={'You can add photos for the product now.'}
        // modalMsgBold={`You can${"\'"}t delete the last variation.`}
        modalMsg={'New product and corresponding variations have been created.'}
      />

    </Section>
  );
};

export default BusinessAddProduct;