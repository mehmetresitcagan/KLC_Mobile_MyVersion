import {
  StyleSheet,
  View,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import {Formik} from 'formik';

import TextInput from '../../common/components/TextInput';
import SectionView from '../../common/components/SectionView';
import data from '../context/data'; // has formik keys

import Colors from '../../../../constants/Colors';
import PolarInput from '../../common/components/PolarInput';
import CheckableText from '../../common/components/CheckableText';
import SignatureBox from '../../common/components/SignatureBox';

import {useHistoryFormContext} from '../context/context';
import CButton from '../../common/components/Button';

import HandWrittenBox from '../../common/components/HandWriteBox';
import {ErrorView, LoadingView, SuccessView} from '../../../../components';
import {useLanguageContext} from '../../../../store/LanguageContext';

const {width} = Dimensions.get('window');
const MIN_WIDTH = width / 5;
const HistoryForm = () => {
  // to-do > import context
  const ctx = useHistoryFormContext();
  const langCtx = useLanguageContext();
  const content = langCtx.functions.getVal('anamnez-bilgi-form');

  console.log(content);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
                <SectionView header={content.section_1.header}>
                  <TextInput
                    label={content.section_1.patient.name_surname}
                    value={formikProps.values.patient_name_surname}
                    onChange={formikProps.handleChange(
                      data.patient_name_surname.id,
                    )}
                  />
                  <TextInput
                    label={content.section_1.patient.birth_date}
                    value={formikProps.values.patient_birthdate}
                    onChange={formikProps.handleChange(
                      data.patient_birthdate.id,
                    )}
                    keyboardType="phone-pad"
                  />
                </SectionView>
                <SectionView header={content.section_2.header}>
                  <PolarInput
                    question={content.section_2.has_medical_treatment.label}
                    value={formikProps.values.has_medical_treatment}
                    onToggle={formikProps.handleChange(
                      data.has_medical_treatment.id,
                    )}
                  />
                  <TextInput
                    label={content.section_2.has_medical_treatment.desc}
                    value={formikProps.values.has_medical_treatment_desc}
                    onChange={formikProps.handleChange(
                      data.has_medical_treatment_desc.id,
                    )}
                  />
                  <SpaceView />
                  <PolarInput
                    question={content.section_2.has_medical_operation.label}
                    value={formikProps.values.has_medical_operation}
                    onToggle={formikProps.handleChange(
                      data.has_medical_operation.id,
                    )}
                  />
                  <TextInput
                    label={content.section_2.has_medical_operation.desc}
                    value={formikProps.values.has_medical_operation_desc}
                    onChange={formikProps.handleChange(
                      data.has_medical_operation_desc.id,
                    )}
                  />
                  <SpaceView />

                  <PolarInput
                    question={content.section_2.frequent_medicine.label}
                    value={formikProps.values.has_frequent_medicine}
                    onToggle={formikProps.handleChange(
                      data.has_frequent_medicine.id,
                    )}
                  />
                  <TextInput
                    label={content.section_2.frequent_medicine.desc}
                    value={formikProps.values.has_frequent_medicine_desc}
                    onChange={formikProps.handleChange(
                      data.has_frequent_medicine_desc.id,
                    )}
                  />
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <CheckableText
                      label={content.data.Blood_Thinner}
                      onPress={formikProps.handleChange(data.Blood_Thinner.id)}
                      value={formikProps.values.Blood_Thinner}
                    />
                    <CheckableText
                      label={content.data.Blood_Pressure_Medicine}
                      onPress={formikProps.handleChange(
                        data.Blood_Pressure_Medicine.id,
                      )}
                      value={formikProps.values.Blood_Pressure_Medicine}
                    />
                    <CheckableText
                      label={content.data.Heart_Medicine}
                      onPress={formikProps.handleChange(data.Heart_Medicine.id)}
                      value={formikProps.values.Heart_Medicine}
                    />
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <CheckableText
                      label={content.data.Cortisone}
                      onPress={formikProps.handleChange(data.Cortisone.id)}
                      value={formikProps.values.Cortisone}
                    />
                    <CheckableText
                      label={content.data.Cholesterol_Medicine}
                      onPress={formikProps.handleChange(
                        data.Cholesterol_Medicine.id,
                      )}
                      value={formikProps.values.Cholesterol_Medicine}
                    />
                    <CheckableText
                      label={content.data.Diabetes_Medicine}
                      onPress={formikProps.handleChange(
                        data.Diabetes_Medicine.id,
                      )}
                      value={formikProps.values.Diabetes_Medicine}
                    />
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <CheckableText
                      label={content.data.Asthma_Medicine}
                      onPress={formikProps.handleChange(
                        data.Asthma_Medicine.id,
                      )}
                      value={formikProps.values.Asthma_Medicine}
                    />
                    <CheckableText
                      label={content.data.Thyroid_Medicine}
                      onPress={formikProps.handleChange(
                        data.Thyroid_Medicine.id,
                      )}
                      value={formikProps.values.Thyroid_Medicine}
                    />
                    <CheckableText
                      label={content.data.Osteoporosis_Medicine}
                      onPress={formikProps.handleChange(
                        data.Osteoporosis_Medicine.id,
                      )}
                      value={formikProps.values.Osteoporosis_Medicine}
                    />
                  </View>
                  <SpaceView />

                  <PolarInput
                    question={
                      content.section_2.use_bisphosphonates_medicine.label
                    }
                    value={formikProps.values.use_bisphosphonates_medicine}
                    onToggle={formikProps.handleChange(
                      data.use_bisphosphonates_medicine.id,
                    )}
                  />
                  <TextInput
                    label={content.section_2.use_bisphosphonates_medicine.desc}
                    value={formikProps.values.use_bisphosphonates_medicine_desc}
                    onChange={formikProps.handleChange(
                      data.use_bisphosphonates_medicine_desc.id,
                    )}
                  />
                  <SpaceView />

                  <PolarInput
                    question={content.section_2.allergic_to_medicine.label}
                    value={formikProps.values.has_allergy_to_medicine}
                    onToggle={formikProps.handleChange(
                      data.has_allergy_to_medicine.id,
                    )}
                  />
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <CheckableText
                      label={content.data.Penicillin}
                      onPress={formikProps.handleChange(data.Penicillin.id)}
                      value={formikProps.values.Penicillin}
                    />
                    <CheckableText
                      label={content.data.Painkiller}
                      onPress={formikProps.handleChange(data.Painkiller.id)}
                      value={formikProps.values.Painkiller}
                    />
                    <CheckableText
                      label={content.data.Local_Anesthesia_Substance}
                      onPress={formikProps.handleChange(
                        data.Local_Anesthesia_Substance.id,
                      )}
                      value={formikProps.values.Local_Anesthesia_Substance}
                    />
                    <CheckableText
                      label={content.data.Other_allergic_medicine}
                      onPress={formikProps.handleChange(
                        data.Other_allergic_medicine.id,
                      )}
                      value={formikProps.values.Other_allergic_medicine}
                    />
                  </View>
                  <TextInput
                    label={content.section_2.allergic_to_medicine.desc}
                    value={formikProps.values.Other_allergic_medicine_desc}
                    onChange={formikProps.handleChange(
                      data.Other_allergic_medicine_desc.id,
                    )}
                  />
                  <SpaceView />

                  <PolarInput
                    question={content.section_2.smoking.label}
                    value={formikProps.values.smoking}
                    onToggle={formikProps.handleChange(data.smoking.id)}
                  />
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <CheckableText
                      label={content.section_2.smoking.how_frequent.ten}
                      onPress={formikProps.handleChange(data.smoking_count.id)}
                      value={formikProps.values.smoking_count}
                      trueVal={content.section_2.smoking.how_frequent.ten}
                      falseVal={''}
                    />
                    <CheckableText
                      label={content.section_2.smoking.how_frequent.twenty}
                      onPress={formikProps.handleChange(data.smoking_count.id)}
                      value={formikProps.values.smoking_count}
                      trueVal={content.section_2.smoking.how_frequent.twenty}
                      falseVal={''}
                    />
                    <CheckableText
                      label={content.section_2.smoking.how_frequent.more}
                      onPress={formikProps.handleChange(data.smoking_count.id)}
                      value={formikProps.values.smoking_count}
                      trueVal={content.section_2.smoking.how_frequent.more}
                      falseVal={''}
                    />
                  </View>
                </SectionView>
                <SectionView header={content.section_3.header}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      flexWrap: 'wrap',
                    }}>
                    <CheckableText
                      label={content.data.Heart_Attack}
                      onPress={formikProps.handleChange(data.Heart_Attack.id)}
                      value={formikProps.values.Heart_Attack}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Palpitations}
                      onPress={formikProps.handleChange(data.Palpitations.id)}
                      value={formikProps.values.Palpitations}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Congenital_Heart_Disease}
                      onPress={formikProps.handleChange(
                        data.Congenital_Heart_Disease.id,
                      )}
                      value={formikProps.values.Congenital_Heart_Disease}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Cardiac_Surgery}
                      onPress={formikProps.handleChange(
                        data.Cardiac_Surgery.id,
                      )}
                      value={formikProps.values.Cardiac_Surgery}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Chest_Pain}
                      onPress={formikProps.handleChange(data.Chest_Pain.id)}
                      value={formikProps.values.Chest_Pain}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Low_High_Blood_Pressure}
                      onPress={formikProps.handleChange(
                        data.Low_High_Blood_Pressure.id,
                      )}
                      value={formikProps.values.Low_High_Blood_Pressure}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Rheumatic_Fever}
                      onPress={formikProps.handleChange(
                        data.Rheumatic_Fever.id,
                      )}
                      value={formikProps.values.Rheumatic_Fever}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Rheumatism}
                      onPress={formikProps.handleChange(data.Rheumatism.id)}
                      value={formikProps.values.Rheumatism}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Osteoporosis}
                      onPress={formikProps.handleChange(data.Osteoporosis.id)}
                      value={formikProps.values.Osteoporosis}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Paralysis}
                      onPress={formikProps.handleChange(data.Paralysis.id)}
                      value={formikProps.values.Paralysis}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Thyroid}
                      onPress={formikProps.handleChange(data.Thyroid.id)}
                      value={formikProps.values.Thyroid}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Ulcer}
                      onPress={formikProps.handleChange(data.Ulcer.id)}
                      value={formikProps.values.Ulcer}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Asthma}
                      onPress={formikProps.handleChange(data.Asthma.id)}
                      value={formikProps.values.Asthma}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.COPD}
                      onPress={formikProps.handleChange(data.COPD.id)}
                      value={formikProps.values.COPD}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Sinusitis}
                      onPress={formikProps.handleChange(data.Sinusitis.id)}
                      value={formikProps.values.Sinusitis}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Tuberculosis}
                      onPress={formikProps.handleChange(data.Tuberculosis.id)}
                      value={formikProps.values.Tuberculosis}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Epilepsy}
                      onPress={formikProps.handleChange(data.Epilepsy.id)}
                      value={formikProps.values.Epilepsy}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Hepatitis}
                      onPress={formikProps.handleChange(data.Hepatitis.id)}
                      value={formikProps.values.Hepatitis}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Kidney_Disease}
                      onPress={formikProps.handleChange(data.Kidney_Disease.id)}
                      value={formikProps.values.Kidney_Disease}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Urticaria}
                      onPress={formikProps.handleChange(data.Urticaria.id)}
                      value={formikProps.values.Urticaria}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Blood_Disease}
                      onPress={formikProps.handleChange(data.Blood_Disease.id)}
                      value={formikProps.values.Blood_Disease}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Anemia}
                      onPress={formikProps.handleChange(data.Anemia.id)}
                      value={formikProps.values.Anemia}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Long_Bleeding_Time}
                      onPress={formikProps.handleChange(
                        data.Long_Bleeding_Time.id,
                      )}
                      value={formikProps.values.Long_Bleeding_Time}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Glaucoma}
                      onPress={formikProps.handleChange(data.Glaucoma.id)}
                      value={formikProps.values.Glaucoma}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Diabetes}
                      onPress={formikProps.handleChange(data.Diabetes.id)}
                      value={formikProps.values.Diabetes}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.HIV}
                      onPress={formikProps.handleChange(data.HIV.id)}
                      value={formikProps.values.HIV}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Cancer}
                      onPress={formikProps.handleChange(data.Cancer.id)}
                      value={formikProps.values.Cancer}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Radiotherapy}
                      onPress={formikProps.handleChange(data.Radiotherapy.id)}
                      value={formikProps.values.Radiotherapy}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Chemotherapy}
                      onPress={formikProps.handleChange(data.Chemotherapy.id)}
                      value={formikProps.values.Chemotherapy}
                      containerStyle={styles.medical_issue_btn}
                    />
                    <CheckableText
                      label={content.data.Other_medical_status}
                      onPress={formikProps.handleChange(
                        data.Other_medical_status.id,
                      )}
                      value={formikProps.values.Other_medical_status}
                      containerStyle={styles.medical_issue_btn}
                    />
                  </View>
                  <TextInput
                    label={content.data.Other_medical_status_desc}
                    value={formikProps.values.Other_medical_status_desc}
                    onChange={formikProps.handleChange(
                      data.Other_medical_status_desc.id,
                    )}
                  />
                </SectionView>
                <SectionView header={content.section_4.header}>
                  <PolarInput
                    question={content.section_4.questions.pregnent}
                    value={formikProps.values.pregnent}
                    onToggle={formikProps.handleChange(data.pregnent.id)}
                  />
                  <PolarInput
                    question={content.section_4.questions.breastfeeding}
                    value={formikProps.values.breastfeeding}
                    onToggle={formikProps.handleChange(data.breastfeeding.id)}
                  />
                </SectionView>
                <SectionView header={content.section_5.header}>
                  <SectionView
                    header={content.section_5.patient.header}
                    headerStyle={{backgroundColor: Colors.lavender}}>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
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
                      label={content.section_5.patient.date}
                      value={formikProps.values.patient_date}
                      onChange={formikProps.handleChange(data.patient_date.id)}
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
                      label={content.section_5.patient.signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.patient_signature.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />

                    <HandWrittenBox
                      signImgStyle={{flex: 1}}
                      isVisible={
                        data.patient_hand_declaration.id ===
                        ctx.values.activeSignaturePad
                      }
                      value={formikProps.values.patient_hand_declaration}
                      onSubmit={formikProps.handleChange(
                        data.patient_hand_declaration.id,
                      )}
                      label={'Okudum, anladım, ve kabul ediyorum.'}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.patient_hand_declaration.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />
                  </SectionView>
                  <SectionView
                    header={content.section_5.patient_responsible.header}
                    headerStyle={{backgroundColor: Colors.lavender}}>
                    <TextInput
                      label={content.section_5.patient_responsible.name_surname}
                      value={formikProps.values.responsible_name_surname}
                      onChange={formikProps.handleChange(
                        data.responsible_name_surname.id,
                      )}
                      keyboardType="phone-pad"
                    />
                    <TextInput
                      label={content.section_5.patient_responsible.date}
                      value={formikProps.values.responsible_date}
                      onChange={formikProps.handleChange(
                        data.responsible_date.id,
                      )}
                      keyboardType="phone-pad"
                    />
                    <SignatureBox
                      isVisible={
                        data.responsible_signature.id ===
                        ctx.values.activeSignaturePad
                      }
                      value={formikProps.values.responsible_signature}
                      onSubmit={formikProps.handleChange(
                        data.responsible_signature.id,
                      )}
                      label={content.section_5.patient.signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.responsible_signature.id,
                        )
                      }
                      onClose={() => ctx.setters.setActiveSignaturePad(null)}
                    />
                  </SectionView>
                  <SectionView
                    header={content.section_5.doctor.header}
                    headerStyle={{backgroundColor: Colors.lavender}}>
                    <TextInput
                      label={content.section_5.doctor.date}
                      value={formikProps.values.doctor_date}
                      onChange={formikProps.handleChange(data.doctor_date.id)}
                      keyboardType="phone-pad"
                    />
                    <SignatureBox
                      isVisible={
                        data.doctor_signature.id ===
                        ctx.values.activeSignaturePad
                      }
                      value={formikProps.values.doctor_signature}
                      onSubmit={formikProps.handleChange(
                        data.doctor_signature.id,
                      )}
                      label={content.section_5.patient.signature}
                      onOpen={() =>
                        ctx.setters.setActiveSignaturePad(
                          data.doctor_signature.id,
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

export default HistoryForm;

const styles = StyleSheet.create({
  input: {
    margin: 10,
    backgroundColor: '#fff',
  },
  emergency_person: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
  medical_issue_btn: {
    minWidth: MIN_WIDTH,
    //maxWidth: MIN_WIDTH,
  },
  activity_indicator: {
    justifyContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
});

const SpaceView = () => {
  return <View style={{marginVertical: 10}} />;
};
