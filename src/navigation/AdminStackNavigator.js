import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashBoardScreen from '../screens/adminTemplateScreens/DashBoardScreen';
import UsersScreen from '../screens/adminTemplateScreens/UsersScreen';

import SpinLogsScreen from '../screens/adminTemplateScreens/SpinLogsScreen';
import DepositsScreen from '../screens/adminTemplateScreens/DepositsScreen';
import WithdrawalsScreen from '../screens/adminTemplateScreens/WithdrawalsScreen';
import AdminSettingsScreen from '../screens/adminTemplateScreens/AdminSettingsScreen';
import InvestmentsScreen from '../screens/adminTemplateScreens/UserInvestmentsScreen';
import ApproveWithdrawal from '../screens/adminTemplateScreens/ApproveWithdrawal';

import UserDetailsScreen from '../screens/adminTemplateScreens/UserDetailsScreen';
import AddNewInvestment from '../screens/adminTemplateScreens/AddNewInvestment';
import ReferralsScreen from '../screens/adminTemplateScreens/ReferralsScreen';
import InvestmentPlans from '../screens/adminTemplateScreens/InvestmentPlans';
import ReportingTransactionScreen from '../screens/adminTemplateScreens/ReportingTransactionScreen';
const Stack = createNativeStackNavigator();

const AdminStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            animation: 'fade_from_bottom'
        }}
        >
            <Stack.Screen name="Home" component={DashBoardScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="Users" component={UsersScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="Investments" component={InvestmentsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="SpinLogs" component={SpinLogsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="Deposits" component={DepositsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="Withdrawals" component={WithdrawalsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name="Settings" component={AdminSettingsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='ApproveWithdrawal' component={ApproveWithdrawal} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='UserDetailsScreen' component={UserDetailsScreen}
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='AddNewInvestment' component={AddNewInvestment} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='ReferralsScreen' component={ReferralsScreen} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='InvestmentPlans' component={InvestmentPlans} 
            options={{
                freezeOnBlur: true
            }}/>
            <Stack.Screen name='ReportingTransactionScreen' component={ReportingTransactionScreen} 
            options={{
                freezeOnBlur: true
            }}/>
        </Stack.Navigator>
    );
};

export default AdminStackNavigator;
