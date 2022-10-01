import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Colors';
import {useLanguageContext} from '../../../../store/LanguageContext';

const PolarInput = ({
  question,
  value,
  onToggle,
  children,
  trueLable = 'Evet',
  falseLabel = 'Hayır',
}) => {
  const isTrue = value === trueLable;
  const isFalse = value === falseLabel;

  const langCtx = useLanguageContext();
  const trueTxtLabel = langCtx.functions.getVal('yes');
  const falseTxtLabel = langCtx.functions.getVal('no');
  return (
    <View style={styles.outer_container}>
      <View style={styles.container}>
        <Text style={styles.question_text}>{question}</Text>
        <View style={styles.input_container}>
          <TouchableOpacity
            style={[
              styles.input_btn_container,
              isTrue && styles.active_btn_container,
            ]}
            onPress={() => onToggle(trueLable)}>
            <Text style={[isTrue && styles.active_btn_text]}>
              {trueTxtLabel}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onToggle(falseLabel)}
            style={[
              styles.input_btn_container,
              isFalse && styles.active_btn_container,
            ]}>
            <Text style={[isFalse && styles.active_btn_text]}>
              {falseTxtLabel}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {children}
    </View>
  );
};

export default PolarInput;

const styles = StyleSheet.create({
  outer_container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,

    elevation: 5,
    backgroundColor: Colors.lavender,
    padding: 5,
    marginVertical: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question_text: {
    color: 'black',
    flex: 2,
    fontWeight: 'bold',
    fontSize: 17,
  },
  input_container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  input_btn_container: {
    //backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  active_btn_container: {
    backgroundColor: Colors.shuttle_gray,
  },
  active_btn_text: {
    color: Colors.lavender,
    fontWeight: 'bold',
  },
});
