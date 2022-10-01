import React, {
  useState,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import {Linking} from 'react-native';
import API, {secretToken} from '../../../constants/API';
import {Alert} from 'react-native';

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
  // Set the header title
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.form.title,
    });
  }, [props.navigation, props.route.params.form.title]);

  useEffect(() => {
    async function fetchData() {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        folderId: props.route.params.form.id,
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

      //console.log()

      try {
        const res = await fetch(API.getForms, requestOptions);
        const result = await res.json();
        if (result.error) {
          console.log('>>', result.error);
          throw result.error;
        }
        setData(result.result.files);
      } catch (e) {
        console.log(e);
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

  const onAccessForm = async (id, mode, action = 'open') => {
    setLoading(true);

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      id,
      secretToken: secretToken,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyZXJkZW1Aa2xjIiwicGFzc3dvcmQiOiJkcmVyZGVtMjAyMmtsYyIsImlhdCI6MTY1MDA1Mjc1N30.9acILxgZJSnTpJ3vXhp2GELMVcKlqqpWyLhGtFesyiA',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    try {
      const res = await fetch(API.accessForm, requestOptions);
      const result = await res.json();

      if (!result.error) {
        const url =
          result.result[mode == 'download' ? 'webContentLink' : 'webViewLink'];

        if (action === 'open') {
          await Linking.openURL(url);
        }

        setLoading(false);
        return url;
      }
    } catch (e) {
      console.log(e);
      setError(e);
    }

    setLoading(false);
  };

  const onSendForm = async info => {
    try {
      const url = await onAccessForm(
        info.item.id,
        'download',
        (action = 'share'),
      );
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        receiver: info.receipent,
        subject: info.topic,
        content: `${info.message}\n\n${url}`,
        secretToken: secretToken,
      token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRyZXJkZW1Aa2xjIiwicGFzc3dvcmQiOiJkcmVyZGVtMjAyMmtsYyIsImlhdCI6MTY1MDA1Mjc1N30.9acILxgZJSnTpJ3vXhp2GELMVcKlqqpWyLhGtFesyiA',
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      //return console.log(raw);

      const res = await fetch(API.sendMail, requestOptions);
      const result = await res.json();

      if (!result.error) {
        Alert.alert(result.status, 'Message is sent successfully.');
      } else {
        console.log('>?>>', result.error);
        throw result.error;
      }
    } catch (e) {
      setError(e);
    }
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
      onSendForm,
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
    onSendForm,
    data,
    loading,
    error,
    setLoading,
    setError,
    setData,
  ]);

  return <FormsListContext.Provider value={value} {...props} />;
};
