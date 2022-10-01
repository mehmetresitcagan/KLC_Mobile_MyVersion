import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-paper';
import Colors from '../../../../constants/Colors'
const KTextInput = ({label, value, onChange, ...props}) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChange}
      mode="flat"
      style={styles.input}
      underlineColor={Colors.shuttle_gray}
      activeUnderlineColor={Colors.shuttle_gray}
      {...props}
    />
  );
};

export default KTextInput;

const styles = StyleSheet.create({
  input: {
    margin: 5,
    backgroundColor: '#fff',
  },
});
