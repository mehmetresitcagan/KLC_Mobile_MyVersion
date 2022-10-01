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

//import content from './content';
import data from '../context/data';
import {useLanguageContext} from '../../../../store/LanguageContext';

import {useEnddonticFormContext} from '../context/context';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';

const DentailFillingForm = () => {
  const ctx = useEnddonticFormContext();
  const langCtx = useLanguageContext();
  const content = langCtx.functions.getVal('endontic-form');

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
              <View style={{}}>
                <View style={styles.header}>
                  <Text style={styles.header_text}>{content.header[0]}</Text>
                  <Text style={styles.header_text}>{content.header[1]}</Text>
                </View>
                <SectionView header={''}>
                  <Text style={styles.declartion_text}>
                    {content.declration}
                  </Text>
                </SectionView>
                <SectionView header={content.section_1.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[1]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[2]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[3]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[4]}
                  </Text>
                  <TextInput
                    label={content.data.supervisor_name_declration}
                    value={formikProps.values.supervisor_name_declration}
                    onChange={formikProps.handleChange(
                      data.supervisor_name_declration.id,
                    )}
                    mode="outlined"
                  />
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_1.paragraphs[5]}
                  </Text>
                </SectionView>

                <SectionView header={content.data.supervisor_name_declration}>
                  <TextInput
                    label={content.data.form_signer_name_surname}
                    value={formikProps.values.form_signer_name_surname}
                    onChange={formikProps.handleChange(
                      data.form_signer_name_surname.id,
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
                    label={content.data.form_signer_phone_no}
                    value={formikProps.values.form_signer_phone_no}
                    onChange={formikProps.handleChange(
                      data.form_signer_phone_no.id,
                    )}
                    keyboardType="phone-pad"
                  />
                  <TextInput
                    label={content.data.date}
                    value={formikProps.values.date}
                    onChange={formikProps.handleChange(data.date.id)}
                    keyboardType="phone-pad"
                  />
                  <SignatureBox
                    isVisible={
                      data.form_signer_signature.id ===
                      ctx.values.activeSignaturePad
                    }
                    value={formikProps.values.form_signer_signature}
                    onSubmit={formikProps.handleChange(
                      data.form_signer_signature.id,
                    )}
                    label={content.data.form_signer_signature}
                    onOpen={() =>
                      ctx.setters.setActiveSignaturePad(
                        data.form_signer_signature.id,
                      )
                    }
                    onClose={() => ctx.setters.setActiveSignaturePad(null)}
                  />
                </SectionView>
                <CButton
                  label={content.footer.confirm}
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

export default DentailFillingForm;

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
