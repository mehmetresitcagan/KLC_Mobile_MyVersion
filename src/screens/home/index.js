import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import HomeView from './components/HomeView';
import {HomeProvider} from './context/context';

const HomeScreen = props => {
  return (
    <HomeProvider {...props}>
      <SafeAreaView style={{flex:1}}>
        <HomeView />
      </SafeAreaView>
    </HomeProvider>
  );
};

export {HomeScreen};

const styles = StyleSheet.create({});
