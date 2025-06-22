
import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, ImageBackground, Platform, StatusBar, useWindowDimensions, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../../redux/slices/userSlice';
import { decodeUserFromToken } from '../../../utils/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import Loader from '../../../components/Loader/Loader';
import { Text } from 'react-native-gesture-handler';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const SplashScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { height } = useWindowDimensions();
    const adjustedHeight = Platform.OS === 'android' ? height + StatusBar.currentHeight : height;
    const { userToken, loading } = useSelector((state) => state.auth);
    const { userDetails } = useSelector((state) => state.user);
    // console.log('User Details:', userDetails);
    console.log('User Token in splash:', userToken, 'Loading:', loading);

    //  Fetch userDetails if token is available
    useEffect(() => {
        if (!loading && userToken) {
            const decoded = decodeUserFromToken(userToken);
            if (decoded?.id) {
                dispatch(getEmployeeById(decoded.id));
            }
        }
    }, [userToken, loading]);

    //  Decide where to navigate once token & userDetails are ready
    useEffect(() => {
        if (loading) return;

        // Token is not available, go to welcome
        if (!userToken) {
            const timer = setTimeout(() => {
                navigation.replace('WelcomeScreen');
            }, 1500);
            return () => clearTimeout(timer);
        }

        // Wait until userDetails are fetched
        if (!userDetails) return;

        const role = userDetails?.role?.toLowerCase();
        const timer = setTimeout(() => {
            if (role === 'user') {
                navigation.replace('MainTabs');
            } else if (role === 'admin') {
                navigation.replace('AdminPanel');
            } else {
                navigation.replace('WelcomeScreen');
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [loading, userToken, userDetails]);

    //  Show loader while auth or user data is loading
    if (loading || (userToken && !userDetails)) {
        // return <Loader />;
    }
    useEffect(() => {
        changeNavigationBarColor('transparent', true); 
    }, []);
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent hidden={true}/>

            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assests/Landing4x.png')}
                    style={{ width: '100%', height: adjustedHeight, flex: 1 }}
                    resizeMode='cover'
                >
                    <View  style={{
                        flex:1,
                        justifyContent:'flex-end',
                        alignItems:'flex-end'
                    }}>

                   
                        <Image
                         source={require('../../../assests/SplashWheel.png')}
                         resizeMode='cover'
                         style={{
                            width:400,
                            height:380,
                            top:55
                           
                          
                         }}
                        
                        />
                         </View>
                   
                </ImageBackground>
            </View>
        </>
    );
};

export default SplashScreen;

