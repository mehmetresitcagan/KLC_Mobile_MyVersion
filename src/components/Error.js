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

const ErrorView = ({
  label = 'Düzenle',
  hasButton = true,
  message = '',
  onPress,
  imgSourse = Images.error_503b,
}) => {
  return (
    <View style={styles.container}>
      <Image style={styles._icon} source={imgSourse} />
      {message ? (
        <Text numberOfLines={3} style={styles.message}>
          {message}
        </Text>
      ) : (
        <></>
      )}
      {hasButton && (
        <TouchableOpacity onPress={onPress} style={styles.goBack_container}>
          <Text style={styles.text}>{label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export {ErrorView};

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
    backgroundColor: '#3f7bff',
    width: width * 0.5,
    padding: 15,
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  text: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 20,
  },
  message: {
    fontWeight: '600',
    color: '#000',
    fontSize: 17,
    width: width * 0.7,
    textAlign: 'center',
  },
  _icon: {
    height: width * 0.5,
    width: width * 0.5,
  },
});
