import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth0 } from '../../../react-auth0-spa';
import { ProductContext } from '../../../context';
import Loading from '../../../components/atoms/common/Loading';
import LowestPrice from '../common/LowestPrice';
import { formatCurrency } from '../../../common/helperFunctions';
import VariantDropdown from './VariantDropdown';
import { B1, B1ULink, H5 } from '../../../library/atoms';
import { BtnPrimaryMd, BtnSecondaryMd } from '../../../library/atoms/buttons';
import { Section, Description } from './ProductDetail.styled'
import ProductImages from './ProductImages';

const ProductDetail = (props) => {
  const history = useHistory();
  const context = useContext(ProductContext);
  const { getTokenSilently, getIdTokenClaims } = useAuth0();
  const [loading, setLoading] = useState(true);
  const [variantPicked, setVariantPicked] = useState('');
  const { openCart, detailProduct, setDetailProduct, handleStoreDetails } = context;
  const {
    id, vids, company_id,
    name, variant_titles,
    desc, prices,
    img, images,
    merchant, vendor
  } = detailProduct;

  const awaitProduct = async(pid) => {
    await setDetailProduct(pid)
    setLoading(false);
  };

  const addToCart = async(pid, variantPicked, open = false) => {
    if (variantPicked === '') return alert(`Please select an option.`)
    const token = await getTokenSilently();
    const claim = await getIdTokenClaims();
    if (claim) context.addToCart(pid, vids[variantPicked], token);
    if (open) openCart();
  }

  const handleBuyNow = (id, variantPicked) => {
    if (variantPicked === '') return alert('Please select an option.')
    addToCart(id, variantPicked);
    history.push('/cart', { from: 'SingleProductPage' })
  }

  useEffect(() => {
    awaitProduct(props.pid)
  // eslint-disable-next-line
  }, [])
  
  // resetting variantPicked back to empty when another product is selected from the page
  useEffect(() => {
    window.scrollTo(0,0)
    setVariantPicked('')
  }, [props.pid])

  // setting variantPicked to the only variant if the product only has one
  useEffect(() => {
    if (variant_titles && variant_titles.length === 1) setVariantPicked(0)
  // eslint-disable-next-line
  }, [variantPicked, variant_titles])
  
  return (
    <Section>
      {loading ? <Loading/> :
        <>
        <ProductImages
          img={img} images={images}
          name={name}
        />
        
        <Description>
          <B1ULink onClick={() => handleStoreDetails(company_id)}>
            <Link to={`/store/${company_id}/${merchant}`} style={{ textDecoration: 'none'}} >
              {merchant}
            </Link>
          </B1ULink>
          <H5 className={'m-t2 m-x0'} >{name}</H5>
          <B1 className={'m-t0 m-b3 m-x0'} style={{ color: 'var(--body)'}}>by {vendor}</B1>
          <H5 className={'m-y3 m-x0'} >
            {variantPicked !== '' ? (
              formatCurrency(prices[variantPicked])
            ) : (
              <>
                <LowestPrice prices={prices}/>
              </>
            )}
          </H5>

          {variant_titles && variant_titles.length > 1 ? (
            <VariantDropdown 
              vids={vids} 
              variantPicked={variantPicked} 
              setVariantPicked={setVariantPicked} 
              variantTitles={variant_titles}
            />
          ) : null }

          <BtnSecondaryMd
            style={{ width: '100%' }}
            className={'m-t2 m-x0'}
            onClick={() => {addToCart(id, variantPicked, true); }}
          >
            Add to cart
          </BtnSecondaryMd>
          <BtnPrimaryMd
            style={{ width: '100%' }}
            className={'m-y2 m-x0'}
            onClick={() => {handleBuyNow(id, variantPicked); }}
          >
            Buy it now
          </BtnPrimaryMd>

          <B1 style={{ width: '100%'}} className={'m-x0 m-y3'} dangerouslySetInnerHTML={{__html: desc }} ></B1>
        </Description>
        </>
      }
    </Section>
  );
};

export default ProductDetail;