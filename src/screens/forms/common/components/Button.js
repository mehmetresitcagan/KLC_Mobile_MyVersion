import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';

const Button = ({label, onPress, btnStyle, labelStyle}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {...btnStyle}]}>
      <Text style={[styles.label, {...labelStyle}]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    //width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
    backgroundColor:Colors.shuttle_gray,
    
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"white"
  },
});
