import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const CustomTextInput = props => {
  const {
    value = '',
    title,
    placeholder,
    handleTextChange,
    isWarningsVisible,
    warningMessage,
    isValidInput,
    keyboardType = 'default',
    iconic = true,
    icon = <FontAwesome name="at" color="#05375a" size={20} />,
    multiline = false,
    numberOfLines = 1,
    validatable = true,
    editable = true,
  } = props;

  return (
    <>
      <Text style={[styles.text_footer, styles.container_margin_top]}>
        {title}
      </Text>
      <View style={styles.action}>
        {iconic && icon}
        <TextInput
          editable={editable}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleTextChange}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
        {isValidInput && validatable ? (
          <Animatable.View animation="bounceIn">
            <Feather name="check-circle" color="green" size={20} />
          </Animatable.View>
        ) : null}
      </View>
      {isValidInput || !isWarningsVisible ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{warningMessage}</Text>
        </Animatable.View>
      )}
    </>
  );
};

export {CustomTextInput};
const styles = StyleSheet.create({
  text_footer: {
    color: '#000',
    fontSize: 18,
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#000',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
  },

  container_margin_top: {
    marginTop: 12,
  },
});
