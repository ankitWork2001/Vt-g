import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';

import SignUpLoginHeadPart from '../../../components/Header/SignInLoginHeadPart';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { resetPassword, sendOTP } from '../../../redux/slices/userSlice';
const ForgetPasswordScreen = () => {
    const { height, width } = Dimensions.get('window');

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [badPassword, setBadPassword] = useState({
        status: false,
        message: ''
    })
    const [badEmail, setBadEmail] = useState({
        status: false,
        message: ''
    })
    const [otp, setOtp] = useState('');
    const [badOtp, setBadOtp] = useState({
        status: false,
        message: ''
    });
    const [optSent, setOptSent] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(true);
    const { sendOTPLoading, resetPasswordLoading } = useSelector((state) => state.user);
    const isDisabled = !email.trim() || !newPassword.trim() || !otp.trim();
    const handleSendOTP = async () => {
        if (!email.trim()) {
            setBadEmail(true);
            Alert.alert('Message', 'Please Enter Email');
            return;
        }
        try {
            const resultAction = await dispatch(sendOTP(email));

            if (sendOTP.fulfilled.match(resultAction)) {
                Alert.alert('Success', resultAction.payload.message ?? 'OTP sent successfully');
                setOptSent(true);
            } else {
                // resultAction is a rejected action here
                const msg =
                    (resultAction).payload?.message || resultAction.error?.message || 'Unknown error';
                Alert.alert('Failed', msg);
            }

        } catch (err) {
            Alert.alert('Failed', err.message ?? 'An error occurred while sending OTP.');
        }
    }
    const handleResetPassword = async () => {
        if (!email.trim()) {
            setBadEmail(true);
            Alert.alert('Message', 'Please Enter Email');
            return;
        } else if (!newPassword.trim()) {
            setBadPassword(true);
            Alert.alert('Message', 'Please Enter New Password');
            return;
        } else if (!/^\d{6}$/.test(otp.trim())) {
            Alert.alert('Invalid OTP', 'OTP must be exactly 6 digits.');
            return;
        }
        
        try {
           
            const resultAction = await dispatch(
                resetPassword({ email, otpp: otp.trim(), newPassword })
            ).unwrap();
            const isFulfilled = resetPassword.fulfilled.match(resultAction);
            const { success, message } = resultAction.payload || {};

            if (isFulfilled && success) {
                Alert.alert('Success', message || 'Password Reset Successfully');
                navigation.replace('LoginScreen');
            } else {
                Alert.alert('Reset Failed', message || 'Invalid OTP');
                setBadOtp(true, 'Invalid OTP');
            }
        } catch (err) {
            console.error(err);
            Alert.alert('Error', 'An error occurred while resetting password.');
        }

    }

    const textFill = (text, fieldName) => {
        if (fieldName === 'email') {
            setEmail(text.toLowerCase());
            setBadEmail(false);
            return;
        }
        else if (fieldName === 'newPassword') {
            setNewPassword(text);
            setBadPassword(false);
            return;
        }
        else if (fieldName === 'otp') {
            setOtp(text);
            return;
        }

    }
    return (
        <SafeAreaView
            style={styles.container}>
            <SignUpLoginHeadPart showCreateAcount={false} title={'Reset Password'} />
            <View style={styles.body}>
                <Text style={styles.welcomeText}>Reset Your Password</Text>

                <Text style={styles.label}>E-Mail Address</Text>
                <TextInput style={styles.input}
                    value={email}
                    onChangeText={(text) => textFill(text, 'email')}
                    placeholderTextColor={'#000'}
                />
                {
                    !optSent ? (
                        <TouchableOpacity
                            onPress={() => handleSendOTP()}
                            disabled={sendOTPLoading || !email.trim()}
                            activeOpacity={0.8}
                            style={[styles.loginButton, sendOTPLoading || !email.trim() && { opacity: 0.7 }]}>
                            <Text style={styles.loginButtonText}>{sendOTPLoading ? (<ActivityIndicator size={24} color={'#fff'} />) : 'Send OTP'}</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <Text style={styles.label}>Enter OTP</Text>
                            <TextInput style={styles.input}
                                value={otp}
                                onChangeText={(text) => textFill(text, 'otp')}
                                placeholderTextColor={'#000'}

                            />
                            <Text style={styles.label}>New Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput style={styles.inputPassword}
                                    value={newPassword}
                                    onChangeText={(text) => textFill(text, 'newPassword')}
                                    secureTextEntry={showPassword}
                                    placeholderTextColor={'#000'}
                                />
                                <TouchableOpacity
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Icon
                                        style={[styles.icon, { right: width * 0.01, top: height * 0.012 }]}
                                        name="visibility"
                                        size={18}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleResetPassword()}
                                disabled={resetPasswordLoading || isDisabled}
                                activeOpacity={0.8}
                                style={[styles.loginButton, isDisabled && { opacity: 0.7 }]}>
                                <Text style={styles.loginButtonText}>{resetPasswordLoading ? (<ActivityIndicator size={24} color={'#fff'} />) : 'Reset Password'}</Text>
                            </TouchableOpacity>
                        </>
                    )
                }



            </View>

        </SafeAreaView>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    body: {
        padding: 30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: -100,
        height: '100%',
    },
    welcomeText: {
        fontSize: RFValue(20),
        fontWeight: 'bold',
        color: '#FF8800',
        marginBottom: 15,
    },
    label: {
        fontSize: RFValue(16),
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 15,
        color: '#000'
    },
    passwordContainer: {

        flexDirection: 'row',
        width: "100%",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        justifyContent: 'space-between',
    },
    inputPassword: {

        width: "90%",
        color: '#000'
        // flex: 1
    },
    icon: {
        position: 'absolute',
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    forgotPasswordText: {
        fontSize: RFValue(10),
        color: '#555',
    },
    loginButton: {
        backgroundColor: 'green',
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: RFValue(14),
        fontWeight: '400'
    },
})