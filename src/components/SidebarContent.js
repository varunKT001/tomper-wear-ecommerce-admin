import React, { useState, useEffect } from 'react';
import NavItem from './NavItem';
import { LinkItems } from '../utils/constants';
import { useUserContext } from '../context/user_context';
import logo from '../assets/logo.svg';
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';

export default function SidebarContent({ onClose, ...rest }) {
  const {
    currentUser: { privilege },
  } = useUserContext();
  const [Links, setLinks] = useState([]);

  useEffect(() => {
    if (privilege === 'super') {
      setLinks(LinkItems);
    }
    if (privilege === 'moderate') {
      const tempLinks = LinkItems.filter((link) => link.name !== 'Admins');
      setLinks(tempLinks);
    }
    if (privilege === 'low') {
      const tempLinks = LinkItems.filter(
        (link) => link.name !== 'Admins' && link.name !== 'Products'
      );
      setLinks(tempLinks);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Box
      transition='3s ease'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
        <Image src={logo} />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {Links.map((link) => (
        <NavItem key={link.name} icon={link.icon} url={link.url}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
