import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Flex,
  Avatar,
  IconButton,
  Input,
  Progress,
} from '@chakra-ui/react';

import { GiHamburgerMenu } from 'react-icons/gi';

import { DrawerContext } from '../context/DrawerProvider';
import ColorModeSwitcher from './ColorModeSwitcher';

function Navbar({
  fullName,
  thumbnail,
  searchShows,
  searchQuery,
}) {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);
  const [searchValue, setSearchValue] = useState(searchQuery);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (value) => {
    setIsLoading(true);
    setSearchValue(value);
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(setTimeout(() => {
      searchShows(value);
      setIsLoading(false);
    }, 500));
  };

  return (
    <>
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
          value={searchValue}
          onChange={(e) => handleUpdate(e.target.value)}
        />
        <Avatar name={fullName} src={thumbnail} marginLeft="2" />
        <ColorModeSwitcher marginLeft="2" />
      </Flex>
      {isLoading && <Progress size="xs" width="100%" isIndeterminate />}
    </>
  );
}

Navbar.propTypes = {
  fullName: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  searchShows: PropTypes.func.isRequired,
};

export default Navbar;
