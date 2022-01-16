import React, { useState } from 'react';
import { VStack, Image, HStack, Box } from '@chakra-ui/react';

function ImagesList({ images = [{ url: '' }] }) {
  const [mainImage, setMainImage] = useState(images[0]);
  return (
    <VStack>
      <Image
        src={mainImage.url}
        boxSize='408px'
        objectFit='cover'
        borderRadius='lg'
      />
      <HStack alignItems='flex-start'>
        {images.map((image, index) => {
          const { url } = image;
          return (
            <VStack key={index}>
              <Image
                src={url}
                boxSize='75px'
                objectFit='cover'
                borderRadius='lg'
                onClick={() => setMainImage(images[index])}
              />
              {mainImage.url === url && (
                <Box w='5px' h='5px' bg='brown.500' borderRadius='full' />
              )}
            </VStack>
          );
        })}
      </HStack>
    </VStack>
  );
}

export default ImagesList;
