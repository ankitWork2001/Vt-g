import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/Auth/LoginScreen/LoginScreen';
import SignUpScreen from '../../screens/Auth/SignUpScreen/SignUpScreen';
import ForgetPasswordScreen from '../../screens/Auth/ForgetPassword/ForgetPasswordScreen';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown:false,
            animation: 'fade_from_bottom'
        }}
        >
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
            <Stack.Screen name='ForgetPasswordScreen' component={ForgetPasswordScreen} />

        </Stack.Navigator>

    )
}

export default AuthNavigator

const styles = StyleSheet.create({})