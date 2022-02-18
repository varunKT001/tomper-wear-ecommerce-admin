import React, { useState } from 'react';
import { useUserContext } from '../context/user_context';
import { useToast } from '@chakra-ui/react';
import { PreLoader } from '../components';
import useMounted from '../hooks/useMounted';
import logo from '../assets/logo.svg';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Image,
} from '@chakra-ui/react';

export default function LoginPage() {
  const { login, authLoading } = useUserContext();
  const toast = useToast();
  const mounted = useMounted();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email || !password) {
      return toast({
        position: 'top',
        title: 'Invalid Input',
        description: 'Provide all the credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(true);
    const response = await login(email, password);
    if (mounted.current) {
      setLoading(false);
    }
    if (response.success) {
      return toast({
        position: 'top',
        description: `Logged In as ${response.data.name}`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        position: 'top',
        description: response.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (authLoading) {
    return <PreLoader />;
  }

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={'gray.50'}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Image src={logo} alt='logo' w='50%' />
        </Stack>
        <Box bg={'white'} rounded={'lg'} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <FormControl id='email'>
              <FormLabel>Email address</FormLabel>
              <Input
                type='email'
                placeholder='Enter your email address'
                variant='filled'
                focusBorderColor='brown.500'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id='password'>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Enter your password'
                variant='filled'
                focusBorderColor='brown.500'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Button
                isLoading={loading}
                bg={'brown.400'}
                color={'white'}
                _hover={{
                  bg: 'brown.500',
                }}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
