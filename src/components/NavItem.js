import React from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NavItem({ url, icon, children, ...rest }) {
  return (
    <Link to={url}>
      <Flex
        align='center'
        p='4'
        mx='4'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        _hover={{
          bg: 'brown.400',
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
