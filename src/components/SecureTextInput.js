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
import Feather from 'react-native-vector-icons/Feather';

const SecureTextInput = props => {
  const {
    title,
    placeholder,
    isInputSecured,
    handleTextChange,
    setIsInputSecured,
    isWarningsVisible,
    warningMessage,
    isValidInput,
  } = props;

  return (
    <>
      <Text style={[styles.text_footer, styles.container_margin_top]}>
        {title}
      </Text>
      <View style={styles.action}>
        <Feather name="lock" color="#05375a" size={20} />
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isInputSecured ? true : false}
          style={styles.textInput}
          autoCapitalize="none"
          onChangeText={handleTextChange}
        />
        <TouchableOpacity onPress={setIsInputSecured}>
          {isInputSecured ? (
            <Feather name="eye-off" color="grey" size={20} />
          ) : (
            <Feather name="eye" color="grey" size={20} />
          )}
        </TouchableOpacity>
      </View>
      {isValidInput || !isWarningsVisible ? null : (
        <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>{warningMessage}</Text>
        </Animatable.View>
      )}
    </>
  );
};

export {SecureTextInput};
const styles = StyleSheet.create({
  text_footer: {
    color: '#000',
    fontSize: 18,
  },
  errorMsg: {
    color: '#000',
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
    borderBottomColor: '#000',
    paddingBottom: 5,
    backgroundColor:"white",
    padding:15,
    borderRadius:15
  },

  container_margin_top: {
    marginTop: 12,
  },
});
