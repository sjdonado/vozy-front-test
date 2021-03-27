import * as React from 'react';

import {
  ChakraProvider,
  theme,
  CSSReset,
  Flex,
} from '@chakra-ui/react';

import AuthProvider from './context/AuthProvider';
import DrawerProvider from './context/DrawerProvider';

import Routes from './Routes';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <DrawerProvider>
          <Flex minH="100vh" maxW="100%" direction="column">
            <Routes />
            <Footer />
          </Flex>
        </DrawerProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
