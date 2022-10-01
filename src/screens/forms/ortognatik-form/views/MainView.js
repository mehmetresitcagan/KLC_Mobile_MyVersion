import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';

import Colors from '../../../../constants/Colors';
import SignatureBox from '../../common/components/SignatureBox';
import TextInput from '../../common/components/TextInput';
import SectionView from '../../common/components/SectionView';
import CButton from '../../common/components/Button';
import {useOrtognatikFormContext} from '../context/context';

import data from '../context/data';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';

import {useLanguageContext} from '../../../../store/LanguageContext';

const MainView = () => {
  const ctx = useOrtognatikFormContext();
  const content = useLanguageContext().functions.getVal('ortognatik-form');

  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      {ctx.values.loading && <LoadingView />}
      {ctx.values.success && <SuccessView />}
      {ctx.values.error && (
        <ErrorView
          message={JSON.stringify(ctx.values.error)}
          onPress={() => ctx.setters.setError(null)}
        />
      )}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <Formik
            initialValues={{...Object.keys(data).map(a => ({[a]: ''}))}}
            onSubmit={ctx.functions.onValidateForm} // to-do > change with context.onsubmit
          >
            {formikProps => (
              <View>
                <View style={styles.header}>
                  <Text style={styles.header_text}>{content.header[0]}</Text>
                  <Text style={styles.header_text}>{content.header[1]}</Text>
                </View>
                <SectionView header={content.section_1.header}>
                  <Text style={styles.paragraph}>
                    {content.section_1.paragraphs.p1}
                  </Text>
                  <Text style={styles.paragraph}>
                    {content.section_1.paragraphs.p2}
                  </Text>
                  <Text style={styles.sub_paragraph}>
                    {content.section_1.paragraphs.p2_sub}
                  </Text>
                  <Text style={styles.paragraph}>
                    {content.section_1.paragraphs.p3}
                  </Text>
                  <Text style={styles.paragraph}>
                    {content.section_1.paragraphs.p4}
                  </Text>

                  <ListItem item={content.section_1.paragraphs.l1} no={1}>
                    <SubListItem item={content.section_1.paragraphs.l1_sub_1} />
                    <SubListItem item={content.section_1.paragraphs.l1_sub_2} />
                    <SubListItem item={content.section_1.paragraphs.l1_sub_3} />
                    <SubListItem item={content.section_1.paragraphs.l1_sub_4} />
                  </ListItem>
                  {[...Array(16)].map((_, i) => (
                    <ListItem
                      item={content.section_1.paragraphs[`l${i + 2}`]}
                      no={i + 2}
                    />
                  ))}
                </SectionView>
                <SectionView header={content.section_2.header}>
                  {content.section_2.paragraphs.map((item, i) => (
                    <ListItem item={item} no={i + 2} dotted={true} />
                  ))}
                </SectionView>
                <SectionView header={content.section_3.header}>
                  <Text style={styles.paragraph}>
                    {content.section_3.paragraphs[0]}
                  </Text>

                  <TextInput
                    label={content.data.patient_name_surname}
                    value={formikProps.values.patient_name_surname}
                    onChange={formikProps.handleChange(
                      data.patient_name_surname.id,
                    )}
                  />
                   <TextInput
                      keyboardType="email-address"
                      label={content.data.email_address}
                      outlineColor={Colors.shuttle_gray}
                      selectionColor={Colors.shuttle_gray}
                      underlineColor={Colors.shuttle_gray}
                      activeOutlineColor={Colors.shuttle_gray}
                      value={formikProps.values.email_address}
                      activeUnderlineColor={Colors.shuttle_gray}
                      onChange={formikProps.handleChange(data.email_address.id)}
                    />
                  <SignatureBox
                    isVisible={
                      data.patient_signature.id ===
                      ctx.values.activeSignaturePad
                    }
                    value={formikProps.values.patient_signature}
                    onSubmit={formikProps.handleChange(
                      data.patient_signature.id,
                    )}
                    label={content.data.patient_signature}
                    onOpen={() =>
                      ctx.setters.setActiveSignaturePad(
                        data.patient_signature.id,
                      )
                    }
                    onClose={() => ctx.setters.setActiveSignaturePad(null)}
                  />
                  <TextInput
                    label={content.data.patient_supervisior_name_surname}
                    value={formikProps.values.patient_supervisior_name_surname}
                    onChange={formikProps.handleChange(
                      data.patient_supervisior_name_surname.id,
                    )}
                  />
                  <SignatureBox
                    isVisible={
                      data.patient_supervisior_signature.id ===
                      ctx.values.activeSignaturePad
                    }
                    value={formikProps.values.patient_supervisior_signature}
                    onSubmit={formikProps.handleChange(
                      data.patient_supervisior_signature.id,
                    )}
                    label={content.data.patient_supervisior_signature}
                    onOpen={() =>
                      ctx.setters.setActiveSignaturePad(
                        data.patient_supervisior_signature.id,
                      )
                    }
                    onClose={() => ctx.setters.setActiveSignaturePad(null)}
                  />
                </SectionView>
                <SectionView header={content.section_4.header}>
                  <TextInput
                    label={content.data.doctor_1_declare_name_surname}
                    value={formikProps.values.doctor_1_declare_name_surname}
                    onChange={formikProps.handleChange(
                      data.doctor_1_declare_name_surname.id,
                    )}
                  />
                  

                  {content.section_4.paragraphs.map((item, i) => (
                    <Text style={styles.paragraph}>{item}</Text>
                  ))}
                </SectionView>
                <SectionView header={content.section_5.header}>
                  <TextInput
                    label={content.data.doctor_2_declare_name_surname}
                    value={formikProps.values.doctor_2_declare_name_surname}
                    onChange={formikProps.handleChange(
                      data.doctor_2_declare_name_surname.id,
                    )}
                  />
                  <Text style={styles.paragraph}>
                     {content.section_5.paragraphs.p2}
                  </Text>
                </SectionView>
                <SectionView header={content.section_6.header}>
                  <TextInput
                    label={content.data.doctor_1_name_surname}
                    value={formikProps.values.doctor_1_name_surname}
                    onChange={formikProps.handleChange(
                      data.doctor_1_name_surname.id,
                    )}
                  />
                  <TextInput
                    label={content.data.doctor_1_date}
                    value={formikProps.values.doctor_1_date}
                    onChange={formikProps.handleChange(data.doctor_1_date.id)}
                  />
                  <SignatureBox
                    isVisible={
                      data.doctor_1_signature.id ===
                      ctx.values.activeSignaturePad
                    }
                    value={formikProps.values.doctor_1_signature}
                    onSubmit={formikProps.handleChange(
                      data.doctor_1_signature.id,
                    )}
                    label={content.data.doctor_1_signature}
                    onOpen={() =>
                      ctx.setters.setActiveSignaturePad(
                        data.doctor_1_signature.id,
                      )
                    }
                    onClose={() => ctx.setters.setActiveSignaturePad(null)}
                  />
                  <TextInput
                    label={content.data.doctor_2_name_surname}
                    value={formikProps.values.doctor_2_name_surname}
                    onChange={formikProps.handleChange(
                      data.doctor_2_name_surname.id,
                    )}
                  />
                  <TextInput
                    label={content.data.doctor_2_date}
                    value={formikProps.values.doctor_2_date}
                    onChange={formikProps.handleChange(data.doctor_2_date.id)}
                  />

                  <SignatureBox
                    isVisible={
                      data.doctor_2_signature.id ===
                      ctx.values.activeSignaturePad
                    }
                    value={formikProps.values.doctor_2_signature}
                    onSubmit={formikProps.handleChange(
                      data.doctor_2_signature.id,
                    )}
                    label={content.data.doctor_2_signature}
                    onOpen={() =>
                      ctx.setters.setActiveSignaturePad(
                        data.doctor_2_signature.id,
                      )
                    }
                    onClose={() => ctx.setters.setActiveSignaturePad(null)}
                  />
                </SectionView>

                <CButton label={content.section_6.confirm} onPress={formikProps.handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MainView;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: Colors.lavender,
    margin: 5,
    padding: 10,
  },
  header_text: {
    fontWeight: '600',
  },
  paragraph: {
    marginVertical: 3,
    fontSize: 16,
    textAlign: 'justify',
    //lineHeight:20
  },
  sub_paragraph: {
    marginVertical: 3,
    fontSize: 16,
    textAlign: 'justify',
    width: '90%',
    alignSelf: 'flex-end',
  },
  declartion_text: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 17,
    textAlign: 'center',
  },
});

const ListItem = ({item, no, dotted, children}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.lavender,
          marginTop: 4,
          paddingHorizontal: 5,
          borderRadius: 6,
        }}>
        <View
          style={{
            marginRight: 10,
          }}>
          <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}>
            {dotted ? '• ' : `${no}.`}
          </Text>
        </View>

        <Text style={[styles.paragraph, {flexWrap: 'wrap', flex: 1}]}>
          {item}
        </Text>
      </View>
      {children}
    </View>
  );
};
const SubListItem = ({item, no}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lavender,
        marginTop: 4,
        paddingHorizontal: 5,
        borderRadius: 6,
        width: '95%',
        alignSelf: 'flex-end',
      }}>
      <View
        style={{
          marginRight: 10,
        }}>
        <Text style={[styles.paragraph, {flexWrap: 'wrap'}]}></Text>
      </View>

      <Text style={[styles.paragraph, {flexWrap: 'wrap', flex: 1}]}>
        {item}
      </Text>
    </View>
  );
};
