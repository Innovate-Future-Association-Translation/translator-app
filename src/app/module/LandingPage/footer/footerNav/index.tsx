import React from 'react'
import {
    Box,
    Flex,
    Heading,
    Link,
  } from "@chakra-ui/react";


function FooterNav() {
  return (
    <Flex flex="1" justifyContent="space-between" gap ={2}>
        <Link>Home</Link>
        <Link>Product Function</Link>
        <Link>Price Schema</Link>
    </Flex>
  )
}

export default FooterNav