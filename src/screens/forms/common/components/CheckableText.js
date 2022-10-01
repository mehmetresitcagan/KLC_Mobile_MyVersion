import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../../../constants/Colors';

const CheckableText = ({label, value, onPress, isDisabled = false, trueVal="1", falseVal="0",containerStyle={}}) => {
  let isActive = value === trueVal;
  return (
    <TouchableOpacity
      disabled={isDisabled}
      onPress={() => onPress(!isActive ? trueVal : falseVal)}
      style={[styles.check_box_container,{...containerStyle}]}>
      <Ionicons
        name={isActive ? 'checkmark-circle' : 'ios-scan-circle-outline'}
        color={Colors.shuttle_gray}
        size={27}
        style={styles.check_box_icon}
      />
      <Text style={styles.label} >{label}</Text>
    </TouchableOpacity>
  );
};

export default CheckableText;

const styles = StyleSheet.create({
  check_box_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lavender,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    margin: 5,
    //justifyContent:"space-between",
    flex: 1,
    borderWidth: 1,
    overflow:"scroll"
  },
  check_box_icon: {justifyContent: 'center', 
  //marginLeft: 10
},
  label: {
    fontWeight: '600',
    marginLeft: 5,
    textAlign: 'center',
  },
});
