import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MainStackNavigator from './src/navigation/MainStackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import { loadToken } from './src/redux/slices/authSlice'
const App = () => {
  const dispatch = useDispatch();
  const { userToken, loading } = useSelector((state) => state.auth);
  // console.log('User Token in app.js:', userToken, 'Loading:', loading);
  useEffect(() => {
    dispatch(loadToken());
  }, []);
 
  return (
    <MainStackNavigator />
  )
}

export default App

const styles = StyleSheet.create({})