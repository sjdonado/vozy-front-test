import React from 'react';

import {
  Text,
  Flex,
  Link,
} from '@chakra-ui/react';

import { MdFavorite } from 'react-icons/md';

function Footer() {
  return (
    <Flex
      justifyContent="flex-end"
      alignItems="center"
      fontSize="12px"
      paddingRight="4"
      borderTop="1px"
      borderColor="gray.300"
    >
      <Text>Made with</Text>
      <MdFavorite />
      <Link href="https://github.com/sjdonado" target="_blank">by @sjdonado</Link>
    </Flex>
  );
}

export default Footer;
