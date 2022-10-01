import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const CustomButton = ({
  title,
  textColor = '#fff',
  isOutlined = false,
  onPress = () => {},
  containerStyle = {},
  fontSize = 14,
  disabled = false,
}) => {
  const outlineContainerStyle = [
    styles.container,
    {
      backgroundColor:"transparent",
      marginTop: 15,
      ...containerStyle,
    },
  ];

  const customTextStyle = [
    styles.text,
    {
      color: textColor,
    },
  ];
  const outlineTextStyle = [
    styles.text,
    {
      color: Colors.purple,
      fontSize: fontSize,
    },
  ];

  return (
    <TouchableOpacity
      disabled={disabled}
      style={isOutlined ? outlineContainerStyle : styles.container}
      onPress={onPress}>
      <Text style={customTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export {CustomButton};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
    backgroundColor:Colors.shuttle_gray
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
