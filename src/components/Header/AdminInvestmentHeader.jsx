import { View, Text, StatusBar, StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AdminInvestmentHeader = ({ title }) => {
    const inset = useSafeAreaInsets();
    const navigation = useNavigation();
    const dispatch = useDispatch();
    return (
        <SafeAreaView edges={['left', 'right', 'bottom']}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" translucent />
            <View style={[styles.headerContainer, { paddingBottom: 10, paddingTop: inset.top }]}>
                <View style={styles.headerInsideContainer}>
                    <TouchableOpacity 
                    activeOpacity={0.7}
                    onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={30} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.greetingText}>{title ? title : 'N/A'}</Text>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={styles.iconButton}>
                        <Fontisto name="bell" size={25} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    )
}


export default AdminInvestmentHeader
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#34A853',
        paddingHorizontal: 10,
        paddingTop: 40,
        height: 150,
        width: '100%',
        justifyContent: "center",

    },
    greetingText: {
        fontSize: RFValue(18),
        color: '#fff',
        fontWeight: '600',
        marginRight:10
    },
    headerInsideContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    }
})