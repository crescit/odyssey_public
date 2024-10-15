import React, { useState, useEffect, useRef } from 'react'
import { get } from 'lodash';
import { useAuth0 } from '../../../react-auth0-spa';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


import { apiURL } from '../../../common/constants';
import { ApiUtil } from '../../../util/ApiUtil';
import Loading from '../common/Loading';
import { uploadImg } from '../../../common/helperFunctions';
import { defaultNoImg } from '../../../common/constants';
import AlertModal from '../common/AlertModal';
import CategoryDropdown from './CategoryDropdown';
import DeleteListingModal from './DeleteListingModal';
import { BtnIcon } from '../../../library/atoms/buttons';
import {
  AddPhoto,
  AddPhotoText,
  DetailDesc,
  DetailHeader,
  DetailInfo,
  EditArea,
  Photo,
  PhotoBox,
  PhotoGridWrapper,
  PhotoMsg,
  styleAddPhoto,
  styleBigBox,
  styleDescInput,
  styleImgBorder,
  styleInput,
  stylePhotoBox,
  styleRemoveIcon,
  UploadImg,
} from './ProdEditDetailSec.styled'

  const ProdEditDetialSec = ({ 
    product, setProduct, 
    cid, pid, 
    edit, expand, 
    addProd,
    categories, 
    categoryPicked, 
    setCategoryPicked, 
    allowAddPhoto = true
  }) => {  
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState({});
  const imgToDelete = useRef({});

  const styleHeader = {
    color: `${edit ? 'var(--title)' : 'var(--label-active)'}`,
  };
  
  const styleColor = {
    // borderColor: `${edit ? 'var(--title)' : 'var(--border)'}`,
    borderColor: 'var(--title)',
    color: `${edit ? 'var(--title)' : 'var(--placeholder)'}`,
  };
  
  const styleAdd = {
    // borderColor: `${edit && !loading && allowAddPhoto ? 'var(--title)' : 'var(--border)'}`,
    borderColor: 'var(--title)',
    color: `${edit && !loading && allowAddPhoto ? 'var(--title)' : 'var(--placeholder)'}`,
  };

  const styleOpacity = {
    opacity: `${edit ? 1 : 0.5}`,
  };
  
  const styleCursor = {
    cursor: `${edit && !loading && allowAddPhoto ? 'pointer' : 'default'}`,
  };

  const numImgs = (product && product.images && product.images.length) || 0;
  const numSpots = 18 - numImgs < 1 ? 1 : 18 - numImgs;
  const emptyImgArr = new Array(numSpots).fill('Add Photo');
  const maxFileSize = 3; // ~3.01 MB

  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      console.error('error with auth')
    }
  };

  const displayUploadErr = (errs) => {
    if (errs.hasMsg) {
      let sizeMsgs = '', formatMsgs = '';
      for (let sizeFile of errs.size) {
        sizeMsgs += (sizeMsgs && ', ') + sizeFile;
      };
      if (sizeMsgs) {
        sizeMsgs = `File ${errs.size.length <= 1 ? 'size is' : 'sizes are'} too big for ${sizeMsgs}. `;
        sizeMsgs += `Please pick an image smaller than ${maxFileSize} MB.`;
      };

      for (let formatFile of errs.format) {
        formatMsgs += (formatMsgs && ', ') + formatFile;
      };
      if (formatMsgs) {
        formatMsgs += ` ${errs.format.length <= 1 ? 'has' : 'have'} unsupported file format.`;
      };
        
      setAlertMsg({header: `Unable to upload below file${errs.hasMsg > 1 ? 's' : ''}`, body: sizeMsgs, msg2: formatMsgs});
      setAlert(true);
    }
  };

  const handleAddPhoto = async(e) => {
    e.preventDefault();
    setAlert(false);
    setLoading(true);
    const promises = [];
    const files = [...e.target.files];
    const errs = {hasMsg: 0, format: [], size: []};
    const acceptedTypes =['image/png','image/jpeg','image/svg+xml','image/webp' ];

    if (files.length > 5) {
      setAlertMsg({header: 'Only 5 images can be upload at a time.'});
      setLoading(false);
      return setAlert(true);
    };

    const { token, claim } = await getToken();
    if (claim) {
      for (let file of files) {
        if (!acceptedTypes.includes(file.type)) {
          errs['format'].push(file.name)
          errs['hasMsg']++
          continue
        };

        if (file.size > maxFileSize * 1048576 + 10486) {
          errs['size'].push(file.name)
          errs['hasMsg']++
          continue
        };
        
        const formData = new FormData();
        formData.append('name', product && product.merchant);
        formData.append('pid', pid);
        formData.append('postMethod', 'append'); 
        // formData.append('postMethod', ''); 
        formData.append('image', file);

        const promise = uploadImg('/product/upload', formData, token, claim)
        promises.push(promise)
      }
      
      const tempProd = {...product};
      const results = await Promise.allSettled(promises);
      results.forEach((res, i) => {
        if (get(res, 'status', '') === 'fulfilled') {
          const url = get(res, 'value', '');
          tempProd.images.push(url);
          if (i === 0 && !tempProd.img) tempProd.img = url;
        }
      })

      setProduct(tempProd);
      displayUploadErr(errs);
    }
    setLoading(false);
  };

  const handleChange = () => {
    setProduct({...product, edited: true})
  }

  const handleDeleteImage = (img, i) => {
    imgToDelete.current = {
      deleteIdx: i,
      deleteImg: img,
    }
    setOpenModal(true);
  };

  const confirmDeleteImage = async() => {
    setLoading(true);
    const { deleteIdx, deleteImg } = imgToDelete.current;
    if (product && product.images) {
      const tempProd = {...product};
      tempProd.images.splice(deleteIdx, 1)
      const { token, claim } = await getToken();
      if (claim) {
        const data = {img_idx: deleteIdx, img_to_delete: deleteImg}
        await ApiUtil.delete(apiURL + `/product/img/${pid}/${cid}`, token, data)
        // console.log(res)
        tempProd.img = tempProd.images[0] || defaultNoImg;
        setProduct({...tempProd});
      }
    }

    imgToDelete.current = {};
    setLoading(false);
    setOpenModal(false);
  };
  
  useEffect(() => {
    const merchantSpecCategory = product && product.category;
    if (merchantSpecCategory) {
      let selectedIdx = categories.indexOf(merchantSpecCategory);
      selectedIdx = selectedIdx < 0 ? 0 : selectedIdx;
      categories[0] = selectedIdx < 1 ? merchantSpecCategory : categories[0];
      setCategoryPicked(selectedIdx);
    } 
  // eslint-disable-next-line
  }, [expand]);

  return (
    <>
    <section 
      className={'text-left m-x2'} 
      style={{border: '1px dot var(--border)', height: '90%'}} 
    >
      {/* Title Section */}
      <Grid container className="p-b3 p-rhalf" spacing={2} >
        <Grid item md={3} lg={3}>
          <DetailHeader style={styleHeader} ><label htmlFor={`name ${pid}`}>Title* </label></DetailHeader>
          <DetailDesc>
            Include words that buyers would search for.
          </DetailDesc>
        </Grid>

        <Grid item sm={12} md={9} lg={9}>
          {!edit && <DetailInfo style={styleInput} color={styleColor} >{product && product.name}</DetailInfo>}

          {edit && product && 
            <EditArea 
              type='text'
              name='name'
              id={`name ${pid}`}
              style={styleInput} 
              color={styleColor}
              defaultValue={product && product.name}
              placeholder={'What are you selling? (required)'}
              onChange={handleChange}
              required
            />
          }
        </Grid>
      </Grid>

      {/* Category Section */}
      <Grid container className="p-b3 p-rhalf" alignItems={'center'} spacing={2} >
        <Grid item sm={3} md={3} lg={3} >
          <DetailHeader style={styleHeader} ><label htmlFor='simple-select-category'>Category*</label></DetailHeader>
        </Grid>

        <Grid item sm={9} md={6} lg={4}>
          {!edit && 
            <DetailInfo style={styleInput} color={styleColor} >
              {product && product.category}
            </DetailInfo>}

          {edit && product &&  
            <CategoryDropdown 
              pid={pid} 
              categories={categories} 
              categoryPicked={categoryPicked} 
              setCategoryPicked={setCategoryPicked} 
              product={product} 
              setProduct={setProduct}
              required
            />
          }
        </Grid>
      </Grid>

      {/* Description Section */}
      <Grid container className="p-b3 p-rhalf" spacing={2} >
        <Grid item md={3} lg={3}>
          <DetailHeader style={styleHeader} ><label htmlFor={`desc ${pid}`}>Description*</label></DetailHeader>
          <DetailDesc>
            Provide a detailed description of your product’s best features. 
          </DetailDesc>
        </Grid>

        <Grid item sm={12} md={9} lg={9}>
          {!edit && <DetailInfo style={styleInput} color={styleColor} moreStyle={styleDescInput} >{product && product.desc}</DetailInfo>}
          
          {edit && product && 
            <EditArea 
              type='text'
              name='desc'
              id={`desc ${pid}`}
              style={styleInput} 
              color={styleColor}
              moreStyle={styleDescInput}
              defaultValue={product && product.desc}
              placeholder={'Describe your product. (required)'}
              onChange={handleChange}
              required
            />
          }
        </Grid>
      </Grid>

      {/* Vendor/Brand Section */}
      <Grid container className="p-b3 p-rhalf" alignItems={'center'} spacing={2} >
        <Grid item sm={3} md={3} lg={3} >
          <DetailHeader style={styleHeader} ><label htmlFor={`vendor ${pid}`}>Vendor/Brand</label></DetailHeader>
        </Grid>

        <Grid item sm={9} md={6} lg={4}>
          {!edit && <DetailInfo style={styleInput} color={styleColor} >{product && product.vendor}</DetailInfo>}

          {edit && product && 
            <input 
              type='text'
              name='vendor'
              id={`vendor ${pid}`}
              style={styleInput} 
              color={styleColor}
              defaultValue={product && product.vendor}
              placeholder={'Optional'}
              onChange={handleChange}
            />
          }
        </Grid>
      </Grid>

      {/* Photo */}
      <Grid container className="p-b2 p-rhalf" spacing={2} >
        <Grid item md={5} lg={5}>
          <DetailHeader style={styleHeader} >
            <label htmlFor={`image ${pid}`}>
            Photos <DetailDesc style={{display: 'inline-block'}}>{`(Maximum file size: ${maxFileSize} MB)`}</DetailDesc>
            </label>
          </DetailHeader>
        </Grid>
      </Grid>


      <PhotoGridWrapper >
        {loading && <Loading position={true} style={{position: 'absolute', top: '40%'}} />}
        {addProd && !allowAddPhoto &&  <PhotoMsg style={styleHeader} >Please create the product first before adding photos.</PhotoMsg> }

        {/* Display photo section */}
        {product && product.images && product.images.map((img, i) => {
          const boxSize = i === 0 ? styleBigBox : null;
          return (
            <PhotoBox 
              key={`image ${pid} - ${i}`} 
              id={`image ${pid}`} 
              style={stylePhotoBox} 
              moreStyle={styleImgBorder} 
              color={styleColor} 
              boxSize={boxSize} 
            >
              <Photo src={img} style={styleOpacity} alt={`image ${i}`} />
              {edit && 
                <BtnIcon 
                  style={styleRemoveIcon} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleDeleteImage(img, i)}
                  } 
                > 
                  <HighlightOffIcon style={{cursor: 'pointer'}} />
                </BtnIcon>}
            </PhotoBox>
          )
        })}

        {/* Add photo section */}
        {emptyImgArr && emptyImgArr.map((placeHolder, i) => {
          const boxSize = (i === 0 && !numImgs) ? styleBigBox : null;
          // console.log(emptyImgArr.length, i, pid);
          return (
            <PhotoBox 
              key={`placeholder ${pid} - ${i}`} 
              style={stylePhotoBox} 
              moreStyle={styleAddPhoto} 
              color={styleAdd} 
              boxSize={boxSize} 
            >
              <AddPhoto htmlFor={`addPhoto ${pid}-${i}`} cursor={styleCursor} >
                <AddIcon style={styleAdd} />
                <AddPhotoText style={styleAdd} >{placeHolder}</AddPhotoText>
                <UploadImg 
                  type='file'
                  accept='image/png,image/jpeg,image/svg+xml,image/webp'
                  name='image'
                  id={`addPhoto ${pid}-${i}`}
                  cursor={styleCursor}
                  onChange={handleAddPhoto}
                  disabled={!edit || loading || !allowAddPhoto}
                  multiple
                />
              </AddPhoto>
            </PhotoBox>
          )
        })}

      </PhotoGridWrapper>

      <DeleteListingModal 
        openModal={openModal} 
        onClose={false}
        setOpenModal={setOpenModal} 
        confirmDelete={confirmDeleteImage}
        modalHeader={"Confirm Delete Photo"}
        modalTitle={'Are you sure you want to delete the image?'}
        modalMsg={`You can't undo this action.`}
      />
      <AlertModal 
        openModal={alert} 
        setOpenModal={setAlert} 
        modalHeader={alertMsg.header}
        modalMsg={alertMsg.body}
        modalMsg2={alertMsg.msg2}
      />
    </section>
    </>
  );
};

export default ProdEditDetialSec;