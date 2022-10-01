import 'react-native-gesture-handler';
import {StyleSheet, LogBox} from 'react-native';
import React from 'react';
import Navigation from './navigator/navigation';
import {AuthProvider} from './store/AuthContext';
import {LanguageProvider} from './store/LanguageContext';

//LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
//LogBox.ignoreAllLogs();//Ignore all log notifications

const App = props => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
