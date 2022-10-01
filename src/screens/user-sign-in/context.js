/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, createContext, useContext} from 'react';
import {BottomNavigation} from 'react-native-paper';
import { useEffect } from 'react/cjs/react.production.min';
import API from '../../constants/API';
import {useAuthContext} from '../../store/AuthContext';

const SignInContext = createContext();

export const useSignInContext = () => {
  const context = useContext(SignInContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const UserSignInProvider = props => {
  const authCtx = useAuthContext();
  //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // -- Handlers
  const navigator = ref => props.navigation.navigate(ref);

  const onLogin = async () => {
    try {
      console.log(email, password);
      if (!email || !password) {
        throw 'Please enter a valid Email/Password';
      }

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        email: email.toLowerCase(),
        password,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const res = await fetch(API.login, requestOptions);
      const result = await res.json();

      if (result.error) {
        throw result.error;
      }

      authCtx.functions.onLogin({
        email,
        password,
        token: result.result.accessToken,
      });
      props.navigation.replace(props.route.params.nextScreen);
    } catch (e) {
      console.log(e);
      setError(e.message || e);
    }
  };

  const value = useMemo(() => {
    const setters = {
      setEmail,
      setError,
      setLoading,
      setPassword,
    };

    const functions = {
      onLogin,
      navigator,
    };
    const values = {
      email,
      error,
      loading,
      password,
    };

    return {values, functions, setters};
  }, [
    onLogin,
    navigator,
    email,
    password,
    loading,
    error,
    setPassword,
    setLoading,
    setEmail,
    setError,
  ]);

  return <SignInContext.Provider value={value} {...props} />;
};
