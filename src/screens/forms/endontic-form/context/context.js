import React, {useState, useMemo, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import API, {secretToken} from '../../../../constants/API';
import APIRequests from '../../../../utils/APIRequests';
import {getValue} from '../../../../utils/dataTools';
import validator from 'validator';
import {useLanguageContext} from '../../../../store/LanguageContext';
import data from './data';

const EnddonticFormContext = createContext();

export const useEnddonticFormContext = () => {
  const context = useContext(EnddonticFormContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const EnddonticFormProvider = props => {
  const form_content = useLanguageContext().functions.getVal('endontic-form');

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
        console.log(key, form_content.error[key])
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
      const formSigner = {
        name: getValue(form, data.form_signer_name_surname.id),
        phone: getValue(form, data.form_signer_phone_no.id),
        declaraion: getValue(form, data.supervisor_name_declration.id),
        signature: getValue(form, data.form_signer_signature.id),
      };

      const formSignerSignaturePath = await APIRequests.uploadImage(
        formSigner.signature,
      );

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        secretToken: secretToken,
        formName: 'kanal-tedavisi-onam',
        sessionRef: `${formSigner.name}_${formSigner.phone}_${Date.now()}`,

        data: {
          date: getValue(form, data.date.id),
          email_address: getValue(form, data.email_address.id),
          form_signer_name_surname: formSigner.name,
          form_signer_phone_no: formSigner.phone,
          form_signer_signature: formSignerSignaturePath,
          supervisor_name_declration: formSigner.declaraion,
        },
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const res = await fetch(API.submitForm, requestOptions);
      console.log(res);
      const result = await res.json();
      if (!result.error) {
        setSuccess(true);
      } else {
        throw result.error;
      }
    } catch (e) {
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
      loading,
      success,
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

  return <EnddonticFormContext.Provider value={value} {...props} />;
};
