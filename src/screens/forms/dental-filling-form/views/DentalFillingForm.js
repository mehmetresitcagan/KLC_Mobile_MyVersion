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

import data from '../context/data';

import {useDentalFillingFormContext} from '../context/context';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';
import { useLanguageContext } from '../../../../store/LanguageContext';
const DentailFillingForm = () => {
  const ctx = useDentalFillingFormContext();
  const langCtx = useLanguageContext()

  const content = langCtx.functions.getVal('dental_filling_form')

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
                  <Text style={styles.header_text}>
                    {content.form_header[0]}
                  </Text>
                  <Text style={styles.header_text}>
                    {content.form_header[1]}
                  </Text>
                </View>
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
                </SectionView>
                <SectionView header={content.section_2.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_2.paragraphs[0]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_2.paragraphs[1]}
                  </Text>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_2.paragraphs[2]}
                  </Text>
                  <TextInput
                    label={content.data.targeted_process}
                    value={formikProps.values.targeted_process}
                    onChange={formikProps.handleChange(
                      data.targeted_process.id,
                    )}
                  />
                </SectionView>
                <SectionView header={content.section_3.header}>
                  <Text style={styles.paragraph}>
                    {' '}
                    {content.section_3.paragraphs[0]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_4.header}>
                  {content.section_4.paragraphs.map((item, index) => (
                    <ListItem item={item} key={`s4${index}`} />
                  ))}
                </SectionView>
                <SectionView header={content.section_5.header}>
                  {content.section_5.paragraphs.map((item, index) => (
                    <ListItem item={item} key={`s5${index}`} />
                  ))}
                </SectionView>
                <SectionView header={content.section_6.header}>
                  <Text style={styles.paragraph}>
                    {content.section_6.paragraphs[0]}
                  </Text>
                  <TextInput
                    label={content.data.patient_name_declaration}
                    value={formikProps.values.patient_name_declaration}
                    onChange={formikProps.handleChange(
                      data.patient_name_declaration.id,
                    )}
                  />
                  <Text style={styles.paragraph}>
                    {content.section_6.paragraphs[1]}
                  </Text>
                </SectionView>
                <SectionView header={content.section_7.header}>
                  <SectionView
                    header={content.data.patient_sign_box}
                    headerStyle={{
                      backgroundColor: Colors.lavender,
                    }}>
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
                      label={content.data.patient_phone}
                      value={formikProps.values.patient_phone}
                      onChange={formikProps.handleChange(data.patient_phone.id)}
                      keyboardType="phone-pad"
                    /> 
                    <SignatureBox
                      isVisible={
                        ctx.values.activeSignaturePad ===
                        data.patient_signature.id
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
                    header={content.data.doctor_sign_box}
                    headerStyle={{
                      backgroundColor: Colors.lavender,
                      //marginTop: 10,
                    }}>
                    <TextInput
                      label={content.data.doctor_name_surname}
                      value={formikProps.values.doctor_name_surname}
                      onChange={formikProps.handleChange(
                        data.doctor_name_surname.id,
                      )}
                    />
                    <SignatureBox
                      isVisible={
                        ctx.values.activeSignaturePad ===
                        data.doctor_signature.id
                      }
                      value={formikProps.values.doctor_signature}
                      onSubmit={formikProps.handleChange(
                        data.doctor_signature.id,
                      )}
                      label={content.data.doctor_signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.doctor_signature.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />
                  </SectionView>
                  <SectionView
                    header={content.data.paitnet_supervisor_sign_box}
                    headerStyle={{
                      backgroundColor: Colors.lavender,
                      //marginTop: 10,
                    }}>
                    <TextInput
                      label={content.data.paitnet_supervisor_name_surname}
                      value={formikProps.values.paitnet_supervisor_name_surname}
                      onChange={formikProps.handleChange(
                        data.paitnet_supervisor_name_surname.id,
                      )}
                    />
                    <SignatureBox
                      isVisible={
                        data.paitnet_supervisor_signature.id ===
                        ctx.values.activeSignaturePad
                      }
                      value={formikProps.values.paitnet_supervisor_signature}
                      onSubmit={formikProps.handleChange(
                        data.paitnet_supervisor_signature.id,
                      )}
                      label={content.data.paitnet_supervisor_signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.paitnet_supervisor_signature.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />
                  </SectionView>
                </SectionView>
                <CButton label={content.section_7.confirm} onPress={formikProps.handleSubmit} />
              </View>
            )}
          </Formik>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default DentailFillingForm;

const ListItem = ({item}) => {
  return (
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
          backgroundColor: '#000',
          height: 6,
          width: 6,
          borderRadius: 10,
          marginRight: 10,
          margin: 10,
        }}></View>
      <Text style={[styles.paragraph, {flexWrap: 'wrap', flex: 1}]}>
        {item}
      </Text>
    </View>
  );
};
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
});
