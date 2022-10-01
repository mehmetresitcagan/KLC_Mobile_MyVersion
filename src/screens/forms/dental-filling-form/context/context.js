import React, {useState, useMemo, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import validator from 'validator';
import API, { secretToken } from '../../../../constants/API';
import APIRequests from '../../../../utils/APIRequests';
import {getValue} from '../../../../utils/dataTools';
import data from './data';
import { useLanguageContext } from '../../../../store/LanguageContext';

const DentalFillingFormContext = createContext();

export const useDentalFillingFormContext = () => {
  const context = useContext(DentalFillingFormContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const DentalFillingFormProvider = props => {
  const form_content = useLanguageContext().functions.getVal('dental_filling_form')

  // --- States
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [activeSignaturePad, setActiveSignaturePad] = useState(null);

  // --- Listeners
  //

  // --- Handlers
  const onValidateForm = form_data => {
    for (let key of Object.keys(data)) {
      if (!(key in form_data) && data[key].required) {
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
      const patientInfo = {
        name: getValue(form, data.patient_name_surname.id),
        phone: getValue(form, data.patient_phone.id),
      };

      const patientSignaturePath = await APIRequests.uploadImage(
        getValue(form, data.patient_signature.id),
      );
      const doctorSignaturePath = await APIRequests.uploadImage(
        getValue(form, data.doctor_signature.id),
      );
      const supervisiorSignaturePath = await APIRequests.uploadImage(
        getValue(form, data.paitnet_supervisor_signature.id),
      );

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        secretToken: secretToken,
        formName: 'dis-dolgu-onam',
        sessionRef: `${patientInfo.name}_${patientInfo.phone}_${Date.now()}`,

        data: {
          email_address: getValue(form, data.email_address.id),
          date: new Date().toLocaleDateString(),
          targeted_process: getValue(form, data.targeted_process.id),
          patient_name_declaration: getValue(
            form,
            data.patient_name_declaration.id,
          ),
          patient_name_surname: patientInfo.name,
          patient_signature: patientSignaturePath,
          patient_phone: patientInfo.phone,
          doctor_name_surname: getValue(form, data.doctor_name_surname.id),
          doctor_signature: doctorSignaturePath,
          paitnet_supervisor_name_surname: getValue(
            form,
            data.paitnet_supervisor_name_surname.id,
          ),
          paitnet_supervisor_signature: supervisiorSignaturePath,
        },
      });

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
      Alert.alert('ERROR', JSON.stringify(e));
      setError(e);
      console.log(e);
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
      success,
      loading,
      activeSignaturePad,
    };

    return {values, functions, setters};
  }, [
    setError,
    setSuccess,
    setLoading,
    onValidateForm,
    setActiveSignaturePad,
    error,
    loading,
    success,
    activeSignaturePad,
  ]);

  return <DentalFillingFormContext.Provider value={value} {...props} />;
};
