import {
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { getTransactions } from '../../redux/slices/walletSlice';
import moment from 'moment';

type TransactionType = 'all' | 'deposit' | 'withdraw' | 'bonus';

const filterTabs = [
    { label: 'All', key: 'all' },
    { label: 'Deposit', key: 'deposit' },
    { label: 'Withdraw', key: 'withdraw' },
    { label: 'Bonus', key: 'bonus' },
] as const;

const TransactionHistoryScreen = () => {
    const navigation = useNavigation();
    const [selectedType, setSelectedType] = useState<TransactionType>('all');
    const dispatch = useDispatch();
    const { transactions, loading } = useSelector((state:any) => state.wallet);
    console.log('Transactions:', transactions);

    useEffect(() => {
        dispatch(getTransactions());
    }, []);

    const filteredTransactions = selectedType === 'all'
        ? transactions
        : transactions.filter(t => t.type.toLowerCase() === selectedType);

    const renderItem = ({ item }: { item: typeof transactions[number] }) => {
        const date = moment(item.createdAt).format('D MMM YYYY');
        const type = item.type.charAt(0).toUpperCase() + item.type.slice(1).toLowerCase();
        const status = item.status.charAt(0).toUpperCase() + item.status.slice(1)
        const amount = item.amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        return (
          

           
            <View style={styles.row}>
                <Text style={styles.cell}>{date}</Text>
                <Text style={styles.cell}>{type}</Text>
                <Text style={styles.cell}>{amount}</Text>
                <Text style={[styles.cell, status === 'Pending' ? styles.pending : styles.completed]}>
                    {status}
                </Text>
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
                    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

                        <View style={styles.header}>
                            <View style={styles.headerLeft}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Icon name='arrow-back' size={24} color='#fff' />
                                </TouchableOpacity>
                                <Text style={styles.headerText}>Transaction History</Text>
                            </View>
                            <TouchableOpacity>
                                <Icon name='settings' size={24} color='#fff' />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionTitle}>All Transactions</Text>
                        <View style={styles.container}>
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
                            <View style={styles.tableHeader}>
                                <Text style={styles.headerCell}>Date</Text>
                                <Text style={styles.headerCell}>Type</Text>
                                <Text style={styles.headerCell}>Amount</Text>
                                <Text style={styles.headerCell}>Status</Text>
                            </View>

                            <FlatList
                                data={filteredTransactions}
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={renderItem}
                                contentContainerStyle={{ paddingBottom: 30 , }}
                            />
                        </View>
                    </SafeAreaView>
                )
            }

        </>
    );
};

export default TransactionHistoryScreen;

const styles = StyleSheet.create({
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
});
