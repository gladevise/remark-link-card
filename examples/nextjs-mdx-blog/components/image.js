import NextImage from 'next/image';
import { Center } from '@chakra-ui/react'

export default function Image({
  src, alt, className, width, height
}) {
  return (className?.includes('rlc-image') || className?.includes('rlc-favicon'))
    ? <NextImage src={src} alt={alt} width={width} height={height} objectFit="cover" className={className} />
    : (
      <Center
        h="500px"
        position="relative"
        as="span"
        mb="12"
      >
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout="fill"
          objectFit="contain"
          className={className}
        />
      </Center>
    );
}
