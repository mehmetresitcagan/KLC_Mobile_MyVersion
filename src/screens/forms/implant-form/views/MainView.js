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
import {useImplantFormContext} from '../context/context';

import data from '../context/data';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';
import {useLanguageContext} from '../../../../store/LanguageContext';

const MainView = () => {
  const ctx = useImplantFormContext();
  const content = useLanguageContext().functions.getVal('implant-form');

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
            onSubmit={ctx.functions.onValidateForm}>
            {formikProps => (
              <View>
                <View style={styles.header}>
                  <Text style={styles.header_text}>{content.header[0]}</Text>
                  <Text style={styles.header_text}>{content.header[1]}</Text>
                </View>
                <SectionView header={content.section_1.header}>
                  <TextInput
                    label={content.data.patient_declration_name_surname}
                    value={formikProps.values.patient_declration_name_surname}
                    onChange={formikProps.handleChange(
                      data.patient_declration_name_surname.id,
                    )}
                  />
                  <TextInput
                    label={content.data.patient_declration_date}
                    value={formikProps.values.patient_declration_date}
                    onChange={formikProps.handleChange(
                      data.patient_declration_date.id,
                    )}
                  />

                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_1.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_2.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_2.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_2.paragraphs[1]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_3.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_3.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_3.paragraphs[1]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_3.paragraphs[2]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_4.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_4.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_4.paragraphs[1]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_5.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_5.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_6.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_6.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_7.header}>
                  <Text style={styles.paragraph}>
                    {'   '}
                    {content.section_7.paragraphs[0]}
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
                  <TextInput
                    label={content.data.patient_date}
                    value={formikProps.values.patient_date}
                    onChange={formikProps.handleChange(data.patient_date.id)}
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
                </SectionView>

                <CButton
                  label={content.section_7.confirm}
                  onPress={formikProps.handleSubmit}
                />
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
  },
  declartion_text: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 17,
    textAlign: 'center',
  },
});
