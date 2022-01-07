import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';

export default function NavItem({ url, icon, children, ...rest }) {
  return (
    <Link
      to={url}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr='4'
            fontSize='16'
            _groupHover={{
              color: 'white',
            }}
          >
            {icon}
          </Icon>
        )}
        {children}
      </Flex>
    </Link>
  );
}
