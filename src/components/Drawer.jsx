import React, { useContext, useEffect, useState } from 'react';

import {
  Box,
  List,
  ListItem,
  keyframes,
  Button,
  CloseButton,
  Heading,
  useBreakpointValue,
  useColorMode,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthProvider';
import { DrawerContext } from '../context/DrawerProvider';

import CustomAlertDialog from './CustomAlertDialog';

const forwardAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 350px;
  }
`;

const reverseAnimation = keyframes`
  from {
    width: 350px;
  }
  to {
    width: 0;
  }
`;

const responsiveStyle = (colorMode) => ({
  position: 'absolute',
  zIndex: '100',
  background: colorMode === 'light' ? 'white' : '#1A202C',
  height: '100%',
});

function Drawer() {
  const { colorMode } = useColorMode();

  const { removeAuthToken } = useContext(AuthContext);
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);

  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const variant = useBreakpointValue({
    base: false, sm: false, md: false, lg: true,
  });
  const [lastVariant, setLastVariant] = useState(variant);

  useEffect(() => {
    if (isDrawerOpen === undefined && variant !== undefined) {
      setIsDrawerOpen(variant);
    }
    if (variant !== lastVariant) {
      setIsDrawerOpen(variant);
      setLastVariant(variant);
    }
  }, [isDrawerOpen, variant, setIsDrawerOpen, setLastVariant]);

  const handleLogout = () => {
    setIsLogoutAlertOpen(true);
  };

  const boxStyle = {
    overflowX: 'hidden',
    animation: isDrawerOpen
      ? `${forwardAnimation} 0.25s linear forwards`
      : `${reverseAnimation} 0.25s linear forwards`,
  };

  if (variant === false) {
    Object.assign(boxStyle, responsiveStyle(colorMode));
  }

  return (
    <>
      <Box
        borderRight="1px"
        borderColor="gray.300"
        css={boxStyle}
      >
        {!variant && (
          <CloseButton
            marginTop="5"
            marginRight="4"
            float="right"
            size="md"
            onClick={() => setIsDrawerOpen(false)}
          />
        )}
        <List spacing={8} marginTop="40" minW="300px" textAlign="center">
          <Heading>TV search</Heading>
          <ListItem>Item One</ListItem>
          <ListItem>Item Two</ListItem>
          <ListItem>Item Three</ListItem>
          <ListItem>Item Four</ListItem>
          <ListItem><Button onClick={handleLogout}>Logout</Button></ListItem>
        </List>
      </Box>
      <CustomAlertDialog
        title="Logout"
        description="Are you sure? You can't undo this action afterwards."
        isOpen={isLogoutAlertOpen}
        setIsOpen={setIsLogoutAlertOpen}
        callback={removeAuthToken}
      />
    </>
  );
}

export default Drawer;
