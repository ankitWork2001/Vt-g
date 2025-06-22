// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import investmentReducer from './slices/investmentSlice';
import walletReducer from './slices/walletSlice';
import referralReducer from './slices/referralSlice';
import adminReducer from './slices/adminSlice';
import notificationReducer from './slices/notificationSlice';
import spinReducer from './slices/spinSlice';
import rewardReducer from "./slices/rewardSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    investment: investmentReducer,
    wallet: walletReducer,
    referral: referralReducer,
    admin: adminReducer,
    notification: notificationReducer,
    spin: spinReducer,
    reward: rewardReducer,
  },
});
