import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  List,
  ListItem,
  keyframes,
  Button,
  CloseButton,
  useBreakpointValue,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthProvider';

const forwardAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 250px;
  }
`;

const reverseAnimation = keyframes`
  from {
    width: 250px;
  }
  to {
    width: 0;
  }
`;

function Drawer({ isOpen, setIsOpen }) {
  const { removeAuthToken } = useContext(AuthContext);

  const variant = useBreakpointValue({
    base: false, sm: true, md: true, lg: true,
  });

  const [lastVariant, setLastVariant] = useState(variant);

  if (isOpen === undefined && variant !== undefined) {
    setIsOpen(variant);
  }

  if (variant !== lastVariant) {
    setIsOpen(variant);
    setLastVariant(variant);
  }

  return (
    <Box
      borderRight="1px"
      borderColor="gray.300"
      css={{
        overflowX: 'hidden',
        animation: isOpen
          ? `${forwardAnimation} 0.25s linear forwards`
          : `${reverseAnimation} 0.25s linear forwards`,
      }}
    >
      {!variant && <CloseButton marginTop="5" marginRight="4" float="right" size="md" onClick={() => setIsOpen(false)} />}
      <List spacing={8} margin="8" marginTop="40" minW="300px">
        <ListItem>Item One</ListItem>
        <ListItem>Item Two</ListItem>
        <ListItem>Item Three</ListItem>
        <ListItem>Item Four</ListItem>
        <ListItem><Button onClick={removeAuthToken}>Logout</Button></ListItem>
      </List>
    </Box>
  );
}

Drawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Drawer;
