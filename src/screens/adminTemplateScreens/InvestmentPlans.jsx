import { ScrollView, StatusBar, StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert, } from 'react-native'
import React, { use, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'

import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { deleteInvestmentPlan, fetchAllInvestmentPlans } from '../../redux/slices/adminSlice'
import AdminInvestmentHeader from '../../components/Header/AdminInvestmentHeader'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useNavigation } from '@react-navigation/native'
const InvestmentPlans = () => {
  const { investmentPlans, investmentPlanFetchLoading } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loadingPlanId, setLoadingPlanId] = useState(null);

  console.log('InvestmentPlans', investmentPlans);
  useEffect(() => {
    dispatch(fetchAllInvestmentPlans());
  }, [dispatch]);
  const planColors = {
    'Basic Plan': '#34A853',
    'Starter Plan': '#00BFA5D9',
    'Ultra Plan': '#8E24AAD9',
    'Gold Plan': '#FFD75F',
    'Premium Plan': '#9747FF',
    'Super Plan': '#FF6F00D9',
    'Standard Plan': '#607D8BD9',
  };
  const renderPlan = ({ item }) => {
    const backgroundColor = planColors[item.name] || '#978686'; // fallback color
    const isLoading = loadingPlanId === item._id;
    const amount = item ? item?.minAmount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }) : '0';
    const durationDays = item ? item.durationDays : '0';
    const autoPay = item.autoPayout ? 'Yes' : 'No';
    const name = item ? item.name : 'Plan';
    const roiPercentage = item ? item.roiPercent : ' 0';
    // Plans Card 
    return (
      <View style={styles.card}>
        <View style={[styles.borderBar, { backgroundColor }]} />
        <View style={styles.content}>
          <View style={styles.textSection}>
            <View style={styles.titleRow}>
              <Icon name="schedule" size={RFValue(14)} color="#2E7D32" />
              <Text style={styles.title}>{name}</Text>
            </View>
            <Text style={styles.text}>ROI: {roiPercentage}%</Text>
            <Text style={styles.text}>Min Amount: {amount}</Text>
            <Text style={styles.text}>Duration: {durationDays} Days</Text>
            <Text style={styles.text}>Auto Payout: {autoPay}</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assests/investMan.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
      
            style={[styles.button, { backgroundColor }]}
            onPress={() => navigation.navigate('AddNewInvestment', { item, isEditing: true })}
          >
            <Text style={styles.buttonText}>
              Edit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loadingPlanId === item._id }
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor: 'red' }]}
            onPress={() => handleDeletePlan(item._id)}
          >
            <Text style={styles.buttonText}>
              {isLoading ? <ActivityIndicator size={18} color="#fff" /> : 'Delete'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
  // handle delete Plan
  const handleDeletePlan = async (itemId) => {
    setLoadingPlanId(itemId)
    try {
      const result = await dispatch(deleteInvestmentPlan(itemId));
      // console.log(result?.payload?.message);
      Alert.alert('Message', result?.payload?.message || 'Plan deleted')
    } catch (error) {
      Alert.error('Error', error)
    } finally {
      setLoadingPlanId(null)
    }

  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />


      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {
          investmentPlanFetchLoading ? (
            <Loader visible={investmentPlanFetchLoading} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
            >

              <AdminInvestmentHeader title={'Investment Plans Management'} />
              <View style={styles.container}>
                {/* <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.HorizentalScrollContainer}
                > */}
                <FlatList
                  data={investmentPlans}
                  scrollEnabled={false}
                  keyExtractor={(item) => item._id}
                  renderItem={renderPlan}
                  contentContainerStyle={{ paddingBottom: 40 }}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15 }}>No investment plans available</Text>
                  )}
                />
                {/* </ScrollView> */}
              </View>
            </ScrollView>

          )
        }
      </SafeAreaView>
    </>
  )
}
export default InvestmentPlans

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // margin: 10,
    top: -30,
    // justifyContent:'center',
    // alignItems:'center',
    // width:'100%'

  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  card: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    position: 'relative',
    gap: 10,
    // width:'90%',

  },
  borderBar: {
    width: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    position: 'absolute',
    height: '100%',
    left: 0,

  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  textSection: {
    flex: 1,
    marginLeft: 25

  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: 500,
    color: '#000',
  },
  text: {
    fontSize: RFValue(10),
    color: '#444',
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',

  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 6,
    width: '35%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: ' center',
  },
  imageContainer: {
    marginRight: 20
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  investmentHeaderText: {
    margin: 15,
    fontSize: RFValue(20),
    fontWeight: '500'
  },
})