import { Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserWithdraw = () => {
    const navigation = useNavigation();
    const { userDetails, loading } = useSelector((state) => state.user);

    const paymentOptions = [
        {
            name: 'Bank',
            image: require('../../assests/NotoBank.png'),
            onPress: () => console.log('Bank selected'),
        },
        {
            name: 'UPI',
            image: require('../../assests/UPI.png'),
            onPress: () => console.log('UPI selected'),
        },
        {
            name: 'Crypto',
            image: require('../../assests/Crypto.png'),
            onPress: () => console.log('Crypto selected'),
        }
    ]
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />

            <SafeAreaView
                edges={['left', 'right', 'bottom']}
                style={styles.mainContainer}>
                {/* Header Container */}
                <ScrollView>
                    <View
                        style={styles.headerContainer}
                    >
                        {/* Header Icon */}
                        <View style={styles.headerIcons}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.goBack()}>
                                <MaterialIcons name="arrow-back" size={30} color="#fff" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                            >
                                <MaterialIcons name="notifications" size={30} color="#fff" />
                            </TouchableOpacity>
                        </View>
                        {/* Header Content */}
                        <View>
                            <Text
                                style={styles.headerText}>Hi {userDetails ? userDetails?.name : 'User'}, cash out your {'\n'}rewards fast and safe!"</Text>
                        </View>
                        {/* Balance and Image */}
                        <View style={styles.headerIcons}>
                            <Text style={styles.balanceText}>Balance : ${userDetails ? userDetails?.wallet?.balance.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            }) : '0'}</Text>
                            <Image
                                source={require('../../assests/WithdrawImage.png')}
                                resizeMode='cover'
                                style={styles.balanceImage}
                            />
                        </View>
                    </View>
                    {/* Withdrawal Container */}
                    <View style={styles.withdrawalContainer}>
                        <View style={styles.withdrawView}>
                            <Text style={styles.withdrawalHeaderText}>Withdrawal</Text>
                            {/* input view */}
                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Enter amount ($100 min)'
                                    placeholderTextColor={'#8F8F8F'}
                                    style={styles.input}
                                />
                            </View>
                            <Text style={styles.labelText}>Select ((2% fee, $10 min))</Text>
                            <View style={styles.paymentOption}>
                                {
                                    paymentOptions.map((item, index) => (
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            key={index}
                                            onPress={item.onPress}
                                            style={styles.optionCard}>

                                            <Image source={item.image}
                                                resizeMode='cover'
                                                style={styles.image}
                                            />
                                            <Text style={styles.text}>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }

                            </View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => navigation.navigate('UserWithdrawalOTP')}
                                style={styles.otpBtn}>
                                <Text style={styles.otpBtnText}>Sent OTP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView >
        </>
    )
}

export default UserWithdraw

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        gap: 30,
    },
    headerContainer: {
        width: '100%',
        height: 300,
        backgroundColor: '#34A853',
        paddingTop: 30,
    },
    headerIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginTop: 10
    },
    headerText: {
        textAlign: 'left',
        fontWeight: '400',
        fontSize: 15,
        marginLeft: 20,
        color: '#fff',
        marginTop: 10
    },
    balanceText: {
        fontWeight: '400',
        fontSize: 24,
        color: '#F0F5F5',
        marginLeft: 5,
    },
    balanceImage: {
        width: 203,
        height: 169,
        bottom: 8
    },
    withdrawalContainer: {
        alignItems: 'center',
    },
    withdrawView: {
        width: '90%',
        height: 330,
        backgroundColor: '#fff',
        elevation: 4,
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        gap: 10,
        marginTop: 40,
    },
    withdrawalHeaderText: {
        fontWeight: '500',
        fontSize: 20,
        color: '#1E3D3D',
        alignSelf: 'flex-start'
    },
    textInput: {
        width: '90%',
        backgroundColor: '#fff',
        elevation: 4,
        borderRadius: 6,
        marginTop: 10,
        // height:35,
        borderWidth: 0.5,
        borderColor: '#00000036',



    },
    input: {
        marginLeft: 10
    },
    labelText: {
        alignSelf: 'flex-start',
        marginLeft: 16,
        marginTop: 30,
        fontSize: 13,
        fontWeight: '300',
        color: '#000000',
    },
    paymentOption: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#fff',

    },
    optionCard: {
        alignItems: 'center',
        padding: 5,
        marginHorizontal: 8,
        backgroundColor: '#fff',
        borderRadius: 6,
        elevation: 2, // shadow for Android
        shadowColor: '#000', // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        flexDirection: 'row',
        width: '28%',
        height: 40,
        alignItems: 'center',
        borderWidth: 0.5,
        justifyContent: 'space-evenly',
        borderColor: '#00000036'


    },
    image: {
        width: 28,
        height: 27,
        // marginBottom: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000000',
    },
    otpBtn: {
        backgroundColor: '#FF8800',
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        marginTop: 10,
        borderRadius: 6,
        elevation: 2
    },
    otpBtnText: {
        color: '#F0F5F5',
        fontWeight: '500',
        fontSize: 15
    }

})