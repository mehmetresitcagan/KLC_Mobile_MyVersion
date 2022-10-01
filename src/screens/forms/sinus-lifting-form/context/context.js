import React, {useState, useMemo, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import validator from 'validator';
import {useLanguageContext} from '../../../../store/LanguageContext';

import API, {secretToken} from '../../../../constants/API';
import APIRequests from '../../../../utils/APIRequests';
import {getValue} from '../../../../utils/dataTools';
import data from './data';

const SinusLiftingFormContext = createContext();

export const useSinusLiftingFormContext = () => {
  const context = useContext(SinusLiftingFormContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const SinusLiftingFormProvider = props => {
  const form_content =
    useLanguageContext().functions.getVal('sinus-lifting-form');

  // --- States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
      const formData = {};
      Object.keys(data).map(ky => {
        formData[ky] = getValue(form, ky);
      });

      const confirmerSignaturePath = await APIRequests.uploadImage(
        formData.confirmer_signature,
      );
      const patientSignaturePath = await APIRequests.uploadImage(
        formData.patient_signature,
      );

      formData.confirmer_signature = confirmerSignaturePath;
      formData.patient_signature = patientSignaturePath;
      formData.patient_date = new Date().toLocaleDateString();
      formData.confirmer_date = new Date().toLocaleDateString();
      // ---

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        secretToken: secretToken,
        formName: 'sinus-yukseltme-onam',
        sessionRef: `${formData.patient_name_surname}_${Date.now()}`,

        data: {
          ...formData,
        },
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const res = await fetch(API.submitForm, requestOptions);
      const result = await res.json();

      console.log(result);

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

  return <SinusLiftingFormContext.Provider value={value} {...props} />;
};
