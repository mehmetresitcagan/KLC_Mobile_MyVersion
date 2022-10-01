import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MailForm from './MailForm';

const FormItem = ({item, onAccess, onSend}) => {
  const [isMailBoxShown, setIsMailBoxShown] = useState(false);
  return (
    <>
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.label}>
          {item.name}
        </Text>
        <View style={styles.btns_container}>
          <TouchableOpacity
            style={styles.icon_container}
            onPress={() => setIsMailBoxShown(c => !c)}>
            <Ionicons
              name={'ios-mail'}
              color={Colors.shuttle_gray}
              size={27}
              style={styles.check_box_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_container}
            onPress={() => onAccess(item.id, 'download')}>
            <Ionicons
              name={'cloud-download'}
              color={Colors.shuttle_gray}
              size={27}
              style={styles.check_box_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.icon_container}
            onPress={() => onAccess(item.id, 'view')}>
            <Ionicons
              name={'eye'}
              color={Colors.shuttle_gray}
              size={27}
              style={styles.check_box_icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {isMailBoxShown && (
        <MailForm
          item={item}
          onSend={onSend}
          onGiveUp={() => setIsMailBoxShown(false)}
        />
      )}
    </>
  );
};

// await Linking.openURL(url)

export default FormItem;

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

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
    fontSize: 17,
    maxWidth: width < 650 ? width * 0.5 : width * 0.75,
  },
  btns_container: {
    flexDirection: 'row',
  },
  icon_container: {
    backgroundColor: Colors.lavender,
    padding: 5,
    marginHorizontal: 3,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
