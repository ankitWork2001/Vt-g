import {
    ActivityIndicator,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getWalletBalance } from '../../../redux/slices/walletSlice';
import Loader from '../../../components/Loader/Loader';

const WalletInfoScreen = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');
    const { wallet, loading } = useSelector((state) => state.wallet);
    const dispatch = useDispatch();

    const walletFetched = useRef(false);
    console.log('Wallet Balance:', wallet, 'Loading:', loading);
    useEffect(() => {
        // dispatch(getWalletBalance());
        if (!walletFetched.current) {
            dispatch(getWalletBalance());
            walletFetched.current = true;
        }
       
    }, [dispatch]);
    return (
        <>
            <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
            {
                loading ? (

                    <Loader visible={loading} />
                ) : (
                    <SafeAreaView style={styles.MainContainer}>

                        <ScrollView>
                            <View style={styles.headerContentContainer}>
                                <View style={styles.headerTextContainer}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Icon name="arrow-back" size={20} color="#fff" />
                                    </TouchableOpacity>
                                    <Text style={styles.headerText}>Wallet Info</Text>
                                </View>
                                <TouchableOpacity>
                                    <Icon name="settings" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.depositAndWithdrawContainer}>
                                <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#FDBE00', borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }]}>
                                    <Text style={styles.depositText}>Pending Withdrawals $100 (processing)</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.depositTextBox, { backgroundColor: '#2E7D32', borderTopRightRadius: 6, borderBottomRightRadius: 6 }]}>
                                    <Text style={styles.depositText}>Total Withdrawn{'\n'}
                                        <Text>$1,150</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: RFValue(20), marginLeft: 20 }}>Wallet</Text>
                            <View style={styles.card}>
                                <View style={styles.cardTextContainer}>
                                    <Text style={styles.cardText}>Main Balance: ${wallet?.balance}</Text>
                                    <Text style={styles.cardText}>Locked Balance: ${wallet?.balance?.toFixed(2) ?? '0.00'}</Text>
                                    <Text style={styles.cardText}>Commission: ${wallet?.commission?.toFixed(2) ?? '0.00'}</Text>
                                    <Text style={styles.cardText}>Binance Wallet:0x****1234</Text>
                                    <Text style={styles.cardText}>Bonus Cash:$50 (expires on 2025-05-1)</Text>
                                </View>
                                <TouchableOpacity style={styles.Button}>
                                    <Text style={styles.ButtonText}>Add/Update Wallet</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={{ fontSize: RFValue(20), marginLeft: 20, marginTop: 10 }}>Coupons Available:  2</Text>

                            <View style={styles.CuponCardContainer}>
                                <View style={styles.cuponCard}>
                                    <Image source={require('../../../assests/homepageBigWinImage.png')} style={styles.cardImage} />
                                    <TouchableOpacity style={[styles.playButton, { top: height * 0.08, left: width * 0.1 }]}>
                                        <Text style={styles.playButtonText}>Clam Now</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cuponCard}>
                                    <Image source={require('../../../assests/homepageGirlScrollImage.png')} style={styles.cardImage} />
                                    <TouchableOpacity style={[styles.playButton, { top: height * 0.08, left: width * 0.1 }]}>
                                        <Text style={styles.playButtonText}>Claimed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>


                    </SafeAreaView>
                )
            }

        </>
    );
};

export default WalletInfoScreen;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#34A853',
        paddingVertical: 30,
        paddingHorizontal: 10,
    },
    headerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerText: {
        fontSize: RFValue(20),
        fontWeight: '500',
        color: '#fff',
    },
    depositAndWithdrawContainer: {
        width: "80%",
        margin: 40,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    depositTextBox: {
        width: "50%",
        paddingVertical: 20,

    },
    depositText: {
        fontSize: RFValue(14),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 6,
        padding: 20,
        margin: 20,
        marginTop: 30
    },
    cardTextContainer: {
        gap: 2
    },
    cardText: {
        fontSize: RFValue(14),
        fontWeight: '400'
    },
    Button: {
        backgroundColor: '#FF8800',
        padding: 5,
        marginTop: 15,
        borderRadius: 4
    },
    ButtonText: {
        fontSize: RFValue(10),
        textAlign: 'center',
        color: '#fff'
    },
    CuponCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },
    cuponCard: {
        marginTop: 20,
        marginRight: 15,
        marginLeft: 20,
        width: 150,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,


    },
    cardImage: {
        width: '100%',
        height: 112,
        resizeMode: 'cover',
        opacity: 0.7
    },
    playButton: {
        backgroundColor: '#34A853',
        paddingVertical: 10,
        width: 76,
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 6
    },
    playButtonText: {
        color: '#fff',
        fontSize: 8,
        fontWeight: 600,
    },
});
