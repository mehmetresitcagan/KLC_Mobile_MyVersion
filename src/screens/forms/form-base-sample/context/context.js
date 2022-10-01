
import React, {useState, useMemo, createContext, useContext} from 'react';
import {Alert} from 'react-native';
import API from '../../../../constants/API';
import APIRequests from '../../../../utils/APIRequests';
import {getValue} from '../../../../utils/dataTools';

const EnddonticFormContext = createContext();

export const useEnddonticFormContext = () => {
  const context = useContext(EnddonticFormContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const EnddonticFormProvider = props => {
  // --- States
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeSignaturePad, setActiveSignaturePad] = useState(null);

  // --- Listeners
  //

  // --- Handlers
  const onValidateForm = v => {
    onSubmitForm(v);
  };

  const onSubmitForm = async form => {
    console.log(form);
  };

  const value = useMemo(() => {
    const setters = {
      setError,
      setLoading,
      setActiveSignaturePad,
    };

    const functions = {
      onValidateForm,
    };
    const values = {
      loading,
      error,
      activeSignaturePad,
    };

    return {values, functions, setters};
  }, [
    setError,
    setLoading,
    onValidateForm,
    setActiveSignaturePad,
    error,
    loading,
    activeSignaturePad,
  ]);

  return <EnddonticFormContext.Provider value={value} {...props} />;
};

