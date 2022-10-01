import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native';
import React from 'react';
import Colors from '../../../constants/Colors';
import Screens from '../../../constants/Screens';
import FormButton from './FormButton';
import HeaderView from './HeaderView';
import {useLanguageContext} from '../../../store/LanguageContext';

const {width} = Dimensions.get('window');
const isMobile = width < 650;

const HomeView = () => {
  const langCtx = useLanguageContext();
  const {getVal} = langCtx.functions;
  console.log(langCtx.values.activeLanguage);

  const FORMS = {
    anamnez: [
      {
        id: 0,
        name: getVal('anamnesis and information form'),
        ref: Screens.history_form,
        active: 1,
      },
    ],
    onam: [
      {
        id: 0,
        name: getVal('root canal treatment consent'),
        ref: Screens.endontic_treatment_form,
        active: 1,
      },
      {
        id: 1,
        name: getVal('dental filling consent'),
        ref: Screens.dental_filling_form,
        active: 1,
      },
      {
        id: 2,
        name: getVal('sinus lifting consent'),
        ref: Screens.sinus_lifting_form,
        active: 1,
      },
      {
        id: 3,
        name: getVal('implant consent'),
        ref: Screens.implant_form,
        active: 1,
      },
      {
        id: 4,
        name: getVal('orthognathic surgeon consent'),
        ref: Screens.ortognatik_form,
        active: 1,
      },
    ],
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content_container}>
      <HeaderView  />
      <View>
        <Text style={styles.forms_group_text}>{getVal('anamnesis forms')}</Text>
        <ScrollView
          style={{}}
          horizontal={!isMobile}
          showsHorizontalScrollIndicator={false}>
          {FORMS.anamnez.map((form, index) => (
            <FormButton item={form} key={`af${index}`} />
          ))}
        </ScrollView>
      </View>
      <View>
        <Text style={styles.forms_group_text}>{getVal('consent forms')}</Text>
        <ScrollView
          style={{}}
          horizontal={!isMobile}
          showsHorizontalScrollIndicator={false}>
          {FORMS.onam.map((form, index) => (
            <FormButton item={form} key={`of${index}`} />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default HomeView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lavender,
    flex: 1,
    padding: 10,
  },
  content_container: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  forms_group_text: {
    marginTop: 10,
    fontWeight: '600',
    fontSize: 20,
  },
});
