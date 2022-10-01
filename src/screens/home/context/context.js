import React, {useState, useMemo, createContext, useContext} from 'react';
import {BottomNavigation} from 'react-native-paper';

const HomeContext = createContext();

export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const HomeProvider = props => {
  // -- Handlers
  const navigator = (ref, payload = {}) =>
    props.navigation.navigate(ref, payload);

  const value = useMemo(() => {
    const setters = {};

    const functions = {
      navigator,
    };
    const values = {};

    return {values, functions, setters};
  }, [navigator]);

  return <HomeContext.Provider value={value} {...props} />;
};
