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

const FormItem = ({item, onAccess}) => {
  return (
    <TouchableOpacity onPress={()=>onAccess(item)} style={styles.container}>
      <View style={styles.icon_container}>
        <Ionicons
          name={'ios-grid'}
          color={Colors.shuttle_gray}
          size={27}
          style={styles.check_box_icon}
        />
      </View>
      <Text style={styles.label}>{item.title}</Text>
    </TouchableOpacity>
  );
};

// await Linking.openURL(url)

export default FormItem;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    justifyContent: 'space-evenly',
    alignItems:"center",
    flex: 1,
    width: width,
    height: width / 4.5,
    width: width / 4.5,
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
    fontSize: width *0.03,
    color:'black'
  },
  btns_container: {
    flexDirection: 'row',
  },
  icon_container: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.lavender,
    maxWidth: 50,
    marginTop:5,
    marginLeft:5
  },
});
