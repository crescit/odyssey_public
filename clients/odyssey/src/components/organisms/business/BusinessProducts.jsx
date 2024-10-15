import React, { useState, useEffect, useContext } from 'react';

import { ProductContext } from '../../../context';
import { H5, S1 } from '../../../library/atoms';
import { BtnPrimaryMd } from '../../../library/atoms/buttons';
import Loading from '../../atoms/common/Loading';
import BusinessProductRow from '../../molecules/business/BusinessProductRow';
import BusinessAddProduct from '../../molecules/business/BusinessAddProduct';


const Products = ({ compID, merchant }) => {
  const context = useContext(ProductContext);
  const [loading, setLoading] = useState(true);
  const [addProd, setAddProd] = useState(false);
  const [newProdId, setNewProdId] = useState(0);
  const { searchProductsById, products } = context;

  const prodColumns = {
    imgHeader: ' ',
    titleHeader: 'Title',
    categoryHeader: 'Category',
    inventoryHeader: 'Inventory',
    priceHeader: 'Price',
  }

  const awaitStoreProd = async(compID) => {
    await searchProductsById(compID);
    setLoading(false);
  };

  const handleAddProduct = () => {
    setAddProd(true);
  };

  useEffect(() => {
    if (compID) awaitStoreProd(compID);
  // eslint-disable-next-line
  }, [compID]);

  return (
      <div className={'text-left p-l2'}>
        <BtnPrimaryMd onClick={handleAddProduct} style={{ float:'right', top: 0}} disabled={addProd}>
          Add new product
          {/* add loading circle */}
        </BtnPrimaryMd>
        <H5 className={'m-b2'} >Products</H5>
        <S1 className={'m-b2'} >Currently in your store ({products.length})</S1>
        <section style={{border: '1px solid var(--border)'}} >
          <BusinessAddProduct cid={compID} merchant={merchant} addProd={addProd} setAddProd={setAddProd} awaitStoreProd={awaitStoreProd} setNewProdId={setNewProdId} />

          <BusinessProductRow prod={prodColumns} noline />
          {loading ? 
            <Loading /> 
          : 
            products && products.map((prod, i) => 
              <BusinessProductRow key={i + '-' + prod.id} prod={prod} newProdId={newProdId} />
            )
          }
        </section>
      </div>
  );
};

export default Products;