import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReferralStats } from '../../redux/slices/adminSlice'

const ReferralsScreen = () => {
  const dispatch = useDispatch();
  const { referralStats, referralStatsLoading } = useSelector((state) => state.admin);
  console.log('Referral Stats', referralStats);
  useEffect(() => {
    dispatch(fetchReferralStats())
  }, [dispatch])
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {
          referralStatsLoading ? (
            <Loader visible={referralStatsLoading} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <AdminTemplateHeaderPart name='Refrerrals' paddingBottom={20} />
              <View style={styles.container}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.HorizentalScrollContainer}
                >
                </ScrollView>
              </View>
            </ScrollView>

          )
        }
      </SafeAreaView>
    </>
  )
}

export default ReferralsScreen

const styles = StyleSheet.create({})