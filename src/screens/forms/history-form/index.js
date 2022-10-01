import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HistoryForm from './views/HistoryForm';
import globalStyle from '../common/styles';
import {HistoryFormProvider} from './context/context';
const HistoryFormScreen = (props) => {
  return (
    <HistoryFormProvider {...props}>
      <View style={globalStyle.screen_container}>
        <HistoryForm />
      </View>
    </HistoryFormProvider>
  );
};

export {HistoryFormScreen};

const styles = StyleSheet.create({});
