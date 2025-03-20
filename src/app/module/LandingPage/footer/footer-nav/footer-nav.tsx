import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

function FooterNav() {
  return (
    <Flex
      flex="1"
      justifyContent="space-between"
      gap={2}
      flexDirection={{ base: 'column', md: 'row' }}
    >
      <Link>Home</Link>
      <Link>Product Function</Link>
      <Link>Price Schema</Link>
    </Flex>
  );
}

export default FooterNav;
