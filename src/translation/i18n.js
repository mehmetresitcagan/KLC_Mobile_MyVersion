import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import HEADER_EN from './main/en.json';
import HEADER_TR from './main/tr.json';

// import all files here !
import DFF_EN from './forms/dental-filling-form/en.json';
import DFF_TR from './forms/dental-filling-form/tr.json';

import ABF_EN from './forms/anamnez-form/en.json';
import ABF_TR from './forms/anamnez-form/tr.json';

import ETF_EN from './forms/endontic-form/en.json';
import ETF_TR from './forms/endontic-form/tr.json';

import IOF_EN from './forms/implant-form/en.json'; //onam
import IOF_TR from './forms/implant-form/tr.json';

import SLF_EN from './forms/sinus-lifting-form/en.json';
import SLF_TR from './forms/sinus-lifting-form/tr.json';

import OSF_EN from './forms/ortognatik-form/en.json';
import OSF_TR from './forms/ortognatik-form/tr.json';

const en = {
  ...HEADER_EN,
  ...DFF_EN,
  ...ABF_EN,
  ...ETF_EN,
  ...IOF_EN,
  ...SLF_EN,
  ...OSF_EN
};

const tr = {
  ...HEADER_TR,
  ...DFF_TR,
  ...ABF_TR,
  ...ETF_TR,
  ...IOF_TR,
  ...SLF_TR,
  ...OSF_TR
};

i18n.use(initReactI18next).init({
  lng: 'tr',
  fallbackLng: 'tr',
  returnObjects:true,
  resources: {
    en: {translation: en},
    tr: {translation: tr},
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
