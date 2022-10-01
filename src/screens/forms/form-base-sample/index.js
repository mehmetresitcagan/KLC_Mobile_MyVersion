import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {EnddonticFormProvider} from './context/context';
import MainView from './views/MainView';

const EnddonticForm = () => {
  return (
    <EnddonticFormProvider>
      <MainView />
    </EnddonticFormProvider>
  );
};

export {EnddonticForm as EnddonticFormScreen} ;

const styles = StyleSheet.create({});
