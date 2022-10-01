import React, {useRef} from 'react';
import {CustomModal} from '../../../../components';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import Colors from '../../../../constants/Colors';
import {useLanguageContext} from '../../../../store/LanguageContext'

const {height, width} = Dimensions.get('window');

const SignatureBox = ({label, isVisible, onSubmit, value, onOpen, onClose, signImgStyle={}}) => {
  const ref = useRef();
  const getVal = useLanguageContext().functions.getVal

  const handleOK = signature => {
    //console.log(signature);
    onSubmit(signature);
    onClose();
  };

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  //console.log(value);
  const style = `
  .m-signature-pad--footer {display: none; margin: 0px;}
  .m-signature-pad { 
    width: ${width / 1.3}px;
    height: ${height / 2}px;
    margin: 10;
    margin-top: 20px;
    border: 1px solid #e8e8e8;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;

  }
  body {
      background-color: ${Colors.dust_storm};
      
  }
  `;
  const hasLabel = label? true: false
  return (
    <View>
      <View style={styles.input_container}>
        {hasLabel && <Text style={styles.header_value}>{label}</Text>}
        <TouchableOpacity onPress={onOpen}>
          <Image source={{uri: value}} style={[styles.signature, {...signImgStyle}]} />
        </TouchableOpacity>
      </View>

      <CustomModal
        modalBkg="#101010"
        leftButtonLabel={getVal('clean')}
        rightButtonLabel={getVal('confirm')}
        onRightButtonPress={handleConfirm}
        onLeftButtonPress={handleClear}
        modalVisible={isVisible}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.model_header_label}>{label}</Text>
          <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
        </View>
      </CustomModal>
    </View>
  );
};

export default SignatureBox;

const styles = StyleSheet.create({
  model_header_label: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  input_container: {
    backgroundColor: Colors.lavender,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent:"space-evenly",
    flexDirection: 'row',
    marginVertical: 10,
  },
  header_value: {
   // minWidth: 150,
  },
  signature: {
    height: 100,
    width: width * 0.5,
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    resizeMode:"contain"
  },
});
