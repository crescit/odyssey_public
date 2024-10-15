import React, { useState, useEffect } from 'react'
import { get, cloneDeep } from 'lodash';
import { useAuth0 } from '../../../react-auth0-spa';

import { ApiUtil } from '../../../util/ApiUtil';
import { apiURL } from '../../../common/constants';
import Loading from '../../../components/atoms/common/Loading';
import VariantRow from './VariantRow';
import { BtnSecondaryMd } from '../../../library/atoms/buttons';
import { H5 } from '../../../library/atoms';
import { emptyVariant } from '../../../common/constants'
// import { testVariants } from '../../../test_data/testVariants'

const VariantCols = {
  variationHeader: 'Variations',
  priceHeader: 'Price',
  qtyHeader: 'Quantity',
  SKUHeader: 'SKU',
  barcodeHeader: 'Barcode',
  trashHeader: ' ',
  header: true,
};

const styleGreyBtn = {
  border: '2px solid var(--border)',
  marginRight: 24,
  marginTop: 0,
};

const styleForm = {
  border: '1px solid var(--border)', 
  borderRadius: 4, 
  height: '90%', 
  marginBottom: 'inherit',
  backgroundColor: 'var(--web-bkgrd)',
};

const ProdVariantSec = ({cid, pid, expand, deleteVariant, addProd }) => {  
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const [loading, setLoading] = useState(true);
  const [variants, setVariants] = useState([]);
  const [prevVariants, setPrevVariants] = useState([]);
  const [edit, setEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [show, setShow] = useState(false);

  const lag = 0.3;
  const styleEditSaveBtn = {
    position: 'relative',
    float:'right',
    top: 18, 
    right: 18,
    display: 'flex',
    flexWrap: 'nowrap',
    transition: `all ${lag}s ease-in-out`,
    width: `${edit ? '201px' : '81px'}`,
    overflowX: 'clip',
  };

  const styleContractLeft = {
    transition: 'all 0.1s ease-in 0s',
    width: `${edit ? '0px' : '71px'}`,
    marginLeft: 5,
    visibility: `${edit ? 'hidden' : 'visible'}`,
  };

  const styleExpandLeft = {
    display: 'flex',
    flexWrap: 'nowrap',
    paddingLeft: `${edit ? '0px' : '5px'}`,
    visibility: `${edit ? 'visible' : 'hidden'}`,
  };
  
  const styleExpandDown = {
    transition: `all ${lag}s ease-in-out`,
    height: `${edit ? '58px' : '0'}`,
    padding: `${edit ? '5px' : '0 5px'}`,
    marginTop: `${edit ? '20px' : '0'}`,
    marginBottom: `${edit ? '20px' : '0'}`,
    marginLeft: 15,
    overflowY: 'clip',
  };

  const hideSlow = () => {
    setTimeout(() => {
      setShow(false)
    }, lag * 1000);
  }

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  };

  const commitUpdateVariant = async() => {
    setLoading(true);
    const variantsToBeUpdt = [];
    // const fields = ['title', 'price', 'inventory_quantity', 'sku', 'barcode']

    variants.forEach((vari) => {
      if (!vari.vid.includes('-') && vari.edited) {
        variantsToBeUpdt.push(vari);
      }
      vari.edited = false
    });

    if (variantsToBeUpdt.length) {
      let promises = []
      const { token, claim } = await getToken();
      if (claim) {
        for (let vari of variantsToBeUpdt) {
            const promise = await ApiUtil.patch(apiURL + `/shopify-business/variant/${vari.vid}/${cid}`, vari, token);
            promises.push(promise)
        }
      }
      await Promise.allSettled(promises);
    }
  };
  
  const commitDeleteVariant = async(vid) => {
    const { token, claim } = await getToken();
    if (claim && !vid.includes('-')) {
      await deleteVariant(vid, pid, cid, token);
    }
    setVariants(variants.filter(vari => vari.vid !== vid))
    setPrevVariants(prevVariants.filter(vari => vari.vid !== vid))
  };

  const commitAddVariant = async() => {
    const tempVariants = [...variants];
    const variantsToBeAdded = variants.filter(vari => vari.vid.includes('-'))
    if (!variantsToBeAdded.length) {
      setSave(false);
      return setLoading(false); 
    }
    const { token, claim } = await getToken();
    if (claim) {
      let promises = []
      for (let newVari of variantsToBeAdded) {
        newVari.pid = parseInt(newVari.id);
        const promise = await ApiUtil.post(apiURL + '/variant', newVari, token)
        promises.push(promise);
      };

      const results = await Promise.allSettled(promises);
      results.forEach((res, i) => {
        const tempVid = variantsToBeAdded[i].vid
        const newVid = get(res, 'value.data.vid', tempVid)
        const idx = tempVariants.findIndex(vari => vari.vid === tempVid)
        if (idx !== -1) tempVariants[idx].vid = newVid.toString()
        // console.log(res.value, newVid, idx, tempVid)
      })
      setVariants(tempVariants)
      setPrevVariants(cloneDeep(tempVariants))
    }
  };

  const handleEditVariant = (e) => {
    e.preventDefault();
    setSave(false);
    setShow(true);
    setEdit(true);
  };

  const handleAddVariRow = (e) => {
    e.preventDefault();
    const tempVariants = [...variants];
    const latestVari = tempVariants[variants.length - 1] || {};
    const newVari = {...emptyVariant};

    // create temp vid (with '-') to id which variants are new that need to be POST later;
    const latestVid = latestVari.vid || '0'
    let vidArr = latestVid.split('-')
    const tempVid = (vidArr[0].trim() || 0) + '-' + (Number(vidArr[1]) + 1 || 1)
    
    newVari.vid = tempVid;
    newVari.id = latestVari.id ? latestVari.id : pid;
    newVari.position = latestVari.position ? latestVari.position + 1 : 1;
    newVari.options = [];
    tempVariants.push(newVari)
    setVariants(cloneDeep(tempVariants))
  };

  const handleCancel = (e) => {
    e.preventDefault();
    // reverse change and add actions
    setVariants(cloneDeep(prevVariants))

    setSave(false)
    setEdit(false);
    hideSlow();
  };
  
  const handleSave = async(e) => {
    e.preventDefault();
    setLoading(true);
    setSave(true);
    await commitUpdateVariant()
    commitAddVariant()
    setPrevVariants(cloneDeep(variants))
    // awaitVariants(pid);
    
    setSave(false)
    setEdit(false);
    hideSlow();
    setLoading(false); 
  };

  const awaitVariants = async(pid) => {
    setLoading(true)
    if (addProd || !pid) {
      setShow(true);
      setEdit(true);
      const defaultVariant = {...emptyVariant};
      defaultVariant.title = 'Default';
      setVariants([defaultVariant]);
      setPrevVariants([{...defaultVariant}]);
    } else {
      const { token, claim } = await getToken();
      if (claim) {
        const res = await ApiUtil.get(apiURL + '/variants', false, pid, token);
        const tempData = get(res, 'data', []);
        setVariants(tempData);
        setPrevVariants(cloneDeep(tempData))
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    expand && awaitVariants(pid);
  // eslint-disable-next-line
  }, [expand]);

  const variantContent = () => {
    return (
      <>
        <H5 className={'m-b4 m-t3 m-l2'} >Product variation</H5>
        <VariantRow 
          variant={VariantCols} 
          pid={pid} edit={edit} 
        />
        {loading && <Loading position={true} style={{position: 'absolute', minHeight: 'auto'}} />}

        {variants && variants.map((variant, idx) => 
          <VariantRow 
            key={variant.vid}
            idx={idx}
            variant={variant}
            variants={variants}
            setVariants={setVariants}
            commitDeleteVariant={commitDeleteVariant}
            pid={pid} 
            cid={cid} 
            edit={edit}
          />
        )}
        
        <div style={styleExpandDown} >
          {show && <BtnSecondaryMd onClick={handleAddVariRow} className={'m-yhalf'} style={styleGreyBtn} disabled={save} >Add variations</BtnSecondaryMd>}
        </div>
      </>
    );
  }

  return (
    <>
    {addProd ? 
      <div style={{borderTop: '1px solid var(--border)'}}>
        {variantContent()}
      </div>
    :
      <form 
        onSubmit={handleSave}
        className={'text-left m-x2'} 
        style={styleForm} 
      >
        <div style={styleEditSaveBtn}>
          <div style={styleContractLeft} >
            <BtnSecondaryMd onClick={handleEditVariant} disabled={save} >
              Edit
            </BtnSecondaryMd>
          </div>

          <div style={styleExpandLeft} >
          {show && 
            <>
              <BtnSecondaryMd onClick={handleCancel} style={styleGreyBtn} disabled={save} >
                Cancel
              </BtnSecondaryMd>
              <BtnSecondaryMd type='submit' disabled={save} >
                Save
              </BtnSecondaryMd>
            </>
          }
          </div>
        </div>

        {variantContent()}
      </form>
    }
    </>
  );
};

export default ProdVariantSec;