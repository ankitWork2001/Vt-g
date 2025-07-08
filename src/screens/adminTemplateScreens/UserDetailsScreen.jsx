import { ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Loader from '../../components/Loader/Loader'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useSelector } from 'react-redux'
import { Image } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

const UserDetailsScreen = () => {
  const inset = useSafeAreaInsets();
  const { singleUser, singleUserLoading, } = useSelector((state) => state.admin);
  console.log('Single User Details:', singleUser);
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />
      {
        singleUserLoading ? <Loader visible={singleUserLoading} /> : (
          <View style={{ flex: 1 }}>  

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.scrollViewContent, { paddingBottom: inset.bottom + 50 }]}
            >
              <AdminTemplateHeaderPart name={singleUser ? singleUser?.user.name : 'User'} />
              {/* User Details */}
              <View style={styles.dashboardWrapper}>
                <View style={styles.userDetailsView1}>
                  <Image
                    source={{ uri: singleUser?.user?.avatarUrl ? singleUser?.user?.avatarUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzBwdXILD8UEHD_k8M2d-fvNLi9yBMMO3KXQ&s' }}
                    style={styles.imageStyle}
                    resizeMode='cover'
                  />

                  <Text style={styles.useridText}>User Id : {singleUser ? singleUser.user._id : 'N/A'}</Text>
                  <View style={styles.walletView}>
                    <Text style={styles.walletbalenceText}>
                      Wallet Balance
                    </Text>
                    <Text style={styles.walletbalenceText}>
                      {singleUser ? singleUser.wallet.balance.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                      }) : 'N/A'}
                    </Text>
                  </View>
                </View>
                <View style={styles.userDetailsView2}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.labelDetails}>
                    <Text style={styles.nameText}>
                      {singleUser ? singleUser.user.name : 'N/A'}
                    </Text>
                  </View>
                  <Text style={styles.label}>E-Mail</Text>
                  <View style={styles.labelDetails}>
                    <Text style={styles.nameText}>
                      {singleUser ? singleUser.user.email : 'N/A'}
                    </Text>
                  </View>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={styles.labelDetails}>
                    <Text style={styles.nameText}>
                      {singleUser ? singleUser.user.mobile : 'N/A'}
                    </Text>
                  </View>
                  <Text style={styles.label}>Referral Code</Text>
                  <View style={styles.labelDetails}>
                    <Text style={styles.nameText}>
                      {singleUser ? singleUser.user.code : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )
      }
    </>
  )
}

export default UserDetailsScreen

const styles = StyleSheet.create({
  scrollViewContent: {
    backgroundColor: '#fff',
    flexGrow: 1,

  },
  dashboardWrapper: {
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    // justifyContent:'center',
    // alignItems: 'center',
    width: '100%',
    flex: 1
  },
  userDetailsView1: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10,
    width: '90%',
  },
  imageStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 0.5,
  },
  useridText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    width: '30%',

  },
  walletView: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#FF8800',
    marginLeft: 10,
    height: RFValue(45),
    elevation: 2,
  },
  walletbalenceText: {
    fontSize: RFValue(12),
    color: '#fff',
    fontWeight: '500',
  },
  userDetailsView2: {


    // alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    // borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 20,
    width: '100%',
    gap: 10,
  },
  label: {
    fontSize: RFValue(14),
    color: '#8F8F8F',
    fontWeight: '400',
    marginBottom: 5,
  },
  nameText: {
    fontSize: RFValue(14),
    color: '#000',
    fontWeight: '400',
  },
  labelDetails: {
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    // elevation: 2,
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#00000061',
  },
})