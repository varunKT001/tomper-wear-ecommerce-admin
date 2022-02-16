import React from 'react';
import logo from '../assets/logo.svg';
import { Image, Progress, VStack, Text, HStack } from '@chakra-ui/react';

function PreLoader() {
  return (
    <VStack
      w='100%'
      h='100vh'
      spacing='4'
      justifyContent='center'
      alignItems='center'
    >
      <Image src={logo} width='150px' />
      <Progress size='xs' w='40%' colorScheme='brown' isIndeterminate />
      <HStack>
        <Text fontWeight='300' color='gray.400'>
          search less, wear more
        </Text>
      </HStack>
    </VStack>
  );
}

export default PreLoader;
