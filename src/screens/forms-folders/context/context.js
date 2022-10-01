import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import {Linking} from 'react-native';
import API, {secretToken} from '../../../constants/API';
import Screens from '../../../constants/Screens';

const FormsListContext = createContext();

export const useFormsListContext = () => {
  const context = useContext(FormsListContext);

  if (!context) {
    throw new Error('The component must be wrapped by the provider!');
  }

  return context;
};

export const FormsListProvider = props => {
  // -- States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  // -- Listeners
  useEffect(() => {
    async function fetchData() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyZXJkZW1Aa2xjIiwicGFzc3dvcmQiOiJkcmVyZGVtMjAyMmtsYyIsImlhdCI6MTY1MDA1Mjc1N30.9acILxgZJSnTpJ3vXhp2GELMVcKlqqpWyLhGtFesyiA',
        secretToken: secretToken,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      try {
        const res = await fetch(API.getFormsFolders, requestOptions);
        const result = await res.json();
        console.log('>>>>', result);

        if (!result.error) {
          const fdata = Object.keys(result.result).map(f => ({
            ref: f,
            ...result.result[f],
          }));
          setData(fdata);
        } else {
          throw result.error;
        }
      } catch (e) {
        console.log('e,', e);
        setError(e);
      }
    }

    (async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    })();
  }, []);

  // -- Handlers
  const navigator = ref => props.navigation.navigate(ref);

  const onAccessForm = async form => {
    props.navigation.navigate(Screens.forms_list, {form});
  };

  const value = useMemo(() => {
    const setters = {
      setLoading,
      setError,
      setData,
    };

    const functions = {
      navigator,
      onAccessForm,
    };
    const values = {
      data,
      loading,
      error,
    };

    return {values, functions, setters};
  }, [
    navigator,
    onAccessForm,
    data,
    loading,
    error,
    setLoading,
    setError,
    setData,
  ]);

  return <FormsListContext.Provider value={value} {...props} />;
};
