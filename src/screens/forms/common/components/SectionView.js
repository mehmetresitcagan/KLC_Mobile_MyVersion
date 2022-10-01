import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Colors from '../../../../constants/Colors';
const SectionView = ({header, children, headerStyle}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <View style={styles.section_container}>
      {header !== '' && (
        <TouchableOpacity
          onPress={() => setIsOpen(v => !v)}
          style={[styles.header_container, {...headerStyle}]}>
          <Text style={styles.header_text}>{header}</Text>
        </TouchableOpacity>
      )}

      {isOpen && <View style={styles.children_container}>{children}</View>}
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  section_container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,

    margin: 10,
  },
  header_container: {
    padding: 10,
    //margin:10,
    backgroundColor: Colors.dust_storm,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.shuttle_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
  },
  header_text: {
    fontWeight: 'bold',
    fontSize: 20,
    //color:Colors.shuttle_gray
  },
  children_container: {
    padding: 10,
  },
});
