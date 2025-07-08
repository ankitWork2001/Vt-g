import { StatusBar, StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import AdminInvestmentHeader from '../../components/Header/AdminInvestmentHeader'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize'
import { useDispatch, useSelector } from 'react-redux'
import { createInvestmentPlan, fetchAllInvestmentPlans, updateInvestmentPlan } from '../../redux/slices/adminSlice'
const AddNewInvestment = () => {
  const route = useRoute();
  const item = route?.params?.item;
  const isEditing = route?.params?.isEditing;
  const itemId = isEditing ? item?._id : null;
  // console.log('item', item, 'Item id', itemId);
  const [planName, setPlanName] = useState(isEditing ? item.name : '')
  const [roiPercent, setRoiPercent] = useState(isEditing ? JSON.stringify(item.roiPercent) : 0);
  const [minAmount, setMinAmount] = useState(isEditing ? JSON.stringify(item.minAmount) : 0);
  const [durationDays, setDurationDays] = useState(isEditing ? JSON.stringify(item.durationDays) : 0);
  const [autoPay, setAutoPay] = useState(isEditing ? item.autoPayout : true)
  const { updateInvestmentLoading, createInvestmentPlanLoading } = useSelector((state) => state.admin);
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const isLoading = updateInvestmentLoading || createInvestmentPlanLoading;
  const dispatch = useDispatch();
  const isDisabled = !planName || !roiPercent || !minAmount || !durationDays || !autoPay;
  const planColors = {
    'Basic Plan': '#34A853',
    'Starter Plan': '#00BFA5D9',
    'Ultra Plan': '#8E24AAD9',
    'Gold Plan': '#FFD75F',
    'Premium Plan': '#9747FF',
    'Super Plan': '#FF6F00D9',
    'Standard Plan': '#607D8BD9',
  };
  const handleEditPlan = async () => {
    if (isDisabled) {
      return
    }

    const updatedData = {
      name: planName.trim(),
      roiPercent,
      minAmount,
      durationDays,
      autoPayout: autoPay,
    };
    try {
      const result = await dispatch(updateInvestmentPlan({
        id: itemId, data: updatedData
      }));
      console.log('Result', result);
      Alert.alert('Message', result?.payload?.message)
      setAutoPay(null);
      setDurationDays('');
      setPlanName('');
      setMinAmount('');
      setRoiPercent('')
      // navigation.replace('InvestmentPlans')
      await dispatch(fetchAllInvestmentPlans());
      navigation.goBack()
    } catch (error) {
      Alert.alert('Error', error)
    }
  }
  const handleAddPlan = async () => {
    if (isDisabled) {
      return
    }

    try {
      const result = await dispatch(createInvestmentPlan({
        name: planName.trim(),
        roiPercent: roiPercent,
        minAmount: minAmount,
        durationDays: durationDays,
        autoPayout: autoPay
      }));
      // console.log('Result', result.payload.message);
      if (result.payload.message.includes('Investment plan created successfully')) {
        Alert.alert('Message', result.payload.message)
        setAutoPay(null);
        setDurationDays('');
        setPlanName('');
        setMinAmount('');
        setRoiPercent('')
        navigation.replace('InvestmentPlans')
      }
      Alert.alert('Message', result.payload.message)


    } catch (error) {
      Alert.alert('Error', error)
    }

  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />

      <SafeAreaView

        style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollViewContent, { paddingBottom: inset.bottom + 50 }]}
        >
          <AdminInvestmentHeader title={isEditing ? `Edit ${item.name}` : 'Add New Investment'} />
          <View style={[styles.mainContainer,]}>
            <View style={styles.card}>
              <View style={[styles.borderBar, { backgroundColor: isEditing ? planColors[item.name] || '#978686' : '#978686' }]} />
              <View style={styles.content}>
                <View style={[styles.textSection]}>
                  <View style={[styles.titleRow, { backgroundColor: isEditing ? planColors[item.name] || '#978686' : '#978686', opacity: 0.6 }]}>
                    <Icon name="schedule" size={RFValue(16)} color="#2E7D32" />
                    <Text style={styles.title}>{isEditing ? `Edit ${item.name}`: 'Add New Plan'}</Text>
                  </View>
                  <View style={{ marginLeft: 25 }}>
                    <Text style={styles.lable}>Plan Name:</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={planName}
                        placeholder='Enter Plan Name'
                        style={styles.input}
                        placeholderTextColor={'#000'}
                        onChangeText={setPlanName}
                      />

                    </View>
                    <Text style={styles.lable}>ROI :</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={roiPercent}
                        placeholder='Enter ROI Percent'
                        style={styles.input}
                        placeholderTextColor={'#000'}
                        onChangeText={setRoiPercent}
                        keyboardType='number-pad'
                      />
                      <Text style={styles.lable}>% Daily</Text>
                    </View>
                    <Text style={styles.lable}>Min Amount :</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={minAmount}
                        placeholder='Enter min amount'
                        style={styles.input}
                        placeholderTextColor={'#000'}
                        onChangeText={setMinAmount}
                        keyboardType='number-pad'
                      />
                      <Text style={styles.lable}>$</Text>
                    </View>
                    <Text style={styles.lable}>Duration :</Text>
                    <View style={styles.inputContainer}>
                      <TextInput
                        value={durationDays}
                        placeholder='Enter Duration days'
                        style={styles.input}
                        placeholderTextColor={'#000'}
                        onChangeText={setDurationDays}
                        keyboardType='number-pad'
                      />
                      <Text style={styles.lable}>Days</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        disabled={isDisabled || isLoading}
                        style={[styles.button, { backgroundColor: '#34A853' }, isDisabled && { opacity: 0.6 }]}
                        onPress={() => { isEditing ? handleEditPlan() : handleAddPlan() }}
                      >
                        {
                          isLoading ? (
                            <ActivityIndicator size={18} color={'#fff'} />
                          ) : (
                            <Text style={styles.buttonText}>
                              {isEditing ? 'Save Changes' : 'Add Plan'}
                            </Text>
                          )
                        }


                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[styles.button, { backgroundColor: '#fff' }]}
                        onPress={() => navigation.goBack()}
                      >
                        <Text style={[styles.buttonText, { color: '#000' }]}>
                          Cancel
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

      </SafeAreaView>
    </>
  )
}

export default AddNewInvestment

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',


  },
  card: {
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
    // paddingVertical: 10
  },
  textSection: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
    justifyContent: 'flex-start',
    padding: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: RFValue(14),
    fontWeight: 500,
    color: '#000',
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,

  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 6,
    width: '35%',
    borderColor: '#ccc',
    borderWidth: 0.5,
    elevation: 2
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign: ' center',
  },
  lable: {
    fontSize: RFValue(12),
    fontWeight: '400',

  },
  inputContainer: {
    // borderRadius: 10,
    // borderWidth: 0.5,
    // borderColor: '#ccc',
    // width: '50%',
    // backgroundColor: '#fff',
    // elevation: 3,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  input: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#ccc',
    width: '50%',
    backgroundColor: '#fff',
    elevation: 3,
    color: '#000',
    justifyContent: 'center',
    paddingLeft: 10,
  }
})