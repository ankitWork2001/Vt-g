import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import Slider from '@react-native-community/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveInvestments, fetchInvestmentHistory, fetchInvestmentPlans, subscribeInvestment, subscribeToPlan } from '../../redux/slices/investmentSlice';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../components/Loader/Loader';
import moment from 'moment';

const InvestScreen = () => {
  const insets = useSafeAreaInsets(); 
  const { plans, activeInvestments, investmentHistory, loading, error, investPlanLoading } = useSelector(state => state.investment);
  // console.log('Investment Plans:', plans);
  console.log('Active Investments:', activeInvestments); 
  // console.log('Investment History:', investmentHistory);
  const navigation = useNavigation();
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInvestmentPlans());
    dispatch(fetchActiveInvestments())
    dispatch(fetchInvestmentHistory());

  }, []);

  const planColors = {
    'Basic Plan': '#0077FFD9',
    'Starter Plan': '#00BFA5D9',
    'Ultra Plan': '#8E24AAD9',
    'Gold Plan': '#FDBE00D9',
    'Premium Plan': '#3F51B5D9',
    'Super Plan': '#FF6F00D9',
    'Standard Plan': '#607D8BD9',
  };
  const renderPlan = ({ item }) => {
    const backgroundColor = planColors[item.name] || '#0077FFD9'; // fallback color
    const isLoading = loadingPlanId === item._id;
    return (
      <View style={styles.card}>
        <View style={[styles.borderBar, { backgroundColor }]} />
        <View style={styles.content}>
          <View style={styles.textSection}>
            <View style={styles.titleRow}>
              <Icon name="schedule" size={RFValue(14)} color="#2E7D32" />
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <Text style={styles.text}>ROI: {item.roiPercent}%</Text>
            <Text style={styles.text}>Min Amount: ${item.minAmount}</Text>
            <Text style={styles.text}>Duration: {item.durationDays} Days</Text>
            <Text style={styles.text}>Auto Payout: {item.autoPayout ? 'Yes' : 'No'}</Text>
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
            disabled={loadingPlanId === item._id}
            activeOpacity={0.7}
            style={[styles.button, { backgroundColor}]}
            onPress={() => handleSubscribeInvestment(item._id, {
              amount: item.minAmount,
              startDate: new Date().toISOString(),
              endDate: new Date(Date.now() + item.durationDays * 24 * 60 * 60 * 1000).toISOString()
            })
            }
          >
            <Text style={styles.buttonText}> {
              isLoading ? <ActivityIndicator size={15} color="#fff" /> : 'Invest Now'
            }</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  };
  const handleSubscribeInvestment = async (planId, payload) => {
    try {
      // console.log('Subscribing to plan:', planId, payload);
      setLoadingPlanId(planId);
      const resultAction = await dispatch(subscribeToPlan({ id: planId, payload }));

      if (subscribeToPlan.fulfilled.match(resultAction)) {
        // console.log('Subscribed Successfully:', resultAction.payload);
        Alert.alert("Success", "You have successfully subscribed to the investment plan.");
        await dispatch(fetchActiveInvestments())
      } else {
        const error = typeof resultAction.payload === 'string'
          ? resultAction.payload
          : resultAction.payload?.message || 'Subscription failed';
        // console.error('Subscription Failed:', error);
        Alert.alert('Error', error);
      }
    } catch (error) {
    
      Alert.alert('Error', error.message || 'Unexpected error occurred.');
    }
    finally {
      setLoadingPlanId(null); // clear loading on finish
    }
  };
  const renderActiveInvestment = ({ item }) => {
    const planName = item.planId?.name || 'N/A';
    const backgroundColor = planColors[planName] || '#0077FFD9'; // fallback color
    const endDate = moment(item.endDate).format('MMM DD, YYYY');
    const start = moment(item.startDate);
    const end = moment(item.endDate);
    const today = moment();
    const duration = end.diff(start, 'days');
    const progress = today.diff(start, 'days') / duration;
    // console.log('Progress:', progress, 'Duration:', duration, 'Start:', start.format('MMM DD, YYYY'), 'End:', end.format('MMM DD, YYYY'));
    return (
      <View style={[styles.ongoingInvestmentCard, { backgroundColor }]}>
        <View style={styles.headerRow}>
          <Icon name="schedule" size={14} color="#fff" />
          <Text style={styles.planTitle}> {item.planId.name}</Text>
        </View>

        <Text style={styles.label}>Progress</Text>
        <View pointerEvents='none'>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            value={progress}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#444"
            thumbTintColor="#fff"
          />
        </View>

        <Text style={styles.detail}>Invested: ${item.amount}</Text>
        <Text style={styles.detail}>Earnings: ${item.earnings ? item.earnings : '0'}</Text>
        <Text style={styles.detail}>Next Payout: {item.nextPayout}</Text>
        <Text style={styles.detail}>End Date: {endDate}</Text>
      </View>
    )
  };
  const renderInvestmentHistory = ({ item }) => {
    const planName = item?.planId?.name || 'N/A';
    const amount = `$${item.amount}`;
    const endDate = moment(item.endDate).format('MMM DD, YYYY');
    const status = item.status?.charAt(0).toUpperCase() + item.status.slice(1);
    const Color = planColors[planName] || '#2E7D32'; // fallback color
    const statusColor = status === 'Active' ? '#4CAF50' : '#F44336';
    return (

      <View style={styles.dataRow}>
        <Text style={[styles.cellText, { color: Color }]}>{planName}</Text>
        <Text style={[styles.cellText, { color: Color }]}>{amount}</Text>
        <Text style={[styles.cellText, { color: Color }]}>{endDate}</Text>
        <Text style={[styles.cellText, { color: statusColor }]}>{status}</Text>
      </View>
    )
  };

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'transparent'} translucent />
      {
        loading ? (
          <Loader visible={loading} />
        ) : (
          <SafeAreaView style={styles.MainContainer}>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 100 }}
              showsVerticalScrollIndicator={false}
            >
              <View>
                <View style={[styles.headerContainer, { paddingTop: insets.top + 50, bottom: insets.bottom + 10 }]}>
                  <Text style={styles.headerText}>Choose Your Investment Plan</Text>
                  <TouchableOpacity>
                    <Icon name='notifications' size={20} color='#fff' />
                  </TouchableOpacity>
                </View>
                <FlatList
                  data={plans}
                  scrollEnabled={false}
                  keyExtractor={(item) => item._id}
                  renderItem={renderPlan}
                  contentContainerStyle={styles.container}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15 }}>No investment plans available</Text>
                  )}
                />
                {/* Plans Card */}
                {/* <View style={styles.card}>
              <View style={[styles.borderBar, { backgroundColor: '#2E7D32', }]} />
              <View style={styles.content}>
                <View style={styles.textSection}>
                  <View style={styles.titleRow}>
                    <Icon name="schedule" size={14} color="#2E7D32" />
                    <Text style={styles.title}> Basic Plan</Text>
                  </View>
                  <Text style={styles.text}>ROI: 1.5% Daily</Text>
                  <Text style={styles.text}>Min Amount: $500</Text>
                  <Text style={styles.text}>Duration: 3 Days</Text>
                  <Text style={styles.text}>Payout: Daily</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assests/investMan.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#2E7D32' }]}>
                  <Text style={styles.buttonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={[styles.borderBar, { backgroundColor: '#FDBE00', }]} />
              <View style={styles.content}>
                <View style={styles.textSection}>
                  <View style={styles.titleRow}>
                    <Icon name="bolt" size={14} color="#FDBE00" />
                    <Text style={styles.title}> Gold Plan</Text>
                  </View>
                  <Text style={styles.text}>ROI: 2.5% Daily</Text>
                  <Text style={styles.text}>Min Amount: $2000</Text>
                  <Text style={styles.text}>Duration: 7 Days</Text>
                  <Text style={styles.text}>Payout: Weekly</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assests/InvetManGoldPlanImage.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#FDBE00' }]}>
                  <Text style={styles.buttonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <View style={[styles.borderBar, { backgroundColor: '#9747FF', }]} />
              <View style={styles.content}>
                <View style={styles.textSection}>
                  <View style={styles.titleRow}>
                    <Icon name="schedule" size={14} color="#9747FF" />
                    <Text style={styles.title}> Premium Plan</Text>
                  </View>
                  <Text style={styles.text}>ROI: 1.5% Daily</Text>
                  <Text style={styles.text}>Min Amount: $500</Text>
                  <Text style={styles.text}>Duration: 3 Days</Text>
                  <Text style={styles.text}>Payout: Daily</Text>
                </View>
                <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assests/InvetManPremiumPlanImage.png')}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#9747FF' }]}>
                  <Text style={styles.buttonText}>Invest Now</Text>
                </TouchableOpacity>
              </View>
            </View> */}

                {/* Ongoing Investments */}
                <Text style={styles.investmentHeaderText}>Ongoing Investments</Text>
                <View style={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FlatList
                    data={activeInvestments}
                    renderItem={renderActiveInvestment}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalScrollContainer}
                    ListEmptyComponent={() => (

                      <Text style={{ textAlign: 'center', marginVertical: 20, fontSize: 15 }}>No ongoing investments found</Text>

                    )}

                  />
                </View>

                {/* <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalScrollContainer}
            >
              <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#0077FFD9' }]}>
                <View style={styles.headerRow}>
                  <Icon name="schedule" size={14} color="#fff" />
                  <Text style={styles.planTitle}> Basic Plan</Text>
                </View>

                <Text style={styles.label}>Progress</Text>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={0.4}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#444"
                  thumbTintColor="#fff"

                />

                <Text style={styles.detail}>Invested: $3000</Text>
                <Text style={styles.detail}>Earnings: $225</Text>
                <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
                <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
              </View>
              <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#FDBE00D9' }]}>
                <View style={styles.headerRow}>
                  <Icon name="schedule" size={14} color="#fff" />
                  <Text style={styles.planTitle}> Gold Plan</Text>
                </View>

                <Text style={styles.label}>Progress</Text>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={0.6}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#444"
                  thumbTintColor="#fff"
                />

                <Text style={styles.detail}>Invested: $3000</Text>
                <Text style={styles.detail}>Earnings: $225</Text>
                <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
                <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
              </View>
              <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#0077FFD9' }]}>
                <View style={styles.headerRow}>
                  <Icon name="schedule" size={14} color="#fff" />
                  <Text style={styles.planTitle}> Basic Plan</Text>
                </View>

                <Text style={styles.label}>Progress</Text>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={0.4}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#444"
                  thumbTintColor="#fff"

                />

                <Text style={styles.detail}>Invested: $3000</Text>
                <Text style={styles.detail}>Earnings: $225</Text>
                <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
                <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
              </View>
              <View style={[styles.ongoingInvestmentCard, { backgroundColor: '#FDBE00D9' }]}>
                <View style={styles.headerRow}>
                  <Icon name="schedule" size={14} color="#fff" />
                  <Text style={styles.planTitle}> Gold Plan</Text>
                </View>

                <Text style={styles.label}>Progress</Text>

                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={0.4}
                  minimumTrackTintColor="#fff"
                  maximumTrackTintColor="#444"
                  thumbTintColor="#fff"
                />

                <Text style={styles.detail}>Invested: $3000</Text>
                <Text style={styles.detail}>Earnings: $225</Text>
                <Text style={styles.detail}>Next Payout: May 10, 2025</Text>
                <Text style={styles.detail}>End Date: Jun 25, 2025</Text>
              </View>
            </ScrollView> */}

                {/* Past Investments */}

                <Text style={styles.investmentHeaderText}>Past Investment</Text>
                <View style={styles.InvestmentTablecontainer}>
                  <View style={styles.InvestmentTableheaderRow}>
                    <Text style={styles.InvestmentTableheaderText}>Plan Type</Text>
                    <Text style={styles.InvestmentTableheaderText}>Amount</Text>
                    <Text style={styles.InvestmentTableheaderText}>Ended</Text>
                    <Text style={styles.InvestmentTableheaderText}>Status</Text>

                  </View>
                  <FlatList
                    data={investmentHistory}
                    // horizontal
                    renderItem={renderInvestmentHistory}
                    keyExtractor={(item) => item._id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    ListEmptyComponent={() => (
                      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 15 }}>No past investments</Text>
                    )}

                  />
                </View>
                {/* <Text style={styles.investmentHeaderText}>Past  Investment</Text> */}
                {/* <View style={styles.InvestmentTablecontainer}> */}
                {/* <View style={styles.InvestmentTableheaderRow}>
                <Text style={styles.InvestmentTableheaderText}>Plan Type</Text>
                <Text style={styles.InvestmentTableheaderText}>Amount</Text>
                <Text style={styles.InvestmentTableheaderText}>Ended</Text>
                <Text style={styles.InvestmentTableheaderText}>Status</Text>
              </View> */}

                {/* Row 1 */}
                {/* <View style={styles.dataRow}>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Basic Plan</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>$1000</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Mar 19,2025</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
              </View> */}


                {/* Row 2 */}
                {/* <View style={styles.dataRow}>
                <Text style={[styles.cellText, { color: '#FDBE00' }]}>Gold Plan</Text>
                <Text style={[styles.cellText, { color: '#FDBE00' }]}>$2500</Text>
                <Text style={[styles.cellText, { color: '#FDBE00' }]}>Mar 19,2025</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
              </View> */}

                {/* Row 3 */}
                {/* <View style={styles.dataRow}>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Basic Plan</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>$1000</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Mar 19,2025</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
              </View> */}

                {/* Row 4 */}
                {/* <View style={styles.dataRow}>
                <Text style={[styles.cellText, { color: '#9747FF' }]}>Premium Plan</Text>
                <Text style={[styles.cellText, { color: '#9747FF' }]}>$4000</Text>
                <Text style={[styles.cellText, { color: '#9747FF' }]}>Mar 19,2025</Text>
                <Text style={[styles.cellText, { color: '#2E7D32' }]}>Completed</Text>
              </View> */}

                {/* </View> */}
              </View>
            </ScrollView>

          </SafeAreaView>
        )
      }

    </>

  )
}

export default InvestScreen

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#34A853',
    width: "100%",
    height: 160,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  headerText: {
    color: '#fff',
    fontSize: RFValue(20),
    fontWeight: '500'
  },
  card: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 15,
    marginHorizontal: 25,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 6,
    width: '85%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    textAlign:' center',
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
  horizontalScrollContainer: {

  },
  ongoingInvestmentCard: {
    width: 210,
    borderRadius: 6,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowRadius: 4,
    elevation: 5,
    shadowColor: '#000',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,

  },
  planTitle: {
    color: '#fff',
    fontSize: RFValue(14),
    fontWeight: '500',
  },
  label: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 400
  },
  slider: {
    width: '100%',
    height: 15,
    marginVertical: 5,
  },
  detail: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 3,
  },
  InvestmentTablecontainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
  },
  InvestmentTableheaderRow: {
    flexDirection: 'row',
    backgroundColor: '#34A853',
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    // elevation: 2,
  },
  InvestmentTableheaderText: {
    flex: 1,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  cellText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '600',
  },
})