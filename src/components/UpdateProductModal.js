import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Textarea,
  Center,
  HStack,
  Image,
  VStack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { useProductContext } from '../context/product_context';

function UpdateProductModal({ id }) {
  const {
    single_product: {
      name = '',
      price = '',
      stock = 0,
      description = '',
      colors = [],
      sizes = [],
      category = '',
      company = '',
      images = [],
      shipping = false,
      featured = false,
    },
    single_product_loading,
    fetchSingleProduct,
    updateExistingProductDetails,
    updateProduct,
  } = useProductContext();

  const [imageList, setImageList] = useState(images);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImageList((prev) => {
          return [...prev, reader.result];
        });
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();
  const toast = useToast();

  const removeImage = (index) => {
    setImageList((prev) => {
      prev.splice(index, 1);
      console.log(prev);
      return [...prev];
    });
  };

  const handleSubmit = async () => {
    if (imageList.length < 1) {
      return toast({
        position: 'top',
        description: 'Add atleast one image',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    const product = {
      name,
      price,
      stock,
      description,
      colors,
      sizes,
      category,
      company,
      shipping,
      featured,
      images: imageList,
    };
    const responseCreate = await updateProduct(id, product);
    if (responseCreate.success) {
      setLoading(false);
      onClose();
      return toast({
        position: 'top',
        description: 'Product updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      setLoading(false);
      return toast({
        position: 'top',
        description: responseCreate.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    setImageList(images);
    // eslint-disable-next-line
  }, [single_product_loading]);

  return (
    <>
      <Text
        colorScheme='brown'
        minW='100%'
        onClick={() => {
          fetchSingleProduct(id);
          onOpen();
        }}
      >
        EDIT
      </Text>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Product Name'
                name='name'
                value={name}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price</FormLabel>
              <Input
                type='number'
                placeholder='Product Price'
                name='price'
                value={price}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                type='number'
                placeholder='Product Stock'
                name='stock'
                value={stock}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Product Description'
                name='description'
                value={description}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                placeholder='Product Category'
                name='category'
                value={category}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Company</FormLabel>
              <Input
                placeholder='Product Company'
                name='company'
                value={company}
                onChange={updateExistingProductDetails}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Sizes</FormLabel>
              <Input
                placeholder='Product Sizes (comma separated)'
                name='sizes'
                value={sizes}
                onChange={updateExistingProductDetails}
              />
              <FormHelperText>Eg: m, l, xl, xxl, xxxl</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Colors</FormLabel>
              <Input
                placeholder='Product Colors (comma separated)'
                name='colors'
                value={colors}
                onChange={updateExistingProductDetails}
              />
              <FormHelperText>Eg: red,green,blue</FormHelperText>
              <FormHelperText>Eg: #FF000,#00FF00,#0000FF</FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Images</FormLabel>
              <Center
                bg='blue.50'
                minHeight={100}
                my={5}
                borderWidth={3}
                borderColor='blue.100'
                borderStyle='dashed'
                borderRadius='lg'
                {...getRootProps()}
              >
                {isDragActive ? (
                  <p>Drag your files here</p>
                ) : (
                  <p>
                    Drag drop image files here, or click to select files
                    <br />
                    (Only *.jpeg and *.png images will be accepted)
                  </p>
                )}
              </Center>
              <Input {...getInputProps()} />
            </FormControl>

            <FormControl mt={4}>
              <HStack>
                {imageList.map((image, index) => {
                  return (
                    <VStack key={index} spacing={3}>
                      <Image
                        src={image?.url ? image.url : image}
                        boxSize='70px'
                        objectFit='cover'
                        borderRadius='lg'
                      />
                      <Button
                        colorScheme='red'
                        size='xs'
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    </VStack>
                  );
                })}
              </HStack>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='shipping'
                isChecked={shipping}
                onChange={updateExistingProductDetails}
              >
                Shipping
              </Checkbox>
            </FormControl>

            <FormControl mt={4}>
              <Checkbox
                name='featured'
                isChecked={featured}
                onChange={updateExistingProductDetails}
              >
                Featured
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              loadingText='Updating Product'
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateProductModal;
