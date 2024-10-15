import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { get } from 'lodash';

import { scraperURL } from './constants';
import { ApiUtil } from '../util/ApiUtil';

// Helper functions

export const formatCurrency = (num) => {
  if (typeof num !== 'number') return num;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
};

export const formatPhone = (num) => {
  let numStr = num;
  if (typeof num === 'string' && num.length > 10) {
    numStr = '';
    const reNum = /\d/;
    for (let n of num) {
      if (reNum.test(parseInt(n, 10))) numStr += n;
    }
  } else if (typeof num === 'number') numStr = num.toString();
  return `(${numStr.substring(0, 3)}) ${numStr.substring(
    3,
    6
  )}-${numStr.substring(6, 10)}`;
};

export const PascalCase = (str) => {
  if (typeof str !== 'string') return str;
  const arr = str.split(' ');
  arr.forEach((word, i) => {
    if (word[0]) {
      arr[i] = word[0].toUpperCase() + word.substring(1);
    }
  });
  return arr.join(' ');
};

// Debounce
export const useDebounce = (func, delay) => {
  const debounceFunc = useCallback(debounce(func, delay), [delay, func]);
  return debounceFunc;
};

// useAsync returns error, loading, results, run
export const useAsyncWLoading = ({ asyncFunc }) => {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [result, setResult] = useState();

  const run = useCallback(
    async (...params) => {
      try {
        setLoading(true);
        const res = await asyncFunc(...params);
        setResult(res);
      } catch (err) {
        console.error(err);
        setError(err);
      }
      setLoading(false);
    },
    [asyncFunc]
  );

  return { error, loading, result, run };
};

export const parseDate = (z) => {
  const d = new Date(z);
  return d.toLocaleString().split('/').join(' ');
};

// export const uploadImg = async(path, imgFile, busiName, userEmail = null, pid = null, postMethod = null, token, claim) => {
export const uploadImg = async (path, formData, token, claim) => {
  let fileUrl = '';
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  if (claim) {
    await ApiUtil.post(scraperURL + path, formData, token, headers)
      .then((res) => {
        fileUrl = get(res, 'data', null);
        // console.log(res, res.data, fileUrl)
        return fileUrl;
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return fileUrl;
};
