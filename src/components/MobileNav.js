import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import {
  IconButton,
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
  Image,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { useUserContext } from '../context/user_context';
import { FiMenu, FiChevronDown, FiChevronRight } from 'react-icons/fi';
import { useLocation, Link } from 'react-router-dom';

export default function MobileNav({ onOpen, ...rest }) {
  const {
    currentUser: { name },
    logout,
  } = useUserContext();
  const location = useLocation();
  const toast = useToast();

  const [breadCrumbs, setBreadCrumbs] = useState([]);

  const handleSubmit = async () => {
    const { message } = await logout();
    return toast({
      position: 'top',
      description: message,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  useEffect(() => {
    let path = location.pathname.substring(1).split('/');
    path = path.map((item, index) => {
      if (item === '') {
        return { name: 'home', path: '/' };
      }
      return {
        name: item,
        path: `${index === 1 ? `/${path[0]}/${item}` : `/${item}`}`,
      };
    });
    setBreadCrumbs(path);
  }, [location]);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='space-between'
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant='outline'
        aria-label='open menu'
        icon={<FiMenu />}
      />

      <Image
        src={logo}
        boxSize='150px'
        display={{ base: 'flex', md: 'none' }}
      />

      <Breadcrumb
        spacing='8px'
        separator={<FiChevronRight color='gray.500' />}
        display={{ base: 'none', md: 'flex' }}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to='/'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadCrumbs[0]?.name !== 'home' &&
          breadCrumbs.map((item, index) => {
            return (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  as={Link}
                  to={item.path}
                  textTransform='capitalize'
                >
                  {item.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
      </Breadcrumb>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition='all 0.3s'
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar size={'sm'} name={name} />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems='flex-start'
                  spacing='1px'
                  ml='2'
                >
                  <Text fontSize='sm'>{name}</Text>
                  <Text fontSize='xs' color='gray.600'>
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem onClick={handleSubmit}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
}
