import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-paper';

import {CustomButton, LoadingView, ErrorView} from '../../../components';

import styles from './styles';
import Images from '../../../constants/Images';
import {SafeAreaView} from 'react-native-safe-area-context';
import Colors from '../../../constants/Colors';
import {useSignInContext} from '../context';
import { useLanguageContext } from '../../../store/LanguageContext';

const SignInScreen = ({navigation}) => {
  const ctx = useSignInContext();
  const langCtx = useLanguageContext()
  const {getVal} = langCtx.functions

  const {email, password, loading, error} = ctx.values;
  const {onLogin} = ctx.functions;
  const {setEmail, setPassword, setError} = ctx.setters;

  // Custom Styling

  const animatableViewStyle = [
    styles.footer,
    {
      backgroundColor: Colors.lavender,
    },
  ];

  const statusBar = (
    <>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
    </>
  );

  const welcomeView = (
    <View style={styles.header}>
      <Text style={styles.text_header}>{getVal('welcome')}</Text>
    </View>
  );

  const emailView = (
    <TextInput
      mode="flat"
      value={email}
      onChangeText={setEmail}
      label={getVal('email address')}
      style={{
        marginTop: 10,
        backgroundColor: '#fff',
      }}
      keyboardType={'email-address'}
      placeholder={getVal('email address')}
      outlineColor={Colors.shuttle_gray}
      underlineColor={Colors.shuttle_gray}
      activeOutlineColor={Colors.shuttle_gray}
      activeUnderlineColor={Colors.shuttle_gray}
    />
  );

  const passwordView = (
    <TextInput
      mode="flat"
      label={getVal('password')}
      value={password}
      secureTextEntry={true}
      placeholder={getVal('password')}
      onChangeText={setPassword}
      style={{
        marginTop: 10,
        backgroundColor: '#fff',
      }}
      outlineColor={Colors.shuttle_gray}
      underlineColor={Colors.shuttle_gray}
      activeOutlineColor={Colors.shuttle_gray}
      activeUnderlineColor={Colors.shuttle_gray}
    />
  );

  const signingButtonsView = (
    <View style={styles.buttons}>
      <CustomButton title={getVal('login')} onPress={onLogin} disabled={loading} />
      <CustomButton
        title={getVal('go back')}
        onPress={() => navigation.goBack()}
        isOutlined
        disabled={loading}
        textColor={Colors.shuttle_gray}
      />
    </View>
  );
  const background = (
    <Image source={Images.background} style={styles.background} />
  );
  return (
    <SafeAreaView style={styles.container}>
      {error && (
        <ErrorView
          message={JSON.stringify(error)}
          onPress={() => setError(null)}
        />
      )}
      <View style={[styles.container, loading && {display: 'none'}]}>
        {background}
        {statusBar}
        {welcomeView}
        {
          <>
            <Animatable.View
              animation="fadeInUpBig"
              style={[animatableViewStyle]}>
              <ScrollView>
                {emailView}
                {passwordView}
                {signingButtonsView}
              </ScrollView>
            </Animatable.View>
          </>
        }
      </View>
      {loading && <LoadingView />}
    </SafeAreaView>
  );
};

export default SignInScreen;
