import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProfileScreenUpperside from './ProfileScreenUpperside';
import ProfileScreenDownrside from './ProfileScreenDownrside';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeeById } from '../../../redux/slices/userSlice';
import Loader from '../../../components/Loader/Loader';
import { getSpinCount } from '../../../redux/slices/spinSlice';
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const { userId } = useSelector((state) => state.auth);
  const { userDetails, wallet, loading } = useSelector((state) => state.user);
  // console.log('User ID:', userId);
  // console.log('User Details:', userDetails);
  const isLoading = loading || !userDetails;
  useEffect(() => {
    if (userId) {
      dispatch(getEmployeeById(userId));
    }
  }, [userId]);
  useEffect(() => {
    dispatch(getSpinCount());

}, [dispatch])
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      {
        isLoading ?
          (
            <Loader visible={isLoading} />
          ) : (
            <SafeAreaView style={styles.MainContainer}>

              <ScrollView
                contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
                showsVerticalScrollIndicator={false}
              >
                <ProfileScreenUpperside />
                <ProfileScreenDownrside />

              </ScrollView>
            </SafeAreaView>
          )
      }

    </>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

})