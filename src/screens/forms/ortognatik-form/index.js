import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {OrtognatikFormProvider} from './context/context';
import MainView from './views/MainView';

const OrtognatikForm = (props) => {
  return (
    <OrtognatikFormProvider {...props}>
      <MainView />
    </OrtognatikFormProvider>
  );
};

export {OrtognatikForm as OrtognatikFormScreen} ;

const styles = StyleSheet.create({});
