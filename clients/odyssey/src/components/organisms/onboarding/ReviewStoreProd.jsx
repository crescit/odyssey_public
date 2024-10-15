
import React, { useState, useContext, useEffect } from 'react';
import get from 'lodash';

import { apiURL } from '../../../common/constants';
import { ProductContext } from '../../../context';
import { useHistory } from 'react-router-dom';
import { ApiUtil } from '../../../util/ApiUtil';
import { useAuth0 } from '../../../react-auth0-spa';
import Loading from '../../atoms/common/Loading';
import { BtnPrimaryMd, BtnSecondaryMd, BtnIcon } from '../../../library/atoms/buttons';
import { 
  InputList,
  HorizontalWrapper,
  ProdReviewWrapper,
  ReviewSection, 
  Section, 
  TableBlock,
  TableFooter,
  TblFooterText,
} from './ReviewStoreProd.styled';

const ReviewStoreProd = ({ companyID, setCompanyID }) => {
  const history = useHistory();
  const authContext = useAuth0();
  const { getIdTokenClaims, getTokenSilently } = authContext;
  const context = useContext(ProductContext);
  const updateOnboardStep = context.updateOnboardStep;
  const [loading, setLoading] = useState(true);
  const [storeProd, setStoreProd] = useState([]);
  const [cid, setCID] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [startIdx, setStartIdx] = useState(1);
  const [lastIdx, setLastIdx] = useState(itemsPerPage);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(Math.ceil(totalItems/itemsPerPage));

  window.scrollTo(0, 0);

  useEffect(() => {
    const getStoreProd = async (companyID) => {
      const { token, claim } = await getToken();
      if (claim) {
        try {
          let fetchedId;
          if (!companyID) {
            // fetch company ID from company table by user email (part of merchant onboarding process, so user email is the merchant email)
            const res = await ApiUtil.get(apiURL + '/company', false, null, token);
            const b = res && res.data && res.data.stores ? res.data.stores.id :   -1;
            fetchedId = b;
          };
          const id = companyID ? companyID : fetchedId;
          setCID(id)
          setCompanyID(id)
          const res = await ApiUtil.get(apiURL + '/products', false, id, token);
          const responded = res && res.status;
          const gotData = res && res.data;
          const data = gotData ? res.data.products : []
          setStoreProd(data)
          setTotalItems(data.length)
          setNumPages(Math.ceil(data.length/itemsPerPage))
          setLoading(!responded);
          // setLoading(false);
        } catch(err) {
          simpleErrHandle(err)
          setLoading(false);
        }
      }
    }
    getStoreProd(companyID);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps 
  const getToken = async() => {
    try {
      const token = await getTokenSilently();
      const claim = await getIdTokenClaims();
      return {token, claim};
    } catch(err) {
      simpleErrHandle(err);
    }
  }
  
  const updateAndPatchUserOnboardStep = async(stepNum) => {
    const { token, claim } = await getToken();
    const data = { onboard_step: stepNum, company_id: cid };
    if (claim) {
      ApiUtil.patch(apiURL + '/user', data, token)
      .then(updateOnboardStep(stepNum))
      .catch((err) => console.error(err));
    }
  }

  const pageDropdown = () => {
    const dropdownOptions = [];
    for (let i = 1; i <= numPages; i++) {
      dropdownOptions.push(
        <option value={i} key={'page' + i.toString()}>{i}</option>
      )
    };
    return dropdownOptions;
  }

  const handleItemsPerPage = (num) => {
    num = parseInt(num);
    const newNumPages = Math.ceil(totalItems/num);
    const newLastIdx = parseInt(Math.min(totalItems, num));
    setNumPages(newNumPages);
    setPageNum(1);
    setStartIdx(1);
    setLastIdx(newLastIdx);
    setItemsPerPage(num);
  }

  const handlePageNum = (num) => {
    num = parseInt(num);
    if (num < 1 || num > numPages) return;
    
    const pagesChange = num - pageNum;
    const newStartIdx = parseInt(Math.max(startIdx + (pagesChange * itemsPerPage), 1));
    const newLastIdx = parseInt(Math.min(totalItems, newStartIdx + itemsPerPage - 1));
    setStartIdx(newStartIdx);
    setLastIdx(newLastIdx);
    setPageNum(num);
  }

  const handleCancel = () => {
    history.goBack();
  }

  const handleComplete = async() => {
    await updateAndPatchUserOnboardStep(4);
    // TODO need to finalize where to redirect to
    history.push('/businesscenter', { from: 'ShopifyOnboardingPage' });
  }

  const simpleErrHandle = (err) => {
    // TODO build a better error message modal
    // alert('Something went wrong in getting your store data. Please try again later and make sure you are logged in.');
    console.error(err);
  }
  return (
    <>
      <ReviewSection >
        <Section style={{ flexDirection: 'column', alignItems: 'center' }}>
          {loading? (
          <Loading />
          ) : (
            <>
              <ProdReviewWrapper>
                <HorizontalWrapper 
                  style={{ width: '100%' }} 
                >
                  <TableBlock style={{ width: '23%' }}>
                  </TableBlock>
                  <TableBlock 
                    style={{ width: '40%', fontWeight: '600', textAlign: 'left'}}
                  >
                    Title
                  </TableBlock>
                  <TableBlock 
                    style={{ width: '37%', fontWeight: '600', textAlign: 'left' }}
                  >
                    Category
                  </TableBlock>
                </HorizontalWrapper>
                {/* eslint-disable-next-line */}
                {storeProd.map((prod, i) => {
                  if (i+1 >= startIdx && i+1 <= lastIdx ) {
                    return (
                      <HorizontalWrapper 
                        style={{ width: '100%' }} 
                        key={'prod' + prod.id.toString()}
                      >
                        <TableBlock style={{ width: '23%', textAlign: 'right'}}
                        >
                          <img src={prod.img} alt={prod.name}
                            style={{ width: 72, height: 72 }}
                          />
                        </TableBlock>
                        <TableBlock 
                          style={{ width: '40%', textAlign: 'left' }}>{prod.name}
                        </TableBlock>
                        <TableBlock 
                          style={{ width: '37%', textAlign: 'left' }}>{prod.category}
                        </TableBlock>
                      </HorizontalWrapper>
                  )}
                  // return (<></>)
                })
                }
              </ProdReviewWrapper>
              <TableFooter>
                <HorizontalWrapper style={{ marginRight: 'auto', borderBottom: 'none' }} >
                  <TblFooterText>items per page:</TblFooterText>
                  <InputList 
                    onChange={(e) => handleItemsPerPage(e.target.value)}
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={60}>60</option>
                  </InputList>
                  <TblFooterText style={{ margin: '0 0 0 10px' }}>
                    {startIdx}-{lastIdx} of {totalItems}{totalItems <= 1 ? ' item' : ' items'}
                  </TblFooterText>
                </HorizontalWrapper>
                <HorizontalWrapper style={{ borderBottom: 'none' }} >
                  <InputList 
                    value={pageNum}
                    onChange={(e) => handlePageNum(e.target.value)}
                  >
                    {pageDropdown()}
                  </InputList>
                  <TblFooterText style={{ margin: '0 10px' }}>
                    of {numPages}{numPages <= 1 ? ' page' : ' pages'}
                  </TblFooterText>
                  <BtnIcon 
                    style={{ margin: 8, padding: 4, height: 25, width: 25, borderRadius: '100%', }}
                    onClick={() => handlePageNum(pageNum - 1)}
                  >
                    ◀︎
                  </BtnIcon>
                  <BtnIcon 
                    style={{ margin: 8, padding: 4, height: 25, width: 25, borderRadius: '100%', }}
                    onClick={() => handlePageNum(pageNum + 1)}
                  >
                    ▶︎
                  </BtnIcon>
                </HorizontalWrapper>
              </TableFooter>
            </>
          )}
        </Section>
        <Section style={{ justifyContent: 'space-between', marginTop: 32 }}>
          <BtnSecondaryMd onClick={handleCancel}>
            Cancel
          </BtnSecondaryMd>
          <BtnPrimaryMd onClick={handleComplete}> 
            Complete
          </BtnPrimaryMd>
        </Section>
      </ReviewSection>
    </>
  );
};

export default ReviewStoreProd;
