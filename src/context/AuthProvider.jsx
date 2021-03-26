import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { useCookies } from 'react-cookie';

import { AUTH_TOKEN_COOKIE, SESSION_USER_LOCAL_KEY } from '../utils/Constants';

export const AuthContext = createContext();

const defaultCookiesParams = {
  path: '/',
  expires: moment(new Date())
    .add(1, 'day')
    .toDate(),
  sameSite: true,
};

function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN_COOKIE]);
  const userLocalStorage = localStorage.getItem(SESSION_USER_LOCAL_KEY);
  const [sessionUser, setSessionUser] = useState(
    userLocalStorage ? JSON.parse(userLocalStorage) : null,
  );

  const setAuthToken = (token) => {
    setCookie(AUTH_TOKEN_COOKIE, token, defaultCookiesParams);
  };

  const setSessionUserData = (data) => {
    localStorage.setItem(SESSION_USER_LOCAL_KEY, JSON.stringify(data));
    setSessionUser(data);
  };

  const removeAuthToken = () => {
    removeCookie(AUTH_TOKEN_COOKIE, {
      path: '/',
    });
    localStorage.removeItem(SESSION_USER_LOCAL_KEY);
    setSessionUser(null);
  };

  const isAuth = () => cookies[AUTH_TOKEN_COOKIE];

  return (
    <AuthContext.Provider
      value={{
        setAuthToken,
        setSessionUserData,
        removeAuthToken,
        isAuth,
        sessionUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
