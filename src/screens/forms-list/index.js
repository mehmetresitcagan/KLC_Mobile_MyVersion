import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FormsListProvider} from './context/context';
import FormsListView from './components/FormsListView';

const FormsList = (props) => {
  return (
    <FormsListProvider {...props}>
      <FormsListView />
    </FormsListProvider>
  );
};

export {FormsList};

const styles = StyleSheet.create({});
