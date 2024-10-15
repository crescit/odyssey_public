import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../../../react-auth0-spa';
import { get } from 'lodash';

import { ApiUtil } from '../../../util/ApiUtil';
import Loading from '../common/Loading';
import { busiCategories, apiURL } from '../../../common/constants';
import ProdEditDetailSec from './ProdEditDetailSec';
import ProdVariantSec from '../../atoms/business/ProdVariantSec';
import { BtnPrimaryMd, BtnSecondaryMd } from '../../../library/atoms/buttons';
import { H5 } from '../../../library/atoms';
import AlertModal from '../common/AlertModal';

const styleGreyBtn = {
  border: '2px solid var(--border)',
  marginRight: 24,
  marginTop: 0,
  zIndex: 3,
};

const styleForm = {
  border: '1px solid var(--border)', 
  borderRadius: 4, 
  marginBottom: 'var(--spc-2)',
  backgroundColor: 'var(--web-bkgrd)',
};

const BusinessProductDetailSection = ({ 
  product, setProduct, 
  cid, pid, 
  expand, setExpand, 
  addProd, setAddProd, 
  createProdAndVariant, 
  newProdCreated,
  allowAddPhoto, 
  newProdId,
}) => {
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [edit, setEdit] = useState(get(product, 'id', -1) === newProdId);
  const [show, setShow] = useState(get(product, 'id', -1) === newProdId);
  const [categories, setCategories] = useState([...busiCategories]);
  const [categoryPicked, setCategoryPicked] = useState(0);

  const lag = 0.3;
  let btnGrpWidth = '201px';
  if (addProd) {
    btnGrpWidth = newProdCreated ? '207px' : '220px';
  };
  const styleButtonWrapper = {
    position: 'relative',
    float:'right',
    top: 18, 
    right: `${addProd ? '-7px' : '19px'}`,
    display: 'flex',
    flexWrap: 'nowrap',
    transition: `all ${lag}s ease-in-out`,
    width: `${edit ? btnGrpWidth : '81px'}`,
    overflowX: 'clip',
  };

  const styleContractLeft = {
    transition: 'all 0.1s ease-in 0s',
    width: `${edit ? '0px' : '71px'}`,
    marginLeft: `${edit ? '0px' : '5px'}`,
    visibility: `${edit ? 'hidden' : 'visible'}`,
  };
  
  const styleExpandLeft = {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: '0 5px',
    visibility: `${edit ? 'visible' : 'hidden'}`,
    zIndex: 3,
  };

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  };
  
  const updateProduct = async(e) => {
    if (!product.edited) return
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const desc = formData.get('desc');
    const vendor = formData.get('vendor');
    let category = busiCategories[formData.get('category')];
    category = category === 'Select a category' ? '' : category;

    const updatedProd = {
      ...product,
      name,
      category,
      desc,
      vendor,
    };
    setProduct(updatedProd);
    
    const { token, claim } = await getToken();
    if (claim) {
      await ApiUtil.patch(apiURL + `/product`, updatedProd, token);
    }
    setProduct({...updatedProd, edited: false})
  };

  const reverseCategoryPicked = () => {
    let prev = product && product.category;
    const idx = busiCategories.indexOf(prev);
    if (idx !== -1) {
      setCategoryPicked(idx);
    } else {
      setCategoryPicked(0);
    }
  };

  const handleEditProduct = (e) => {
    e.preventDefault();
    setShow(true);
    setEdit(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    reverseCategoryPicked();
    setProduct({...product, edited: false})
    setEdit(false);
    hideSlow(setShow);
  };
  
  const handleCancelAddProd = (e) => {
    e.preventDefault();
    setExpand(false);
    hideSlow(setAddProd);
  };

  const handleSave = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const categoryIdx = formData.get('category');
    if (!categoryIdx) return setOpenModal(true);
    
    setEdit(false);
    setLoading(true);
    hideSlow(setShow);
    if (addProd) {
      await createProdAndVariant(e)
      // when it is DONE, need to update Prod, variant, and add variant
    } else {
      await updateProduct(e);
    }
    setLoading(false); 
  };

  const hideSlow = (setFuncToFalse) => {
    setTimeout(() => {
      // setShow(false);
      setFuncToFalse(false);
    }, lag * 1000);
  }

  const awaitProduct = async(pid) => {
    setLoading(true);
    if (addProd) return setLoading(false);
    const res = await ApiUtil.get(apiURL + '/product', true, pid);
    const tempData = get(res, 'data.products[0]', []);
    setProduct(tempData);
    setLoading(false);
  };

  useEffect(() => {
    expand && pid && awaitProduct(pid);
    if (expand && addProd) {
      setEdit(true);
      setShow(true);
      setLoading(false)
    }
    if(addProd && !pid) setCategoryPicked(0)
    // setCategoryPicked(0)
  // eslint-disable-next-line
  }, [expand, newProdCreated]);

  return(
    <form 
      onSubmit={handleSave}
      className={'text-left m-x2'} 
      style={styleForm}
    >

      {!addProd &&
      <div style={styleButtonWrapper}>
        <div style={styleContractLeft} >
          <BtnSecondaryMd onClick={handleEditProduct} disabled={edit || loading} >
            Edit
          </BtnSecondaryMd>
        </div>

        <div style={styleExpandLeft} >
        {show && 
          <>
            <BtnSecondaryMd onClick={handleCancel} style={styleGreyBtn} disabled={!edit} >
              Cancel
            </BtnSecondaryMd>
            <BtnSecondaryMd type='submit' disabled={!edit} >
              Save
            </BtnSecondaryMd>
          </>
        }
        </div>
      </div>
      }

      <H5 className={'m-b4 m-t3 m-l2'} >Product information</H5>
      {loading && <Loading style={{position: 'absolute', minHeight: 'auto'}} />}

      <ProdEditDetailSec 
        product={product} 
        setProduct={setProduct} 
        cid={cid} pid={pid} 
        edit={edit} 
        expand={expand} 
        addProd={addProd} 
        categories={categories}
        categoryPicked={categoryPicked}
        setCategoryPicked={setCategoryPicked}
        allowAddPhoto={allowAddPhoto}
      />
      
      {addProd && 
      <>
        <ProdVariantSec 
          id="product-variant-section" 
          pid={product && product.id} 
          cid={product && product.company_id} 
          expand={expand} 
          addProd={addProd} 
        />
        {show && 
          <div style={styleButtonWrapper}>  
            <div style={styleExpandLeft} >
              <>
                <BtnSecondaryMd onClick={handleCancelAddProd} style={styleGreyBtn} >
                  Cancel
                </BtnSecondaryMd>
                <BtnPrimaryMd type='submit' >
                  Create
                </BtnPrimaryMd>
              </>
            </div>
          </div>
        }
      </>
      }
    

      <AlertModal
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        modalHeader={'Category is required. Please select from the dropdown.'}
      />

    </form>
  )
};

export default BusinessProductDetailSection;