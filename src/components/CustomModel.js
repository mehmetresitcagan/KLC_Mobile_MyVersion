import React from 'react';
import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';

const CustomModal = ({
  onLeftButtonPress,
  leftButtonLabel = 'Vazgeç',

  onRightButtonPress,
  rightButtonLabel,

  modalVisible,
  children,
  modalBkg = '#1d1e22',
  hasLeftButton = true,
}) => {
  const leftButton = (
    <TouchableOpacity onPress={onLeftButtonPress} style={styles.disable_button}>
      <Text
        style={[
          styles.textStyle,
          {
            color: 'white',
          },
        ]}>
        {leftButtonLabel}
      </Text>
    </TouchableOpacity>
  );

  const rightButton = (
    <TouchableOpacity onPress={onRightButtonPress} style={styles.enable_button}>
      <Text
        style={[
          styles.textStyle,
          {
            color: '#000',
          },
        ]}>
        {rightButtonLabel}
      </Text>
    </TouchableOpacity>
  );
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {backgroundColor: modalBkg}]}>
          {children}
          <View style={styles.buttons_container}>
            {hasLeftButton && leftButton}
            {rightButton}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {CustomModal};

const styles = StyleSheet.create({
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },

  disable_button: {
    flex: 1,
    backgroundColor: Colors.shuttle_gray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },

  enable_button: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: Colors.dust_storm,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,

    paddingTop: 20,
    paddingHorizontal: 20,
    //alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
