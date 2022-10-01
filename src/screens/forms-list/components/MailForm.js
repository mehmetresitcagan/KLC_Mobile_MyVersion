import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-paper';

import Colors from '../../../constants/Colors';

const MailForm = ({onSend, item, onGiveUp}) => {
  const [receipent, setReceipent] = useState(null);
  const [topic, setTopic] = useState(null);
  const [message, setMessage] = useState(null);

  const onSendMessage = async () => {
    onSend({
      receipent,
      topic,
      message,
      item,
    });
  };
  return (
    <Animatable.View
      animation="fadeInUpBig"
      duration={500}
      style={styles.outer_container}>
      <View style={styles.triangle} />
      <View style={styles.container}>
        <TextInput
          label={'Alıcının E-posta'}
          value={receipent}
          onChangeText={setReceipent}
          mode="outlined"
          style={styles.input}
          underlineColor={Colors.shuttle_gray}
          activeUnderlineColor={Colors.shuttle_gray}
          selectionColor={Colors.shuttle_gray}
          outlineColor={Colors.shuttle_gray}
          activeOutlineColor={Colors.shuttle_gray}
          keyboardType="email-address"
          
        />
        <TextInput
          label={'Konu ekleyiniz'}
          value={topic}
          onChangeText={setTopic}
          mode="outlined"
          style={styles.input}
          underlineColor={Colors.shuttle_gray}
          activeUnderlineColor={Colors.shuttle_gray}
          selectionColor={Colors.shuttle_gray}
          outlineColor={Colors.shuttle_gray}
          activeOutlineColor={Colors.shuttle_gray}
        />
        <TextInput
          label={'Mesaj yazınız'}
          value={message}
          onChangeText={setMessage}
          mode="outlined"
          style={styles.input}
          underlineColor={Colors.shuttle_gray}
          activeUnderlineColor={Colors.shuttle_gray}
          selectionColor={Colors.shuttle_gray}
          outlineColor={Colors.shuttle_gray}
          activeOutlineColor={Colors.shuttle_gray}
          multiline
        />
        <View style={styles.btns_container}>
          <TouchableOpacity
            onPress={onGiveUp}
            style={[styles.giveup_btn_container]}>
            <Text style={[styles.label]}>{'Vazgeç'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSendMessage}
            style={[styles.send_btn_container]}>
            <Text style={[styles.send_btn_label]}>{'Gönder'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

export default MailForm;

const styles = StyleSheet.create({
  outer_container: {
    borderRadius: 10,
    margin: 5,

    shadowColor: Colors.shuttle_gray,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  container: {
    backgroundColor: Colors.dust_storm,
    padding: 10,
    borderRadius: 10,
  },
  input_container: {
    backgroundColor: Colors.lavender,
    padding: 10,
    borderRadius: 10,
  },
  btns_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  giveup_btn_container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
    backgroundColor: Colors.lavender,
    flex: 1,
  },
  send_btn_container: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 2,
    backgroundColor: Colors.shuttle_gray,
  },

  send_btn_label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.dust_storm,
    alignSelf: 'center',
  },
});
