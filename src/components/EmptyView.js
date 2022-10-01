import React from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from 'react-native';
import Colors from '../constants/Colors';
import Images from '../constants/Images';

const EmptyView = ({
  message = '',
  hasBtn = false,
  onPress,
  btnLabel,
  hasImg = true,
  tintColor = '#fff',
}) => {

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Image style={styles.empty_icon} source={Images.file} />
        <Text style={styles.message}>{message}</Text>
      </View>
      {hasBtn && (
        <TouchableOpacity style={styles.active_button} onPress={onPress}>
          <Text style={styles.button_label}>{btnLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {EmptyView};

const {width} = Dimensions.get('screen');
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'center',
  },

  empty_icon: {
    width: width * 0.35,
    height: width * 0.35,
    tintColor: Colors.shuttle_gray,
    alignSelf: 'center',
  },

  message: {
    alignSelf: 'center',
    color: '#000',
    fontWeight: 'bold',
  },

  active_button: {
    backgroundColor: '#1bcda3',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 15,
  },

  button_label: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
});
