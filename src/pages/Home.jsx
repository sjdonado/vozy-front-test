import React, { useContext, useState } from 'react';

import {
  CircularProgress,
  Container,
  Flex,
  Box,
  Text,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthProvider';
import Navbar from '../components/Navbar';
import Drawer from '../components/Drawer';

function Home() {
  const { sessionUser } = useContext(AuthContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const { name, picture } = sessionUser;
  const fullName = `${name.title} ${name.first} ${name.last}`;

  return (
    <>
      {sessionUser ? (
        <Flex flex="1">
          <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
          <Flex direction="column" flex="7">
            <Navbar
              fullName={fullName}
              thumbnail={picture.thumbnail}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
            <Container flex="90">
              <Box>
                <Text>Testing!</Text>
              </Box>
            </Container>
          </Flex>
        </Flex>
      ) : (
        <Flex justify="center" align="center">
          <CircularProgress margin="6" isIndeterminate />
        </Flex>
      )}
    </>
  );
}

export default Home;
