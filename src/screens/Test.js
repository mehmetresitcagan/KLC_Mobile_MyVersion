import React, {useRef, useState} from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';

const Sign = ({onOK}) => {
  const ref = useRef();
  const [usign, setUsign] = useState();

  const handleOK = signature => {
    console.log('ok');
    setUsign(signature);
    // console.log(signature.replace("data:image/png;base64,", ""))
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    console.log('confirm');
    ref.current.readSignature();
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
      <View style={styles.row}>
        <Button title="Clear" onPress={handleClear} />
        <Button title="Confirm" onPress={handleConfirm} />
      </View>
      <Image
        style={{
          width: 100,
          height: 50,
          resizeMode: 'contain',
          borderWidth: 1,
          borderColor: 'red',
        }}
        source={{uri: usign}}
      />
    </View>
  );
};

export {Sign as TestScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    padding: 10,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
});
