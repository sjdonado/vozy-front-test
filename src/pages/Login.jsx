import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import {
  FormControl,
  FormLabel,
  Input,
  Divider,
  Button,
  FormHelperText,
  CircularProgress,
  Flex,
  Box,
  Heading,
  useToast,
} from '@chakra-ui/react';

import { AuthContext } from '../context/AuthProvider';
import { login, fetchRandomUsers, getRandomUsers } from '../services/AuthService';

import ColorModeSwitcher from '../components/ColorModeSwitcher';

function Login() {
  const toast = useToast();
  const history = useHistory();
  const { setAuthToken, setSessionUserData } = useContext(AuthContext);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [exampleUser, setExampleUser] = useState();

  const handleSetExampleUser = async () => {
    const cachedData = getRandomUsers();
    let data = cachedData;
    if (!cachedData) {
      data = await fetchRandomUsers();
    }
    const user = data[Math.round(Math.random() * 5)];
    if (user) {
      setExampleUser({
        username: user.login.username,
        password: user.login.password,
      });
    }
  };

  useEffect(() => {
    if (!exampleUser) {
      handleSetExampleUser();
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!login(username, password, setAuthToken, setSessionUserData)) {
      toast({
        title: 'User not found, try again!',
        status: 'error',
        isClosable: true,
      });
      return;
    }
    history.push('/');
  };

  return (
    <>
      <Flex justify="flex-end">
        <ColorModeSwitcher />
      </Flex>
      <Flex flex="1" direction="column" justify="center" align="center">
        <Heading margin="6">TV search</Heading>
        {exampleUser ? (
          <Box
            minW="300"
            padding="4"
            border="1px"
            borderColor="gray.200"
            borderRadius="4"
          >
            <FormControl
              as="form"
              onSubmit={handleSubmit}
            >
              <FormControl flex="1" marginBottom="6" isRequired>
                <FormLabel htmlFor="username">
                  Username
                </FormLabel>
                <Input
                  variant="filled"
                  type="text"
                  id="username"
                  aria-describedby="username-helper-text"
                  autoComplete="new-password"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="myusername"
                />
                <FormHelperText fontSize="xs" fontWeight="bold" marginTop="2">
                  (hint):
                  {exampleUser.username}
                </FormHelperText>
              </FormControl>
              <FormControl flex="1" marginBottom="6" isRequired>
                <FormLabel htmlFor="password">
                  Password
                </FormLabel>
                <Input
                  variant="filled"
                  type="password"
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  aria-describedby="email-helper-password"
                  placeholder="password"
                />
                <FormHelperText fontSize="xs" fontWeight="bold" marginTop="2">
                  (hint):
                  {exampleUser.password}
                </FormHelperText>
              </FormControl>
              <Divider width="100%" backgroundColor="gray.200" />
              <Button
                type="submit"
                width="100%"
                height="37"
                borderRadius="4"
                marginTop="3"
              >
                Login
              </Button>
            </FormControl>
          </Box>
        ) : <CircularProgress margin="6" isIndeterminate />}
      </Flex>
    </>
  );
}

export default Login;
