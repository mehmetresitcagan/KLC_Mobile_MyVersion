import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './stacks/MainStack';

export default function Navigation() {
  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
