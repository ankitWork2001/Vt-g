import React, { useEffect } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllWithdrawals } from '../../redux/slices/adminSlice'
import Loader from '../../components/Loader/Loader'


const columnWidths = {
  REQId: 100,
  userId: 80,
  amount: 100,
  RequestTime: 120,
  status: 100,
  actions: 100,
}

const WithdrawalsScreen = () => {
  const dispatch = useDispatch();
  const { withdrawals, withdrawalsLoading } = useSelector((state) => state.admin);
  console.log('withdrawals', withdrawals);

  useEffect(() => {
    dispatch(fetchAllWithdrawals());
  }, [dispatch]);
  const renderWithdrawalItem = (item) => {
    const itemId = item ? item._id : 'N/A';
    const userId = item ? item.userId?._id : 'N/A';
    const amount = item ? item.amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }) : 'N/A';
    const status = item ? item.status?.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A';
    const requestTime = item ? new Date(item.createdAt).toLocaleDateString('en-GB') : 'N/A';
    return (
      <View style={styles.row} >
        <Text style={[styles.cell, { width: columnWidths.REQId }]}>{itemId}</Text>
        <Text style={[styles.cell, { width: columnWidths.userId }]}>{userId}</Text>
        <Text style={[styles.cell, { width: columnWidths.amount }]}>{amount}</Text>
        <Text style={[styles.cell, { width: columnWidths.RequestTime, color: 'blue', textDecorationLine: 'underline' }]}>{requestTime}</Text>
        <Text style={[styles.cell, { width: columnWidths.status, color: '#E5A400' }]}>{status}</Text>
        <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
          <Text style={[styles.link, { color: 'green', textDecorationLine: 'underline' }]}>Approve</Text>
        </View>
      </View>
    )
  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />
      {
        withdrawalsLoading ? (

          <Loader visible={withdrawalsLoading} />
        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <ScrollView>
              <AdminTemplateHeaderPart name='Withdrawals' paddingBottom={20} />
              <View style={styles.container}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.HorizentalScrollContainer}
                >
                  <View style={styles.TableContainer}>
                    <View style={[styles.row, styles.headerRow]}>
                      <Text style={[styles.headerCell, { width: columnWidths.REQId }]}>Request ID</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.RequestTime }]}>Request Time</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                    </View>
                   
                    <FlatList
                      data={withdrawals}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={renderWithdrawalItem}
                      contentContainerStyle={{ paddingBottom: 20 }}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={() => (
                        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: RFValue(15) }}>No withdrawal available</Text>
                      )}
                      scrollEnabled={false}
                    />
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          </SafeAreaView>
        )
      }

    </>
  )
}

export default WithdrawalsScreen

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6,
    top: -50
  },
  HorizentalScrollContainer: {
    backgroundColor: '#fff',
  },
  TableContainer: {

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerRow: {
    backgroundColor: '#4CAF50',
  },
  headerCell: {
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 10,
  },
  cell: {
    paddingHorizontal: 10,
  },
  link: {
    color: 'blue',
    marginRight: 10,
    textDecorationLine: 'underline'
  },
  reject: {
    color: 'red',
    textDecorationLine: 'underline'
  },
})