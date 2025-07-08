import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// Dashboard Stats 
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      // console.log('Dashboard Details:', response.data.stats);
      return response.data.stats;
    } catch (error) {

      return rejectWithValue(error.response.data);
    }
  }
);
// Approve All Withdrawals
export const approveAllWithdrawals = createAsyncThunk("admin/approveAllWithdrawals", async (_, thunkAPI) => {

  try {
    const res = await axiosInstance.get("/admin/approvewithdrawals");
    // console.log('Approve',res.data);
    return res.data.transactions;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
//  Create Investment Plan
export const createInvestmentPlan = createAsyncThunk("admin/createInvestmentPlan", async (payload, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/admin/investment/plan", payload);
    return res.data
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// All Investment Plans 
export const fetchAllInvestmentPlans = createAsyncThunk(
  'admin/fetchAllInvestmentPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/investment/plans');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Fetch User Investments 
export const fetchUserInvestments = createAsyncThunk("admin/fetchUserInvestments", async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get("/admin/userinvestments");
    return res.data.investments;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// Update Investment Plan
export const updateInvestmentPlan = createAsyncThunk(
  'admin/updateInvestmentPlan',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/investment/updateplan/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// All Users
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/users');
      return response.data.users;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Single User by ID
export const fetchUserById = createAsyncThunk(
  'admin/fetchUserById',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/admin/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Toggle User Status
export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/admin/user/status/${id}`, { status });
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Toggle Deposit Status
export const toggleDepositStatus = createAsyncThunk("admin/toggleDepositStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/depositstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
// Toggle Withdrawal Status
export const toggleWithdrawalStatus = createAsyncThunk("admin/toggleWithdrawalStatus", async ({ id, status }, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/withdrawalstatus/${id}`, { status });
    return res.data.transaction;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

// All Transactions
export const fetchTransactionReports = createAsyncThunk(
  'admin/fetchTransactionReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/transactions');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// All Deposits
export const fetchAllDeposits = createAsyncThunk(
  'admin/fetchAllDeposits',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/wallet/deposits');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// All Withdrawals
export const fetchAllWithdrawals = createAsyncThunk(
  'admin/fetchAllWithdrawals',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/wallet/withdrawals');
      return response.data.transactions;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// All Spins
export const fetchSpinLogs = createAsyncThunk(
  'admin/fetchSpinLogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/spins/logs');
      return response.data.spins;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Referral Stats
export const fetchReferralStats = createAsyncThunk(
  'admin/fetchReferralStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/admin/referrals');
      return response.data.referrals;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// delete investment plan
export const deleteInvestmentPlan = createAsyncThunk(
  'admin/deletePlan',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/admin/deleteplan/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    dashboardStats: null,
    users: [],
    singleUser: null,
    investmentPlans: [],
    userInvestments: [],
    deposits: [],
    withdrawals: [],
    approveWithdrawals: [],
    spins: [],
    referralStats: [],
    transactionReports: [],
    loading: false,
    error: null,
    singleUserLoading: false,
    loadingDeletePlan: null,
    createInvestmentPlanLoading: null,
    updateInvestmentLoading : null,
    approveWithdrawalLoading : null,
    investmentPlanFetchLoading: false,
    dashboardLoading: false,
    depositsLoading: false,
    reportingAndTransactionsLoading: false,  
    spinLogsLoading: false,
    usersInvestmentsLoading: false,
    usersLoading: false,
    withdrawalsLoading: false,
    referralStatsLoading: false,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.dashboardLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload;
      })
      // Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersLoading = false;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersLoading = false;
        state.error = action.payload;
      })
      // Single User
      .addCase(fetchUserById.pending, (state) => {
        state.singleUserLoading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.singleUserLoading = false;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.singleUserLoading = false;
        state.error = action.payload;
      })
      // Toggle User Status
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.singleUser = action.payload;
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Investment Plans
      .addCase(fetchAllInvestmentPlans.pending, (state) => {
        state.investmentPlanFetchLoading = true;
        state.error = null;
      })
      .addCase(fetchAllInvestmentPlans.fulfilled, (state, action) => {
        state.investmentPlans = action.payload;
        state.investmentPlanFetchLoading = false;
      })
      .addCase(fetchAllInvestmentPlans.rejected, (state, action) => {
        state.investmentPlanFetchLoading = false;
        state.error = action.payload;
      })
      // Deposits 
      .addCase(fetchAllDeposits.pending, (state) => {
        state.depositsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllDeposits.fulfilled, (state, action) => {
        state.deposits = action.payload;
        state.depositsLoading = false;
      })
      .addCase(fetchAllDeposits.rejected, (state, action) => {
        state.depositsLoading = false;
        state.error = action.payload;
      })
      // Withdrawals
      .addCase(fetchAllWithdrawals.pending, (state) => {
        state.withdrawalsLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWithdrawals.fulfilled, (state, action) => {
        state.withdrawals = action.payload;
        state.withdrawalsLoading = false;
      })
      .addCase(fetchAllWithdrawals.rejected, (state, action) => {
        state.withdrawalsLoading = false;
        state.error = action.payload;
      })
      // Update Investment Plan
      .addCase(updateInvestmentPlan.pending, (state) => {
        state.updateInvestmentLoading = true;      
        state.error = null;
      })
      .addCase(updateInvestmentPlan.fulfilled, (state, action) => {
        state.updateInvestmentLoading= false;
        // const updated = action.payload.updatedPlan;
        // state.investmentPlans = state.investmentPlans.map(plan =>
        //   plan._id === updated._id ? updated : plan
        // );
      })
      .addCase(updateInvestmentPlan.rejected, (state, action) => {
        state.updateInvestmentLoading = false;
        state.error = action.payload;
      })

      // Spin Logs
      .addCase(fetchSpinLogs.pending, (state) => {
        state.spinLogsLoading = true;
        state.error = null;
      })

      .addCase(fetchSpinLogs.fulfilled, (state, action) => {
        state.spins = action.payload;
        state.spinLogsLoading = false;
      })
      .addCase(fetchSpinLogs.rejected, (state, action) => {
        state.spinLogsLoading = false;
        state.error = action.payload;
      })
      // Referral Stats
      .addCase(fetchReferralStats.pending, (state) => {
        state.referralStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchReferralStats.fulfilled, (state, action) => {
        state.referralStats = action.payload;
        state.referralStatsLoading = false;
      })
      .addCase(fetchReferralStats.rejected, (state, action) => {
        state.referralStatsLoading = false;
        state.error = action.payload;
      })
      // Transaction Reports
      .addCase(fetchTransactionReports.pending, (state) => {
        state.reportingAndTransactionsLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionReports.fulfilled, (state, action) => {
        state.transactionReports = action.payload;
        state.reportingAndTransactionsLoading = false;
      })
      .addCase(fetchTransactionReports.rejected, (state, action) => {
        state.reportingAndTransactionsLoading = false;
        state.error = action.payload;
      })
      // Create Investment Plan
      .addCase(createInvestmentPlan.pending, (state) => {
        state.createInvestmentPlanLoading = true;
        state.error = null;
      })
      .addCase(createInvestmentPlan.fulfilled, (state, action) => {
        // state.investmentPlans.push(action.payload);
        state.createInvestmentPlanLoading = false;
      })
      .addCase(createInvestmentPlan.rejected, (state, action) => {
        state.createInvestmentPlanLoading = false;
        state.error = action.payload;
      })
      // Fetch User Investments
      .addCase(fetchUserInvestments.pending, (state) => {
        state.usersInvestmentsLoading = true;
        state.error = null;
      })
      .addCase(fetchUserInvestments.fulfilled, (state, action) => {
        state.userInvestments = action.payload;
        state.usersInvestmentsLoading = false;
      })
      .addCase(fetchUserInvestments.rejected, (state, action) => {
        state.usersInvestmentsLoading = false;
        state.error = action.payload;
      })
      // Approve All Withdrawals
      .addCase(approveAllWithdrawals.pending, (state) => {
        state.approveWithdrawalLoading = true;
        state.error = null;
      })
      .addCase(approveAllWithdrawals.fulfilled, (state, action) => {
        state.approveWithdrawalLoading = false;
        state.approveWithdrawals = action.payload;
      })
      .addCase(approveAllWithdrawals.rejected, (state, action) => {
        state.approveWithdrawalLoading = false;
        state.error = action.payload;
      })
      // Toggle Deposit Status
      .addCase(toggleDepositStatus.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(toggleDepositStatus.fulfilled, (state, action) => {
        const updatedDeposits = state.deposits.map(deposit =>
          deposit.id === action.payload.id ? action.payload : deposit
        );
        state.deposits = updatedDeposits;
        // state.loading = false;
      })
      .addCase(toggleDepositStatus.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.payload;
      })
      // Toggle Withdrawal Status
      .addCase(toggleWithdrawalStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWithdrawalStatus.fulfilled, (state, action) => {
        const updatedWithdrawals = state.withdrawals.map(withdrawal =>
          withdrawal.id === action.payload.id ? action.payload : withdrawal
        );
        state.withdrawals = updatedWithdrawals;
        state.loading = false;
      })
      .addCase(toggleWithdrawalStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete plan  
      .addCase(deleteInvestmentPlan.pending, (state) => {
        // state.loadingDeletePlan = true;
        state.error = null;
      })
      .addCase(deleteInvestmentPlan.fulfilled, (state, action) => {
        const deletedId = action.meta.arg; 
        state.investmentPlans = state.investmentPlans.filter(
          (plan) => plan._id !== deletedId
        );
        state.loadingDeletePlan = false;
      })
      .addCase(deleteInvestmentPlan.rejected, (state, action) => {
        // state.loadingDeletePlan = false;
        state.error = action.payload;
      })
  }
});

export default adminSlice.reducer;