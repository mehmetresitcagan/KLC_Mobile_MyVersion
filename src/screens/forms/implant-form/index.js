import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImplantFormProvider} from './context/context';
import MainView from './views/MainView';

const ImplantForm = (props) => {
  return (
    <ImplantFormProvider {...props}>
      <MainView />
    </ImplantFormProvider>
  );
};

export {ImplantForm as ImplantFormScreen} ;

const styles = StyleSheet.create({});
