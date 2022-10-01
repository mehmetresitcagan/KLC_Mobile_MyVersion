import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FormsListProvider} from './context/context';
import FormsListView from './components/FormsListView';

const FormsFolders = (props) => {
  return (
    <FormsListProvider {...props}>
      <FormsListView />
    </FormsListProvider>
  );
};

export {FormsFolders};

const styles = StyleSheet.create({});
