import React from 'react';
import PropTypes from 'prop-types';
import NextImage from 'next/image';
import { Center } from '@chakra-ui/react';

export default function Image({
  src, alt, className, width, height,
}) {
  if (className?.includes('rlc-favicon')) {
    return (
      <img src={src} alt={alt} width={width} height={height} className={className} />
    );
  }

  if (className?.includes('rlc-image')) {
    return (
      <NextImage src={src} alt={alt} className={className} layout="fill" objectFit="cover"/>
    );
  }

  return (
    <Center
      h="500px"
      position="relative"
      as="span"
      mb="12"
    >
      <NextImage
        src={src}
        alt={alt}
        layout="fill"
        objectFit="contain"
        className={className}
      />
    </Center>
  );
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};
