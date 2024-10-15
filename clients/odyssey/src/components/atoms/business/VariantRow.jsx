import React,{ useState } from 'react';
import { get } from 'lodash';
import Grid from '@material-ui/core/Grid'
import DeleteIcon from '@material-ui/icons/Delete';
import styled from 'styled-components';

import { B1, S2 } from '../../../library/atoms';
import { formatCurrency } from '../../../common/helperFunctions';
import { BtnIcon } from '../../../library/atoms/buttons';
import DeleteListingModal from '../../atoms/business/DeleteListingModal';
import Loading from '../common/Loading';
import AlertModal from '../common/AlertModal';

const Section = styled.section`
  border-bottom: 1px solid var(--border);
  padding-left: var(--spc-2);
  display: flex;
  align-items: center;
`;

const PriceInput = styled.input`
  padding-left: 21px !important;
`;

const DollarSign = styled.div`
  position: relative;

  :after {
    position: absolute;
    left: 13px;
    top: 12px;
    content: '$';
  }
`;

const styleDiv = {
  display: 'inline-block',
  width: 'calc(100% - 50px)',
}

const styleHeader = {
  marginBottom: 'var(--spc-2)'
};

const styleLoading = {
  width: 50,
  marginTop: 0,
}

const VariantRow = ({ 
  idx,
  variant,
  variants,
  setVariants, 
  commitDeleteVariant, 
  pid, edit 
}) => {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(false);

  const styleInput = {
    display: 'flex',
    alignItems: 'center',
    margin: '7px 8px 7px 0',
    border: 'solid 1px',
    borderColor: `${edit ? 'var(--title)' : 'var(--border)'}`,
    borderRadius: 4,
    minHeight: 42,
    width: '100%',
    padding: '0 12px',
    fontFamily: 'var(--font)',
    fontSize: 'var(--lgmid-size)',
    letterSpacing: 0.5,
    color: `${edit ? 'var(--title)' : 'var(--placeholder)'}`,
  };

  

  const styleDelIcon = {
    margin: '0px 8px',
    transition: 'all 0.3s ease-in-out',
    opacity: `${edit ? 1 : 0}`,
    visibility: `${edit ? 'visible' : 'hidden'}`,
  };

  const confirmDelete = async() => {
    setLoading(true);
    if (variant && variant.vid) {
      await commitDeleteVariant(variant.vid)
    }
    setLoading(false)
  }

  const handleChange = (key) => (e) => {
    let newVal = get(e, 'target.value', variant[key]);
    if (key === 'price' && Number(newVal) < 0) return
    const tempVariants = [...variants]
    const curVariant = tempVariants[idx]
    curVariant[key] = key === 'inventory_quantity' ? parseInt(newVal) : newVal
    curVariant.edited = true
    setVariants(tempVariants);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (variants.length === 1) {
      setAlert(true)
      return;
    }
    setOpenModal(true)
  };

  return (
    <Section>
      <div style={styleDiv}>
      <Grid container alignItems='center' spacing={1}>
        
        <Grid container item md={4} lg={4} >
          {variant && variant.header && <S2 style={styleHeader}>
          <label htmlFor={`title ${pid}-${variant.vid}`}>
            {variant.variationHeader}
          </label>
          </S2>}
          {!edit && variant && !variant.header && 
            <B1 style={styleInput}>{variant.title}</B1>
          }
          {edit && variant && !variant.header && 
            <textarea 
              type='text'
              name='title'
              id={`title ${pid}-${variant.vid}`}
              style={styleInput} 
              value={variant.title}
              onChange={handleChange('title')}
              required
            />
          }
        </Grid>

        <Grid container item md={3} lg={3} alignItems='center' spacing={2}>
          <Grid item md={6} lg={6} >
            {variant && variant.header && <S2 style={styleHeader}>
            <label htmlFor={`price ${pid}-${variant.vid}`}>
              {variant.priceHeader}
            </label>
            </S2>}
            {!edit && variant && !variant.header && 
              <B1 style={styleInput}>{formatCurrency(Number(variant.price))}</B1>
            }
            {edit && variant && !variant.header && 
            <DollarSign>
              <PriceInput 
                type='number'
                name='price'
                id={`price ${pid}-${variant.vid}`}
                style={styleInput}
                value={variant.price}
                pattern="^[0-9]+(\.[0-9]{2})?$"
                onChange={handleChange('price')}
                required
              />
            </DollarSign>
            }
          </Grid>
        
          <Grid item md={6} lg={6}>
            {variant && variant.header && <S2 style={styleHeader}>
            <label htmlFor={`quantity ${pid}-${variant.vid}`}>
              {variant.qtyHeader}
            </label>
            </S2>}
            {!edit && variant && !variant.header && 
              <B1 style={styleInput}>{variant.inventory_quantity}</B1>
            }
            {edit && variant && !variant.header && 
              <input 
                type='number'
                name='qty'
                id={`quantity ${pid}-${variant.vid}`}
                style={styleInput} 
                value={variant.inventory_quantity}
                onChange={handleChange('inventory_quantity')}
                min={0}
                required
              />
            }
          </Grid>
        </Grid>

        <Grid container item md={5} lg={5} alignItems='center' spacing={2}>
          <Grid item md={6} lg={6}>
            {variant && variant.header && <S2 style={styleHeader}>
            <label htmlFor={`sku ${pid}-${variant.vid}`}>
              {variant.SKUHeader}
            </label>
            </S2>}
            {!edit && variant && !variant.header && 
              <B1 style={styleInput}>{variant.sku}</B1>
            }
            {edit && variant && !variant.header && 
              <input 
                type='text'
                name='sku'
                id={`sku ${pid}-${variant.vid}`}
                style={styleInput} 
                value={variant.sku}
                onChange={handleChange('sku')}
                placeholder={'(required)'}
                required
              />
            }
          </Grid>
          
          <Grid item md={6} lg={6}>
            {variant && variant.header && <S2 style={styleHeader}>
            <label htmlFor={`barcode ${pid}-${variant.vid}`}>
              {variant.barcodeHeader}
            </label>
            </S2>}
            {!edit && variant && !variant.header && 
              <B1 style={styleInput}>{variant.barcode}</B1>
            }
            {edit && variant && !variant.header && 
              <input 
                type='text'
                name='barcode'
                id={`barcode ${pid}-${variant.vid}`}
                style={styleInput} 
                value={variant.barcode}
                onChange={handleChange('barcode')}
                // required
              />
            }
          </Grid>
        </Grid>
        
      </Grid>
      </div>
      {variant && variant.trashHeader}
      {loading? <Loading position={false} style={styleLoading}/> 
      : 
      variant && !variant.header && 
        <BtnIcon onClick={handleDelete} style={styleDelIcon} >
          <DeleteIcon />
        </BtnIcon>
      }

      <DeleteListingModal 
        openModal={openModal} 
        setOpenModal={setOpenModal} 
        confirmDelete={confirmDelete}
        modalHeader={"Confirm Delete Variation"}
        modalTitle={'Are you sure you want to delete the variant'}
        modalMsgBold={`${variant && variant.title}?`}
        modalMsg={`You can't undo this action.`}
      />
      <AlertModal 
        openModal={alert} 
        setOpenModal={setAlert} 
        modalHeader={'Each product must have at least one variation'}
        modalMsg={`You can't delete the last variation.`}
      />
    </Section>
  );
};

export default VariantRow;
