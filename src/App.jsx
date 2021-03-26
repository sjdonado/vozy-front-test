import * as React from 'react';

import {
  ChakraProvider,
  theme,
  CSSReset,
  Flex,
} from '@chakra-ui/react';

import AuthProvider from './context/AuthProvider';
import Routes from './Routes';

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Flex minH="100vh" maxW="100%" direction="column">
          <Routes />
        </Flex>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
