import React, { useState } from 'react';
import {
  VStack,
  Text,
  Button,
  Flex,
  Spacer,
  StackDivider,
  useToast,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { MdAlternateEmail, MdDelete } from 'react-icons/md';
import { Stars } from '.';
import { useProductContext } from '../context/product_context';

function SingleProductReviews({ reviews, productId }) {
  const toast = useToast();
  const { deleteReview } = useProductContext();
  const [loading, setLoading] = useState(false);

  const handleDelete = async (reviewId) => {
    setLoading(true);
    const { success, message } = await deleteReview(productId, reviewId);
    setLoading(false);
    return toast({
      position: 'top',
      description: message,
      status: `${success ? 'success' : 'error'}`,
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      {loading ? (
        <VStack bg='white' p={8} borderRadius='lg' shadow='sm'>
          <Spinner size='lg' color='brown.500' />
        </VStack>
      ) : (
        <VStack
          spacing={8}
          alignItems='flex-start'
          bg='white'
          p='8'
          borderRadius='lg'
          shadow='sm'
          divider={<StackDivider borderColor='gray.200' />}
        >
          {reviews.map((review, index) => {
            const { rating, comment, name, email, _id: id } = review;
            return (
              <Flex
                key={index}
                w='100%'
                flexDirection={{ base: 'column', sm: 'row' }}
              >
                <VStack alignItems='flex-start'>
                  <Stars stars={rating} />
                  <Text>{comment}</Text>
                  <Stack direction={{ base: 'column', sm: 'row' }}>
                    <Text as='b' color='brown.500'>
                      {name}
                    </Text>
                    <MdAlternateEmail />
                    <Text
                      as='a'
                      href={`mailto:${email}`}
                      color='blue.500'
                      textDecoration='underline'
                    >
                      {email}
                    </Text>
                  </Stack>
                </VStack>
                <Spacer />
                <Button
                  rightIcon={<MdDelete />}
                  size='xs'
                  variant='outline'
                  colorScheme='red'
                  mt={4}
                  onClick={() => handleDelete(id)}
                >
                  Delete This Review
                </Button>
              </Flex>
            );
          })}
        </VStack>
      )}
    </>
  );
}

export default SingleProductReviews;
