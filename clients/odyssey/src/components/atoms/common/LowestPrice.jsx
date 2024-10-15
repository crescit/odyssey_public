import React from 'react'
import { formatCurrency } from '../../../common/helperFunctions';

/** GET
  * @param {[number] | number} prices REQUIRED; array of numbers or single number
*/
const LowestPrice = ({prices}) => {
  let lowest = 0;
  let highest = null;
  const validPriceArray = Array.isArray(prices) && prices.length > 0;
  if (typeof prices === 'number') {
    lowest = prices;
  } else if (validPriceArray) {
    const clonePrices = [...prices];
    lowest = clonePrices.sort((a,b) => a - b)[0];
    highest = clonePrices[clonePrices.length -1];
    if(lowest === highest){ highest = null; }
  }
  return (
    <>
      {formatCurrency(lowest)}
      {highest && <> - </>}
      {highest && <>{formatCurrency(highest)}</>}
    </>
  )
}

export default LowestPrice; 