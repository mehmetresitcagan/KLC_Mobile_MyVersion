import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {UserSignInProvider} from './context';
import MainView from './views/MainView';

const UserSignIn = props => {
  return (
    <UserSignInProvider {...props}>
      <MainView {...props} />
    </UserSignInProvider>
  );
};

export {UserSignIn};

const styles = StyleSheet.create({});
