import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const mainTheme = extendTheme({ config });

export default mainTheme;
