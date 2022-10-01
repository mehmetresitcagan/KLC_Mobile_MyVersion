import React, {
  useMemo,
  useLayoutEffect,
  createContext,
  useContext,
  useState,
} from "react";

import "../translation/i18n";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("The component must be wrapped by the provider!");
  }
  return context;
};

export const LanguageProvider = (props) => {
  const [activeLanguage, setActiveLanguage] = useState("tr");
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setActiveLanguage(value))
      .catch((err) => console.log(err));
  };

  const getVal = (ref) => {
    try {
      return t(ref);
    } catch (e) {
      setError(e);
    }
  };
  const value = useMemo(() => {
    const setters = {
      setActiveLanguage,
      setError,
    };

    const functions = {
      changeLanguage,
      getVal,
    };
    const values = {
      error,
      activeLanguage,
    };

    return { values, functions, setters };
  }, [
    getVal,
    changeLanguage,
    error,
    activeLanguage,
    setError,
    setActiveLanguage,
  ]);

  return <LanguageContext.Provider value={value} {...props} />;
};
