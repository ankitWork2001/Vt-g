import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTransactionReports } from '../../redux/slices/adminSlice'
import moment from 'moment';
import { RFValue } from 'react-native-responsive-fontsize'

type TransactionType = 'all' | 'deposit' | 'withdraw' | 'bonus';

const filterTabs = [
  { label: 'All', key: 'all' },
  { label: 'Deposit', key: 'deposit' },
  { label: 'Withdraw', key: 'withdraw' },
  { label: 'Bonus', key: 'bonus' },
] as const;
const COLUMNS = [
  { key: 'txnId', label: 'Txn ID', width: 210 },
  { key: 'userId', label: 'User ID', width: 210 },
  { key: 'date', label: 'Date', width: 140 },
  { key: 'type', label: 'Type', width: 100 },
  { key: 'amount', label: 'Amount', width: 120 },
  { key: 'status', label: 'Status', width: 120 },
];
const ReportingTransactionScreen = () => {
  const dispatch = useDispatch();
  const [selectedType, setSelectedType] = useState<TransactionType>('all');
  const { transactionReports, reportingAndTransactionsLoading } = useSelector((state: any) => state.admin);
  console.log('Transaction Report', transactionReports);
  useEffect(() => {
    dispatch(fetchTransactionReports());
  }, [dispatch]);

  const filteredTransactions = selectedType === 'all'
    ? transactionReports
    : transactionReports.filter(t => t.type.toLowerCase() === selectedType);

  const renderItem = ({ item }: { item: typeof transactionReports[number] }) => {
    const date = moment(item.createdAt).format('D MMM YYYY');
    const type = item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase();
    const status = item.status.charAt(0).toUpperCase() + item.status.slice(1)
    const amount = item.amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });


    const rowData = {
      txnId: item?._id || 'N/A',
      userId: item?.userId || 'N/A',
      date,
      type,
      amount,
      status,
    };
    return (
      <View style={styles.row}>
        {/* <Text style={styles.cell}>{txnId}</Text>
        <Text style={styles.cell}>{userId}</Text>
        <Text style={styles.cell}>{date}</Text>
        <Text style={styles.cell}>{type}</Text>
        <Text style={styles.cell}>{amount}</Text>
        <Text style={[styles.cell, status === 'Pending' ? styles.pending : styles.completed]}>
          {status}
        </Text> */}
        {COLUMNS.map(({ key, width }) => (
          <Text
            key={key}
            style={[
              styles.cell,
              { width },
              key === 'status' && status === 'Pending' ? styles.pending : {},
              key === 'status' && status !== 'Pending' ? styles.completed : {},
            ]}
          >
            {rowData[key] || 'N/A'}
          </Text>
        ))}
      </View>

    )
  };
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />
      {
        reportingAndTransactionsLoading ? (
          <Loader visible={reportingAndTransactionsLoading} />
        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView>
              <AdminTemplateHeaderPart name='Reporting and Transactions' paddingBottom={20} />
              <View style={styles.contentContainer}>
                <View style={styles.container}>
                  <Text style={styles.sectionTitle}>All Transactions</Text>
                  <View style={styles.tabs}>
                    {filterTabs.map(tab => (
                      <View style={styles.tabButtonContainer}>
                        <TouchableOpacity
                          key={tab.key}
                          style={[
                            styles.tabButton,
                            selectedType === tab.key && styles.activeTabButton,
                          ]}
                          onPress={() => setSelectedType(tab.key)}
                        >
                          <Text style={[
                            styles.tabText,
                            selectedType === tab.key && styles.activeTabText,
                          ]}>
                            {tab.label}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                  {/* Table Header */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    <View style={{ minWidth: 900 /* or sum of column widths */ }}>
                      <View style={styles.tableHeader}>
                        {COLUMNS.map(col => (
                          <Text
                            key={col.key}
                            style={[styles.headerCell, { width: col.width }]}
                          >
                            {col.label}
                          </Text>
                        ))}
                        {/* <Text style={styles.headerCell}>Txn ID</Text>
                        <Text style={styles.headerCell}>User ID</Text>
                        <Text style={styles.headerCell}>Date</Text>
                        <Text style={styles.headerCell}>Type</Text>
                        <Text style={styles.headerCell}>Amount</Text>
                        <Text style={styles.headerCell}>Status</Text> */}
                      </View>

                      <FlatList
                        data={filteredTransactions}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={false}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 30, }}
                        ListEmptyComponent={() => (

                          <View style={{ padding: 20, }}>
                            <Text style={{ color: '#000', fontSize: RFValue(14) }}>No transactions found.</Text>
                          </View>
                        )}
                      />
                    </View>

                  </ScrollView>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        )
      }

    </>
  )
}

export default ReportingTransactionScreen

const styles = StyleSheet.create({
  contentContainer: {
    padding: 10,
    // backgroundColor: "#F3F3F3",
    margin: 10,
    borderRadius: 6,
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#34A853',
    paddingVertical: 30,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 10,
    elevation: 4,
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  sectionTitle: {
    fontSize: RFValue(16),
    fontWeight: '400',
    margin: 15,
    color: '#444',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  tabButtonContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    borderRadius: 4,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },
  activeTabButton: {
    backgroundColor: '#34A853',
  },
  tabText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#84D299',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',


  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'left',

  },
  pending: {
    color: '#F57C00',
    fontWeight: '500',
  },
  completed: {
    color: '#388E3C',
    fontWeight: '500',
  },
})