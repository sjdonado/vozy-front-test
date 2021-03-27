import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const DrawerContext = createContext();

function DrawerProvider({ children }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  return (
    <DrawerContext.Provider
      value={{
        setIsDrawerOpen,
        isDrawerOpen,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

DrawerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrawerProvider;
