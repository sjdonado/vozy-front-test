import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import {
  Flex,
  Avatar,
  IconButton,
  Input,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';

import { DrawerContext } from '../context/DrawerProvider';
import ColorModeSwitcher from './ColorModeSwitcher';

function Navbar({
  fullName,
  thumbnail,
}) {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);

  return (
    <Flex
      flex="1"
      align="center"
      justify="flex-end"
      padding="2"
      borderBottom="1px"
      borderColor="gray.300"
    >
      {!isDrawerOpen && (
      <IconButton
        size="md"
        fontSize="lg"
        variant="ghost"
        onClick={() => setIsDrawerOpen(true)}
        icon={<GiHamburgerMenu />}
        aria-label="Logout"
      />
      )}
      <Input
        flex="7"
        variant="unstyled"
        placeholder="Search..."
        marginLeft="2"
      />
      <Avatar name={fullName} src={thumbnail} marginLeft="2" />
      <ColorModeSwitcher marginLeft="2" />
    </Flex>
  );
}

Navbar.propTypes = {
  fullName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default Navbar;
