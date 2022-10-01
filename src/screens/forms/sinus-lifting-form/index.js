import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SinusLiftingFormProvider} from './context/context';
import MainView from './views/MainView';

const SinusLiftingForm = () => {
  return (
    <SinusLiftingFormProvider>
      <MainView />
    </SinusLiftingFormProvider>
  );
};

export {SinusLiftingForm as SinusLiftingFormScreen} ;

const styles = StyleSheet.create({});
