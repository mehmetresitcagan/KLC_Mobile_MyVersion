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
import CheckableText from '../../common/components/CheckableText';
import {useSinusLiftingFormContext} from '../context/context';

import data from '../context/data';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';
import {useLanguageContext} from '../../../../store/LanguageContext';

const MainView = () => {
  const ctx = useSinusLiftingFormContext();
  const content = useLanguageContext().functions.getVal('sinus-lifting-form');

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
                    {' '}
                    {content.section_1.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_2.header}>
                  <CheckableText
                    label={content.data.has_crestal_sinus_raise}
                    onPress={formikProps.handleChange(
                      data.has_crestal_sinus_raise.id,
                    )}
                    value={formikProps.values.has_crestal_sinus_raise}
                  />
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_2.paragraphs[0]}
                  </Text>
                  <CheckableText
                    label={content.data.has_lateral_window_sinus_elevation}
                    onPress={formikProps.handleChange(
                      data.has_lateral_window_sinus_elevation.id,
                    )}
                    value={
                      formikProps.values.has_lateral_window_sinus_elevation
                    }
                  />
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_2.paragraphs[1]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_3.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_3.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_3.paragraphs[1]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_3.paragraphs[2]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_3.paragraphs[3]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_4.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_4.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_5.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_5.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_5.paragraphs[1]}
                  </Text>

                  <SectionView
                    header={content.data.patient_name_surname}
                    headerStyle={{backgroundColor: Colors.lavender}}>
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
                      label={content.data.patient_phone_no}
                      value={formikProps.values.patient_phone_no}
                      onChange={formikProps.handleChange(
                        data.patient_phone_no.id,
                      )}
                      keyboardType="phone-pad"
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

                  <SectionView
                    header={content.data.confirmer}
                    headerStyle={{backgroundColor: Colors.lavender}}>
                    <TextInput
                      label={content.data.confirmer_name_surname}
                      value={formikProps.values.confirmer_name_surname}
                      onChange={formikProps.handleChange(
                        data.confirmer_name_surname.id,
                      )}
                    />

                    <SignatureBox
                      isVisible={
                        data.confirmer_signature.id ===
                        ctx.values.activeSignaturePad
                      }
                      value={formikProps.values.confirmer_signature}
                      onSubmit={formikProps.handleChange(
                        data.confirmer_signature.id,
                      )}
                      label={content.data.confirmer_signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.confirmer_signature.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />
                  </SectionView>
                </SectionView>

                <CButton
                  label={content.section_5.confirm}
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
