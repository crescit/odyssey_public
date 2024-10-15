import React from 'react'
import { formatCurrency } from '../../../common/helperFunctions';

/** GET
  * @param {[number] | number} prices REQUIRED; array of numbers or single number
*/
const PriceRange = ({prices}) => {
  let lowestPrice = 0, highestPrice = 0;
  const validPriceArray = Array.isArray(prices) && prices.length > 0;
  if (typeof prices === 'number') {
    lowestPrice = prices;
  } else if (validPriceArray) {
    const sortedPrice = prices.sort((a,b) => a - b);
    lowestPrice = sortedPrice[0];
    highestPrice = sortedPrice[prices.length - 1];
  }
  
  return (
    <>
    {(lowestPrice === highestPrice) ? (
        formatCurrency(lowestPrice)
    ) : (
        <> {formatCurrency(lowestPrice)} - {formatCurrency(highestPrice)} </>
    )}
    </>
  )
}

export default PriceRange; 