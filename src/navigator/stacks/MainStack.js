import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  //
  HistoryFormScreen,
  EnddonticFormScreen,
  SinusLiftingFormScreen,
  DentalFillingScreen,
  ImplantFormScreen,
  OrtognatikFormScreen,
  //
  HomeScreen,
  //
  FormsList,
  FormsFolders,
  SignIn,
  //
  UserSignIn,
} from '../../screens';
import Screens from '../../constants/Screens';

const Stack = createNativeStackNavigator();

const TR_TXT = {
  history_form: 'Anamnez Formu',
  dental_filling_form: 'ESTORATİF DİŞ TEDAVİSİ ONAM İÇİN BİLGİLENDİRME FORMU',
  endontic_treatment_form: 'ENDODONTİK TEDAVİ İZİN FORMU',
  sinus_lifting_form: 'SİNÜS LİFTİNG OPERASYONLARI İÇİN HASTA ONAM FORMU',
  implant_form: 'DİŞ İMPLANTI HASTA ONAM FORMU',
  ortognatik_form:
    'ORTOGNATİK CERRAHİ (ÇENE CERRAHİSİ) ONAM İÇİN BİLGLİENDİRME FORMU',
  //
  home_screen: 'Ana Sayfa',
  forms_list: 'Liste',
  //
  user_signIn: 'Kullanıcı Girişi',
};

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screens.home_screen}
        component={HomeScreen}
        options={{title: TR_TXT.home_screen, headerShown: false}}
      />
      <Stack.Screen
        name={Screens.sign_in}
        component={SignIn}
        options={{title: TR_TXT.home_screen, headerShown: false}}
      />
      <Stack.Screen
        name={Screens.user_signIn}
        component={UserSignIn}
        options={{title: TR_TXT.home_screen, headerShown: false}}
      />
      <Stack.Screen
        name={Screens.history_form}
        component={HistoryFormScreen}
        options={{title: TR_TXT.history_form}}
      />
      <Stack.Screen
        name={Screens.dental_filling_form}
        component={DentalFillingScreen}
        options={{title: TR_TXT.dental_filling_form}}
      />
      <Stack.Screen
        name={Screens.endontic_treatment_form}
        component={EnddonticFormScreen}
        options={{title: TR_TXT.endontic_treatment_form}}
      />
      <Stack.Screen
        name={Screens.sinus_lifting_form}
        component={SinusLiftingFormScreen}
        options={{title: TR_TXT.sinus_lifting_form}}
      />
      <Stack.Screen
        name={Screens.implant_form}
        component={ImplantFormScreen}
        options={{title: TR_TXT.implant_form}}
      />
      <Stack.Screen
        name={Screens.ortognatik_form}
        component={OrtognatikFormScreen}
        options={{title: TR_TXT.ortognatik_form}}
      />
      <Stack.Screen
        name={Screens.forms_list}
        component={FormsList}
        options={{title: TR_TXT.forms_list}}
      />
      <Stack.Screen
        name={Screens.forms_folders}
        component={FormsFolders}
        options={{title: TR_TXT.forms_list}}
      />
    </Stack.Navigator>
  );
}
export default MainStack;
