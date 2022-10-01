import {Alert} from 'react-native';
import React, {useState, useMemo, createContext, useContext} from 'react';
import validator from 'validator';
import {useLanguageContext} from '../../../../store/LanguageContext';
import API, {secretToken} from '../../../../constants/API';
import APIRequests from '../../../../utils/APIRequests';

//import {v4 as uuidv4} from 'uuid';
import vdata from './data';
import {getValue} from '../../../../utils/dataTools';

const HistoryFormContext = createContext();

export const useHistoryFormContext = () => {
  const context = useContext(HistoryFormContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const HistoryFormProvider = props => {
  const form_content =
    useLanguageContext().functions.getVal('anamnez-bilgi-form');

  // --- States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [activeSignaturePad, setActiveSignaturePad] = useState(null);

  // --- Listeners
  //

  // --- Handlers
  const onValidateForm = form_data => {
    for (let key of Object.keys(vdata)) {
      if (!(key in form_data) && vdata[key].required) {
        return Alert.alert(key, form_content.error[key]);
      }
    }

    if (!validator.isEmail(form_data['email_address'])) {
      console.log(form_content.error);
      return Alert.alert(form_content.error['fill_patient_email']);
    }

    onSubmitForm(form_data);
  };

  const onSubmitForm = async form => {
    setLoading(true);
    try {
      const patientSignaturePath = await APIRequests.uploadImage(
        getValue(form, vdata.patient_signature.id),
      );
      const decotorSignaturePath = await APIRequests.uploadImage(
        getValue(form, vdata.doctor_signature.id),
      );
      const relativeSignaturePath = await APIRequests.uploadImage(
        getValue(form, vdata.responsible_signature.id),
      );

      const patientHandDeclarationPath = await APIRequests.uploadImage(
        getValue(form, vdata.patient_hand_declaration.id),
      );

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const patient = {
        name: getValue(form, vdata.patient_name_surname.id),
        birth_date: getValue(form, vdata.patient_birthdate.id),
        email_address: getValue(form, vdata.email_address.id),
      };

      var raw = JSON.stringify({
        secretToken: secretToken,
        formName: 'anamnez-formu',
        sessionRef: `${patient.name}_${Date.now()}`,

        data: {
          email_address: patient.email_address,
          patiant_info: {
            name_surname: patient.name,
            birth_date: patient.birth_date,
            mobile_phone_no: '+90555000000',
          },
          patient_medical_history: {
            received_medical_treatment: {
              answer: getValue(form, vdata.has_medical_treatment.id),
              description: getValue(form, vdata.has_medical_treatment_desc.id),
            },
            had_medical_operation: {
              answer: getValue(form, vdata.has_medical_operation.id),
              description: getValue(form, vdata.has_medical_operation_desc.id),
            },
            use_frequnt_drugs: {
              answer: getValue(form, vdata.has_frequent_medicine.id),
              description: getValue(form, vdata.has_frequent_medicine_desc.id),
              Blood_Thinner: getValue(form, vdata.Blood_Thinner.id),
              Blood_Pressure_Medicine: getValue(
                form,
                vdata.Blood_Pressure_Medicine.id,
              ),
              Heart_Medicine: getValue(form, vdata.Heart_Medicine.id),
              Cortisone: getValue(form, vdata.Cortisone.id),
              Cholesterol_Medicine: getValue(
                form,
                vdata.Cholesterol_Medicine.id,
              ),
              Diabetes_Medicine: getValue(form, vdata.Diabetes_Medicine.id),
              Asthma_Medicine: getValue(form, vdata.Asthma_Medicine.id),
              Thyroid_Medicine: getValue(form, vdata.Thyroid_Medicine.id),
              Osteoporosis_Medicine: getValue(
                form,
                vdata.Osteoporosis_Medicine.id,
              ),
            },
            has_allergy_to_medicine: {
              answer: getValue(form, vdata.has_allergy_to_medicine.id),
              Penicillin: getValue(form, vdata.Penicillin.id),
              Painkiller: getValue(form, vdata.Painkiller.id),
              Local_Anesthesia_Substance: getValue(
                form,
                vdata.Local_Anesthesia_Substance.id,
              ),
              Other_allergic_medicine: getValue(
                form,
                vdata.Other_allergic_medicine.id,
              ),
              description: getValue(
                form,
                vdata.Other_allergic_medicine_desc.id,
              ),
            },
            had_bifosfanat_medicine: {
              answer: getValue(form, vdata.use_bisphosphonates_medicine.id),
              description: getValue(
                form,
                vdata.use_bisphosphonates_medicine_desc.id,
              ),
            },
            smoking: {
              answer: getValue(form, vdata.smoking.id),
              freq_0_10: getValue(form, vdata.smoking_count.id),
              freq_10_20: getValue(form, vdata.smoking_count.id),
              freq_20: getValue(form, vdata.smoking_count.id),
            },
          },
          questions_for_ladies: {
            pregnant: getValue(form, vdata.pregnent.id),
            breastfeeding: getValue(form, vdata.breastfeeding.id),
          },
          medical_condition: {
            Heart_Attack: getValue(form, vdata.Heart_Attack.id),
            Palpitations: getValue(form, vdata.Palpitations.id),
            Congenital_Heart_Disease: getValue(
              form,
              vdata.Congenital_Heart_Disease.id,
            ),
            Cardiac_Surgery: getValue(form, vdata.Cardiac_Surgery.id),
            Chest_Pain: getValue(form, vdata.Chest_Pain.id),
            Low_High_Blood_Pressure: getValue(
              form,
              vdata.Low_High_Blood_Pressure.id,
            ),
            Rheumatic_Fever: getValue(form, vdata.Rheumatic_Fever.id),
            Rheumatism: getValue(form, vdata.Rheumatism.id),
            Osteoporosis: getValue(form, vdata.Osteoporosis.id),
            Paralysis: getValue(form, vdata.Paralysis.id),
            Thyroid: getValue(form, vdata.Thyroid.id),
            Ulcer: getValue(form, vdata.Ulcer.id),
            Asthma: getValue(form, vdata.Asthma.id),
            COPD: getValue(form, vdata.COPD.id),
            Sinusitis: getValue(form, vdata.Sinusitis.id),
            Tuberculosis: getValue(form, vdata.Tuberculosis.id),
            Epilepsy: getValue(form, vdata.Epilepsy.id),
            Hepatitis: getValue(form, vdata.Hepatitis.id),
            Kidney_Disease: getValue(form, vdata.Kidney_Disease.id),
            Urticaria: getValue(form, vdata.Urticaria.id),
            Blood_Disease: getValue(form, vdata.Blood_Disease.id),
            Anemia: getValue(form, vdata.Anemia.id),
            Long_Bleeding_Time: getValue(form, vdata.Long_Bleeding_Time.id),
            Glaucoma: getValue(form, vdata.Glaucoma.id),
            Diabetes: getValue(form, vdata.Diabetes.id),
            HIV: getValue(form, vdata.HIV.id),
            Cancer: getValue(form, vdata.Cancer.id),
            Radiotherapy: getValue(form, vdata.Radiotherapy.id),
            Chemotherapy: getValue(form, vdata.Chemotherapy.id),
            Other_medical_status: getValue(form, vdata.Other_medical_status.id),
            Other_medical_status_desc: getValue(
              form,
              vdata.Other_medical_status_desc.id,
            ),
          },
          footer: {
            patient_hand_declaration: patientHandDeclarationPath,
            patient_signature: patientSignaturePath,
            patient_date: getValue(form, vdata.patient_date.id),
            responsible_name_surname: getValue(
              form,
              vdata.responsible_name_surname.id,
            ),
            responsible_signature: relativeSignaturePath,
            responsible_date: getValue(form, vdata.responsible_date.id),
            doctor_name_surname: getValue(form, vdata.doctor_name_surname.id),
            doctor_signature: decotorSignaturePath,
            doctor_date: getValue(form, vdata.doctor_date.id),
          },
        },
      });

      //return 0

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const res = await fetch(API.submitForm, requestOptions);
      const result = await res.json();

      if (!result.error) {
        setSuccess(true);
      } else {
        throw result.error;
      }
    } catch (e) {
      setError(e);
      console.log(e);
      //Alert.alert(e);
    }
    setLoading(false);
  };

  const value = useMemo(() => {
    const setters = {
      setError,
      setSuccess,
      setLoading,
      setActiveSignaturePad,
    };

    const functions = {
      onValidateForm,
    };
    const values = {
      error,
      loading,
      success,
      activeSignaturePad,
    };

    return {values, functions, setters};
  }, [
    setSuccess,
    setError,
    setLoading,
    onValidateForm,
    setActiveSignaturePad,
    error,
    success,
    loading,
    activeSignaturePad,
  ]);

  return <HistoryFormContext.Provider value={value} {...props} />;
};
