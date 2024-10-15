import React, { useState, useEffect } from 'react';
import { get } from 'lodash';

import { defaultNoImg } from '../../../common/constants';
import { 
  ImageWrapper, SmallImageWraper, 
  MainImage, SmallImage,
} from './ProductImages.styled'

const ProductImages = ({img, images, name}) => {
  const [selectedImg, setSelectedImg] = useState(img)

  useEffect(() => {
    setSelectedImg(img)
  }, [img])

  return (
    <ImageWrapper>
      <SmallImageWraper>
        {/* vertical carousel */}
        {images && images.map((img, i) => (
          <SmallImage
            src={img}
            alt={name + 'image ' + i}
            key={name + 'image ' + i}
            className={'m-b1'}
            onClick={() => setSelectedImg(img)}
          />
        ))}

        {/* {images.map((img, i) => (
          <SmallImage
            src={img}
            alt={name + 'image ' + i}
            key={name + 'image ' + i + Math.random(5)}
            className={'m-b1'}
            onClick={() => setSelectedImg(img)}
          />
        ))}
        {images.map((img, i) => (
          <SmallImage
            src={img}
            alt={name + 'image ' + i}
            key={name + 'image ' + i + Math.random(5)}
            className={'m-b1'}
            onClick={() => setSelectedImg(img)}
          />
        ))}
        {images.map((img, i) => (
          <SmallImage
            src={img}
            alt={name + 'image ' + i}
            key={name + 'image ' + i + Math.random(5)}
            className={'m-b1'}
            onClick={() => setSelectedImg(img)}
          />
        ))} */}

      </SmallImageWraper>
      <MainImage
        src={selectedImg ? selectedImg :defaultNoImg}
        alt={name}
        className={'m-x2'}
      />
    </ImageWrapper>
  );
};

export default ProductImages;