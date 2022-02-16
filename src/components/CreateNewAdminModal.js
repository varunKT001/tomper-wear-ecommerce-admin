import React, { useRef, useState } from 'react';
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
    fetchAdmins,
  } = useAdminContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const response = await createNewAdmin();
    setLoading(false);
    if (response.success) {
      onClose();
      toast({
        position: 'top',
        description: `Account created: ${response.data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      return await fetchAdmins();
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
        Create New Admin
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
                focusBorderColor='brown.500'
                value={name}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder='Email'
                name='email'
                focusBorderColor='brown.500'
                value={email}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                placeholder='Password'
                name='password'
                focusBorderColor='brown.500'
                value={password}
                onChange={updateNewAdminDetails}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Privilege</FormLabel>
              <Select
                name='privilege'
                focusBorderColor='brown.500'
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
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              colorScheme='brown'
              onClick={handleSubmit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CreateNewAdminModal;
