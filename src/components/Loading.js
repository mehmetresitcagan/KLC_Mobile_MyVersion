import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator, Colors} from 'react-native-paper';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
      size={"large"}
      animating={true} color={Colors.black} />
    </View>
  );
};

export {LoadingView} ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#d3d3d399',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:100
  },
});
