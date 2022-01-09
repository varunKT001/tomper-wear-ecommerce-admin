import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
  Box,
  Select,
} from '@chakra-ui/react';
import { useAdminContext } from '../context/admin_context';

function CreateNewAdminModal() {
  const {
    new_admin: { name, email, password, privilege },
    updateNewAdminDetails,
    createNewAdmin,
  } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const initialRef = useRef();

  const handleSubmit = async () => {
    if (!name || !email || !password || !privilege) {
      return toast({
        position: 'top',
        description: 'Enter all the details',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    const response = await createNewAdmin();
    if (response.success) {
      onClose();
      return toast({
        position: 'top',
        description: `Account created: ${response.data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      onClose();
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Button colorScheme='brown' onClick={onOpen}>
        CREATE NEW ADMIN
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new admin account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <Input
                ref={initialRef}
                placeholder='Full Name'
                name='name'
                value={name}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                value={email}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder='Password'
                name='password'
                value={password}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Privilege</FormLabel>
              <Select
                name='privilege'
                value={privilege}
                onChange={updateNewAdminDetails}
              >
                <option value='super'>Super</option>
                <option value='moderate'>Moderate</option>
                <option value='low'>Low</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='brown' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateNewAdminModal;
