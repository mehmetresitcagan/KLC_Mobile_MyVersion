import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SignInProvider } from './context'
import MainView from './views/MainView'

const SignIn = (props) => {
  return (
    <SignInProvider {...props} >
      <MainView {...props}/>
    </SignInProvider>
  )
}

export {SignIn}

const styles = StyleSheet.create({})