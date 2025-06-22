// src/redux/slices/rewardSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";


// Get Reward Wallet
export const getRewardWallet = createAsyncThunk(
  "reward/getWallet",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/reward/getreward");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch wallet");
    }
  }
);

// 2 Get Reward History
export const getRewardHistory = createAsyncThunk(
  "reward/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/reward/history");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch history");
    }
  }
);

// Get Referral Summary
export const getMyReferralSummary = createAsyncThunk(
  "reward/getSummary",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/reward/referral-summary");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch summary");
    }
  }
);

// Get Referral Bonus History
export const getReferralBonusHistory = createAsyncThunk(
  "reward/getBonusHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/reward/ReferralBonusHistory");
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch bonus history");
    }
  }
);

const rewardSlice = createSlice({
  name: "reward",
  initialState: {
    loading: false,
    wallet: null,
    history: [],
    summary: null,
    bonusHistory: [],
    errorMsg: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Reward Wallet
      .addCase(getRewardWallet.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRewardWallet.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = {
          rewardBalance: action.payload.rewardBalance,
          rewardhistory: action.payload.rewardhistory,
        };
      })
      .addCase(getRewardWallet.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      })

      // Reward History
      .addCase(getRewardHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRewardHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(getRewardHistory.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      })

      // Referral Summary
      .addCase(getMyReferralSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyReferralSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(getMyReferralSummary.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      })

      // Bonus History
      .addCase(getReferralBonusHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReferralBonusHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.bonusHistory = action.payload;
      })
      .addCase(getReferralBonusHistory.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = action.payload;
      });
  },
});

export default rewardSlice.reducer;
