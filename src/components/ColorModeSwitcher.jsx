import React from 'react';

import {
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';

import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = () => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      margin="2"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
    />
  );
};

export default ColorModeSwitcher;
