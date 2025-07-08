import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Get Referral Code
export const fetchReferralCode = createAsyncThunk(
  'referral/fetchCode',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/code');
      return res.data.code;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch referral code');
    }
  }
);

// Submit Referral Code
export const submitReferral = createAsyncThunk(
  'referral/submit',
  async (code, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post('/referral/refer', { referralCode: code });
      return res.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to apply referral');
    }
  }
);

// Get Referral Tree
export const fetchReferralTree = createAsyncThunk(
  'referral/tree',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/tree');
      return res.data.referralTree;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch referral tree');
    }
  }
);

// Get Commissions
export const fetchReferralCommission = createAsyncThunk(
  'referral/commission',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get('/referral/commissions');
      return res.data.commissions;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch commissions');
    }
  }
);

const referralSlice = createSlice({
  name: 'referral',
  initialState: {
    referralCode: '',
    referralTree: [],
    commission: 0,
    loading: false,
    successMsg: null,
    errorMsg: null,
    referralLoading : false
  },
  reducers: {
    clearReferralMessages: (state) => {
      state.successMsg = null;
      state.errorMsg = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Referral Code
      .addCase(fetchReferralCode.pending, (state) => { state.referralLoading = true; })
      

      .addCase(fetchReferralCode.fulfilled, (state, action) => {
        state.referralLoading = false;
        state.referralCode = action.payload;
      })
      .addCase(fetchReferralCode.rejected, (state, action) => {
        state.referralLoading = false;
        state.errorMsg = action.payload;
      })

      // Submit Referral
      .addCase(submitReferral.pending, (state) => { state.loading = true; })
      .addCase(submitReferral.fulfilled, (state, action) => {
        state.loading = false;
        state.successMsg = action.payload;
      })
      .addCase(submitReferral.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      })

      // Tree
      .addCase(fetchReferralTree.fulfilled, (state, action) => {
        state.referralTree = action.payload;
      })

      // Commission
      .addCase(fetchReferralCommission.fulfilled, (state, action) => {
        state.commission = action.payload;
      });
  }
});

export const { clearReferralMessages } = referralSlice.actions;
export default referralSlice.reducer;
