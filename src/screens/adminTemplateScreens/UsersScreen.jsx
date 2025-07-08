import React, { useEffect } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  FlatList,
  Touchable,
  TouchableOpacity
} from 'react-native'

import { RFValue } from 'react-native-responsive-fontsize'
import AdminTemplateHeaderPart from '../../components/Header/AdminTemplateHeaderPart'
import { fetchAllUsers, fetchUserById, } from '../../redux/slices/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader/Loader'
import { useNavigation } from '@react-navigation/native'

// const users = new Array(8).fill({
//   userId: 'UU01',
//   name: 'Aman',
//   email: 'Amandeep@Gmail.Com',
//   balance: 'Rs.500',
//   status: 'Active'
// })

const columnWidths = {
  userId: 80,
  name: 100,
  email: 200,
  balance: 120,
  status: 100,
  actions: 200,
}

const UsersScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { users, usersLoading } = useSelector((state) => state.admin);
  console.log('Users:', users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const renderItem = ({ item }) => {
    const status = item ? item.status?.charAt(0).toUpperCase() + item.status.slice(1) : 'N/A';

    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { width: columnWidths.userId }]}>{item._id}</Text>
        <Text style={[styles.cell, { width: columnWidths.name }]}>{item.name}</Text>
        <Text style={[styles.cell, { width: columnWidths.email }]}>{item.email}</Text>
        {/* <Text style={[styles.cell, { width: columnWidths.balance }]}>{item.balance}</Text> */}
        <Text style={[styles.cell, { width: columnWidths.status }]}>{status}</Text>
        <View style={[styles.cell, { width: columnWidths.actions, flexDirection: 'row' }]}>
          <TouchableOpacity onPress={() => {
            navigation.navigate('UserDetailsScreen')
            handleFetchUserById(item._id)
          }}
          >
            <Text style={styles.link}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}

          >
            <Text style={[styles.link, { color: '#E5A400' }]}>Suspend</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => console.log('Suspend User', item._id)}
          >
            <Text style={styles.reject}>Reject</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
  const handleFetchUserById = (userId) => {
    dispatch(fetchUserById(userId));
    // console.log('Fetch User By ID:', userId);
  }
  return (
    <>
      <StatusBar backgroundColor={'transparent'} barStyle={"dark-content"} translucent />
      {
        usersLoading ? (
          <Loader visible={usersLoading} />

        ) : (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 40
              }}
            >
              <AdminTemplateHeaderPart name='Users' paddingBottom={20} />
              {/* <Text style={{
                fontSize: RFValue(20),
                fontWeight: 'bold',
                color: '#333',
                marginBottom: 10,
                textAlign: 'center',
              }}>Total Users : {users ? users?.length : "N/A"}</Text> */}
              <View style={styles.container}>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.HorizentalScrollContainer}
                >
                  <View style={styles.TableContainer}>

                    <View style={[styles.row, styles.headerRow]}>
                      <Text style={[styles.headerCell, { width: columnWidths.userId }]}>User ID</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.name }]}>Name</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.email }]}>E-Mail</Text>
                      {/* <Text style={[styles.headerCell, { width: columnWidths.balance }]}>Wallet Balance</Text> */}
                      <Text style={[styles.headerCell, { width: columnWidths.status }]}>Status</Text>
                      <Text style={[styles.headerCell, { width: columnWidths.actions }]}>Actions</Text>
                    </View>
                    <FlatList
                      data={users}
                      keyExtractor={(item) => item._id}
                      renderItem={renderItem}
                      scrollEnabled={false}
                      contentContainerStyle={{ paddingBottom: 20 }}
                      showsVerticalScrollIndicator={false}
                      ListEmptyComponent={() => (
                        <View style={{ padding: 20 }}>
                          <Text style={{
                            textAlign: 'center',
                            fontSize: RFValue(16),
                            color: '#888',
                            fontWeight: '500'
                          }}>No users found</Text>
                        </View>
                      )}



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

export default UsersScreen;

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
