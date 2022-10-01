import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useHomeContext} from '../context/context';

const {width} = Dimensions.get('window');
const isMobile = width < 650;

const FormButton = ({item}) => {
  const ctx = useHomeContext();

  return (
    <TouchableOpacity
      style={[styles.container, isMobile && styles.mobile_container]}
      disabled={item.active === 0}
      onPress={() => ctx.functions.navigator(item.ref)}>
      <View style={styles.icon_container}>
        <Ionicons
          name={'shield-checkmark'}
          color={item.active ? Colors.shuttle_gray : Colors.dust_storm}
          size={27}
          style={styles.check_box_icon}
        />
      </View>
      <Text style={styles.label}>{item.name}</Text>
    </TouchableOpacity>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  container: {
    height: width / 4.5,
    width: width / 4.5,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 5,

    shadowColor: Colors.shuttle_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  label: {
    fontWeight: '500',
    marginLeft: 5,
  },
  icon_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lavender,
    maxWidth: 50,
  },
  mobile_container: {
    width: 'auto',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    flex:1,
  },
});
