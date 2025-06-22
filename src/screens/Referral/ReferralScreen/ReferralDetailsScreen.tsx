import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';

type LevelKey = 'level1' | 'level2' | 'level3';

const levels = [
  { label: 'LEVEL 1', commission: '10%', key: 'level1' },
  // { label: 'LEVEL 2', commission: '20%', key: 'level2' },
  // { label: 'LEVEL 3', commission: '30%', key: 'level3' },
] as const;

const data: Record<LevelKey, { name: string; referredBy?: string; date: string; earnings: string }[]> = {
  level1: [
    { name: 'Aman Singh', date: '2025-04-15', earnings: '$50' },
    { name: 'Aman Singh', date: '2025-04-15', earnings: '$50' },
  ],
  level2: [
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
  ],
  level3: [
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
    { name: 'Rohit Saini', referredBy: 'Aman Singh', date: '2025-04-15', earnings: '$90' },
  ],
};

const ReferralDetailsScreen = () => {
  const navigation = useNavigation();
  const [selectedLevel, setSelectedLevel] = useState<LevelKey>('level1');
  const { bonusHistory } = useSelector((state: any) => state.reward)

  const renderItem = ({ item }: { item: typeof data[LevelKey][number] }) => {
    const date = moment(item.date).format('D MMM YYYY');
    const amount = item.amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    return (
      <View style={styles.row}>
        <Text style={styles.cell}>{item ? item.name : 'N/A'}</Text>
        {selectedLevel !== 'level1' && <Text style={styles.cell}>{item.referredBy}</Text>}
        <Text style={styles.cell}>{item ? date : 'N/A'}</Text>
        <Text style={styles.cell}>{item ? amount : 'N/A'}</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContentContainer}>
        <View style={styles.headerTextContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={20} color='#fff' />
          </TouchableOpacity>
          <Text style={styles.headerText}>Referral Earnings</Text>
        </View>
        <TouchableOpacity>
          <Icon name='notifications' size={20} color='#fff' />
        </TouchableOpacity>
      </View>


      <View style={[styles.tabsMainContainer, { marginTop: 30 }]}>
        <View style={styles.tabs}>
          {levels.map((level) => (
            <TouchableOpacity
              key={level.key}
              style={[styles.tab, selectedLevel === level.key && styles.activeTab]}
              onPress={() => setSelectedLevel(level.key)}
            >
              <Text style={[styles.tabLabel, selectedLevel === level.key && styles.activeLabel]}>
                {level.label}
              </Text>
              <Text style={[styles.tabSubLabel, selectedLevel === level.key && styles.activeLabel]}>{level.commission} Commission</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>
          {selectedLevel !== 'level1' && <Text style={styles.headerCell}>Referred By</Text>}
          <Text style={styles.headerCell}>Joined On</Text>
          <Text style={styles.headerCell}>Earnings</Text>
        </View>

        <FlatList
          data={bonusHistory}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListEmptyComponent={<Text style={{
            textAlign:'center',
            fontSize:RFValue(16),
            fontWeight:'400',
            marginTop:10
          }}>No referrals yet.</Text>}
        />
      </View>

    </SafeAreaView>
  );
};

export default ReferralDetailsScreen;

const styles = StyleSheet.create({
  headerContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#34A853',
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  headerText: {
    fontSize: RFValue(20),
    fontWeight: '500',
    color: '#fff'
  },
  tabsMainContainer: {
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    // width: '90%',
    shadowColor: 'blue',

  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    backgroundColor: '#34A853',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,


  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    // marginLeft: 10, // for now level 1 only
  },
  activeTab: {
    borderBottomColor: 'green',
  },
  tabLabel: {
    fontWeight: 'bold',
    color: '#555',
  },
  activeLabel: {
    color: '#fff',
  },
  tabSubLabel: {
    fontSize: 12,
    color: '#000',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    elevation: 4,
    // width: '100%',

  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 25,

  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    // justifyContent: 'space-between',
    // paddingHorizontal: 10,
    // alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: 'center',
  },
});
