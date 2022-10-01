import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';
import Images from '../constants/Images';
import {useNavigation} from '@react-navigation/native';

const SuccessView = ({label = 'Geri Dön', onPress}) => {
  const nav = useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles._icon} source={Images.done} />
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={styles.goBack_container}>
        <Text style={styles.text}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
};

export {SuccessView};

const {width} = Dimensions.get('window');

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
    zIndex: 100,
  },
  goBack_container: {
    marginTop: 10,
    backgroundColor: '#445964',
    width: width * 0.5,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    fontWeight: 'bold',
    color: '#26ddbf',
    fontSize: 20,
  },
  _icon: {
    height: width * 0.5,
    width: width * 0.5,
  },
});
