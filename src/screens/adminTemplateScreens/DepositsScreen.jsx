import React, { useEffect } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDeposits } from '../../redux/slices/adminSlice'
import Loader from '../../components/Loader/Loader'

// const depositRequests = [
//   { txnId: 'TX001', userId: 'UU01', amount: 'Rs.200', screenshot: 'View', status: 'Pending' },
//   { txnId: 'TX002', userId: 'UU01', amount: 'Rs.300', screenshot: 'View', status: 'Pending' },
//   { txnId: 'TX003', userId: 'UU01', amount: 'Rs.200', screenshot: 'View', status: 'Pending' },
//   { txnId: 'TX004', userId: 'UU01', amount: 'Rs.400', screenshot: 'View', status: 'Pending' },
// ]


const columnWidths = {
  txnId: 80,
  userId: 80,
  amount: 100,
  screenshot: 120,
  status: 100,
  actions: 140,
}

const DepositsScreen = () => {
  const dispatch = useDispatch();
  const { deposits, depositsLoading } = useSelector((state) => state.admin);
  console.log('Deposits:', deposits);
  useEffect(() => {
    dispatch(fetchAllDeposits());
  }, [dispatch]);

  const renderDeposit = (item) => {

    const itemId = item ? item.item._id : 'N/A';
    const userId = item ? item.item.userId?._id : 'N/A';
    const amount = item ? item.item.amount?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }) : 'N/A';
    const status = item ? item.item.status.charAt(0).toUpperCase() + item.item.status.slice(1) : 'N/A';

    return (
      <View style={styles.row} key={itemId}>
        <Text style={[styles.cell, { width: columnWidths.txnId }]}>{itemId}</Text>
        <Text style={[styles.cell, { width: columnWidths.userId }]}>{userId}</Text>
        <Text style={[styles.cell, { width: columnWidths.amount }]}>{amount}</Text>
        <Text style={[styles.cell, { width: columnWidths.screenshot, color: 'blue', textDecorationLine: 'underline' }]}>{item.screenshot}</Text>
        <Text style={[styles.cell, { width: columnWidths.status, color: '#E5A400' }]}>{status}</Text>
        <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
          {
            status === 'Pending' ? (
              <>
                <TouchableOpacity
                  onPress={() => handleToggleDepositApprove(itemId)}
                >
                  <Text style={[styles.link, { color: 'green', textDecorationLine: 'underline' }]}>Approve</Text>
                </TouchableOpacity>
                <Text style={[styles.reject, { marginLeft: 10 }]}>Reject</Text>
              </>
            ) : (
              <Text style={[styles.cell, { color: '#999' }]}>Approved</Text>
            )
          }

        </View>
      </View>
    )

  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />

      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {
          depositsLoading ? (
            <Loader visible={depositsLoading} />
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <AdminTemplateHeaderPart name='Deposits' paddingBottom={20} />
              <View style={styles.container}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.HorizentalScrollContainer}
                >
                  <View style={styles.TableContainer}>
                    <View style={[styles.row, styles.headerRow]}>
                      <Text style={[styles.headerCell, { width: columnWidths.txnId }]}>Txn ID</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.amount }]}>Amount</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.screenshot }]}>Screenshot Link</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                    </View>

                    {/* {deposits.map((item, index) => (
                      
                    ))} */}
                    <FlatList
                      data={deposits}
                      keyExtractor={(_, index) => index.toString()}
                      renderItem={renderDeposit}
                      ListEmptyComponent={() => {
                        <View>
                          <Text>No Deposits found</Text>
                        </View>
                      }}


                    />
                  </View>
                </ScrollView>
              </View>
            </ScrollView>
          )
        }
      </SafeAreaView>


    </>
  )
}

export default DepositsScreen

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