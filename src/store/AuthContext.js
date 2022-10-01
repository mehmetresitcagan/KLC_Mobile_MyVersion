import React, {useState, useMemo, createContext, useContext} from 'react';
import {BottomNavigation} from 'react-native-paper';

const AuthContext = createContext();

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const AuthProvider = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(false);

  // -- Handlers

  const onLogin = usr => {
    setUser(usr);
    setToken(usr.token);
  };

  const onLogout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => {
    const setters = {
      setUser,
      setEmail,
      setToken,
      setPassword,
    };

    const functions = {
      onLogin,
      onLogout
    };
    const values = {
      email,
      token,
      password,
    };

    return {values, functions, setters};
  }, [
    user,
    email,
    token,
    password,
    onLogin,
    onLogout,
    setPassword,
    setToken,
    setEmail,
    setUser,
  ]);

  return <AuthContext.Provider value={value} {...props} />;
};
