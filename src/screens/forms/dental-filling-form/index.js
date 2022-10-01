import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {DentalFillingFormProvider} from './context/context'
import DentalFillingForm from './views/DentalFillingForm'
const DentalFillingScreen = () => {
  // dis dolgu onam
  return (
    <DentalFillingFormProvider>
      <DentalFillingForm/>
    </DentalFillingFormProvider>
  );
};

export {DentalFillingScreen};

const styles = StyleSheet.create({});
